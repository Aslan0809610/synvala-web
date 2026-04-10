/**
 * License Key Online Verification API
 *
 * Called by the desktop app for online-mode licenses to:
 *   1. Confirm the key signature is valid (sanity check, also done client-side)
 *   2. Check if the key has been revoked (kill-switch for sharing/abuse)
 *   3. Update the client's last_verified timestamp
 *
 * Response shape:
 *   { valid: true,  exp: number }                   — OK, continue use
 *   { valid: false, reason: "revoked" | "expired" | "invalid" }
 *
 * Environment variables:
 *   LICENSE_PUBLIC_KEY — Ed25519 public key (PEM) for verification
 *   REVOKED_UIDS       — comma-separated list of revoked license uids
 */

import { NextRequest, NextResponse } from "next/server";
import { createPublicKey, verify } from "crypto";

interface LicensePayload {
  uid: string;
  email: string;
  tier: string;
  mode?: string;
  seats?: number;
  lab_name?: string;
  iat: number;
  exp: number;
  activation_deadline?: number;
  version: number;
}

function verifyLicenseKey(keyStr: string): LicensePayload | null {
  const publicKeyPem = process.env.LICENSE_PUBLIC_KEY;
  if (!publicKeyPem) {
    console.error("[verify] LICENSE_PUBLIC_KEY not configured");
    return null;
  }

  try {
    const decoded = Buffer.from(keyStr.trim(), "base64").toString("utf-8");
    const dotPos = decoded.lastIndexOf(".");
    if (dotPos < 0) return null;

    const jsonPart = decoded.slice(0, dotPos);
    const sigB64 = decoded.slice(dotPos + 1);

    const payload: LicensePayload = JSON.parse(jsonPart);
    const signature = Buffer.from(sigB64, "base64");

    const publicKey = createPublicKey(publicKeyPem);
    const ok = verify(null, Buffer.from(jsonPart, "utf-8"), publicKey, signature);
    if (!ok) return null;

    return payload;
  } catch (err) {
    console.error("[verify] parse error:", err);
    return null;
  }
}

function isRevoked(uid: string): boolean {
  const list = (process.env.REVOKED_UIDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.includes(uid);
}

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();
    if (!key || typeof key !== "string") {
      return NextResponse.json(
        { valid: false, reason: "missing key" },
        { status: 400 }
      );
    }

    const payload = verifyLicenseKey(key);
    if (!payload) {
      return NextResponse.json(
        { valid: false, reason: "invalid signature" },
        { status: 200 }
      );
    }

    // Check revocation list
    if (isRevoked(payload.uid)) {
      return NextResponse.json(
        { valid: false, reason: "revoked" },
        { status: 200 }
      );
    }

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return NextResponse.json(
        { valid: false, reason: "expired" },
        { status: 200 }
      );
    }

    return NextResponse.json({
      valid: true,
      exp: payload.exp,
      tier: payload.tier,
      mode: payload.mode ?? "offline",
    });
  } catch (err: any) {
    console.error("[verify] error:", err);
    return NextResponse.json(
      { valid: false, reason: "server error" },
      { status: 500 }
    );
  }
}

// Allow CORS preflight from desktop app (if needed)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
