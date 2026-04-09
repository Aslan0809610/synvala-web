#!/usr/bin/env node
/**
 * Synvala License Key Generator — Local Web UI
 *
 * Usage:
 *   node scripts/keygen-ui.mjs --key-file "C:\path\to\private.pem"
 *   node scripts/keygen-ui.mjs                  # reads LICENSE_PRIVATE_KEY env var
 *
 * Opens a local UI at http://localhost:9800
 */

import { createServer } from "http";
import { createPrivateKey, sign } from "crypto";
import { readFileSync } from "fs";

// ─── Load private key ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
let privateKeyPem;

const keyFileIdx = args.indexOf("--key-file");
if (keyFileIdx !== -1 && args[keyFileIdx + 1]) {
  try {
    privateKeyPem = readFileSync(args[keyFileIdx + 1], "utf-8");
  } catch (e) {
    console.error(`Error: cannot read key file: ${args[keyFileIdx + 1]}`);
    process.exit(1);
  }
} else if (process.env.LICENSE_PRIVATE_KEY) {
  privateKeyPem = process.env.LICENSE_PRIVATE_KEY;
} else {
  console.error("Error: provide --key-file <path> or set LICENSE_PRIVATE_KEY env var");
  process.exit(1);
}

// Validate key on startup
try {
  createPrivateKey(privateKeyPem);
  console.log("Private key loaded.");
} catch (e) {
  console.error("Error: invalid private key:", e.message);
  process.exit(1);
}

// ─── Keygen logic ────────────────────────────────────────────────────────────
const PLANS = {
  "pro-monthly":  { tier: "pro", days: 35,    label: "Pro Monthly" },
  "pro-annual":   { tier: "pro", days: 370,   label: "Pro Annual" },
  "pro-lifetime": { tier: "pro", days: 36500, label: "Pro Lifetime" },
  "lab5":         { tier: "lab", seats: 5,  days: 370, label: "Lab 5 Seats" },
  "lab10":        { tier: "lab", seats: 10, days: 370, label: "Lab 10 Seats" },
  "lab20":        { tier: "lab", seats: 20, days: 370, label: "Lab 20 Seats" },
};

function randomId(len) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let r = "";
  for (let i = 0; i < len; i++) r += chars[Math.floor(Math.random() * chars.length)];
  return r;
}

function generate({ email, plan, labName, days: customDays }) {
  const planInfo = PLANS[plan];
  if (!planInfo) throw new Error(`Unknown plan: ${plan}`);
  if (!email?.trim()) throw new Error("Email required");

  const tier = planInfo.tier;
  const seats = planInfo.seats;
  const days = customDays ? parseInt(customDays) : planInfo.days;
  const resolvedLab = tier === "lab" ? (labName?.trim() || email.split("@")[1]?.split(".")[0] || "Lab") : undefined;
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    uid: `${tier}_${randomId(12)}`,
    email: email.trim().toLowerCase(),
    tier,
    ...(seats !== undefined && { seats }),
    ...(resolvedLab && { lab_name: resolvedLab }),
    exp: now + days * 86400,
    iat: now,
    version: 1,
  };

  const jsonStr = JSON.stringify(payload);
  const privateKey = createPrivateKey(privateKeyPem);
  const signature = sign(null, Buffer.from(jsonStr, "utf-8"), privateKey);
  const licenseKey = Buffer.from(jsonStr + "." + signature.toString("base64"), "utf-8").toString("base64");
  const expDate = new Date((now + days * 86400) * 1000).toISOString().split("T")[0];

  return { licenseKey, email: payload.email, tier, plan: planInfo.label, seats: seats ?? null, labName: resolvedLab ?? null, expires: expDate, days };
}

// ─── HTML UI ─────────────────────────────────────────────────────────────────
const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Synvala Keygen</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',-apple-system,system-ui,sans-serif;background:#000;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.wrap{width:100%;max-width:720px}
.header{margin-bottom:32px}
.header p{font-size:12px;color:#b45309;font-weight:600;text-transform:uppercase;letter-spacing:1px}
.header h1{font-size:28px;font-weight:700;letter-spacing:-0.5px;margin-top:4px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
@media(max-width:640px){.grid{grid-template-columns:1fr}}
.card{background:#111;border-radius:14px;border:1px solid #222;padding:24px}
.card h3{font-size:12px;font-weight:600;color:#6e6e73;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px}
label{display:block;font-size:12px;color:#a1a1a6;margin-bottom:5px;font-weight:500}
input,select{width:100%;padding:9px 12px;border-radius:8px;border:1px solid #2a2a2a;background:#000;color:#fff;font-size:14px;outline:none;margin-bottom:14px;font-family:inherit}
input:focus,select:focus{border-color:#b45309}
select option{background:#111;color:#fff}
.btn{width:100%;padding:10px;border-radius:8px;border:none;cursor:pointer;font-size:14px;font-weight:600;font-family:inherit;transition:opacity .15s}
.btn-primary{background:#b45309;color:#fff}
.btn-primary:hover{background:#92400e}
.btn-primary:disabled{opacity:.4;cursor:not-allowed}
.btn-sm{padding:8px 14px;border-radius:8px;font-size:12px;font-weight:600;border:none;cursor:pointer;font-family:inherit}
.result-empty{color:#424245;font-size:14px}
.info-row{display:flex;justify-content:space-between;font-size:13px;line-height:2}
.info-label{color:#6e6e73}
.info-value{color:#e8e8e5;font-weight:500}
.key-box{background:#000;border-radius:8px;padding:12px;margin:12px 0;border:1px solid #2a2a2a}
.key-box code{font-size:10px;line-height:1.6;color:#b45309;word-break:break-all;display:block;user-select:all}
.btn-row{display:flex;gap:8px}
.btn-row .btn-sm{flex:1}
.btn-copy{background:#b45309;color:#fff}
.btn-copy.copied{background:#16a34a}
.btn-new{background:#1c1c1e;color:#a1a1a6}
.history{margin-top:24px}
.history table{width:100%;font-size:12px;border-collapse:collapse}
.history th{text-align:left;color:#6e6e73;font-weight:500;padding:6px 8px}
.history td{color:#e8e8e5;padding:8px;border-top:1px solid #1c1c1e}
.history .btn-sm{background:none;border:1px solid #2a2a2a;color:#b45309;font-size:11px;padding:3px 8px;border-radius:6px;cursor:pointer}
.error{color:#ef4444;font-size:13px;margin-bottom:10px}
.lab-field{display:none}
.lab-field.show{display:block}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <p>Local Admin</p>
    <h1>License Key Generator</h1>
  </div>
  <div class="grid">
    <!-- Form -->
    <div class="card">
      <h3>New Key</h3>
      <form id="form">
        <label>Email</label>
        <input type="email" id="email" placeholder="user@example.com" required>

        <label>Plan</label>
        <select id="plan">
          <option value="pro-monthly">Pro Monthly  (~1 month)</option>
          <option value="pro-annual" selected>Pro Annual   (~1 year)</option>
          <option value="pro-lifetime">Pro Lifetime (100 years)</option>
          <option value="lab5">Lab 5 Seats  (~1 year)</option>
          <option value="lab10">Lab 10 Seats (~1 year)</option>
          <option value="lab20">Lab 20 Seats (~1 year)</option>
        </select>

        <div id="labField" class="lab-field">
          <label>Lab Name <span style="color:#6e6e73">(optional)</span></label>
          <input type="text" id="labName" placeholder="Wang Lab">
        </div>

        <label>Custom Duration <span style="color:#6e6e73">(days, optional)</span></label>
        <input type="number" id="days" placeholder="leave blank for default">

        <div id="error" class="error" style="display:none"></div>
        <button type="submit" class="btn btn-primary" id="submitBtn">Generate Key</button>
      </form>
    </div>

    <!-- Result -->
    <div class="card">
      <h3>Result</h3>
      <div id="resultEmpty" class="result-empty">Key will appear here...</div>
      <div id="resultContent" style="display:none">
        <div id="resultInfo"></div>
        <div class="key-box"><code id="resultKey"></code></div>
        <div class="btn-row">
          <button class="btn-sm btn-copy" id="copyBtn" onclick="copyKey()">Copy Key</button>
          <button class="btn-sm btn-new" onclick="resetForm()">New</button>
        </div>
      </div>
    </div>
  </div>

  <!-- History -->
  <div id="historySection" class="history card" style="display:none">
    <h3>History (this session)</h3>
    <table>
      <thead><tr><th>Email</th><th>Plan</th><th>Expires</th><th>Key</th></tr></thead>
      <tbody id="historyBody"></tbody>
    </table>
  </div>
</div>

<script>
const history = [];
let currentKey = "";

document.getElementById("plan").addEventListener("change", e => {
  document.getElementById("labField").className = e.target.value.startsWith("lab") ? "lab-field show" : "lab-field";
});

document.getElementById("form").addEventListener("submit", async e => {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  const errEl = document.getElementById("error");
  btn.disabled = true; btn.textContent = "Generating...";
  errEl.style.display = "none";

  try {
    const res = await fetch("/generate", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        email: document.getElementById("email").value,
        plan: document.getElementById("plan").value,
        labName: document.getElementById("labName").value || undefined,
        days: document.getElementById("days").value || undefined,
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error");
    showResult(data);
    history.unshift(data);
    updateHistory();
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = "block";
  }
  btn.disabled = false; btn.textContent = "Generate Key";
});

function showResult(data) {
  currentKey = data.licenseKey;
  document.getElementById("resultEmpty").style.display = "none";
  document.getElementById("resultContent").style.display = "block";
  let html = "";
  const row = (l, v) => '<div class="info-row"><span class="info-label">' + l + '</span><span class="info-value">' + v + '</span></div>';
  html += row("Email", data.email);
  html += row("Plan", data.plan);
  if (data.seats) html += row("Seats", data.seats);
  if (data.labName) html += row("Lab", data.labName);
  html += row("Expires", data.expires);
  html += row("Days", data.days);
  document.getElementById("resultInfo").innerHTML = html;
  document.getElementById("resultKey").textContent = data.licenseKey;
  document.getElementById("copyBtn").className = "btn-sm btn-copy";
  document.getElementById("copyBtn").textContent = "Copy Key";
}

async function copyKey(key) {
  const k = key || currentKey;
  try { await navigator.clipboard.writeText(k); } catch {
    const t = document.createElement("textarea"); t.value = k;
    document.body.appendChild(t); t.select(); document.execCommand("copy");
    document.body.removeChild(t);
  }
  if (!key) {
    const btn = document.getElementById("copyBtn");
    btn.className = "btn-sm btn-copy copied"; btn.textContent = "Copied!";
    setTimeout(() => { btn.className = "btn-sm btn-copy"; btn.textContent = "Copy Key"; }, 2000);
  }
}

function resetForm() {
  document.getElementById("email").value = "";
  document.getElementById("labName").value = "";
  document.getElementById("days").value = "";
  document.getElementById("resultEmpty").style.display = "block";
  document.getElementById("resultContent").style.display = "none";
  document.getElementById("email").focus();
}

function updateHistory() {
  if (!history.length) return;
  document.getElementById("historySection").style.display = "block";
  document.getElementById("historyBody").innerHTML = history.slice(0, 20).map(h =>
    '<tr><td>' + h.email + '</td><td>' + h.plan + '</td><td>' + h.expires + '</td>' +
    '<td><button class="btn-sm" onclick="copyKey(\`' + h.licenseKey + '\`)">Copy</button></td></tr>'
  ).join("");
}
</script>
</body>
</html>`;

// ─── Server ──────────────────────────────────────────────────────────────────
const PORT = 9800;

const server = createServer(async (req, res) => {
  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(HTML);
    return;
  }

  if (req.method === "POST" && req.url === "/generate") {
    let body = "";
    for await (const chunk of req) body += chunk;
    try {
      const data = JSON.parse(body);
      const result = generate(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`\n  Synvala Keygen UI → http://localhost:${PORT}\n`);
  // Try to open browser
  const { exec } = await import("child_process");
  const cmd = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
  exec(`${cmd} http://localhost:${PORT}`);
});
