"use client";

import { useEffect, useRef } from "react";
import { THREAD_POINTS } from "./threadPath";
import styles from "./Thread.module.css";

/** The original three-strand Figma artwork, revealed as the visitor scrolls. */
export default function Thread() {
  const ref = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLImageElement>(null);
  const detourRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    const artwork = artworkRef.current;
    const main = el?.parentElement;
    if (!el || !artwork || !main) return;
    const overlay = detourRef.current;
    let sourcePaths: SVGPathElement[] = [];
    let disposed = false;
    let raf = 0;
    const resize = () => {
      raf = 0;
      // Keep the exported SVG at its native dimensions; scale its presentation only.
      const width = main.clientWidth;
      const height = el.clientHeight;
      artwork.style.transform = `scale(${width / 1440}, ${height / 8081})`;
      const section = main.querySelector<HTMLElement>("#leadership");
      const content = section?.firstElementChild;
      if (!section || !content || !overlay || !sourcePaths.length) return;
      const origin = main.getBoundingClientRect();
      const bounds = section.getBoundingClientRect();
      const cards = content.getBoundingClientRect();
      const sectionTop = bounds.top - origin.top;
      const endY = Math.min(height - 1, bounds.bottom - origin.top + 28);
      let startY = Math.max(0, sectionTop - 70);
      // Begin at the last left-hand turn, so the detour never cuts across the cards.
      for (let i = 2; i < THREAD_POINTS.length - 2; i += 2) {
        const y = THREAD_POINTS[i + 1] * height / 8081;
        if (y > sectionTop - 30) break;
        if (THREAD_POINTS[i] <= THREAD_POINTS[i - 2] && THREAD_POINTS[i] < THREAD_POINTS[i + 2]) startY = y;
      }
      const gutter = Math.max(16, cards.left - origin.left - 48);
      const floor = endY - 8;
      artwork.style.maskImage = `linear-gradient(to bottom, black 0px, black ${startY * 8081 / height}px, transparent ${startY * 8081 / height}px, transparent ${endY * 8081 / height}px, black ${endY * 8081 / height}px)`;
      overlay.setAttribute("viewBox", `0 0 ${width} ${height}`);
      overlay.setAttribute("width", String(width));
      overlay.setAttribute("height", String(height));
      const pointAtY = (path: SVGPathElement, y: number) => {
        let low = 0;
        let high = path.getTotalLength();
        for (let i = 0; i < 32; i++) {
          const mid = (low + high) / 2;
          if (path.getPointAtLength(mid).y * height / 8081 < y) low = mid;
          else high = mid;
        }
        const point = path.getPointAtLength((low + high) / 2);
        return { x: point.x * width / 1440, y: point.y * height / 8081 };
      };
      overlay.replaceChildren(...sourcePaths.map((source, i) => {
        const start = pointAtY(source, startY);
        const end = pointAtY(source, endY);
        const side = gutter + (i - 2) * 5;
        const baseline = floor + (i - 2) * 4;
        const turn = Math.min(180, (endY - startY) * 0.25);
        const path = source.cloneNode(false) as SVGPathElement;
        path.removeAttribute("id");
        path.setAttribute("fill", "none");
        path.setAttribute("d", `M${start.x} ${start.y} C${start.x} ${startY + 70} ${side} ${sectionTop - 40} ${side} ${sectionTop + 80} C${side} ${sectionTop + 200} ${side - 10} ${baseline - turn} ${side + 32} ${baseline - turn * 0.5} C${side + 92} ${baseline + 24} ${end.x - 110} ${baseline} ${end.x} ${end.y}`);
        return path;
      }));

    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(resize);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(main);
    const leadership = main.querySelector("#leadership");
    if (leadership) observer.observe(leadership);
    const abort = new AbortController();
    fetch("/icons/scroll-thread-figma.svg", { signal: abort.signal })
      .then((response) => response.text())
      .then((source) => {
        if (disposed) return;
        const document = new DOMParser().parseFromString(source, "image/svg+xml");
        sourcePaths = Array.from(document.querySelectorAll<SVGPathElement>("path"));
        schedule();
      })
      .catch(() => { /* Keep the original artwork if the detour cannot load. */ });
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      abort.abort();
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
      <svg ref={detourRef} className={styles.detour} fill="none" />
    </div>
  );
}
