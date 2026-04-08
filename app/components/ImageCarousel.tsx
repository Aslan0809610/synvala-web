"use client";

import { useState, useEffect } from "react";

const slides = [
  { src: "/screenshot1.png", caption: "Reaction Setup — Add reagents with PubChem, draw structures, auto-calculate equivalents" },
  { src: "/screenshot2.png", caption: "Procedure — Reaction scheme with structures, step-by-step experimental records" },
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
    <div className="carousel">
      <div className="carousel-img-wrap">
        <img
          src={slides[current].src}
          alt={slides[current].caption}
          className={`carousel-img ${fade ? "fade-in" : "fade-out"}`}
        />
      </div>
      <div className="carousel-bottom">
        <p className="carousel-caption">{slides[current].caption}</p>
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
