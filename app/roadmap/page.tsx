export default function RoadmapPage() {
  return (
    <main>
      <section className="roadmap-hero">
        <p className="overline">Roadmap</p>
        <h1>What's Coming Next</h1>
        <p className="subtitle">
          Synvala is actively developed. Here's what we're working on and
          what's planned for the future.
        </p>
      </section>

      <section className="roadmap-list">
        {phases.map((phase, i) => (
          <div key={i} className="roadmap-phase">
            <div className="roadmap-phase-header">
              <span className={`roadmap-status ${phase.status}`}>
                {phase.status === "done" ? "Shipped" :
                 phase.status === "in-progress" ? "In Progress" : "Planned"}
              </span>
              <h2>{phase.title}</h2>
              <p className="roadmap-phase-desc">{phase.desc}</p>
            </div>
            <div className="roadmap-items">
              {phase.items.map((item, j) => (
                <div key={j} className={`roadmap-item ${item.done ? "done" : ""}`}>
                  <span className="roadmap-check">{item.done ? "✓" : ""}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="roadmap-cta">
        <div className="roadmap-cta-card">
          <h3>Have a feature request?</h3>
          <p>We'd love to hear what you need. Open an issue on GitHub or send us an email.</p>
          <div className="roadmap-cta-actions">
            <a href="https://github.com/Aslan0809610/synvala/issues" target="_blank" rel="noopener noreferrer" className="contact-btn">Open GitHub Issue</a>
            <a href="mailto:synvalav0@gmail.com" className="contact-btn" style={{ background: "var(--bg-muted)", color: "var(--text)" }}>Send Email</a>
          </div>
        </div>
      </section>
    </main>
  );
}

const phases = [
  {
    title: "v1.0 — Foundation",
    desc: "Core experiment workflows, database, and export.",
    status: "done",
    items: [
      { title: "4 Experiment Types", desc: "Synthesis, screening, multistep, substrate scope", done: true },
      { title: "PubChem + Ketcher Integration", desc: "Search compounds and draw structures", done: true },
      { title: "Auto Equivalent Calculation", desc: "Set a reference, all masses/volumes auto-calculate", done: true },
      { title: "PDF Export", desc: "Publication-quality PDF with reaction schemes and tables", done: true },
      { title: "SI Export (.docx)", desc: "Word file with proper sub/superscripts and formatting", done: true },
      { title: "AI Assistant", desc: "Claude, Ollama, Google AI, OpenAI-compatible providers", done: true },
      { title: "Markdown Notebook", desc: "Obsidian-compatible with [[links]], #tags, templates", done: true },
      { title: "5 Themes & 5 Languages", desc: "Dark, Beige, Light, Forest, Ocean + zh-TW, EN, JA, DE, FR", done: true },
      { title: "MCP Server", desc: "Let Claude Desktop read your experiments directly", done: true },
      { title: "Mobile Access", desc: "Local network access from any browser", done: true },
    ],
  },
  {
    title: "v1.x — Polish & Power",
    desc: "Refining existing features and adding power-user workflows.",
    status: "in-progress",
    items: [
      { title: "macOS Support", desc: "Native macOS build with Apple Silicon optimization", done: false },
      { title: "GC Calibration Curves", desc: "Internal standard calibration for accurate yield estimation", done: false },
      { title: "Batch PDF Export", desc: "Export multiple experiments or entire projects at once", done: false },
      { title: "Experiment Templates", desc: "Save and reuse reaction setups as starting points", done: false },
      { title: "Enhanced Search", desc: "Full-text search across experiments, structures, and notes", done: false },
    ],
  },
  {
    title: "Future — Expanding Horizons",
    desc: "Bigger features we're excited about exploring.",
    status: "planned",
    items: [
      { title: "Team Collaboration", desc: "Share experiments and notebooks with lab members", done: false },
      { title: "Inventory Management", desc: "Track reagent stock, locations, and expiry dates", done: false },
      { title: "Reaction Database & Analytics", desc: "Search your past reactions by substrate, catalyst, or condition", done: false },
      { title: "Linux Support", desc: "Native Linux build for university servers", done: false },
      { title: "Plugin System", desc: "Community extensions for custom workflows", done: false },
    ],
  },
];
