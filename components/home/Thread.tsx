"use client";

import { useEffect, useRef } from "react";
import { THREAD_H, THREAD_HERO_H, THREAD_POINTS, THREAD_W } from "./threadPath";
import styles from "./Thread.module.css";

/**
 * Thread — the scroll-drawn line from the design (blend: Difference).
 *
 * The original curve is mapped onto the live page: the hero part keeps the design's exact
 * proportions (so it passes behind the head), and the rest is stretched to the page's real
 * height. It is redrawn whenever the page size changes.
 */

type Pt = [number, number];

function buildPath(main: HTMLElement): { d: string; w: number; h: number } | null {
  const portrait = main.querySelector<HTMLElement>("[data-thread-portrait]");
  if (!portrait) return null;
  const origin = main.getBoundingClientRect();
  const w = main.clientWidth;
  const h = main.scrollHeight;
  const heroBottom = portrait.getBoundingClientRect().bottom - origin.top;

  // Horizontal: the 1440 design stage, centred like the hero.
  const stage = Math.min(w, THREAD_W);
  const u = stage / THREAD_W;
  const sx = (w - stage) / 2;
  // Vertical: hero at design scale, everything below stretched to the page height.
  const k = (h - heroBottom) / (THREAD_H - THREAD_HERO_H);
  const mapY = (y: number) => (y <= THREAD_HERO_H ? (y * heroBottom) / THREAD_HERO_H : heroBottom + (y - THREAD_HERO_H) * k);

  const pts: Pt[] = [[sx + THREAD_POINTS[0] * u, -40]];
  for (let i = 0; i < THREAD_POINTS.length; i += 2) {
    pts.push([sx + THREAD_POINTS[i] * u, mapY(THREAD_POINTS[i + 1])]);
  }

  // Smooth curve through the points (Catmull-Rom → cubic Bézier).
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d +=
      ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)}` +
      ` ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return { d, w, h };
}

export default function Thread() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Map the design curve onto the page.
  useEffect(() => {
    const el = ref.current;
    const svg = svgRef.current;
    const main = el?.parentElement;
    if (!el || !svg || !main) return;
    let raf = 0;
    let last = "";
    const draw = () => {
      raf = 0;
      if (window.innerWidth <= 900) return;
      const res = buildPath(main);
      if (!res) return;
      const key = `${res.w}x${res.h}`;
      if (key === last) return;
      last = key;
      svg.setAttribute("viewBox", `0 0 ${res.w} ${res.h}`);
      svg.setAttribute("width", String(res.w));
      svg.setAttribute("height", String(res.h));
      svg.querySelectorAll("path").forEach((path) => path.setAttribute("d", res.d));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(main);
    window.addEventListener("load", schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("load", schedule);
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
      <svg ref={svgRef} className={styles.svg} fill="none">
        <path className={styles.ghost} stroke="white" strokeOpacity={0.12} strokeWidth={1} />
        <path className={styles.echo} stroke="white" strokeOpacity={0.45} strokeWidth={0.8} />
        <path stroke="white" strokeWidth={1.6} strokeLinecap="round" />
      </svg>
    </div>
  );
}
