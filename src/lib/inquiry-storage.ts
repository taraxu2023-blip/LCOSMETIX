import { put } from "@vercel/blob";
import { mkdir, open, unlink } from "node:fs/promises";
import path from "node:path";

type StorageOptions = {
  environment?: NodeJS.ProcessEnv;
  directory?: string;
  putBlob?: (pathname: string, body: string, options: {
    access: "private";
    token: string;
    contentType: "application/json";
    addRandomSuffix: false;
    allowOverwrite: false;
  }) => Promise<unknown>;
};

export async function persistInquiryRecord(reference: string, json: string, options: StorageOptions = {}) {
  const environment = options.environment ?? process.env;
  const token = environment.BLOB_READ_WRITE_TOKEN;
  if (token) {
    // Access is explicitly private; a public Blob store must never receive inquiries.
    await (options.putBlob ?? put)(`inquiries/${reference}.json`, json, {
      access: "private", token, contentType: "application/json",
      addRandomSuffix: false, allowOverwrite: false,
    });
    return;
  }
  // Vercel's ephemeral filesystem cannot be used as durable inquiry storage.
  if (environment.VERCEL) throw new Error("Private Blob inquiry storage is not configured.");
  const directory = options.directory || environment.INQUIRY_STORAGE_DIR || path.join(process.cwd(), ".local-data", "inquiries");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const file = path.join(directory, `${reference}.json`);
  const handle = await open(file, "wx", 0o600);
  try {
    await handle.writeFile(json, "utf8");
    await handle.sync();
  } catch (error) {
    await handle.close();
    await unlink(file).catch(() => undefined);
    throw error;
  }
  await handle.close();
}
