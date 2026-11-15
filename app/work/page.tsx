import type { Metadata } from "next";
import Link from "next/link";
import { PageFooter } from "@/components/ui";
import WorkList from "./WorkList";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Selected work",
  description: "SaaS platforms, marketplaces, social apps and payment systems — built end to end.",
};

export default function WorkPage() {
  return (
    <main>
      <WorkList />

      <section className={`surface-dark ${styles.cta}`} data-surface="dark">
        <h2 className={styles.ctaTitle}>
          Your project could <em>be next.</em>
        </h2>
        <div className={styles.ctaActions}>
          <Link href="/contact" className="btn btn-primary">
            Start a project →
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Book a call ↗
          </Link>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
