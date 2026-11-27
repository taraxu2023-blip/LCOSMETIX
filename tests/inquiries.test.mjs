import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { POST } from "../src/app/api/inquiries/route.ts";
import { products, getPublishedProducts, getProductBySlug } from "../src/data/products.ts";
import { getPublishedConceptCollections } from "../src/data/concepts.ts";
import { persistInquiryRecord } from "../src/lib/inquiry-storage.ts";

const valid = { name: "QA Test", email: "qa@example.test", country: "Singapore", company: "QA only", productId: "bobii-ball", productRequirement: "Sample evaluation", message: "Automated persistence check, not a customer inquiry.", interest: "Samples" };
const request = (body, headers = {}) => new Request("http://localhost/api/inquiries", { method: "POST", headers: { "content-type": "application/json", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });

test("inquiry persistence and publication safeguards", async (t) => {
  const folder = await mkdtemp(path.join(tmpdir(), "lcosmetix-inquiry-qa-"));
  const previousDirectory = process.env.INQUIRY_STORAGE_DIR;
  const previousVercel = process.env.VERCEL;
  const previousBlobToken = process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.VERCEL;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  process.env.INQUIRY_STORAGE_DIR = folder;
  try {
    await t.test("success is returned only with a readable matching record on disk", async () => {
      const response = await POST(request(valid));
      assert.equal(response.status, 201);
      const receipt = await response.json();
      assert.equal(receipt.success, true);
      const saved = JSON.parse(await readFile(path.join(folder, `${receipt.reference}.json`), "utf8"));
      assert.equal(saved.email, valid.email);
      assert.equal(saved.product.id, valid.productId);
      assert.equal(saved.product.name, products[0].name);
      assert.equal(saved.reference, receipt.reference);
    });
    await t.test("invalid input, unavailable product, oversize body and cross-origin request cannot succeed", async () => {
      const count = (await readdir(folder)).length;
      assert.equal((await POST(request({ ...valid, country: " " }))).status, 400);
      assert.equal((await POST(request({ ...valid, email: "not-email" }))).status, 400);
      assert.equal((await POST(request({ ...valid, productId: "unpublished-product" }))).status, 400);
      assert.equal((await POST(request({ ...valid, website: "spam" }))).status, 400);
      assert.equal((await POST(request("x".repeat(25000)))).status, 413);
      assert.equal((await POST(request("not-json"))).status, 400);
      assert.equal((await POST(request(valid, { origin: "https://other.test" }))).status, 403);
      assert.equal((await readdir(folder)).length, count);
    });
    await t.test("the selected development concept and optional project details are saved from the shared record", async () => {
      const concept = getPublishedConceptCollections(valid.productId)[0];
      const response = await POST(request({ ...valid, conceptId: concept.id, targetMarket: "European market", estimatedQuantity: "Preliminary sample evaluation" }));
      assert.equal(response.status, 201);
      const receipt = await response.json();
      const saved = JSON.parse(await readFile(path.join(folder, `${receipt.reference}.json`), "utf8"));
      assert.equal(saved.concept.id, concept.id);
      assert.equal(saved.concept.name, concept.name);
      assert.equal(saved.concept.developmentStage, "concept");
      assert.deepEqual(saved.concept.productNames, concept.productNames);
      assert.equal(saved.targetMarket, "European market");
      assert.equal(saved.estimatedQuantity, "Preliminary sample evaluation");
    });
    await t.test("unknown, draft and mismatched concepts cannot be submitted", async () => {
      const count = (await readdir(folder)).length;
      assert.equal((await POST(request({ ...valid, conceptId: "unknown-concept" }))).status, 400);
      assert.equal((await POST(request({ ...valid, estimatedQuantity: "x".repeat(101) }))).status, 400);
      const concept = getPublishedConceptCollections(valid.productId)[0];
      const previousStatus = concept.publicationStatus;
      const previousProductId = concept.containerProductId;
      try {
        concept.publicationStatus = "draft";
        assert.equal((await POST(request({ ...valid, conceptId: concept.id }))).status, 400);
        concept.publicationStatus = previousStatus;
        concept.containerProductId = "different-container";
        assert.equal((await POST(request({ ...valid, conceptId: concept.id }))).status, 400);
      } finally {
        concept.publicationStatus = previousStatus;
        concept.containerProductId = previousProductId;
      }
      assert.equal((await readdir(folder)).length, count);
    });
    await t.test("storage failure returns 503 without a success flag or reference", async () => {
      const obstruction = path.join(folder, "not-a-directory");
      await writeFile(obstruction, "QA obstruction");
      process.env.INQUIRY_STORAGE_DIR = obstruction;
      const response = await POST(request(valid));
      assert.equal(response.status, 503);
      const result = await response.json();
      assert.equal(result.success, undefined);
      assert.equal(result.reference, undefined);
      process.env.INQUIRY_STORAGE_DIR = folder;
    });
    await t.test("Vercel without private storage returns 503 and never falls back to local disk", async () => {
      const count = (await readdir(folder)).length;
      process.env.VERCEL = "1";
      try {
        const response = await POST(request(valid));
        assert.equal(response.status, 503);
        const result = await response.json();
        assert.equal(result.success, undefined);
        assert.equal(result.reference, undefined);
        assert.equal((await readdir(folder)).length, count);
      } finally { delete process.env.VERCEL; }
    });
    await t.test("private Blob persistence waits for acknowledgement and preserves the exact record", async () => {
      const reference = "qa-private-blob";
      const serialized = JSON.stringify({ reference, ...valid });
      let acknowledge;
      let settled = false;
      const acknowledgement = new Promise((resolve) => { acknowledge = resolve; });
      const persistence = persistInquiryRecord(reference, serialized, {
        environment: { VERCEL: "1", BLOB_READ_WRITE_TOKEN: "qa-placeholder-only" },
        putBlob: async (pathname, body, options) => {
          assert.equal(pathname, `inquiries/${reference}.json`);
          assert.equal(body, serialized);
          assert.equal(options.access, "private");
          assert.equal(options.contentType, "application/json");
          assert.equal(options.allowOverwrite, false);
          await acknowledgement;
        },
      }).then(() => { settled = true; });
      await Promise.resolve();
      assert.equal(settled, false);
      acknowledge();
      await persistence;
      assert.equal(settled, true);
    });
    await t.test("Blob write rejection is propagated without a local fallback", async () => {
      const count = (await readdir(folder)).length;
      await assert.rejects(persistInquiryRecord("qa-rejected", "{}", {
        environment: { VERCEL: "1", BLOB_READ_WRITE_TOKEN: "qa-placeholder-only" },
        directory: folder,
        putBlob: async () => { throw new Error("Simulated private storage failure"); },
      }), /Simulated private storage failure/);
      assert.equal((await readdir(folder)).length, count);
    });
    await t.test("the browser host is accepted when Next uses an internal localhost alias", async () => {
      const response = await POST(request(valid, { host: "127.0.0.1:3000", origin: "http://127.0.0.1:3000" }));
      assert.equal(response.status, 201);
      const receipt = await response.json();
      assert.equal(JSON.parse(await readFile(path.join(folder, `${receipt.reference}.json`), "utf8")).productId, valid.productId);
    });
    await t.test("drafts are removed from the shared public catalogue and cannot receive inquiries", async () => {
      const product = products[0];
      const priorStatus = product.status;
      product.status = "draft";
      try {
        assert.equal(getPublishedProducts().some((item) => item.id === product.id), false);
        assert.equal(getProductBySlug(product.slug), undefined);
        assert.equal((await POST(request(valid))).status, 400);
      } finally { product.status = priorStatus; }
    });
  } finally {
    if (previousDirectory === undefined) delete process.env.INQUIRY_STORAGE_DIR;
    else process.env.INQUIRY_STORAGE_DIR = previousDirectory;
    if (previousVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = previousVercel;
    if (previousBlobToken === undefined) delete process.env.BLOB_READ_WRITE_TOKEN;
    else process.env.BLOB_READ_WRITE_TOKEN = previousBlobToken;
    const resolved = path.resolve(folder);
    if (path.dirname(resolved) === path.resolve(tmpdir()) && path.basename(resolved).startsWith("lcosmetix-inquiry-qa-")) await rm(resolved, { recursive: true });
  }
});
