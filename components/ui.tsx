import type { ReactNode } from "react";
import Image from "next/image";
import Logo from "./Logo";
import { site, socials } from "@/lib/site";
import styles from "./ui.module.css";

/** Window / Titlebar card used for README.md, hatem.ts, skills.json, experience.log. */
export function Window({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.window} ${className ?? ""}`}>
      <div className={styles.titlebar}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/traffic-lights.svg" alt="" width={55} height={13} />
        <p>{title}</p>
      </div>
      {children}
    </div>
  );
}

/** Browser Frame around project screenshots. */
export function BrowserFrame({
  domain,
  image,
  alt,
  height,
  sizes,
  shadow = "box",
  position,
}: {
  domain: string;
  image: string;
  alt: string;
  height: number;
  sizes: string;
  shadow?: "box" | "drop";
  position?: string;
}) {
  return (
    <div className={styles.browser} data-shadow={shadow}>
      <div className={styles.bar}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/browser-dots.svg" alt="" width={39} height={9} />
        <span className={styles.url}>{domain}</span>
        <span className={styles.barSpacer} />
      </div>
      <div className={styles.shot} style={{ "--h": `${height}px` } as React.CSSProperties}>
        <Image src={image} alt={alt} fill sizes={sizes} className={styles.shotImg} style={position ? { objectPosition: position } : undefined} />
      </div>
    </div>
  );
}

/** Line — HR monogram — line divider between home sections. */
export function Divider({ compact = false }: { compact?: boolean }) {
  return (
    <div className={styles.divider} data-compact={compact || undefined} aria-hidden>
      <span />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/monogram-dark.svg" alt="" width={31.586} height={22} data-thread-avoid />
      <span />
    </div>
  );
}

/** Section header: "(02) PROJECTS — 6" + serif title + optional lede. */
export function SectionHeader({
  no,
  label,
  title,
  lede,
}: {
  no: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerText}>
        <p className="eyebrow">
          <b>({no})</b> {label}
        </p>
        <h2 className="h-section">{title}</h2>
      </div>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

/** Radial glow used behind dark heroes. */
export function Glow({ src, className }: { src: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" aria-hidden className={`${styles.glow} ${className ?? ""}`} />;
}

/** Footer used on Work, Case study and Contact pages. */
export function PageFooter() {
  return (
    <footer className={`surface-dark ${styles.footer}`} data-surface="dark">
      <Logo variant="footer" />
      <ul className={styles.footerLinks}>
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer">
              {s.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.footerMeta}>
        © {site.year} {site.name} · Built with care in Cairo
      </p>
    </footer>
  );
}
