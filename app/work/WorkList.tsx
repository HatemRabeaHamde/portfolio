"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Glow } from "@/components/ui";
import { projects, projectCount, projectHref, projectNo, type Category } from "@/lib/projects";
import styles from "./work.module.css";

const filters: { label: string; value: Category | "all" }[] = [
  { label: `All · ${projectCount}`, value: "all" },
  { label: "SaaS & AI", value: "saas" },
  { label: "Social", value: "social" },
  { label: "Commerce", value: "commerce" },
  { label: "Marketplaces", value: "marketplace" },
  { label: "Payments", value: "payments" },
  { label: "Creative", value: "creative" },
];

const previewStrip = ["saedni", "machine-rental", "westclean"]
  .map((slug) => projects.find((p) => p.slug === slug)!)
  .filter(Boolean);

export default function WorkList() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [filter, setFilter] = useState<Category | "all">("all");
  useEffect(() => {
    const hidePreview = () => setPreview(null);
    window.addEventListener("scroll", hidePreview, { passive: true });
    window.addEventListener("blur", hidePreview);
    return () => {
      window.removeEventListener("scroll", hidePreview);
      window.removeEventListener("blur", hidePreview);
    };
  }, []);
  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  return (
    <>
      <section className={`surface-dark ${styles.hero}`} data-surface="dark">
        <Glow src="/icons/glow-work.svg" className={styles.glow} />
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.kicker}>(ALL WORK)&nbsp;&nbsp;·&nbsp;&nbsp;{projectCount} PROJECTS&nbsp;&nbsp;·&nbsp;&nbsp;2022 — 2026</p>
          <h1 className={styles.title}>
            Selected <em>work</em>
          </h1>
          <div className={styles.heroFoot}>
            <p className={styles.heroLede}>
              SaaS platforms, marketplaces, social apps and payment systems — built end to end and running in
              production.
            </p>
            <div className={styles.filters} role="group" aria-label="Filter projects">
              {filters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  className={`pill ${styles.filter}`}
                  aria-pressed={filter === f.value}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.listSection} aria-label="All projects">
        <div className="container">
          <div className={styles.listHead} aria-hidden>
            <span>NO.</span>
            <span>PROJECT</span>
            <span>TYPE</span>
            <span>STACK</span>
          </div>

          <ul className={styles.list} aria-live="polite">
            {list.map((p) => (
              <li key={p.slug}>
                <Link href={projectHref(p)} className={styles.row} data-cursor="view"
                  onPointerMove={(event) => {
                    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                    if (previewRef.current) {
                      previewRef.current.style.left = `${Math.min(window.innerWidth - 364, Math.max(24, event.clientX + 32))}px`;
                      previewRef.current.style.top = `${Math.min(window.innerHeight - 254, Math.max(24, event.clientY - 115))}px`;
                    }
                    setPreview(p.slug);
                  }}
                  onPointerLeave={() => setPreview(null)}
                  onClick={() => setPreview(null)}
                >
                  <span className={styles.no}>{projectNo(p)}</span>
                  <span className={styles.name}>{p.title}</span>
                  <span className={styles.type}>{p.type}</span>
                  <span className={styles.stack}>{p.tags.slice(0, 3).join(" · ")}</span>
                  <span className={styles.end}>
                    <span className={styles.arrow} aria-hidden>
                      ↗
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            {list.length === 0 && <li className={styles.empty}>Nothing here yet.</li>}
          </ul>

          <div className={styles.strip}>
            {previewStrip.map((p) => (
              <Link key={p.slug} href={projectHref(p)} className={styles.stripItem} aria-label={p.title}>
                <Image src={p.image} alt="" fill sizes="(max-width: 900px) 100vw, 363px" style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div ref={previewRef} className={styles.preview} data-visible={preview ? "true" : undefined} aria-hidden>
        {projects.map((p) => <Image key={p.slug} src={p.image} alt="" fill sizes="340px" data-active={preview === p.slug || undefined} style={{ objectPosition: p.imagePosition }} />)}
      </div>
    </>
  );
}
