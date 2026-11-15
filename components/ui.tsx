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
      <img src="/icons/monogram-dark.svg" alt="" width={31.586} height={22} />
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

/** "Designed by …" credit with a LinkedIn icon, shown in every footer. */
export function DesignCredit({ className }: { className?: string }) {
  return (
    <a
      href={site.designer.linkedin}
      target="_blank"
      rel="noreferrer"
      className={`${styles.credit} ${className ?? ""}`}
      aria-label={`Designed by ${site.designer.name} — LinkedIn profile`}
    >
      <span>
        Designed by <b>{site.designer.name}</b>
      </span>
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    </a>
  );
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
      <div className={styles.footerEnd}>
        <DesignCredit />
        <p className={styles.footerMeta}>
          © {site.year} {site.name} · Built with care in Cairo
        </p>
      </div>
    </footer>
  );
}
