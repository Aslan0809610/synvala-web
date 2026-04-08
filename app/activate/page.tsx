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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = result.licenseKey;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "60px 40px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>
        Activate Synvala
      </h1>
      <p style={{ textAlign: "center", color: "#999", fontSize: 15, marginBottom: 40 }}>
        Enter the email you used on Gumroad to get your license key.
      </p>

      {!result ? (
        <form onSubmit={handleSubmit}>
          <div style={{
            display: "flex", gap: 8,
            padding: 24, borderRadius: 12, border: "1px solid #222", background: "#111",
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
              style={{
                flex: 1, padding: "12px 16px", borderRadius: 8,
                border: "1px solid #333", background: "#0a0a0a", color: "#e5e5e5",
                fontSize: 15, outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              style={{
                padding: "12px 24px", borderRadius: 8, border: "none",
                background: "#f5c518", color: "#000", fontWeight: 600,
                fontSize: 15, cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "..." : "Get Key"}
            </button>
          </div>
          {error && (
            <p style={{ color: "#e74c3c", fontSize: 14, marginTop: 12, textAlign: "center" }}>
              {error}
            </p>
          )}
        </form>
      ) : (
        <div style={{
          padding: 28, borderRadius: 12, border: "1px solid #222", background: "#111",
        }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
              Synvala {result.product} Activated
            </h3>
            <p style={{ color: "#999", fontSize: 14 }}>
              Here is your license key:
            </p>
          </div>

          <div style={{
            background: "#0a0a0a", border: "1px solid #333", borderRadius: 8,
            padding: 16, marginBottom: 16, position: "relative",
          }}>
            <code style={{
              display: "block", wordBreak: "break-all", fontSize: 12,
              lineHeight: 1.5, color: "#f5c518", userSelect: "all",
            }}>
              {result.licenseKey}
            </code>
          </div>

          <button
            onClick={handleCopy}
            style={{
              width: "100%", padding: "12px", borderRadius: 8, border: "none",
              background: copied ? "#27ae60" : "#f5c518",
              color: "#000", fontWeight: 600, fontSize: 15, cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            {copied ? "Copied!" : "Copy License Key"}
          </button>

          <div style={{
            marginTop: 20, padding: 16, background: "#0a0a0a",
            borderRadius: 8, border: "1px solid #222",
          }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>How to activate:</h4>
            <ol style={{ fontSize: 13, color: "#999", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>Open Synvala</li>
              <li>Go to Settings (gear icon)</li>
              <li>Scroll to "License" section</li>
              <li>Paste the key and click "Activate"</li>
            </ol>
          </div>

          <button
            onClick={() => { setResult(null); setEmail(""); }}
            style={{
              display: "block", margin: "16px auto 0", padding: "8px 16px",
              background: "transparent", border: "1px solid #333", borderRadius: 8,
              color: "#999", fontSize: 13, cursor: "pointer",
            }}
          >
            Use a different email
          </button>
        </div>
      )}
    </main>
  );
}
