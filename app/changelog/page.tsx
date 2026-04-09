export default function ChangelogPage() {
  return (
    <main>
      <section className="changelog-hero">
        <p className="overline">Changelog</p>
        <h1>What's New</h1>
        <p className="subtitle">Every update to Synvala, documented.</p>
      </section>

      <section className="changelog-list">
        {releases.map((r, i) => (
          <article key={i} className="changelog-entry">
            <div className="changelog-meta">
              <span className="changelog-version">{r.version}</span>
              <span className="changelog-date">{r.date}</span>
              {r.tag && <span className={`changelog-tag ${r.tag}`}>{r.tag}</span>}
            </div>
            <h2>{r.title}</h2>
            <ul>
              {r.changes.map((c, j) => (
                <li key={j}>{c}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}

const releases = [
  {
    version: "v1.0.1",
    date: "2026-04-08",
    title: "Bug Fix",
    tag: "patch",
    changes: [
      "Fixed Obsidian vault open not working on some systems",
    ],
  },
  {
    version: "v1.0.0",
    date: "2026-04-07",
    title: "Synvala v1.0.0",
    tag: "major",
    changes: [
      "4 experiment types: Synthesis, Screening, Multistep, Substrate Scope",
      "AI assistant with Claude, Ollama, Google AI, and OpenAI-compatible providers",
      "Obsidian-compatible Markdown notebook with [[links]], #tags, and templates",
      "Built-in MCP server for Claude Desktop integration",
      "Interactive help manual viewer (zh-TW / English)",
      "Auto-update system for seamless version upgrades",
      "5 themes (Dark, Beige, Light, Forest, Ocean) and 5 languages",
      "Mobile access via local network (Axum HTTP server)",
      "JCAMP interactive spectra viewer",
      "SI export as .txt and .docx with proper formatting",
    ],
  },
  {
    version: "v0.2.0",
    date: "2026-03-20",
    title: "Initial Source Commit",
    tag: "minor",
    changes: [
      "Core synthesis experiment workflow",
      "PubChem search and Ketcher structure drawing",
      "Methodology screening with multi-condition table",
      "Multistep synthesis with product carry-over",
      "Substrate scope with SI text export",
      "Chemical database with auto-enrichment",
      "PDF export with reaction schemes",
      "Equivalent auto-calculation",
    ],
  },
];
