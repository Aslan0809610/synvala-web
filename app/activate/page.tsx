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
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.licenseKey) return;
    try {
      await navigator.clipboard.writeText(result.licenseKey);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = result.licenseKey;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main>
      <section className="section" style={{ maxWidth: 560, paddingTop: 60 }}>
        <h1 className="section-title">Activate Synvala</h1>
        <p className="section-subtitle">
          Enter the email you used on Gumroad to get your license key.
        </p>

        {!result ? (
          <form onSubmit={handleSubmit}>
            <div className="activate-box">
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                  className="activate-input"
                />
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="btn-primary"
                  style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "wait" : "pointer" }}
                >
                  {loading ? "..." : "Get Key"}
                </button>
              </div>
              {error && (
                <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 10 }}>
                  {error}
                </p>
              )}
            </div>
          </form>
        ) : (
          <div className="activate-box">
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                Synvala {result.product}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
                Here is your license key:
              </p>
            </div>

            <div className="key-display">
              <code>{result.licenseKey}</code>
            </div>

            <button
              onClick={handleCopy}
              className="btn-primary"
              style={{
                width: "100%",
                background: copied ? "var(--success)" : "var(--accent)",
              }}
            >
              {copied ? "Copied!" : "Copy License Key"}
            </button>

            <div className="steps-box">
              <h4>How to activate:</h4>
              <ol>
                <li>Open Synvala</li>
                <li>Go to Settings (gear icon)</li>
                <li>Scroll to "License" section</li>
                <li>Paste the key and click "Activate"</li>
              </ol>
            </div>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button
                onClick={() => { setResult(null); setEmail(""); }}
                className="btn-outline"
                style={{ fontSize: 12, padding: "6px 14px" }}
              >
                Use a different email
              </button>
            </div>
          </div>
        )}

        {/* Buy CTA */}
        {!result && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 8 }}>
              Don't have a license yet?
            </p>
            <a href="/pricing" className="btn-outline" style={{ fontSize: 13, padding: "8px 20px" }}>
              View Pricing
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
