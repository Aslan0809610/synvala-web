"use client";

import { useState, useEffect, useCallback } from "react";

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i !== null ? (i - 1 + items.length) % items.length : null)), []);
  const next = useCallback(() => setLightbox((i) => (i !== null ? (i + 1) % items.length : null)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, close, prev, next]);

  return (
    <main>
      <section className="gallery-hero">
        <p className="overline">Gallery</p>
        <h1>See Synvala in Action</h1>
        <p className="subtitle">
          Screenshots and demos from the actual app. Click any image to enlarge.
        </p>
      </section>

      {/* Demo Video */}
      <section className="gallery-demo-section">
        <div className="gallery-demo-wrap">
          <video src="/gallery-demo.mp4" autoPlay loop muted playsInline controls />
        </div>
        <p className="gallery-demo-caption">
          Quick walkthrough — reaction setup, PubChem search, structure drawing, and auto-calculation
        </p>
      </section>

      {/* Screenshot Grid */}
      <section className="gallery-grid-section">
        <div className="gallery-grid">
          {items.map((item, i) => (
            <div
              key={i}
              className="gallery-card"
              onClick={() => setLightbox(i)}
            >
              <div className="gallery-card-img">
                <img src={item.src} alt={item.caption} loading="lazy" />
              </div>
              <div className="gallery-card-info">
                <span className="gallery-card-tag">{item.tag}</span>
                <p>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-dark">
        <h2>Want to try it yourself?</h2>
        <p>Download Synvala and start recording experiments in minutes.</p>
        <a href="/download" className="btn-hero primary">Download Free</a>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={close}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={close}>&times;</button>
            <button className="lightbox-arrow lightbox-prev" onClick={prev}>&lsaquo;</button>
            <img src={items[lightbox].src} alt={items[lightbox].caption} />
            <button className="lightbox-arrow lightbox-next" onClick={next}>&rsaquo;</button>
            <div className="lightbox-caption">
              <span className="gallery-card-tag">{items[lightbox].tag}</span>
              <p>{items[lightbox].caption}</p>
              <span className="lightbox-counter">{lightbox + 1} / {items.length}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const items = [
  {
    src: "/screenshot1.png",
    caption: "Ketcher structure drawing with auto-calculated mass, volume, and equivalents across multiple reaction steps",
    tag: "Multistep Synthesis",
  },
  {
    src: "/gallery-reaction.png",
    caption: "Auto-generated reaction scheme from your reagents, with step-by-step procedure recording below",
    tag: "Reaction Scheme",
  },
  {
    src: "/gallery-database.png",
    caption: "Browse your compound library with structure cards, tag filtering, and one-click PubChem import",
    tag: "Chemical Database",
  },
  {
    src: "/screenshot2.png",
    caption: "Publication-quality PDF with reaction schemes, reagent tables, procedures, and spectra data",
    tag: "PDF Export",
  },
  {
    src: "/gallery-notebook.png",
    caption: "Obsidian-compatible Markdown with live preview, [[experiment links]], and embedded data cards",
    tag: "Notebook",
  },
  {
    src: "/gallery-settings.png",
    caption: "5 color themes and 5 languages, plus configurable equivalents shortcuts and one-click backup",
    tag: "Themes & Languages",
  },
  {
    src: "/gallery-mobile.png",
    caption: "Open experiments from any phone or tablet on your network, with QR code for instant connection",
    tag: "Mobile Access",
  },
];
