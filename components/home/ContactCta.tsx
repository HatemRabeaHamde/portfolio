import Logo from "@/components/Logo";
import { DesignCredit } from "@/components/ui";
import { site, socials } from "@/lib/site";
import styles from "./ContactCta.module.css";

/** Home "(CONTACT)" block — big CTA plus the home footer row. */
export default function ContactCta() {
  return (
    <section id="contact" className={`surface-dark ${styles.contact}`} data-surface="dark" aria-label="Contact">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/hr-watermark.svg" alt="" aria-hidden className={styles.watermark} width={603} height={420} />

      <div className={styles.cta} data-thread-frame>
        <p className={styles.label}>(CONTACT)</p>
        <h2 className={styles.title}>
          Have an idea?
          <br />
          Let&apos;s build it together.
        </h2>
        <div className={styles.actions}>
          <a href={`mailto:${site.email}`} className={styles.primary}>
            {site.email}&nbsp;&nbsp;<span className={styles.arrow}>↗</span>
          </a>
          <a href={site.cv} download className={styles.secondary}>
            Download CV
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        <Logo />
        <ul className={styles.socials}>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label} <span className={styles.arrow}>↗</span>
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.meta}>
          <DesignCredit />
          <p>
            © {site.year} {site.name}
          </p>
          <a href="#top" className={styles.top}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
