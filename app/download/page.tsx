export default function Download() {
  return (
    <main>
      <section className="section" style={{ maxWidth: 680, paddingTop: 60 }}>
        <h1 className="section-title">Download Synvala</h1>
        <p className="section-subtitle">
          Portable app — no installation required. Unzip and run.
        </p>

        {/* Windows */}
        <div className="dl-card">
          <div style={{ fontSize: 36 }}>🪟</div>
          <h3>Windows</h3>
          <p>Windows 10/11 · x64 · ~40 MB</p>
          <a href="https://github.com/Aslan0809610/synvala-web/releases/download/v1.0.0/Synvala_portable.zip" className="btn-primary">
            Download .zip
          </a>
          <p style={{ marginTop: 10, fontSize: 12, color: "var(--text-dim)" }}>
            Includes synvala.exe + MCP server
          </p>
        </div>

        {/* macOS */}
        <div className="dl-card disabled">
          <div style={{ fontSize: 36 }}>🍎</div>
          <h3>macOS</h3>
          <p>Coming soon</p>
          <span className="btn-outline" style={{ opacity: 0.5, cursor: "default" }}>Coming Soon</span>
        </div>

        {/* Instructions */}
        <div className="dl-instructions">
          <h3>Quick Start</h3>
          <ol>
            <li>Download and unzip <code>Synvala_portable.zip</code></li>
            <li>Double-click <code>synvala.exe</code> to launch</li>
            <li>If Windows shows a security warning: right-click → Properties → Unblock</li>
            <li>Start creating experiments!</li>
          </ol>

          <h3 style={{ marginTop: 28 }}>Data Location</h3>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
            All data is stored locally:
          </p>
          <ul>
            <li><code>%APPDATA%\com.eln.app\eln.db</code> — experiments & chemicals</li>
            <li><code>%APPDATA%\com.eln.app\notes\</code> — Markdown notes (Obsidian compatible)</li>
          </ul>
        </div>

        {/* Pro CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 12 }}>
            Already purchased Pro?
          </p>
          <a href="/activate" className="btn-outline">Activate License</a>
        </div>
      </section>
    </main>
  );
}
