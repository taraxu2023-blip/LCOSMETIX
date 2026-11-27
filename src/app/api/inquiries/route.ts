import { saveInquiry, validateInquiry } from "../../../lib/inquiries.ts";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const url = new URL(request.url);
  // Next's internal Request URL may use localhost while the browser uses 127.0.0.1.
  // Validate against the actual Host header rather than an internal server alias.
  const publicOrigin = `${url.protocol}//${request.headers.get("host") || url.host}`;
  const configuredOrigin = process.env.SITE_URL?.replace(/\/$/, "");
  if (origin && origin !== publicOrigin && origin !== configuredOrigin) return Response.json({ error: "This request could not be accepted." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Use the inquiry form to submit your request." }, { status: 415 });
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  const reader = request.body?.getReader();
  if (!reader) return Response.json({ error: "Your inquiry is empty." }, { status: 400 });
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 24000) { await reader.cancel(); return Response.json({ error: "Your inquiry is too long." }, { status: 413 }); }
      chunks.push(value);
    }
    const input: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    let inquiry;
    try { inquiry = validateInquiry(input); }
    catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Please check your inquiry." }, { status: 400 }); }
    try {
      const receipt = await saveInquiry(inquiry);
      return Response.json({ success: true, ...receipt }, { status: 201, headers: { "Cache-Control": "no-store" } });
    } catch {
      console.error("Inquiry could not be persisted. Check private Blob configuration or self-hosted storage permissions.");
      return Response.json({ error: "Your inquiry could not be saved. Please try again or contact info@lcosmetix.com." }, { status: 503 });
    }
  } catch {
    return Response.json({ error: "Your inquiry could not be read. Please try again." }, { status: 400 });
  } finally { reader.releaseLock(); }
}
