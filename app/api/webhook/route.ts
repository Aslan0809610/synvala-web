/**
 * LemonSqueezy Webhook Handler
 *
 * Flow: User pays → LemonSqueezy sends POST here → we generate a license key → send via email
 *
 * Environment variables needed (set in Vercel):
 *   LEMON_WEBHOOK_SECRET - Webhook signing secret from LemonSqueezy
 *   LICENSE_PRIVATE_KEY  - Ed25519 private key (PEM format) for signing license keys
 */

import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { createPrivateKey, sign } from "crypto";

// Variant ID → tier/seats mapping
const VARIANT_MAP: Record<string, { tier: string; seats?: number }> = {
  "1504341": { tier: "pro" },           // Pro Monthly
  "1504358": { tier: "pro" },           // Pro Annual
  "1504360": { tier: "pro" },           // Pro Lifetime
  "1504362": { tier: "lab", seats: 5 }, // Lab 5
  "1504364": { tier: "lab", seats: 10 },// Lab 10
  "1504377": { tier: "lab", seats: 20 },// Lab 20
};

// Variant ID → expiry duration
const VARIANT_DURATION: Record<string, number> = {
  "1504341": 35,      // Monthly: 35 days (5 day grace)
  "1504358": 370,     // Annual: 370 days
  "1504360": 36500,   // Lifetime: 100 years
  "1504362": 370,     // Lab 5: annual
  "1504364": 370,     // Lab 10: annual
  "1504377": 370,     // Lab 20: annual
};

function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  const hmac = createHmac("sha256", secret);
  hmac.update(body);
  const digest = hmac.digest("hex");
  return digest === signature;
}

function generateLicenseKey(
  email: string,
  tier: string,
  seats: number | undefined,
  labName: string | undefined,
  durationDays: number,
): string {
  const privateKeyPem = process.env.LICENSE_PRIVATE_KEY;
  if (!privateKeyPem) throw new Error("LICENSE_PRIVATE_KEY not configured");

  const privateKey = createPrivateKey(privateKeyPem);
  const now = Math.floor(Date.now() / 1000);

  const payload: Record<string, any> = {
    uid: `${tier}_${randomId(12)}`,
    email,
    tier,
    ...(seats !== undefined && { seats }),
    ...(labName && { lab_name: labName }),
    exp: now + durationDays * 86400,
    iat: now,
    version: 1,
  };

  const jsonStr = JSON.stringify(payload);
  const signature = sign(null, Buffer.from(jsonStr, "utf-8"), privateKey);
  const sigB64 = signature.toString("base64");
  const combined = jsonStr + "." + sigB64;
  return Buffer.from(combined, "utf-8").toString("base64");
}

function randomId(len: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-signature") ?? "";
    const secret = process.env.LEMON_WEBHOOK_SECRET ?? "";

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature, secret)) {
      console.error("Webhook signature verification failed");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const data = JSON.parse(body);
    const eventName = data.meta?.event_name;

    // Only handle order_created
    if (eventName !== "order_created") {
      return NextResponse.json({ ok: true, skipped: eventName });
    }

    const email = data.data?.attributes?.user_email;
    const userName = data.data?.attributes?.user_name ?? "";
    const variantId = String(data.data?.attributes?.first_order_item?.variant_id ?? "");

    if (!email || !variantId) {
      console.error("Missing email or variant_id", { email, variantId });
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const tierInfo = VARIANT_MAP[variantId];
    if (!tierInfo) {
      console.error("Unknown variant:", variantId);
      return NextResponse.json({ error: "Unknown product variant" }, { status: 400 });
    }

    const durationDays = VARIANT_DURATION[variantId] ?? 370;
    const labName = tierInfo.tier === "lab" ? (userName || "Lab") : undefined;

    // Generate license key
    const licenseKey = generateLicenseKey(email, tierInfo.tier, tierInfo.seats, labName, durationDays);

    // Send license key via LemonSqueezy API (update order notes)
    // For now, log it — the key will be delivered via the order confirmation email template
    console.log(`License generated for ${email}: tier=${tierInfo.tier}, seats=${tierInfo.seats ?? "N/A"}`);

    // Store license key — in production, you might want to save to a database
    // For MVP, we rely on LemonSqueezy's order custom data or email delivery

    // TODO: Send email with license key via a transactional email service
    // For now, return the key in the response (LemonSqueezy stores webhook responses)
    return NextResponse.json({
      ok: true,
      email,
      tier: tierInfo.tier,
      seats: tierInfo.seats,
      licenseKey,
    });

  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message ?? "Internal error" }, { status: 500 });
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: "Synvala webhook handler ready" });
}
