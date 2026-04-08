export default function Download() {
  return (
    <main>
      <div className="dl-hero">
        <h1>Download Synvala</h1>
        <p>Portable app. No installation. Unzip and run.</p>
      </div>

      <div className="dl-cards">
        <div className="dl-card">
          <div className="dl-icon">🪟</div>
          <h3>Windows</h3>
          <p>Windows 10/11 · x64 · ~40 MB</p>
          <a href="https://github.com/Aslan0809610/synvala-web/releases/latest/download/Synvala_portable.zip" className="btn-dl">
            Download .zip
          </a>
        </div>
        <div className="dl-card disabled">
          <div className="dl-icon">🍎</div>
          <h3>macOS</h3>
          <p>Coming soon</p>
          <span className="btn-dl" style={{ opacity: 0.4, cursor: "default", background: "#a1a1a6" }}>Coming Soon</span>
        </div>
      </div>

      <div className="dl-instructions">
        <h3>Quick Start</h3>
        <ol>
          <li>Unzip <code>Synvala_portable.zip</code></li>
          <li>Double-click <code>synvala.exe</code></li>
          <li>If Windows warns: right-click → Properties → Unblock</li>
          <li>Start creating experiments</li>
        </ol>

        <h3 style={{ marginTop: 32 }}>Your Data</h3>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 8 }}>
          Everything stays on your computer:
        </p>
        <ul>
          <li><code>%APPDATA%\com.eln.app\eln.db</code> — experiments & chemicals</li>
          <li><code>%APPDATA%\com.eln.app\notes\</code> — Markdown notes</li>
        </ul>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 10 }}>Already purchased Pro?</p>
          <a href="/activate" style={{ color: "var(--accent)", fontSize: 14, fontWeight: 600 }}>Activate License →</a>
        </div>
      </div>
    </main>
  );
}
