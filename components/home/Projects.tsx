"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BrowserFrame, SectionHeader } from "@/components/ui";
import { projects, projectHref, projectNo, type Category, type Project } from "@/lib/projects";
import styles from "./Projects.module.css";

const filters: { label: string; value: Category | "all" }[] = [
  { label: "All work", value: "all" },
  { label: "SaaS & AI", value: "saas" },
  { label: "Commerce", value: "commerce" },
  { label: "Marketplaces", value: "marketplace" },
  { label: "Payments", value: "payments" },
  { label: "Creative web", value: "creative" },
];

type Size = "full" | "split";

/** Full-width opening and closing projects frame alternating editorial pairs. */
function toRows(list: Project[]) {
  const rows: { size: Size; flip: boolean; p: Project }[][] = [];
  if (!list.length) return rows;
  rows.push([{ size: "full", flip: false, p: list[0] }]);
  const middle = list.slice(1, -1);
  for (let i = 0; i < middle.length; i += 2) {
    rows.push(middle.slice(i, i + 2).map((p) => ({ size: "split", flip: (i / 2) % 2 === 1, p })));
  }
  if (list.length > 1) rows.push([{ size: "full", flip: false, p: list[list.length - 1] }]);
  return rows;
}

function Card({ p, size, flip, first }: { p: Project; size: Size; flip: boolean; first: boolean }) {
  const full = size === "full";
  const no = projectNo(p);
  return (
    <Link href={projectHref(p)} className={styles.card} data-cursor="view" data-thread-frame data-size={size} data-flip={flip || undefined}>
      <BrowserFrame
        domain={p.domain}
        image={p.image}
        alt={`${p.title} preview`}
        height={full ? (first ? 560 : 460) : 470}
        sizes={full ? "(max-width: 1152px) 100vw, 1120px" : "(max-width: 900px) 100vw, 680px"}
        shadow={full && first ? "box" : "drop"}
        position={p.imagePosition}
      />
      <div className={styles.meta}>
        <span className={styles.no}>{no}</span>
        <div className={styles.metaBody}>
          <p className={styles.kicker}>{p.kicker}</p>
          <h3 className={styles.title}>{p.title}</h3>
          <p className={styles.summary}>{p.summary}</p>
          <div className={styles.foot}>
            <ul className={styles.tags}>
              {p.tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            <span className={styles.cta}>View case study&nbsp;&nbsp;↗</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );
  const rows = useMemo(() => toRows(list), [list]);

  return (
    <section id="projects" className={styles.projects} aria-label="Selected work">
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro} data-thread-frame>
          <SectionHeader
            no="02"
            label={`PROJECTS — ${projects.length}`}
            title={
              <>
                Selected <em>work</em>
              </>
            }
            lede="Platforms I've built and shipped — SaaS, marketplaces, booking systems and payments."
          />

          <div className={styles.filterBar}>
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
            <p className={styles.count}>
              {String(list.length).padStart(2, "0")} PROJECTS · 2022 — 2026
            </p>
          </div>

        </div>

        <div className={styles.rows} aria-live="polite">
          {rows.map((row, ri) => (
            <div key={row.map((r) => r.p.slug).join("-")} className={styles.row} data-layout={row.length === 1 ? "full" : row[0].flip ? "reverse" : "pair"}>
              {row.map(({ p, size, flip }) => (
                <Card key={p.slug} p={p} size={size} flip={flip} first={ri === 0} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
