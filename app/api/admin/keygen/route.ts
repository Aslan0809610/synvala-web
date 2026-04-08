import { NextRequest, NextResponse } from "next/server";
import { createPrivateKey, sign } from "crypto";

const PLANS: Record<string, { tier: string; seats?: number; days: number; label: string }> = {
  "pro-monthly":  { tier: "pro", days: 35,    label: "Pro Monthly" },
  "pro-annual":   { tier: "pro", days: 370,   label: "Pro Annual" },
  "pro-lifetime": { tier: "pro", days: 36500, label: "Pro Lifetime" },
  "lab5":         { tier: "lab", seats: 5,  days: 370, label: "Lab 5 Seats" },
  "lab10":        { tier: "lab", seats: 10, days: 370, label: "Lab 10 Seats" },
  "lab20":        { tier: "lab", seats: 20, days: 370, label: "Lab 20 Seats" },
};

function randomId(len: number) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export async function POST(req: NextRequest) {
  const { password, email, plan, labName, days: customDays } = await req.json();

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const privateKeyPem = process.env.LICENSE_PRIVATE_KEY;
  if (!privateKeyPem) return NextResponse.json({ error: "LICENSE_PRIVATE_KEY not set" }, { status: 500 });

  const planInfo = PLANS[plan];
  if (!planInfo) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  if (!email?.trim()) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const days = customDays ? parseInt(customDays) : planInfo.days;
  const now = Math.floor(Date.now() / 1000);
  const tier = planInfo.tier;
  const seats = planInfo.seats;
  const resolvedLabName = tier === "lab" ? (labName?.trim() || email.split("@")[1]?.split(".")[0] || "Lab") : undefined;

  const payload: Record<string, any> = {
    uid: `${tier}_${randomId(12)}`,
    email: email.trim().toLowerCase(),
    tier,
    ...(seats !== undefined && { seats }),
    ...(resolvedLabName && { lab_name: resolvedLabName }),
    exp: now + days * 86400,
    iat: now,
    version: 1,
  };

  const privateKey = createPrivateKey(privateKeyPem);
  const jsonStr = JSON.stringify(payload);
  const signature = sign(null, Buffer.from(jsonStr), privateKey);
  const licenseKey = Buffer.from(jsonStr + "." + signature.toString("base64")).toString("base64");

  const expDate = new Date((now + days * 86400) * 1000).toISOString().split("T")[0];

  return NextResponse.json({
    licenseKey,
    email: payload.email,
    tier,
    plan: planInfo.label,
    seats: seats ?? null,
    labName: resolvedLabName ?? null,
    expires: expDate,
    days,
  });
}
