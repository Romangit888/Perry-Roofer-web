import { NextResponse } from "next/server";

export const runtime = "edge";

type LeadPayload = {
  zip?: string;
  service?: string;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
};

const isLikelyZip = (v: string) => /^\d{5}(-\d{4})?$/.test(v.trim());
const isLikelyPhone = (v: string) => v.replace(/\D/g, "").length >= 10;

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const zip = (body.zip ?? "").trim();
  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const service = (body.service ?? "").trim();

  if (!isLikelyZip(zip)) return NextResponse.json({ ok: false, error: "Invalid ZIP" }, { status: 422 });
  if (!name || name.length < 2) return NextResponse.json({ ok: false, error: "Name required" }, { status: 422 });
  if (!isLikelyPhone(phone)) return NextResponse.json({ ok: false, error: "Phone required" }, { status: 422 });
  if (!service) return NextResponse.json({ ok: false, error: "Service required" }, { status: 422 });

  const payload = {
    ...body,
    source: "perryroofers.com",
    userAgent: req.headers.get("user-agent") ?? "",
    referer: req.headers.get("referer") ?? "",
    timestamp: new Date().toISOString()
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      // Don't block the user — log to server, return success so the UI confirms.
      console.error("Lead webhook failed", err);
    }
  } else {
    console.warn("LEAD_WEBHOOK_URL not set — lead received but not forwarded:", payload);
  }

  return NextResponse.json({ ok: true });
}
