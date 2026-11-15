"use client";

import { useEffect, useState } from "react";
import styles from "./Loader.module.css";

const KEY = "hr-intro-seen";
/** Runs before first paint so returning visitors (same tab session) never see the intro. */
const PRE_PAINT = `try{if(sessionStorage.getItem("${KEY}"))document.documentElement.dataset.introSeen="1"}catch(e){}`;

/**
 * 15 — Loading: monogram draws in → fills → counter 000→100 → screen slides up.
 * Shown once per browser session.
 */
export default function Loader() {
  const [phase, setPhase] = useState<"run" | "exit" | "done">("run");
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Already seen this session: CSS keeps the overlay hidden (see PRE_PAINT).
    if (document.documentElement.dataset.introSeen) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 300 : 2200;
    const start = performance.now();
    let raf = 0;
    let exitTimer = 0;
    let doneTimer = 0;

    document.documentElement.style.overflow = "hidden";
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        exitTimer = window.setTimeout(() => {
          setPhase("exit");
          document.documentElement.style.overflow = "";
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          doneTimer = window.setTimeout(() => setPhase("done"), reduce ? 50 : 900);
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PRE_PAINT }}
      />
      {phase !== "done" && (
        <div className={styles.loader} data-phase={phase} role="status" aria-label="Loading">
          <p className={styles.note}>
            Monogram stroke draws in (≈1.6s) → fills → counter 000→100 → screen slides up
          </p>
          <div className={styles.center}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/monogram-light.svg"
              alt=""
              width={186.642}
              height={130}
              className={styles.mark}
              style={{
                // Draws in over the first ~70% of the count, then fills to full opacity.
                clipPath: `inset(0 ${Math.max(0, 100 - (count / 70) * 100)}% 0 0)`,
                opacity: 0.25 + 0.75 * Math.min(1, count / 100),
              }}
            />
            <div className={styles.track}>
              <span className={styles.bar} style={{ transform: `scaleX(${count / 100})` }} />
            </div>
          </div>
          <p className={styles.footLeft}>HATEM RABEA — SENIOR FULL-STACK DEVELOPER</p>
          <p className={styles.counter} aria-hidden>
            {String(count).padStart(3, "0")}
          </p>
        </div>
      )}
    </>
  );
}
