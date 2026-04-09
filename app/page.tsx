import ImageCarousel from "./components/ImageCarousel";

export default function Home() {
  return (
    <main>
      {/* ===== Hero (Apple-style dark) ===== */}
      <section className="hero-dark">
        <p className="overline">Synvala</p>
        <h1>The lab notebook for organic chemistry.</h1>
        <p className="subtitle">
          Plan reactions. Screen conditions. Export publication-ready SI.
          All in one desktop app — your data never leaves your computer.
        </p>
        <div className="hero-actions">
          <a href="/download" className="btn-hero primary">Download Free</a>
          <a href="/pricing" className="btn-hero outline">See Pricing</a>
        </div>
        <p className="hero-note">
          Windows & macOS · No account · No cloud · 100% offline
        </p>
      </section>

      {/* ===== Product Screenshot ===== */}
      <section className="showcase">
        <div className="showcase-img-wrap">
          <ImageCarousel />
        </div>
      </section>

      {/* ===== Stats ===== */}
      <div className="stats-bar">
        <div className="stat">
          <div className="stat-num">4</div>
          <div className="stat-label">Experiment Types</div>
        </div>
        <div className="stat">
          <div className="stat-num">5</div>
          <div className="stat-label">Languages</div>
        </div>
        <div className="stat">
          <div className="stat-num">0</div>
          <div className="stat-label">Cloud Dependencies</div>
        </div>
        <div className="stat">
          <div className="stat-num">&infin;</div>
          <div className="stat-label">Experiments (Free)</div>
        </div>
      </div>

      {/* ===== Feature: Reaction Setup ===== */}
      <div className="feature-row">
        <div className="feature-text">
          <p className="overline">Reaction Setup</p>
          <h3>Every reagent, calculated.</h3>
          <p>
            Search PubChem by name. Draw structures with Ketcher.
            Set one reference and watch every mass, volume, and equivalent
            auto-calculate across your entire reaction.
          </p>
        </div>
        <div className="feature-visual">
          <img src="/screenshot1.png" alt="Reaction setup with PubChem and structure drawing" />
        </div>
      </div>

      {/* ===== Feature: Procedure ===== */}
      <div className="feature-row reverse">
        <div className="feature-text">
          <p className="overline">Procedure</p>
          <h3>From scheme to write-up.</h3>
          <p>
            A reaction scheme is generated automatically from your reagents.
            Record step-by-step procedures with time, temperature, and observations.
            Everything flows into your PDF and SI export.
          </p>
        </div>
        <div className="feature-visual">
          <img src="/screenshot2.png" alt="Reaction scheme and experimental procedure" />
        </div>
      </div>

      {/* ===== 4 Experiment Types ===== */}
      <section className="exp-section">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Four Experiment Types</p>
          <h2 style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1 }}>
            One app for every workflow.
          </h2>
        </div>
        <div className="exp-grid-4">
          {expTypes.map((e, i) => (
            <div key={i} className="exp-card-v2">
              <div className="exp-icon">{e.icon}</div>
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
              {e.pro && <span className="badge-pro-v2">PRO</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== More Features (light section) ===== */}
      <section className="section-light">
        <p className="overline">And everything else</p>
        <h2>Built for real lab work.</h2>
        <p className="section-desc">
          Not another generic note-taking app. Every feature was designed
          with organic chemistry workflows in mind.
        </p>
        <div className="exp-grid-4" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {features.map((f, i) => (
            <div key={i} className="exp-card-v2">
              <div className="exp-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Contact & Bug Report ===== */}
      <section className="contact-section">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="overline">Support</p>
          <h2>We'd love to hear from you.</h2>
          <p className="section-desc">Questions, feedback, or found a bug? Reach out anytime.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">✉️</div>
            <h3>Get in Touch</h3>
            <p>Have a question or feature request? Send us an email and we'll get back to you.</p>
            <a href="mailto:jjj3789tw@gmail.com" className="contact-btn">jjj3789tw@gmail.com</a>
          </div>
          <div className="contact-card">
            <div className="contact-icon">🐛</div>
            <h3>Report a Bug</h3>
            <p>Found something broken? Open an issue on GitHub with steps to reproduce.</p>
            <a href="https://github.com/Aslan0809610/synvala/issues" target="_blank" rel="noopener noreferrer" className="contact-btn">Open GitHub Issue</a>
          </div>
        </div>
      </section>

      {/* ===== CTA (dark) ===== */}
      <section className="cta-dark">
        <h2>Start recording experiments today.</h2>
        <p>Free forever for synthesis. Upgrade when you're ready to publish.</p>
        <a href="/download" className="btn-hero primary">Download Synvala</a>
      </section>
    </main>
  );
}

const expTypes = [
  { icon: "🧪", title: "Synthesis", desc: "Single-reaction experiments with full reagent setup, procedures, results, and spectra.", pro: false },
  { icon: "📊", title: "Screening", desc: "Multi-condition optimization. Compare catalysts, ligands, solvents side-by-side.", pro: true },
  { icon: "🔗", title: "Multistep", desc: "Multi-step routes with automatic product carry-over between steps.", pro: true },
  { icon: "🎯", title: "Substrate Scope", desc: "Full characterization + SI export as formatted text or Word document.", pro: true },
];

const features = [
  { icon: "🤖", title: "AI Assistant", desc: "Chat with Claude, Ollama, Google AI. Plan experiments by voice or text." },
  { icon: "📓", title: "Notebook", desc: "Obsidian-compatible Markdown notes with [[links]], #tags, and templates." },
  { icon: "🔬", title: "Spectra", desc: "NMR, IR, HRMS, GC-MS. Import from MNova. Interactive JCAMP viewer." },
  { icon: "📱", title: "Mobile Access", desc: "Access experiments from any device on your network. No cloud." },
  { icon: "📄", title: "PDF Export", desc: "Publication-quality PDF with reaction schemes, tables, and spectra." },
  { icon: "🔒", title: "Local & Private", desc: "SQLite on your machine. No account. No tracking. No data leaves." },
  { icon: "🌍", title: "5 Languages", desc: "中文, English, 日本語, Deutsch, Français. Five beautiful themes." },
  { icon: "⚡", title: "MCP Server", desc: "Let Claude Desktop read your experiments and notes directly." },
];
