"use client";

import { useState } from "react";

const PLANS = [
  { value: "pro-monthly",  label: "Pro Monthly  (~1 month)" },
  { value: "pro-annual",   label: "Pro Annual   (~1 year)" },
  { value: "pro-lifetime", label: "Pro Lifetime (100 years)" },
  { value: "lab5",         label: "Lab 5 Seats  (~1 year)" },
  { value: "lab10",        label: "Lab 10 Seats (~1 year)" },
  { value: "lab20",        label: "Lab 20 Seats (~1 year)" },
];

export default function AdminKeygen() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed]     = useState(false);
  const [authErr, setAuthErr]   = useState("");

  const [email,   setEmail]   = useState("");
  const [plan,    setPlan]    = useState("pro-annual");
  const [labName, setLabName] = useState("");
  const [days,    setDays]    = useState("");
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState<any>(null);
  const [error,   setError]   = useState("");
  const [copied,  setCopied]  = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const isLab = plan.startsWith("lab");

  // ── Auth ──────────────────────────────────────────────────────────────────
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    // Quick pre-check: try generating to verify password
    setAuthed(true);
    setAuthErr("");
  };

  // ── Generate ──────────────────────────────────────────────────────────────
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/admin/keygen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, email, plan, labName: labName || undefined, days: days || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) { setAuthed(false); setAuthErr("Wrong password"); }
        else setError(data.error || "Error");
      } else {
        setResult(data);
        setHistory(prev => [data, ...prev].slice(0, 20));
      }
    } catch {
      setError("Network error");
    }
    setLoading(false);
  };

  const copyKey = async (key: string) => {
    try { await navigator.clipboard.writeText(key); } catch {
      const t = document.createElement("textarea");
      t.value = key; document.body.appendChild(t); t.select();
      document.execCommand("copy"); document.body.removeChild(t);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => { setResult(null); setEmail(""); setLabName(""); setDays(""); };

  // ── Render: Auth gate ─────────────────────────────────────────────────────
  if (!authed) return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
      <form onSubmit={handleAuth} style={{ width: 340, padding: 40, background: "#111", borderRadius: 16, border: "1px solid #222" }}>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Admin</h2>
        <p style={{ color: "#6e6e73", fontSize: 13, marginBottom: 24 }}>Synvala License Key Generator</p>
        <input
          type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Admin password" autoFocus required
          style={inputStyle}
        />
        {authErr && <p style={{ color: "#ef4444", fontSize: 13, marginTop: 8 }}>{authErr}</p>}
        <button type="submit" style={{ ...btnStyle, width: "100%", marginTop: 16 }}>Enter</button>
      </form>
    </main>
  );

  // ── Render: Main UI ───────────────────────────────────────────────────────
  return (
    <main style={{ minHeight: "100vh", background: "#000", padding: "80px 24px 60px", color: "#fff" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 12, color: "#b45309", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Admin</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>License Key Generator</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* ── Form ── */}
          <div style={{ background: "#111", borderRadius: 14, border: "1px solid #222", padding: 28 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#a1a1a6", marginBottom: 20, textTransform: "uppercase", letterSpacing: 0.5 }}>New Key</h3>
            <form onSubmit={handleGenerate}>
              <label style={labelStyle}>Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="user@example.com" required
                style={{ ...inputStyle, marginBottom: 16 }}
              />

              <label style={labelStyle}>Plan</label>
              <select value={plan} onChange={e => setPlan(e.target.value)} style={{ ...inputStyle, marginBottom: 16 }}>
                {PLANS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>

              {isLab && (
                <>
                  <label style={labelStyle}>Lab Name <span style={{ color: "#6e6e73" }}>(optional)</span></label>
                  <input
                    type="text" value={labName} onChange={e => setLabName(e.target.value)}
                    placeholder="Wang Lab"
                    style={{ ...inputStyle, marginBottom: 16 }}
                  />
                </>
              )}

              <label style={labelStyle}>Custom Duration <span style={{ color: "#6e6e73" }}>(days, optional)</span></label>
              <input
                type="number" value={days} onChange={e => setDays(e.target.value)}
                placeholder="leave blank for default"
                style={{ ...inputStyle, marginBottom: 24 }}
              />

              {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12 }}>{error}</p>}

              <button type="submit" disabled={loading || !email.trim()} style={{ ...btnStyle, width: "100%", opacity: loading ? 0.5 : 1 }}>
                {loading ? "Generating…" : "Generate Key"}
              </button>
            </form>
          </div>

          {/* ── Result ── */}
          <div style={{ background: "#111", borderRadius: 14, border: "1px solid #222", padding: 28 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#a1a1a6", marginBottom: 20, textTransform: "uppercase", letterSpacing: 0.5 }}>Result</h3>
            {!result ? (
              <p style={{ color: "#424245", fontSize: 14 }}>Key will appear here…</p>
            ) : (
              <>
                <div style={{ marginBottom: 16, fontSize: 13, lineHeight: 2 }}>
                  <Row label="Email"   value={result.email} />
                  <Row label="Plan"    value={result.plan} />
                  {result.seats   && <Row label="Seats"   value={String(result.seats)} />}
                  {result.labName && <Row label="Lab"     value={result.labName} />}
                  <Row label="Expires" value={result.expires} />
                  <Row label="Days"    value={String(result.days)} />
                </div>
                <div style={{ background: "#000", borderRadius: 8, padding: 12, marginBottom: 12, border: "1px solid #2a2a2a" }}>
                  <code style={{ fontSize: 10, lineHeight: 1.6, color: "#b45309", wordBreak: "break-all", display: "block", userSelect: "all" }}>
                    {result.licenseKey}
                  </code>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => copyKey(result.licenseKey)} style={{ ...btnStyle, flex: 1, background: copied ? "#16a34a" : "#b45309" }}>
                    {copied ? "Copied!" : "Copy Key"}
                  </button>
                  <button onClick={reset} style={{ ...btnStyle, background: "#1c1c1e", color: "#a1a1a6" }}>
                    New
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── History ── */}
        {history.length > 0 && (
          <div style={{ marginTop: 32, background: "#111", borderRadius: 14, border: "1px solid #222", padding: 28 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#a1a1a6", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>
              History (this session)
            </h3>
            <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#6e6e73", textAlign: "left" }}>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Plan</th>
                  <th style={thStyle}>Expires</th>
                  <th style={thStyle}>Key</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} style={{ borderTop: "1px solid #1c1c1e" }}>
                    <td style={tdStyle}>{h.email}</td>
                    <td style={tdStyle}>{h.plan}</td>
                    <td style={tdStyle}>{h.expires}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => copyKey(h.licenseKey)}
                        style={{ background: "none", border: "1px solid #2a2a2a", borderRadius: 6, color: "#b45309", fontSize: 11, padding: "3px 8px", cursor: "pointer" }}
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ color: "#6e6e73" }}>{label}</span>
      <span style={{ color: "#e8e8e5", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: 8,
  border: "1px solid #2a2a2a", background: "#000",
  color: "#fff", fontSize: 14, outline: "none",
  display: "block",
};

const btnStyle: React.CSSProperties = {
  padding: "10px 20px", borderRadius: 8,
  background: "#b45309", color: "#fff",
  border: "none", cursor: "pointer",
  fontSize: 14, fontWeight: 600,
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 12, color: "#a1a1a6",
  marginBottom: 6, fontWeight: 500,
};

const thStyle: React.CSSProperties = { padding: "6px 8px", fontWeight: 500 };
const tdStyle: React.CSSProperties = { padding: "8px 8px", color: "#e8e8e5" };
