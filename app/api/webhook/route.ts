/**
 * Gumroad Ping (Webhook) Handler
 *
 * Flow: User pays on Gumroad → Gumroad sends POST here → we generate a license key → return it
 *
 * Gumroad sends a POST with form-encoded data including:
 *   - email, product_permalink, sale_timestamp, etc.
 *
 * Environment variables needed (set in Vercel):
 *   LICENSE_PRIVATE_KEY - Ed25519 private key (PEM format) for signing license keys
 */

import { NextRequest, NextResponse } from "next/server";
import { createPrivateKey, sign } from "crypto";

// Product permalink → tier/seats mapping
const PRODUCT_MAP: Record<string, { tier: string; seats?: number; days: number }> = {
  "emgyg":  { tier: "pro", days: 35 },        // Pro Monthly (35 day grace)
  "ylkzia": { tier: "pro", days: 370 },        // Pro Annual
  "muguh":  { tier: "pro", days: 36500 },       // Pro Lifetime (100 years)
  "pajmvg": { tier: "lab", seats: 5, days: 370 },  // Lab 5
  "tqqemu": { tier: "lab", seats: 10, days: 370 }, // Lab 10
  "ugubfs": { tier: "lab", seats: 20, days: 370 }, // Lab 20
};

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
    // Gumroad sends form-encoded data
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const permalink = formData.get("product_permalink") as string;
    const fullName = formData.get("full_name") as string ?? "";

    if (!email || !permalink) {
      console.error("Missing email or permalink", { email, permalink });
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const productInfo = PRODUCT_MAP[permalink];
    if (!productInfo) {
      console.error("Unknown product permalink:", permalink);
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }

    const labName = productInfo.tier === "lab" ? (fullName || "Lab") : undefined;

    // Generate license key
    const licenseKey = generateLicenseKey(
      email,
      productInfo.tier,
      productInfo.seats,
      labName,
      productInfo.days,
    );

    console.log(`License generated for ${email}: tier=${productInfo.tier}, seats=${productInfo.seats ?? "N/A"}`);

    // Return the license key — Gumroad will show this on the post-purchase page
    // and include it in the receipt email if we return it as content
    return new NextResponse(
      JSON.stringify({
        ok: true,
        email,
        tier: productInfo.tier,
        seats: productInfo.seats,
        license_key: licenseKey,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message ?? "Internal error" }, { status: 500 });
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: "Synvala webhook handler ready" });
}
