import type { Metadata } from "next";
import Link from "next/link";
import { Glow } from "@/components/ui";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className={`surface-dark ${styles.page}`} data-surface="dark">
      <Glow src="/icons/glow-404.svg" className={styles.glow} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/monogram-404.svg" alt="" aria-hidden className={styles.monogram} width={747} height={520} />

      <p className={styles.kicker}>ERROR · PAGE NOT FOUND</p>
      <h1 className={styles.code}>
        4<em>0</em>4
      </h1>
      <p className={styles.title}>
        This page took a <em>wrong turn</em>.
      </p>
      <p className={styles.text}>
        The link may be old, or the page moved. Everything else is right where you left it.
      </p>
      <div className={styles.actions}>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/work" className="btn btn-ghost">
          Selected work →
        </Link>
      </div>
      <p className={styles.curl}>$ curl /this-page&nbsp;&nbsp;→&nbsp;&nbsp;404 Not Found</p>
    </main>
  );
}
