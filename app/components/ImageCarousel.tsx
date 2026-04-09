"use client";

import { useState, useEffect } from "react";

const slides = [
  { src: "/screenshot1.png", caption: "Multistep Synthesis — Ketcher structure drawing with auto-calculated mass, volume, and equivalents across multiple steps" },
  { src: "/gallery-reaction.png", caption: "Reaction Scheme — Auto-generated scheme from your reagents, with step-by-step procedure recording" },
  { src: "/gallery-database.png", caption: "Chemical Database — Browse your compound library with structure cards, tag filtering, and one-click PubChem import" },
  { src: "/screenshot2.png", caption: "PDF Export — Publication-quality output with reaction schemes, reagent tables, procedures, and spectra" },
  { src: "/gallery-notebook.png", caption: "Notebook — Obsidian-compatible Markdown with live preview, [[experiment links]], and embedded data cards" },
  { src: "/gallery-settings.png", caption: "Themes & Languages — 5 color themes and 5 languages, plus configurable shortcuts and one-click backup" },
  { src: "/gallery-mobile.png", caption: "Mobile Access — Open experiments from any phone or tablet on your network, with QR code for instant connection" },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    if (index === current) return;
    setFade(false);
    setTimeout(() => {
      setCurrent(index);
      setFade(true);
    }, 200);
  };

  return (
    <div>
      <div style={{ position: "relative", overflow: "hidden", background: "#111" }}>
        <img
          src={slides[current].src}
          alt={slides[current].caption}
          style={{
            width: "100%", display: "block",
            opacity: fade ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 20px",
        background: "rgba(0,0,0,0.85)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <p style={{ fontSize: 12, color: "#a1a1a6" }}>{slides[current].caption}</p>
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? 20 : 8, height: 8,
                borderRadius: 4, border: "none", cursor: "pointer",
                background: i === current ? "#b45309" : "#424245",
                transition: "all 0.2s", padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
