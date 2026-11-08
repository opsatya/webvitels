import { NextResponse } from "next/server";

import { type EnquiryInput, projectTypes, validateEnquiry } from "@/lib/enquiry";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

/** Stops spreadsheet formula injection (=, +, -, @ at the start of a cell). */
const cell = (v: string) => (/^[=+\-@\t\r]/.test(v) ? `'${v}` : v);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`enquiry:${ip}`, 5, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many enquiries. Try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : "");
  const input: EnquiryInput = {
    name: str("name"),
    email: str("email"),
    phone: str("phone"),
    type: str("type"),
    message: str("message"),
  };
  const errors = validateEnquiry(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  if (!WEBHOOK_URL || !WEBHOOK_SECRET) {
    console.error("[enquiry] GOOGLE_SHEETS_WEBHOOK_URL / _SECRET not set; enquiry not stored.");
    return NextResponse.json({ ok: false, error: "Enquiries are not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: WEBHOOK_SECRET,
        name: cell(input.name.trim()),
        email: cell(input.email.trim()),
        phone: cell(input.phone.trim()),
        type: projectTypes.find((t) => t.id === input.type)?.label ?? input.type,
        message: cell(input.message.trim()),
        userAgent: cell(request.headers.get("user-agent")?.slice(0, 300) ?? ""),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !result?.ok) throw new Error(result?.error ?? `HTTP ${res.status}`);
  } catch (err) {
    console.error("[enquiry] Google Sheets webhook failed:", err);
    return NextResponse.json({ ok: false, error: "Could not save the enquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
