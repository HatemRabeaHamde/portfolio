"use client";

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

/** Fine-pointer enhancement from the reference; keyboard and touch keep native controls. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let raf = 0;
    let x = 0, y = 0, rx = 0, ry = 0;
    let visible = false;
    const hide = () => {
      visible = false;
      delete document.body.dataset.cursor;
      dot.style.opacity = ring.style.opacity = "0";
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const paint = () => {
      raf = 0;
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      dot.style.translate = `${x}px ${y}px`;
      ring.style.translate = `${rx}px ${ry}px`;
      if (visible && Math.abs(x - rx) + Math.abs(y - ry) > 0.1) raf = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || event.pointerType !== "mouse") return;
      x = event.clientX; y = event.clientY;
      if (!visible) { rx = x; ry = y; visible = true; }
      document.body.dataset.cursor = "true";
      dot.style.opacity = ring.style.opacity = "1";
      const target = event.target instanceof Element ? event.target : null;
      ring.dataset.kind = target?.closest('[data-cursor="view"]') ? "view" : target?.closest("a, button, input, textarea, select, summary") ? "hover" : "default";
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab") hide(); };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", keyboard);
    fine.addEventListener("change", hide);
    reduced.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", keyboard);
      fine.removeEventListener("change", hide);
      reduced.removeEventListener("change", hide);
    };
  }, []);
  return <div aria-hidden><div ref={dotRef} className={styles.dot} /><div ref={ringRef} className={styles.ring}><span>VIEW</span></div></div>;
}
