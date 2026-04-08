export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">v0.2.0 — Now with AI Assistant & MCP</div>
        <h1>
          The lab notebook<br />
          <em>organic chemists</em> deserve
        </h1>
        <p>
          Plan reactions, screen conditions, track substrate scope, and export publication-ready SI — all in one desktop app.
        </p>
        <div className="hero-actions">
          <a href="/download" className="btn-primary">Download Free</a>
          <a href="/pricing" className="btn-outline">View Pricing</a>
        </div>
        <p className="hero-note">
          Windows & macOS · No account required · Your data stays local
        </p>
      </section>

      {/* Features */}
      <section className="section">
        <h2 className="section-title">Everything you need, nothing you don't</h2>
        <p className="section-subtitle">
          Built specifically for organic chemistry workflows
        </p>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experiment Types */}
      <section className="section">
        <h2 className="section-title">4 experiment types</h2>
        <p className="section-subtitle">
          Each designed for a specific organic chemistry workflow
        </p>
        <div className="exp-grid">
          {expTypes.map((e, i) => (
            <div key={i} className="exp-card">
              <div className="feature-icon">{e.icon}</div>
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
              {e.pro && <span className="badge-pro">PRO</span>}
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <h2 className="section-title">Get started in 30 seconds</h2>
        <p className="section-subtitle">No installation, no account, no setup</p>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">1</div>
            <h3>Download & unzip</h3>
            <p>One portable zip file. Extract and double-click to launch.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">2</div>
            <h3>Create an experiment</h3>
            <p>Choose your experiment type, add reagents with PubChem lookup, set conditions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">3</div>
            <h3>Export & publish</h3>
            <p>Generate PDF reports, SI text, or Word documents ready for submission.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start recording experiments today</h2>
        <p>Free forever for single-step synthesis. Upgrade when you're ready to publish.</p>
        <a href="/download" className="btn-primary">Download Synvala</a>
      </section>
    </main>
  );
}

const features = [
  { icon: "⚗️", title: "Reaction Setup", desc: "PubChem lookup, Ketcher structure drawing, auto-calculate equivalents, masses, and volumes." },
  { icon: "📊", title: "Methodology Screening", desc: "Compare conditions side-by-side. Track yields, selectivity, and find optimal conditions." },
  { icon: "🎯", title: "SI Export", desc: "Generate publication-ready Supporting Information as formatted text or Word documents." },
  { icon: "🤖", title: "AI Assistant", desc: "Built-in chat with Claude, Ollama, Google AI, or OpenAI. Plan experiments by voice or text." },
  { icon: "📓", title: "Markdown Notebook", desc: "Obsidian-compatible notes with [[links]], #tags, templates, and backlinks." },
  { icon: "📱", title: "Mobile Access", desc: "Access experiments from any device on your network. No cloud required." },
  { icon: "🔬", title: "Spectra Tools", desc: "Import NMR from MNova, view JCAMP spectra, record IR, HRMS, and GC-MS data." },
  { icon: "🔒", title: "Local & Private", desc: "SQLite database on your machine. No account, no cloud, no tracking." },
  { icon: "🌍", title: "Multilingual", desc: "中文, English, 日本語, Deutsch, Français. Five themes to choose from." },
];

const expTypes = [
  { icon: "🧪", title: "General Synthesis", desc: "Single-reaction experiments with full reagent setup, procedure steps, results, and spectra.", pro: false },
  { icon: "📊", title: "Methodology Screening", desc: "Multi-condition optimization table. Compare catalysts, ligands, solvents, temperatures.", pro: true },
  { icon: "🔗", title: "Multistep Synthesis", desc: "Multi-step routes with automatic product carry-over between steps.", pro: true },
  { icon: "🎯", title: "Substrate Scope", desc: "Full characterization with NMR, IR, HRMS, chiral HPLC. Export SI text and .docx.", pro: true },
];
