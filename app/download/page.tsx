export default function Download() {
  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: "60px 40px", textAlign: "center" }}>
      <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>
        Download Synvala
      </h1>
      <p style={{ color: "#999", fontSize: 16, marginBottom: 48 }}>
        Portable app — no installation required. Unzip and run.
      </p>

      {/* Windows */}
      <div style={{
        padding: 32, borderRadius: 12, border: "1px solid #222", background: "#111",
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🪟</div>
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Windows</h3>
        <p style={{ color: "#999", fontSize: 14, marginBottom: 16 }}>Windows 10/11 &middot; x64 &middot; ~40 MB</p>
        <a href="https://github.com/user/synvala/releases/latest/download/Synvala_portable.zip" style={{
          display: "inline-block", padding: "12px 32px", background: "#f5c518", color: "#000",
          borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none",
        }}>
          Download .zip
        </a>
        <p style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
          Includes synvala.exe + MCP server
        </p>
      </div>

      {/* macOS */}
      <div style={{
        padding: 32, borderRadius: 12, border: "1px solid #222", background: "#111",
        marginBottom: 40, opacity: 0.6,
      }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🍎</div>
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>macOS</h3>
        <p style={{ color: "#999", fontSize: 14, marginBottom: 16 }}>Coming soon</p>
        <span style={{
          display: "inline-block", padding: "12px 32px", background: "#333", color: "#999",
          borderRadius: 8, fontWeight: 600, fontSize: 15,
        }}>
          Coming Soon
        </span>
      </div>

      {/* Instructions */}
      <div style={{ textAlign: "left", maxWidth: 500, margin: "0 auto" }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Quick Start</h3>
        <ol style={{ fontSize: 14, color: "#ccc", lineHeight: 2, paddingLeft: 20 }}>
          <li>Download and unzip <code style={{ background: "#222", padding: "1px 4px", borderRadius: 3 }}>Synvala_portable.zip</code></li>
          <li>Double-click <code style={{ background: "#222", padding: "1px 4px", borderRadius: 3 }}>synvala.exe</code> to launch</li>
          <li>If Windows shows a security warning: right-click → Properties → Unblock</li>
          <li>Start creating experiments!</li>
        </ol>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>Data Location</h3>
        <p style={{ fontSize: 14, color: "#999", lineHeight: 1.6 }}>
          All data is stored in <code style={{ background: "#222", padding: "1px 4px", borderRadius: 3 }}>%APPDATA%\com.eln.app\</code>
        </p>
        <ul style={{ fontSize: 14, color: "#999", lineHeight: 2, paddingLeft: 20 }}>
          <li><code style={{ background: "#222", padding: "1px 4px", borderRadius: 3 }}>eln.db</code> — experiments &amp; chemicals database</li>
          <li><code style={{ background: "#222", padding: "1px 4px", borderRadius: 3 }}>notes/</code> — Markdown notes (Obsidian compatible)</li>
        </ul>
      </div>
    </main>
  );
}
