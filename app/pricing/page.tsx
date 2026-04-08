export default function Pricing() {
  return (
    <main>
      <section className="pricing-section">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Pricing</p>
          <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 14 }}>
            Simple. Transparent.
          </h1>
          <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 460, margin: "0 auto" }}>
            Free forever for basic use. Pro unlocks everything you need to publish.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Free */}
          <div className="tier">
            <h3>Free</h3>
            <div className="tier-price">$0</div>
            <div className="tier-sub">Forever</div>
            <ul>
              <li>General synthesis experiments</li>
              <li>Chemical database + PubChem</li>
              <li>Ketcher structure drawing</li>
              <li>Equivalents calculator</li>
              <li>PDF export (synthesis)</li>
              <li>Markdown notebook</li>
              <li>5 themes, 5 languages</li>
              <li>JSON backup & restore</li>
            </ul>
            <div className="tier-actions">
              <a href="/download" className="tier-btn secondary">Download Free</a>
            </div>
          </div>

          {/* Pro */}
          <div className="tier featured">
            <div className="tier-badge">MOST POPULAR</div>
            <h3>Pro</h3>
            <div className="tier-price">$29<span>/yr</span></div>
            <div className="tier-sub">or $3/month · $79 lifetime</div>
            <ul>
              <li>Everything in Free, plus:</li>
              <li className="hl">Screening experiments</li>
              <li className="hl">Multistep synthesis</li>
              <li className="hl">Substrate scope + SI export</li>
              <li className="hl">AI assistant (multi-provider)</li>
              <li className="hl">MNova + JCAMP viewer</li>
              <li className="hl">GC-FID calibration</li>
              <li className="hl">Mobile server</li>
            </ul>
            <div className="tier-actions">
              <a href="https://9077962358592.gumroad.com/l/ylkzia" className="tier-btn primary">Get Pro — $29/yr</a>
              <a href="https://9077962358592.gumroad.com/l/emgyg" className="tier-btn secondary">Monthly $3/mo</a>
              <a href="https://9077962358592.gumroad.com/l/muguh" className="tier-btn secondary">Lifetime $79</a>
            </div>
          </div>

          {/* Lab */}
          <div className="tier">
            <h3>Lab</h3>
            <div className="tier-price">$99<span>/yr</span></div>
            <div className="tier-sub">5 seats · 10 for $169 · 20 for $299</div>
            <ul>
              <li>Everything in Pro, plus:</li>
              <li className="hl">Multi-seat license</li>
              <li className="hl">One key, entire lab</li>
              <li>Lab name on license</li>
              <li>Volume discount</li>
            </ul>
            <div className="tier-actions">
              <a href="https://9077962358592.gumroad.com/l/pajmvg" className="tier-btn secondary">Lab 5 — $99/yr</a>
              <a href="https://9077962358592.gumroad.com/l/tqqemu" className="tier-btn secondary">Lab 10 — $169/yr</a>
              <a href="https://9077962358592.gumroad.com/l/ugubfs" className="tier-btn secondary">Lab 20 — $299/yr</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-light" style={{ paddingTop: 40 }}>
        <h2 style={{ fontSize: 32 }}>Frequently asked</h2>
        <p className="section-desc" style={{ marginBottom: 40 }}>Everything you need to know.</p>
        <div className="faq">
          {faq.map((f, i) => (
            <div key={i} className="faq-item">
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activate CTA */}
      <section className="cta-dark">
        <h2>Already purchased?</h2>
        <p>Get your license key instantly.</p>
        <a href="/activate" className="btn-hero primary">Activate License</a>
      </section>
    </main>
  );
}

const faq = [
  { q: "Can I try Pro for free?", a: "The Free tier is fully functional for single-step synthesis. Upgrade when you need screening, multistep, substrate scope, or SI export." },
  { q: "What happens when my license expires?", a: "Your data is always yours. Pro experiments become read-only — you can view everything but can't create new Pro experiments until you renew." },
  { q: "Do I need internet?", a: "No. Synvala works 100% offline. Internet is only used for PubChem lookup, AI assistant, and update checks." },
  { q: "Multiple computers?", a: "Pro is for one user. For a research group, choose Lab (5, 10, or 20 seats with a single key)." },
  { q: "Where is my data?", a: "Locally on your computer in SQLite. No cloud, no account, no data ever leaves your machine." },
  { q: "How do I get my license key?", a: "After purchase, go to synvala.com/activate and enter your email. Your key is generated instantly." },
];
