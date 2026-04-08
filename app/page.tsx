export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section style={{
        padding: "100px 40px 80px", textAlign: "center", maxWidth: 900, margin: "0 auto",
      }}>
        <h1 style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px" }}>
          The lab notebook<br />
          <span style={{ color: "#f5c518" }}>organic chemists</span> deserve
        </h1>
        <p style={{ fontSize: 20, color: "#999", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6 }}>
          Plan reactions, screen conditions, track substrate scope, and export publication-ready SI — all in one desktop app.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/download" style={{
            padding: "14px 32px", background: "#f5c518", color: "#000", borderRadius: 8,
            fontWeight: 600, fontSize: 16, textDecoration: "none",
          }}>
            Download Free
          </a>
          <a href="/pricing" style={{
            padding: "14px 32px", background: "transparent", color: "#f5c518", borderRadius: 8,
            fontWeight: 600, fontSize: 16, textDecoration: "none", border: "1px solid #f5c518",
          }}>
            View Pricing
          </a>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: "#666" }}>
          Windows &amp; macOS &middot; No account required &middot; Your data stays local
        </p>
      </section>

      {/* Features */}
      <section style={{ padding: "60px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 36, textAlign: "center", marginBottom: 48, fontWeight: 600 }}>
          Everything you need, nothing you don't
        </h2>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              padding: 28, borderRadius: 12, border: "1px solid #222", background: "#111",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#999", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experiment Types */}
      <section style={{ padding: "60px 40px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 36, textAlign: "center", marginBottom: 16, fontWeight: 600 }}>
          4 experiment types
        </h2>
        <p style={{ textAlign: "center", color: "#999", marginBottom: 40, fontSize: 16 }}>
          Each designed for a specific organic chemistry workflow
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {expTypes.map((e, i) => (
            <div key={i} style={{
              padding: 24, borderRadius: 12, border: "1px solid #222", background: "#111",
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{e.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{e.title}</h3>
              <p style={{ fontSize: 13, color: "#999", lineHeight: 1.5 }}>{e.desc}</p>
              {e.pro && <span style={{
                display: "inline-block", marginTop: 8, padding: "2px 8px",
                background: "rgba(245,197,24,0.15)", color: "#f5c518",
                borderRadius: 4, fontSize: 11, fontWeight: 600,
              }}>PRO</span>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "80px 40px", textAlign: "center",
        background: "linear-gradient(180deg, transparent, rgba(245,197,24,0.05))",
      }}>
        <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 16 }}>
          Start recording experiments today
        </h2>
        <p style={{ color: "#999", marginBottom: 32, fontSize: 16 }}>
          Free forever for single-step synthesis. Upgrade when you're ready to publish.
        </p>
        <a href="/download" style={{
          padding: "14px 40px", background: "#f5c518", color: "#000", borderRadius: 8,
          fontWeight: 600, fontSize: 16, textDecoration: "none",
        }}>
          Download Synvala
        </a>
      </section>
    </main>
  );
}

const features = [
  { icon: "🧪", title: "Reaction Setup", desc: "Add reagents with PubChem lookup, draw structures with Ketcher, auto-calculate equivalents and masses." },
  { icon: "📊", title: "Methodology Screening", desc: "Compare conditions side-by-side in a spreadsheet-like table. Track yields, selectivity, and find optimal conditions." },
  { icon: "🎯", title: "Substrate Scope & SI Export", desc: "Record full characterization data and export publication-ready SI text or Word documents with proper formatting." },
  { icon: "🤖", title: "AI Assistant", desc: "Built-in AI chat with Claude, Ollama, Google AI, or OpenAI. Plan experiments by voice or text." },
  { icon: "📓", title: "Markdown Notebook", desc: "Obsidian-compatible notes with [[links]], #tags, templates, and daily journal. Your notes, your files." },
  { icon: "📱", title: "Mobile Access", desc: "Access your experiments from any phone or tablet on the same network. No cloud required." },
  { icon: "🔬", title: "Spectra & NMR Import", desc: "Import NMR data from MNova, view JCAMP spectra interactively, record IR/HRMS/GC-MS." },
  { icon: "🔒", title: "Local & Private", desc: "All data stored locally on your computer. No account, no cloud, no subscription required for basic use." },
  { icon: "🌍", title: "5 Languages", desc: "Traditional Chinese, English, Japanese, German, and French. With 5 beautiful themes." },
];

const expTypes = [
  { icon: "🧪", title: "General Synthesis", desc: "Single-reaction experiments with full reagent setup, procedure steps, and results tracking.", pro: false },
  { icon: "📊", title: "Methodology Screening", desc: "Multi-condition optimization table. Compare catalysts, ligands, solvents, temperatures side-by-side.", pro: true },
  { icon: "🔗", title: "Multistep Synthesis", desc: "Plan and record multi-step routes. Products carry over between steps automatically.", pro: true },
  { icon: "🎯", title: "Substrate Scope", desc: "Full characterization with NMR, IR, HRMS, HPLC. Export SI text and Word documents.", pro: true },
];
