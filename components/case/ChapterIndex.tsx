"use client";

import { useEffect, useState } from "react";
import styles from "./case.module.css";

export type Chapter = { id: string; label: string };

/** Chapter index with scroll-spy. */
export default function ChapterIndex({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = chapters[0]?.id;
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = c.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [chapters]);

  return (
    <nav className={`surface-dark ${styles.chapters}`} data-surface="dark" aria-label="Case study chapters">
      <ol className={`container ${styles.chapterList}`}>
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a href={`#${c.id}`} aria-current={active === c.id ? "true" : undefined}>
              <span className={styles.chapterNo}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.chapterLabel}>{c.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
