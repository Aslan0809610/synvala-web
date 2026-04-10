"use client";

import { useState } from "react";

export default function Activate() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong");
      else setResult(data);
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const handleCopy = async () => {
    if (!result?.licenseKey) return;
    try { await navigator.clipboard.writeText(result.licenseKey); }
    catch {
      const t = document.createElement("textarea");
      t.value = result.licenseKey; document.body.appendChild(t);
      t.select(); document.execCommand("copy"); document.body.removeChild(t);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="activate-page">
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>Activate Synvala</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, marginTop: 8 }}>
          Enter the email you used on Gumroad.
        </p>
        <p style={{ color: "var(--text-dim)", fontSize: 12, marginTop: 6 }}>
          Note: new purchases are temporarily paused while we refine the licensing system. Existing buyers can still retrieve their keys here.
        </p>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit}>
          <div className="activate-box">
            <div style={{ display: "flex", gap: 8 }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" required disabled={loading}
                className="activate-input" />
              <button type="submit" disabled={loading || !email.trim()}
                className="btn-activate" style={{ opacity: loading ? 0.5 : 1 }}>
                {loading ? "..." : "Get Key"}
              </button>
            </div>
            {error && <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 10 }}>{error}</p>}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <p style={{ color: "var(--text-dim)", fontSize: 13 }}>Don't have a license?</p>
            <a href="/pricing" style={{ color: "var(--accent)", fontSize: 14, fontWeight: 600 }}>View Pricing →</a>
          </div>
        </form>
      ) : (
        <div className="activate-box">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 44, marginBottom: 8 }}>🎉</div>
            <h3 style={{ fontSize: 20, fontWeight: 700 }}>Synvala {result.product}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Your license key:</p>
          </div>
          <div className="key-display"><code>{result.licenseKey}</code></div>
          <button onClick={handleCopy} className="btn-activate"
            style={{ width: "100%", background: copied ? "var(--success, #16a34a)" : "var(--accent)" }}>
            {copied ? "Copied!" : "Copy License Key"}
          </button>
          <div className="steps-box">
            <h4>How to activate:</h4>
            <ol>
              <li>Open Synvala</li>
              <li>Go to Settings (gear icon)</li>
              <li>Scroll to "License"</li>
              <li>Paste key → click "Activate"</li>
            </ol>
          </div>
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button onClick={() => { setResult(null); setEmail(""); }}
              style={{ background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, cursor: "pointer" }}>
              Use a different email
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
