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

      {/* Demo GIF */}
      <section className="gallery-demo-section">
        <div className="gallery-demo-wrap">
          <img src="/gallery-demo.gif" alt="Synvala demo recording" />
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
    src: "/gallery-reaction.png",
    caption: "Reaction scheme with structure drawing, auto-calculated equivalents, and step-by-step procedure",
    tag: "Reaction Setup",
  },
  {
    src: "/gallery-database.png",
    caption: "Chemical database with structure cards, tag filtering, and PubChem integration",
    tag: "Chemical Database",
  },
  {
    src: "/gallery-notebook.png",
    caption: "Markdown notebook with live preview, experiment embeds, and Obsidian-compatible [[links]]",
    tag: "Notebook",
  },
  {
    src: "/gallery-settings.png",
    caption: "5 beautiful themes and 5 languages, with backup/restore and equivalents shortcuts",
    tag: "Settings",
  },
  {
    src: "/gallery-mobile.png",
    caption: "Access experiments from any phone on your network — plus license activation and QR code",
    tag: "Mobile Access",
  },
];
