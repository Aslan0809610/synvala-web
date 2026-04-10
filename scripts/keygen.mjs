#!/usr/bin/env node
/**
 * Synvala Manual License Key Generator
 *
 * Usage:
 *   node scripts/keygen.mjs --email user@example.com --plan pro-annual
 *   node scripts/keygen.mjs --email pi@uni.edu --plan lab5 --lab-name "Wang Lab"
 *   node scripts/keygen.mjs --email user@example.com --plan pro-lifetime
 *
 * Options:
 *   --email       Recipient email (required)
 *   --plan        Plan type (required):
 *                   pro-monthly   → 35 days
 *                   pro-annual    → 370 days
 *                   pro-lifetime  → 100 years
 *                   lab5          → Lab 5 seats, 370 days
 *                   lab10         → Lab 10 seats, 370 days
 *                   lab20         → Lab 20 seats, 370 days
 *   --lab-name    Lab name (optional, for lab plans; defaults to email domain)
 *   --days        Override duration in days (optional)
 *   --key-file    Path to Ed25519 private key PEM (default: reads LICENSE_PRIVATE_KEY env var)
 *
 * Private key:
 *   Set env var:  $env:LICENSE_PRIVATE_KEY = Get-Content "C:\path\to\private.pem" -Raw
 *   Or pass:      --key-file "C:\Users\you\.config\synvala\license_private.pem"
 */

import { createPrivateKey, sign } from "crypto";
import { readFileSync } from "fs";

// ─── Plan definitions ───────────────────────────────────────────────────────
const PLANS = {
  "pro-annual":   { tier: "pro", days: 370 },
  "pro-lifetime": { tier: "pro", days: 36500 },
  "lab5":         { tier: "lab", seats: 5,  days: 370 },
  "lab10":        { tier: "lab", seats: 10, days: 370 },
  "lab20":        { tier: "lab", seats: 20, days: 370 },
  "site":         { tier: "lab", seats: 9999, days: 370 },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function randomId(len) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < len; i++) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function generateLicenseKey(email, tier, seats, labName, durationDays, privateKeyPem, mode, activationWindowDays) {
  const privateKey = createPrivateKey(privateKeyPem);
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    uid: `${tier}_${randomId(12)}`,
    email,
    tier,
    mode: mode || "offline",
    ...(seats !== undefined && { seats }),
    ...(labName && { lab_name: labName }),
    iat: now,
    exp: now + durationDays * 86400,
    ...(activationWindowDays && { activation_deadline: now + activationWindowDays * 86400 }),
    version: 2,
  };

  const jsonStr = JSON.stringify(payload);
  const signature = sign(null, Buffer.from(jsonStr, "utf-8"), privateKey);
  const combined = jsonStr + "." + signature.toString("base64");
  return Buffer.from(combined, "utf-8").toString("base64");
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      args[key] = argv[i + 1] ?? true;
      i++;
    }
  }
  return args;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const args = parseArgs(process.argv.slice(2));

// Help
if (args.help || args.h || (!args.email && !args.plan)) {
  console.log(`
Synvala Manual Key Generator

Usage:
  node scripts/keygen.mjs --email <email> --plan <plan> [options]

Plans:
  pro-annual    Pro, 370 days (~1 year)        — $39
  pro-lifetime  Pro, 100 years                  — $129
  lab5          Lab 5 seats, 370 days           — $199/yr
  lab10         Lab 10 seats, 370 days          — $349/yr
  lab20         Lab 20 seats, 370 days          — $549/yr
  site          Site License, 9999 seats, 1 yr  — $1,500+/yr

Options:
  --lab-name           Lab name (lab plans only, defaults to email domain)
  --days               Override duration in days
  --mode               offline (default) or online
  --activation-window  Days within which the key must be activated
  --key-file           Path to private key PEM file
`);
  process.exit(0);
}

// Validate required
if (!args.email) { console.error("Error: --email is required"); process.exit(1); }
if (!args.plan)  { console.error("Error: --plan is required");  process.exit(1); }

const plan = PLANS[args.plan];
if (!plan) {
  console.error(`Error: unknown plan "${args.plan}". Valid: ${Object.keys(PLANS).join(", ")}`);
  process.exit(1);
}

// Load private key
let privateKeyPem;
if (args["key-file"]) {
  try {
    privateKeyPem = readFileSync(args["key-file"], "utf-8");
  } catch (e) {
    console.error(`Error: cannot read key file: ${args["key-file"]}`);
    process.exit(1);
  }
} else if (process.env.LICENSE_PRIVATE_KEY) {
  privateKeyPem = process.env.LICENSE_PRIVATE_KEY;
} else {
  console.error("Error: provide --key-file or set LICENSE_PRIVATE_KEY env var");
  process.exit(1);
}

// Resolve params
const email    = args.email.trim().toLowerCase();
const tier     = plan.tier;
const seats    = plan.seats;
const days     = args.days ? parseInt(args.days) : plan.days;
const labName  = tier === "lab"
  ? (args["lab-name"] || email.split("@")[1]?.split(".")[0] || "Lab")
  : undefined;
const mode     = args.mode === "online" ? "online" : "offline";
const activationWindow = args["activation-window"] ? parseInt(args["activation-window"]) : null;

// Generate
let key;
try {
  key = generateLicenseKey(email, tier, seats, labName, days, privateKeyPem, mode, activationWindow);
} catch (e) {
  console.error("Error generating key:", e.message);
  process.exit(1);
}

// Output
const expDate = new Date(Date.now() + days * 86400 * 1000).toISOString().split("T")[0];

console.log("\n" + "─".repeat(60));
console.log(`  Email      : ${email}`);
console.log(`  Plan       : ${args.plan}`);
console.log(`  Tier       : ${tier}`);
console.log(`  Mode       : ${mode}`);
if (seats)   console.log(`  Seats      : ${seats}`);
if (labName) console.log(`  Lab        : ${labName}`);
console.log(`  Expires    : ${expDate} (${days} days)`);
if (activationWindow) {
  const deadline = new Date(Date.now() + activationWindow * 86400 * 1000).toISOString().split("T")[0];
  console.log(`  Activate by: ${deadline} (${activationWindow} days)`);
}
console.log("─".repeat(60));
console.log("\nLicense Key:\n");
console.log(key);
console.log();
