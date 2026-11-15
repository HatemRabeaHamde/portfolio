"use client";

import { useEffect, useRef } from "react";
import styles from "./Thread.module.css";

/**
 * Thread — a scroll-drawn line (blend: Difference) that is routed around the content.
 *
 * The path is computed from the live layout: it starts behind the hero portrait, then runs
 * down the side margins and only crosses from one side to the other through empty horizontal
 * gaps between blocks of text and media. It is redrawn whenever the page size changes.
 */

type Rect = { top: number; bottom: number; left: number; right: number };

const PAD = 28; // breathing room around text and media
const MIN_GAP = 72; // smallest empty band the line may cross through
const MIN_RUN = 520; // minimum vertical run between two crossings

/** Elements that count as content the line must not cross. */
function obstacles(root: HTMLElement, origin: DOMRect, from: number): Rect[] {
  const out: Rect[] = [];
  const els = root.querySelectorAll<HTMLElement>(
    "h1,h2,h3,h4,p,li,dt,dd,a,button,label,small,pre,input,textarea,select,img,video,[role=cell],[data-thread-avoid]",
  );
  els.forEach((el) => {
    if (el.closest("[data-thread-ignore]")) return;
    if (el.tagName === "IMG" && !(el as HTMLImageElement).alt && !el.hasAttribute("data-thread-avoid")) return; // decorative
    // Text: measure the words themselves, not the (often full-width) block around them.
    let r = el.getBoundingClientRect();
    if (!/^(IMG|VIDEO|INPUT|TEXTAREA|SELECT)$/.test(el.tagName) && !el.hasAttribute("data-thread-avoid")) {
      const range = document.createRange();
      range.selectNodeContents(el);
      r = range.getBoundingClientRect();
    }
    if (r.width < 2 || r.height < 2) return;
    const top = r.top - origin.top;
    if (top + r.height < from) return;
    out.push({ top, bottom: top + r.height, left: r.left - origin.left, right: r.right - origin.left });
  });
  return out;
}

/** Empty horizontal bands (no obstacle between the two lanes). */
function freeBands(rects: Rect[], from: number, to: number, xl: number, xr: number) {
  const spans = rects
    .filter((r) => r.right > xl && r.left < xr)
    .map((r) => [r.top - PAD, r.bottom + PAD] as [number, number])
    .sort((a, b) => a[0] - b[0]);
  const bands: [number, number][] = [];
  let cursor = from;
  for (const [a, b] of spans) {
    if (a > cursor && a - cursor >= MIN_GAP) bands.push([cursor, a]);
    cursor = Math.max(cursor, b);
  }
  if (to - cursor >= MIN_GAP) bands.push([cursor, to]);
  return bands;
}

function buildPath(main: HTMLElement): { d: string; w: number; h: number } | null {
  const origin = main.getBoundingClientRect();
  const w = main.clientWidth;
  const h = main.scrollHeight;
  const portrait = main.querySelector<HTMLElement>("[data-thread-portrait]");
  const content = main.querySelector<HTMLElement>(".container");
  if (!portrait || !content) return null;

  const p = portrait.getBoundingClientRect();
  const ph = p.bottom - origin.top;
  const c = content.getBoundingClientRect();
  const gutter = Math.max(14, c.left - origin.left);
  const xl = gutter / 2;
  const xr = w - gutter / 2;
  const f = (n: number) => n.toFixed(1);
  const amp = gutter >= 48 ? Math.min(gutter * 0.3, 42) : 0; // margin wave (straight when the margin is thin)
  const loopR = gutter >= 110 ? Math.min(gutter * 0.3, 48) : 0; // loops only where the margin is wide

  type Pt = [number, number];
  const pts: Pt[] = [];

  // Hero: the original curve from the design — down from the top centre, a wide swing to the
  // right behind the head, then a long sweep back to the left margin. Design units: 1440 × 920.
  const stage = Math.min(w, 1440);
  const u = stage / 1440;
  const sx = (w - stage) / 2;
  const hero: Pt[] = [
    [720, 0], [736, 70], [768, 140], [872, 210], [1022, 280], [1184, 350], [1312, 420],
    [1365, 490], [1322, 560], [1202, 630], [1028, 700], [817, 770], [591, 840], [381, 910],
  ];
  pts.push([sx + 720 * u, -40], ...hero.map(([x, y]) => [sx + x * u, y * u] as Pt));
  // behind the stack strip and into the left margin
  pts.push([Math.max(xl, sx + 217 * u), ph + 50], [xl + amp * 0.6, ph + 150]);
  const y0 = ph + 150;

  const contact = main.querySelector<HTMLElement>("section#contact");
  const projects = main.querySelector<HTMLElement>("section#projects");
  const rel = (el: HTMLElement | null | undefined) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top - origin.top, bottom: r.bottom - origin.top };
  };

  // One loop per section, near its top, inside the margin (the contact block has its own ending).
  const anchors = [...main.querySelectorAll<HTMLElement>("section[id]")]
    .filter((s) => !s.contains(portrait) && s !== contact)
    .map((s) => {
      const r = rel(s)!;
      return r.top + Math.min(360, (r.bottom - r.top) * 0.4);
    });
  const used = new Set<number>();

  /** A wavy run down one margin, curling once for every section it passes. */
  const run = (x: number, from: number, to: number, side: 1 | -1) => {
    const len = to - from;
    if (len < 160) return;
    const steps = Math.max(1, Math.round(len / 320));
    const half = len / steps / 2;
    for (let i = 1; i < steps; i++) {
      const y = from + (len * i) / steps;
      const ai = loopR ? anchors.findIndex((a, k) => !used.has(k) && Math.abs(a - y) <= half && a - from > 140 && to - a > 140) : -1;
      if (ai >= 0) {
        used.add(ai);
        const yc = anchors[ai];
        const R = loopR;
        const s = -side; // curl towards the page edge
        const at = (deg: number): Pt => {
          const t = (deg * Math.PI) / 180;
          return [x + s * R * Math.cos(t), yc + R * Math.sin(t)];
        };
        pts.push([x, yc - 2.2 * R], at(120), at(60), at(0), at(-60), at(-120), at(180), [x - s * R * 0.15, yc + 2 * R]);
        continue;
      }
      pts.push([x + amp * (i % 2 ? 1 : -1) * side, y]);
    }
  };

  /** One smooth sweep from one margin to the other, through an empty band. */
  const sweep = (xs: number, xo: number, c0: number, c1: number) => {
    pts.push([xs, c0], [(xs + xo) / 2, (c0 + c1) / 2], [xo, c1]);
  };

  const obs = obstacles(main, origin, y0);
  const bands = freeBands(obs, y0, h, xl + 6, xr - 6);

  // Where the contact block starts and ends (its text, and the footer row under it).
  const cr = rel(contact);
  const footerTop = rel(contact?.querySelector<HTMLElement>("footer"))?.top;
  const inContact = cr ? obs.filter((o) => o.top >= cr.top - 40 && (footerTop === undefined || o.bottom <= footerTop)) : [];
  const contactTextTop = inContact.length ? Math.min(...inContact.map((o) => o.top)) : null;
  const contactTextBottom = inContact.length ? Math.max(...inContact.map((o) => o.bottom)) : null;
  const bandIn = contactTextTop === null ? -1 : bands.findIndex(([, b1]) => b1 <= contactTextTop && b1 > contactTextTop - PAD - 4);
  const pr = rel(projects);

  // Below the hero: wave down a margin; between projects, switch sides after every project.
  let side = -1 as 1 | -1; // 1 = right margin, -1 = left margin
  let y = y0;
  const lane = (s: 1 | -1) => (s === 1 ? xr : xl);
  bands.forEach(([b0, b1], i) => {
    if (bandIn >= 0 && i >= bandIn) return;
    const mid = (b0 + b1) / 2;
    const betweenProjects = pr && mid > pr.top + 300 && mid < pr.bottom;
    if (mid - y < (betweenProjects ? 240 : MIN_RUN) || b1 >= h - 40) return;
    const band = b1 - b0;
    const c0 = b0 + Math.min(band * 0.12, 20);
    const c1 = b1 - Math.min(band * 0.12, 20);
    run(lane(side), y, c0 - 120, side);
    sweep(lane(side), lane(side === 1 ? -1 : 1), c0, c1);
    side = side === 1 ? -1 : 1;
    y = c1;
  });

  if (bandIn >= 0 && contactTextBottom !== null && footerTop !== undefined) {
    // Contact, as in the original design: a sweep across above the block, down the far side,
    // then a round turn back towards the centre, ending just above the footer row.
    // Always come into the footer from the right: cross above the block only when on the left.
    const [a0, a1] = bands[bandIn];
    if (side === -1) {
      run(lane(side), y, a0 - 120, side);
      sweep(lane(side), lane(1), a0 + 12, a1 - 12);
      side = 1;
    } else {
      run(lane(side), y, a0, side);
    }
    // The finish: a wide round turn out of the right margin, a glide towards the centre above the
    // footer, and a small signature curl to end on.
    const g0 = contactTextBottom + PAD;
    const g1 = footerTop - PAD * 0.6;
    const gm = (g0 + g1) / 2;
    const xf = lane(side);
    const rb = Math.max(80, Math.min(260, (xf - w / 2) * 0.55, gm - (a1 - 12) - 60)); // radius of the turn
    run(lane(side), a1 - 12, gm - rb, side);
    const turn = (deg: number): Pt => {
      const t = (deg * Math.PI) / 180;
      return [xf - rb + rb * Math.cos(t), gm - rb + rb * Math.sin(t)];
    };
    pts.push([xf, gm - rb], turn(30), turn(60), [xf - rb, gm]);
    const r = Math.max(10, Math.min(24, (g1 - g0) / 4)); // the closing curl
    const cx = w / 2 + r;
    pts.push(
      [(xf - rb + cx) / 2, gm + 4],
      [cx + r * 1.4, gm + r * 0.6],
      [cx, gm + r],
      [cx - r, gm],
      [cx, gm - r],
      [cx + r * 0.8, gm - r * 0.2],
      [cx - r * 0.4, gm + r * 0.9],
      [cx - r * 3.4, gm + r * 0.4],
    );
  } else {
    run(lane(side), y, h + 40, side);
    pts.push([lane(side), h + 40]);
  }

  // Smooth curve through the points (Catmull-Rom → cubic Bézier).
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const k = 1 / 6;
    d +=
      ` C${f(p1[0] + (p2[0] - p0[0]) * k)} ${f(p1[1] + (p2[1] - p0[1]) * k)}` +
      ` ${f(p2[0] - (p3[0] - p1[0]) * k)} ${f(p2[1] - (p3[1] - p1[1]) * k)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return { d, w, h };
}

export default function Thread() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Route the line around the content.
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
      const key = `${res.w}x${res.h}:${res.d.length}`;
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
    document.fonts?.ready.then(schedule);
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
    <div ref={ref} className={styles.thread} aria-hidden data-thread-ignore>
      <svg ref={svgRef} className={styles.svg} fill="none">
        <path className={styles.ghost} stroke="white" strokeOpacity={0.12} strokeWidth={1} />
        <path className={styles.echo} stroke="white" strokeOpacity={0.45} strokeWidth={0.8} />
        <path stroke="white" strokeWidth={1.6} strokeLinecap="round" />
      </svg>
    </div>
  );
}
