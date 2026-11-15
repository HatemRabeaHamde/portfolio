"use client";

import { useEffect, useRef } from "react";
import styles from "./Thread.module.css";

/** The original three-strand Figma artwork, revealed as the visitor scrolls. */
export default function Thread() {
  const ref = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    const artwork = artworkRef.current;
    const main = el?.parentElement;
    if (!el || !artwork || !main) return;
    let raf = 0;
    const resize = () => {
      raf = 0;
      // Keep the exported SVG at its native dimensions; scale its presentation only.
      const width = main.clientWidth;
      const height = el.clientHeight;
      artwork.style.transform = `scale(${width / 1440}, ${height / 8081})`;

    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(resize);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(main);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  // Reveal the line top-to-bottom as the page scrolls, a little ahead of the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const drawnTo = window.innerHeight * 0.85 - rect.top;
      const pct = Math.max(0, Math.min(1, drawnTo / rect.height));
      el.style.setProperty("--drawn", `${(1 - pct) * 100}%`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={styles.thread} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={artworkRef}
        className={styles.artwork}
        src="/icons/scroll-thread-figma.svg"
        alt=""
        width={1440}
        height={8081}
        draggable={false}
      />
    </div>
  );
}
