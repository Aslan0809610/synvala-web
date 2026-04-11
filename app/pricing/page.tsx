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

        {/* Individual tiers */}
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

          {/* Pro Annual */}
          <div className="tier featured">
            <div className="tier-badge">MOST POPULAR</div>
            <h3>Pro</h3>
            <div className="tier-price">$39<span>/yr</span></div>
            <div className="tier-sub">Renews annually · cancel anytime</div>
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
              <button className="tier-btn primary" disabled style={{ opacity: 0.55, cursor: "not-allowed" }}>Coming Soon</button>
            </div>
          </div>

          {/* Pro Lifetime */}
          <div className="tier">
            <h3>Pro Lifetime</h3>
            <div className="tier-price">$129</div>
            <div className="tier-sub">One-time payment · forever yours</div>
            <ul>
              <li>All Pro features</li>
              <li className="hl">Pay once, use forever</li>
              <li className="hl">All future updates included</li>
              <li>No subscription</li>
              <li>Activate within 30 days</li>
            </ul>
            <div className="tier-actions">
              <button className="tier-btn secondary" disabled style={{ opacity: 0.55, cursor: "not-allowed" }}>Coming Soon</button>
            </div>
          </div>
        </div>

        {/* Lab tiers */}
        <div style={{ marginTop: 64, textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>For Research Groups</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 15, marginTop: 6 }}>
            One key, entire lab. Includes Pro features for every member.
          </p>
        </div>
        <div className="pricing-grid">
          <div className="tier">
            <h3>Lab 5</h3>
            <div className="tier-price">$199<span>/yr</span></div>
            <div className="tier-sub">5 seats · $40/seat</div>
            <ul>
              <li>All Pro features × 5 users</li>
              <li className="hl">One key, entire lab</li>
              <li>Lab name on license</li>
              <li>Annual renewal</li>
            </ul>
            <div className="tier-actions">
              <button className="tier-btn secondary" disabled style={{ opacity: 0.55, cursor: "not-allowed" }}>Coming Soon</button>
            </div>
          </div>

          <div className="tier featured">
            <div className="tier-badge">BEST VALUE</div>
            <h3>Lab 10</h3>
            <div className="tier-price">$349<span>/yr</span></div>
            <div className="tier-sub">10 seats · $35/seat</div>
            <ul>
              <li>All Pro features × 10 users</li>
              <li className="hl">One key, entire lab</li>
              <li>Lab name on license</li>
              <li>Annual renewal</li>
            </ul>
            <div className="tier-actions">
              <button className="tier-btn primary" disabled style={{ opacity: 0.55, cursor: "not-allowed" }}>Coming Soon</button>
            </div>
          </div>

          <div className="tier">
            <h3>Lab 20</h3>
            <div className="tier-price">$549<span>/yr</span></div>
            <div className="tier-sub">20 seats · $27/seat</div>
            <ul>
              <li>All Pro features × 20 users</li>
              <li className="hl">One key, entire lab</li>
              <li>Lab name on license</li>
              <li>Annual renewal</li>
            </ul>
            <div className="tier-actions">
              <button className="tier-btn secondary" disabled style={{ opacity: 0.55, cursor: "not-allowed" }}>Coming Soon</button>
            </div>
          </div>
        </div>

        {/* Site License */}
        <div className="site-license-section">
          <div className="site-license-card">
            <div className="site-license-content">
              <p className="overline-mini">Enterprise</p>
              <h3>Site License</h3>
              <p className="site-license-desc">
                Unlimited seats for an entire department, institution, or company.
                Custom terms, priority support, and online verification with revocation control.
              </p>
              <ul className="site-license-features">
                <li>✓ Unlimited users</li>
                <li>✓ Online verification + revocation</li>
                <li>✓ Custom branding & support</li>
                <li>✓ Volume invoicing</li>
              </ul>
            </div>
            <div className="site-license-cta">
              <div className="site-license-price">$1,500<span>+ /yr</span></div>
              <p className="site-license-contact">Contact for details</p>
              <a href="mailto:synvalav0@gmail.com?subject=Site%20License%20Inquiry" className="tier-btn primary">
                Get in Touch
              </a>
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

      {/* Coming soon notice */}
      <section className="cta-dark">
        <h2>Pro / Lab purchasing temporarily paused</h2>
        <p>We're refining the licensing system. Free tier remains fully available.</p>
        <a href="/download" className="btn-hero primary">Download Free</a>
      </section>
    </main>
  );
}

const faq = [
  { q: "Can I try Pro for free?", a: "The Free tier is fully functional for single-step synthesis. Upgrade when you need screening, multistep, substrate scope, or SI export." },
  { q: "Annual vs Lifetime?", a: "Annual ($39/yr) is best if you want the latest features and aren't sure if you'll use Synvala long-term. Lifetime ($129) pays for itself in just over 3 years and includes all future updates." },
  { q: "What happens when my Pro license expires?", a: "Your data is always yours. Pro experiments become read-only — you can view everything but can't create new Pro experiments until you renew. Lifetime never expires." },
  { q: "Do I need internet?", a: "No. Synvala works 100% offline. Internet is only used for PubChem lookup, AI assistant, and update checks." },
  { q: "Multiple computers?", a: "Pro is for one user across their devices. For a research group, choose Lab (5, 10, or 20 seats with a single key)." },
  { q: "Where is my data?", a: "Locally on your computer in SQLite. No cloud, no account, no data ever leaves your machine." },
  { q: "How do I get my license key?", a: "After purchase, go to synvala.com/activate and enter your email. Your key is generated instantly." },
  { q: "What's a Site License?", a: "Unlimited seats for an entire department, institution, or company — ideal for chemistry departments or pharma R&D teams. Contact us for a quote." },
];
