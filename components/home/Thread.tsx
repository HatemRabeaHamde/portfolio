"use client";

import { useEffect, useRef } from "react";
import { THREAD_HERO_H, THREAD_POINTS, THREAD_W } from "./threadPath";
import styles from "./Thread.module.css";

/** A continuous ink contour, measured around the actual content rather than stretched. */
function buildPath(main: HTMLElement) {
  const origin = main.getBoundingClientRect();
  const w = main.clientWidth;
  const h = main.scrollHeight;
  const stage = Math.min(w, THREAD_W);
  const scale = stage / THREAD_W;
  const inset = (w - stage) / 2;
  const portrait = main.querySelector<HTMLElement>("[data-thread-portrait]");
  if (!portrait) return null;
  const heroBottom = portrait.getBoundingClientRect().bottom - origin.top;
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(w / 2)} -40`;
  // Keep the original portrait gesture; below it, follow live content boundaries.
  for (let i = 0; i < THREAD_POINTS.length; i += 2) {
    if (THREAD_POINTS[i + 1] > THREAD_HERO_H) break;
    d += ` L${f(inset + THREAD_POINTS[i] * scale)} ${f(THREAD_POINTS[i + 1] * heroBottom / THREAD_HERO_H)}`;
  }
  const frames = Array.from(main.querySelectorAll<HTMLElement>("[data-thread-frame]")).map((el) => {
    const box = el.getBoundingClientRect();
    return {
      top: box.top - origin.top,
      bottom: box.bottom - origin.top,
      left: Math.max(16, box.left - origin.left - 52),
      right: Math.min(w - 16, box.right - origin.left + 52),
    };
  });
  const nodes: { x: number; y: number }[] = [];
  const center = w / 2;
  if (frames.length) {
    const firstTop = frames[0].top - 30;
    const x = frames[0].left;
    // Travel down the empty outer margin before joining the first broad sweep.
    d += ` C${f(x)} ${f(heroBottom + 32)} ${f(x)} ${f(firstTop)} ${f(center)} ${f(firstTop)}`;
  }
  frames.forEach((frame, i) => {
    const previous = frames[i - 1];
    const next = frames[i + 1];
    const top = previous ? (previous.bottom + frame.top) / 2 : frame.top - 30;
    const bottom = next ? (frame.bottom + next.top) / 2 : Math.min(h - 16, frame.bottom + 36);
    const side = i % 2 === 0 ? frame.right : frame.left;
    const direction = i % 2 === 0 ? 1 : -1;
    const height = bottom - top;
    const upper = Math.min(210, height * (i % 2 === 0 ? 0.34 : 0.23));
    const lower = Math.min(180, height * (i % 2 === 0 ? 0.22 : 0.33));
    const shoulder = side - direction * Math.min(210, Math.abs(side - center) * 0.48);
    const room = Math.max(0, Math.min(side - 12, w - 12 - side));
    const bow = direction * Math.min(20, room);
    const waist = side - direction * 14;
    const middle = top + height * (i % 2 === 0 ? 0.56 : 0.44);
    const endX = center + direction * Math.min(110, w * 0.075);
    // Asymmetric shoulders and an S-shaped outer contour give each sweep its own rhythm.
    // The inset waist remains outside the measured content boundary.
    d += ` C${f(shoulder)} ${f(top)} ${f(side + bow)} ${f(top + upper * 0.24)} ${f(side)} ${f(top + upper)}`;
    const upperReach = Math.max(12, (middle - top - upper) * 0.55);
    const lowerReach = Math.max(12, (bottom - lower - middle) * 0.55);
    d += ` C${f(side)} ${f(top + upper + upperReach)} ${f(waist)} ${f(middle - upperReach)} ${f(waist)} ${f(middle)}`;
    d += ` C${f(waist)} ${f(middle + lowerReach)} ${f(side + bow)} ${f(bottom - lower - lowerReach)} ${f(side + bow)} ${f(bottom - lower)}`;
    d += ` C${f(side + bow)} ${f(bottom - lower * 0.22)} ${f(shoulder)} ${f(bottom)} ${f(endX)} ${f(bottom)}`;
    if (i < frames.length - 1) nodes.push({ x: endX, y: bottom });
  });
  return { d, w, h, nodes };
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
    const draw = () => {
      raf = 0;
      if (window.innerWidth <= 900) return;
      const res = buildPath(main);
      if (!res) return;
      svg.setAttribute("viewBox", `0 0 ${res.w} ${res.h}`);
      svg.setAttribute("width", String(res.w));
      svg.setAttribute("height", String(res.h));
      svg.querySelectorAll("path").forEach((path) => path.setAttribute("d", res.d));
      const dots = svg.querySelector("g");
      if (dots) {
        dots.replaceChildren(...res.nodes.map(({ x, y }) => {
          const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          dot.setAttribute("cx", String(x));
          dot.setAttribute("cy", String(y));
          dot.setAttribute("r", "3.4");
          return dot;
        }));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    const observeFrames = () => {
      ro.observe(main);
      main.querySelectorAll("section, [data-thread-frame]").forEach((frame) => ro.observe(frame));
    };
    observeFrames();
    const mutations = new MutationObserver((records) => {
      if (records.every((record) => el.contains(record.target))) return;
      observeFrames();
      schedule();
    });
    mutations.observe(main, { childList: true, subtree: true });
    document.fonts.ready.then(schedule);
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mutations.disconnect();
      window.removeEventListener("resize", schedule);
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
        <path stroke="white" strokeOpacity={0.56} strokeWidth={1.65} strokeLinecap="round" />
        <g fill="none" stroke="white" strokeOpacity="0.78" strokeWidth="1.35" />
      </svg>
    </div>
  );
}
