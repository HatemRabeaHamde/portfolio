"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { navLinks, site } from "@/lib/site";
import styles from "./Nav.module.css";

/**
 * Glass nav that fades on scroll:
 *  1. top of page — glass 6% white, blur 28
 *  2. scrolling down — fades to 40%, blur 20, slides up 8px
 *  3. scrolling up / hover — back to 100%
 * Over light sections it picks up a dark tint so the white type stays readable.
 */
export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"top" | "down" | "up">("top");
  const [overLight, setOverLight] = useState(false);
  const [spy, setSpy] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      if (y < 24) setMode("top");
      else if (Math.abs(y - lastY) > 4) setMode(y > lastY ? "down" : "up");
      lastY = y;

      const nav = navRef.current;
      if (nav) {
        const probeY = nav.offsetHeight + 2;
        const under = document
          .elementsFromPoint(window.innerWidth / 2, probeY)
          .find((el) => !nav.contains(el));
        setOverLight(!under?.closest('[data-surface="dark"]'));
      }

      if (pathname === "/") {
        let current: string | null = null;
        for (const id of ["about", "projects", "skills", "experience", "contact"]) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
        }
        setSpy(current);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (id: string) => {
    if (pathname === "/") return spy === id;
    if (id === "projects") return pathname.startsWith("/work");
    if (id === "contact") return pathname.startsWith("/contact");
    return false;
  };

  return (
    <header
      ref={navRef}
      className={styles.nav}
      data-mode={open ? "up" : mode}
      data-tint={overLight || open ? "dark" : undefined}
      data-open={open || undefined}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} — home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className={styles.links}>
          {navLinks.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className={styles.link}
              aria-current={isActive(l.id) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <span className={styles.status}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/status-dot.svg" alt="" width={7} height={7} />
            Available for work
          </span>
          <a href={site.cv} download className={styles.cv}>
            Download CV ↓
          </a>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className={styles.burger} data-open={open || undefined} aria-hidden />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.sheet} data-open={open || undefined} hidden={!open}>
        {navLinks.map((l, i) => (
          <Link key={l.id} href={l.href} className={styles.sheetLink} onClick={() => setOpen(false)}>
            <span className={styles.sheetNo}>0{i + 1}</span>
            {l.label}
          </Link>
        ))}
        <a href={site.cv} download className={`btn btn-primary ${styles.sheetCv}`}>
          Download CV ↓
        </a>
      </div>
    </header>
  );
}
