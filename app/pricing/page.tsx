export default function Pricing() {
  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 40px" }}>
      <h1 style={{ fontSize: 40, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>
        Simple pricing
      </h1>
      <p style={{ textAlign: "center", color: "#999", fontSize: 16, marginBottom: 48 }}>
        Free forever for basic use. Pro unlocks advanced features for publishing researchers.
      </p>

      {/* Tiers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 60 }}>
        {/* Free */}
        <div style={tierStyle}>
          <h3 style={{ fontSize: 20, fontWeight: 600 }}>Free</h3>
          <div style={priceStyle}>$0</div>
          <p style={{ color: "#999", fontSize: 13, marginBottom: 20 }}>Forever</p>
          <ul style={listStyle}>
            <li>General synthesis experiments</li>
            <li>Chemical database + PubChem</li>
            <li>Ketcher structure drawing</li>
            <li>Equivalents calculator</li>
            <li>PDF export (synthesis)</li>
            <li>Markdown notebook</li>
            <li>5 themes, 5 languages</li>
            <li>JSON backup/restore</li>
          </ul>
          <a href="/download" style={btnSecondary}>Download</a>
        </div>

        {/* Pro */}
        <div style={{ ...tierStyle, border: "2px solid #f5c518", position: "relative" }}>
          <div style={{
            position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
            background: "#f5c518", color: "#000", padding: "2px 12px", borderRadius: 4,
            fontSize: 11, fontWeight: 700,
          }}>MOST POPULAR</div>
          <h3 style={{ fontSize: 20, fontWeight: 600 }}>Pro</h3>
          <div style={priceStyle}>
            $29<span style={{ fontSize: 16, color: "#999" }}>/year</span>
          </div>
          <p style={{ color: "#999", fontSize: 13, marginBottom: 20 }}>
            or $3/month &middot; $79 lifetime
          </p>
          <ul style={listStyle}>
            <li>Everything in Free, plus:</li>
            <li style={highlightLi}>Screening experiments</li>
            <li style={highlightLi}>Multistep synthesis</li>
            <li style={highlightLi}>Substrate scope + SI export</li>
            <li style={highlightLi}>AI assistant (multi-provider)</li>
            <li style={highlightLi}>MNova import + JCAMP viewer</li>
            <li style={highlightLi}>GC-FID calibration curves</li>
            <li style={highlightLi}>Mobile server access</li>
            <li style={highlightLi}>MCP integration</li>
          </ul>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href="https://9077962358592.gumroad.com/l/ylkzia" style={btnPrimary}>Get Pro Annual — $29/yr</a>
            <a href="https://9077962358592.gumroad.com/l/emgyg" style={{ ...btnSecondary, fontSize: 12, padding: "8px 16px" }}>Monthly $3/mo</a>
            <a href="https://9077962358592.gumroad.com/l/muguh" style={{ ...btnSecondary, fontSize: 12, padding: "8px 16px" }}>Lifetime $79</a>
          </div>
        </div>

        {/* Lab */}
        <div style={tierStyle}>
          <h3 style={{ fontSize: 20, fontWeight: 600 }}>Lab</h3>
          <div style={priceStyle}>
            $99<span style={{ fontSize: 16, color: "#999" }}>/year</span>
          </div>
          <p style={{ color: "#999", fontSize: 13, marginBottom: 20 }}>
            5 seats &middot; 10 seats $169 &middot; 20 seats $299
          </p>
          <ul style={listStyle}>
            <li>Everything in Pro, plus:</li>
            <li style={highlightLi}>Multi-seat license (5/10/20)</li>
            <li style={highlightLi}>One key for entire lab</li>
            <li>Lab name on license</li>
            <li>Volume discount</li>
          </ul>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href="https://9077962358592.gumroad.com/l/pajmvg" style={btnSecondary}>Lab 5 — $99/yr</a>
            <a href="https://9077962358592.gumroad.com/l/tqqemu" style={{ ...btnSecondary, fontSize: 12, padding: "8px 16px" }}>Lab 10 — $169/yr</a>
            <a href="https://9077962358592.gumroad.com/l/ugubfs" style={{ ...btnSecondary, fontSize: 12, padding: "8px 16px" }}>Lab 20 — $299/yr</a>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section>
        <h2 style={{ fontSize: 28, fontWeight: 600, textAlign: "center", marginBottom: 32 }}>FAQ</h2>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          {faq.map((f, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{f.q}</h4>
              <p style={{ fontSize: 14, color: "#999", lineHeight: 1.6 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const tierStyle: React.CSSProperties = {
  padding: 28, borderRadius: 12, border: "1px solid #222", background: "#111",
  display: "flex", flexDirection: "column",
};

const priceStyle: React.CSSProperties = {
  fontSize: 40, fontWeight: 700, color: "#f5c518", margin: "12px 0 4px",
};

const listStyle: React.CSSProperties = {
  listStyle: "none", padding: 0, fontSize: 13, lineHeight: 2, flex: 1,
  color: "#ccc", marginBottom: 20,
};

const highlightLi: React.CSSProperties = { color: "#f5c518" };

const btnPrimary: React.CSSProperties = {
  display: "block", textAlign: "center", padding: "12px 24px",
  background: "#f5c518", color: "#000", borderRadius: 8,
  fontWeight: 600, fontSize: 14, textDecoration: "none",
};

const btnSecondary: React.CSSProperties = {
  display: "block", textAlign: "center", padding: "12px 24px",
  background: "transparent", color: "#f5c518", borderRadius: 8,
  fontWeight: 600, fontSize: 14, textDecoration: "none", border: "1px solid #333",
};

const faq = [
  { q: "Can I try Pro for free?", a: "The Free tier is fully functional for single-step synthesis. You can upgrade to Pro anytime when you need advanced features." },
  { q: "What happens when my license expires?", a: "Your data is always yours. Expired Pro experiments become read-only — you can view everything but can't create new Pro-type experiments until you renew." },
  { q: "Do I need an internet connection?", a: "No. Synvala works 100% offline. Internet is only needed for PubChem lookup, AI assistant, and checking for updates." },
  { q: "Can I use one license on multiple computers?", a: "Pro is for one user. For multiple computers in a lab, choose the Lab plan which supports 5, 10, or 20 seats with a single key." },
  { q: "Where is my data stored?", a: "Locally on your computer in a SQLite database. No cloud, no account, no data leaves your machine unless you choose to export it." },
  { q: "Is there a student discount?", a: "At $29/year ($2.40/month), Pro is already priced for students. Contact us for academic volume discounts." },
];
