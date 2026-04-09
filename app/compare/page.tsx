export default function ComparePage() {
  return (
    <main>
      <section className="compare-hero">
        <p className="overline">Compare</p>
        <h1>Why Synvala?</h1>
        <p className="subtitle">
          See how Synvala stacks up against other ways to record experiments.
        </p>
      </section>

      <section className="compare-table-section">
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-feature-col">Feature</th>
                {tools.map((t, i) => (
                  <th key={i} className={t.highlight ? "compare-hl" : ""}>
                    <span className="compare-tool-name">{t.name}</span>
                    <span className="compare-tool-type">{t.type}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, ci) => (
                <>
                  <tr key={`cat-${ci}`} className="compare-cat-row">
                    <td colSpan={tools.length + 1}>{cat.label}</td>
                  </tr>
                  {cat.rows.map((row, ri) => (
                    <tr key={`row-${ci}-${ri}`}>
                      <td className="compare-feature-cell">{row.feature}</td>
                      {row.values.map((v, vi) => (
                        <td key={vi} className={tools[vi].highlight ? "compare-hl" : ""}>
                          {v === true ? <span className="cmp-yes" /> :
                           v === false ? <span className="cmp-no" /> :
                           v === "partial" ? <span className="cmp-partial" /> :
                           <span className="cmp-text">{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="compare-summary">
        <div className="compare-summary-grid">
          {highlights.map((h, i) => (
            <div key={i} className="compare-summary-card">
              <div className="compare-summary-icon">{h.icon}</div>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-dark">
        <h2>Ready to switch?</h2>
        <p>Download Synvala and start recording experiments in minutes.</p>
        <a href="/download" className="btn-hero primary">Download Free</a>
      </section>
    </main>
  );
}

const tools = [
  { name: "Synvala", type: "Desktop App", highlight: true },
  { name: "Paper Notebook", type: "Physical" },
  { name: "Excel / Sheets", type: "Spreadsheet" },
  { name: "OneNote / Notion", type: "General Notes" },
  { name: "Commercial ELN", type: "Enterprise" },
];

const categories = [
  {
    label: "Core Chemistry",
    rows: [
      { feature: "Reaction scheme generation", values: [true, false, false, false, true] },
      { feature: "Equivalent auto-calculation", values: [true, false, "partial", false, true] },
      { feature: "PubChem integration", values: [true, false, false, false, "partial"] },
      { feature: "Structure drawing (Ketcher)", values: [true, false, false, false, true] },
      { feature: "Methodology screening table", values: [true, false, "partial", false, "partial"] },
      { feature: "Multistep synthesis", values: [true, false, false, false, "partial"] },
      { feature: "Substrate scope + SI export", values: [true, false, false, false, false] },
    ],
  },
  {
    label: "Data & Export",
    rows: [
      { feature: "PDF export", values: [true, false, false, "partial", true] },
      { feature: "SI text export (.docx)", values: [true, false, false, false, false] },
      { feature: "NMR / IR / HRMS tracking", values: [true, false, false, false, "partial"] },
      { feature: "JCAMP spectra viewer", values: [true, false, false, false, false] },
      { feature: "CSV import/export", values: [true, false, true, false, true] },
    ],
  },
  {
    label: "Productivity",
    rows: [
      { feature: "AI assistant", values: [true, false, false, false, false] },
      { feature: "Markdown notebook", values: [true, false, false, true, "partial"] },
      { feature: "Obsidian compatibility", values: [true, false, false, false, false] },
      { feature: "Chemical database", values: [true, false, false, false, true] },
      { feature: "Mobile access", values: [true, false, false, true, true] },
    ],
  },
  {
    label: "Privacy & Cost",
    rows: [
      { feature: "100% offline / local", values: [true, true, false, false, false] },
      { feature: "No account required", values: [true, true, false, false, false] },
      { feature: "Free tier", values: ["Unlimited", "N/A", true, "partial", false] },
      { feature: "Open data format (SQLite)", values: [true, false, false, false, false] },
      { feature: "Multi-language UI", values: ["5 languages", false, true, true, "partial"] },
    ],
  },
];

const highlights = [
  {
    icon: "🔬",
    title: "Built for Organic Chemistry",
    desc: "Not a generic note-taking app. Every feature was designed for synthetic chemistry workflows.",
  },
  {
    icon: "🔒",
    title: "Your Data, Your Machine",
    desc: "SQLite database on your computer. No cloud, no account, no tracking. Full data ownership.",
  },
  {
    icon: "⚡",
    title: "Zero Setup",
    desc: "Download, extract, run. No installation, no dependencies, no configuration required.",
  },
  {
    icon: "💰",
    title: "Free Where It Counts",
    desc: "Unlimited synthesis experiments forever. Pro features for screening, multistep, and substrate scope.",
  },
];
