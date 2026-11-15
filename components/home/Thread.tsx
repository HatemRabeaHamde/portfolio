"use client";

import { useEffect, useRef } from "react";
import styles from "./Thread.module.css";

type Point = [number, number];

/** The reference site's living ink thread, anchored to our actual section positions. */
export default function Thread() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    const svg = svgRef.current;
    const main = el?.parentElement;
    if (!el || !svg || !main) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const paths = Array.from(svg.querySelectorAll("path"));
    const dot = svg.querySelector("circle");
    let way: Point[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let lastPaint = -Infinity;
    let phase = 0;

    const build = () => {
      const origin = main.getBoundingClientRect().top;
      width = main.clientWidth;
      height = el.clientHeight;
      const bounds = (selector: string) => {
        const frame = main.querySelector(selector)?.getBoundingClientRect();
        return { top: (frame?.top ?? origin) - origin, height: frame?.height ?? 0 };
      };
      const hero = bounds("section:first-child");
      const about = bounds("#about");
      const projects = bounds("#projects");
      const skills = bounds("#skills");
      const experience = bounds("#experience");
      const leadership = bounds("#leadership");
      const contact = bounds("#contact");
      const gutter = Math.max(20, (width - Math.min(1120, width - 64)) / 4);
      const left = gutter;
      const right = width - gutter;
      way = [
        [width * 0.5, 0], [width * 0.5, hero.height * 0.12],
        [right, hero.height * 0.45], [left, about.top + 120],
        [left, about.top + about.height * 0.7], [right, projects.top + 80],
        [right, projects.top + projects.height * 0.45],
        [left, projects.top + projects.height * 0.75], [right, skills.top + 100],
        [left, experience.top + 60], [left, experience.top + experience.height * 0.8],
        [left, leadership.top + 40], [left, leadership.top + leadership.height - 80],
        [width * 0.5, leadership.top + leadership.height + 32],
        [right, contact.top + contact.height * 0.55], [width * 0.5, height],
      ];
      // Retain increasing anchors even when filtering collapses the project section.
      way = way.filter((point, i, points) => i === 0 || point[1] > points[i - 1][1]);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("width", String(width));
      svg.setAttribute("height", String(height));
      lastPaint = -Infinity;
    };
    const baseX = (y: number) => {
      for (let i = 0; i < way.length - 1; i++) {
        const [x0, y0] = way[i];
        const [x1, y1] = way[i + 1];
        if (y >= y0 && y <= y1) {
          const t = (y - y0) / (y1 - y0);
          return x0 + (x1 - x0) * t * t * (3 - 2 * t);
        }
      }
      return width / 2;
    };
    const xAt = (y: number, shift: number, amplitude: number, offset: number) =>
      baseX(y) + Math.sin(y / 170 + shift) * amplitude + Math.sin(y / 53 + shift * 1.7) * amplitude * 0.18 + offset;
    const paint = (now: number) => {
      raf = 0;
      if (width > 900 && !document.hidden && now - lastPaint >= 32) {
        lastPaint = now;
        phase = reduced.matches ? 0 : now / 1000 * 0.9;
        const strands = [[phase * 0.6, 36, 0], [phase + 1.4, 22, 6], [phase, 28, 0]];
        paths.forEach((path, i) => {
          const [shift, amplitude, offset] = strands[i];
          const commands: string[] = [];
          for (let y = 0; y <= height; y += 18) {
            commands.push(`${y ? "L" : "M"}${xAt(y, shift, amplitude, offset).toFixed(1)} ${y}`);
          }
          commands.push(`L${xAt(height, shift, amplitude, offset).toFixed(1)} ${height}`);
          path.setAttribute("d", commands.join(" "));
        });
        const drawnTo = Math.max(0, Math.min(height, window.innerHeight * 0.8 - el.getBoundingClientRect().top));
        el.style.setProperty("--drawn", `${height ? (1 - drawnTo / height) * 100 : 100}%`);
        dot?.setAttribute("cx", String(xAt(drawnTo, phase, 28, 0)));
        dot?.setAttribute("cy", String(drawnTo - 2));
      }
      if (!reduced.matches && width > 900) raf = requestAnimationFrame(paint);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const resize = () => { build(); schedule(); };
    const observer = new ResizeObserver(resize);
    observer.observe(main);
    main.querySelectorAll("section").forEach((section) => observer.observe(section));
    document.fonts.ready.then(resize);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", schedule, { passive: true });
    reduced.addEventListener("change", resize);
    resize();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", schedule);
      reduced.removeEventListener("change", resize);
    };
  }, []);

  return (
    <div ref={ref} className={styles.thread} aria-hidden>
      <svg ref={svgRef} className={styles.svg} fill="none" stroke="white" strokeLinecap="round">
        <path strokeWidth="1" strokeOpacity="0.08" />
        <path strokeWidth="0.8" strokeOpacity="0.45" />
        <path strokeWidth="1.6" />
        <circle r="3" fill="white" stroke="none" />
      </svg>
    </div>
  );
}
