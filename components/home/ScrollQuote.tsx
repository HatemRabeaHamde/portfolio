"use client";

import { useEffect, useRef } from "react";

export default function ScrollQuote({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll("span"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const paint = () => {
      raf = 0;
      const progress = Math.max(0, Math.min(1, (innerHeight * 0.85 - el.getBoundingClientRect().top) / (innerHeight * 0.6)));
      words.forEach((word, i) => { word.style.opacity = reduced.matches || i / words.length < progress ? "1" : "0.12"; });
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return <p ref={ref} aria-label={text}>{text.split(" ").map((word, i) => <span key={i} aria-hidden style={{ transition: "opacity 0.4s" }}>{word}{" "}</span>)}</p>;
}
