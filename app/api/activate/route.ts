/**
 * License Key Activation API
 *
 * Flow:
 *   1. Buyer enters their email on /activate page
 *   2. This endpoint calls Gumroad API to verify they have a valid purchase
 *   3. If valid, generates and returns a license key
 *
 * Environment variables:
 *   GUMROAD_ACCESS_TOKEN - Gumroad API access token (from Settings → Advanced)
 *   LICENSE_PRIVATE_KEY  - Ed25519 private key (PEM) for signing
 */

import { NextRequest, NextResponse } from "next/server";
import { createPrivateKey, sign } from "crypto";

// Product permalink → tier/seats/duration
const PRODUCT_MAP: Record<string, { tier: string; seats?: number; days: number }> = {
  "ylkzia": { tier: "pro", days: 370 },           // Pro Annual ($39)
  "muguh":  { tier: "pro", days: 36500 },         // Pro Lifetime ($129)
  "pajmvg": { tier: "lab", seats: 5, days: 370 }, // Lab 5 ($199/yr)
  "tqqemu": { tier: "lab", seats: 10, days: 370 },// Lab 10 ($349/yr)
  "ugubfs": { tier: "lab", seats: 20, days: 370 },// Lab 20 ($549/yr)
};

const VALID_PERMALINKS = new Set(Object.keys(PRODUCT_MAP));

function randomId(len: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
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

  // Auto-activate flow keys default to offline mode for now.
  // (Online mode keys are issued via the admin keygen UI for high-risk plans.)
  const payload: Record<string, any> = {
    uid: `${tier}_${randomId(12)}`,
    email,
    tier,
    mode: "offline",
    ...(seats !== undefined && { seats }),
    ...(labName && { lab_name: labName }),
    iat: now,
    exp: now + durationDays * 86400,
    version: 2,
  };

  const jsonStr = JSON.stringify(payload);
  const signature = sign(null, Buffer.from(jsonStr, "utf-8"), privateKey);
  const sigB64 = signature.toString("base64");
  const combined = jsonStr + "." + sigB64;
  return Buffer.from(combined, "utf-8").toString("base64");
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Please enter your email" }, { status: 400 });
    }

    const accessToken = process.env.GUMROAD_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Query Gumroad API for sales matching this email
    const res = await fetch(`https://api.gumroad.com/v2/sales?email=${encodeURIComponent(email)}`, {
      headers: { "Authorization": `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      console.error("Gumroad API error:", res.status);
      return NextResponse.json({ error: "Failed to verify purchase. Please try again later." }, { status: 502 });
    }

    const data = await res.json();
    const sales = data.sales ?? [];

    // Find the most recent valid Synvala purchase
    const validSale = sales.find((sale: any) => {
      const permalink = sale.product_permalink ?? sale.short_product_id;
      return VALID_PERMALINKS.has(permalink) && !sale.refunded && !sale.chargebacked;
    });

    if (!validSale) {
      return NextResponse.json({
        error: "No valid Synvala purchase found for this email. Please use the same email you used on Gumroad."
      }, { status: 404 });
    }

    const permalink = validSale.product_permalink ?? validSale.short_product_id;
    const productInfo = PRODUCT_MAP[permalink];
    if (!productInfo) {
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }

    const buyerName = validSale.full_name ?? "";
    const labName = productInfo.tier === "lab" ? (buyerName || "Lab") : undefined;

    const licenseKey = generateLicenseKey(
      email,
      productInfo.tier,
      productInfo.seats,
      labName,
      productInfo.days,
    );

    // Determine product label for display
    let productLabel = "Pro";
    if (productInfo.seats) productLabel = `Lab ${productInfo.seats} Seats`;
    if (productInfo.days > 10000) productLabel = "Pro Lifetime";

    return NextResponse.json({
      ok: true,
      tier: productInfo.tier,
      product: productLabel,
      licenseKey,
    });

  } catch (err: any) {
    console.error("Activate error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
