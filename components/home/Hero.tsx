import Image from "next/image";
import styles from "./Hero.module.css";

const stats = [
  { plus: true, value: "4", label: "Years of experience" },
  { plus: true, value: "10", label: "Production platforms" },
  { plus: false, value: "3", label: "Regions — EG · GCC · EU" },
];

export default function Hero() {
  return (
    <section className={`surface-dark ${styles.hero}`} data-surface="dark" aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div className={styles.portrait}>
          <Image
            src="/images/portrait-editorial.jpg"
            alt="Portrait of Hatem Rabea"
            fill
            preload
            sizes="(max-width: 900px) 100vw, 467px"
            className={styles.portraitImg}
          />

        </div>

        <p className={styles.vertical} aria-hidden>
          LARAVEL · NODE.JS · REACT
        </p>
        <span className={styles.vline} aria-hidden />

        <dl className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className={styles.statValue}>
                {s.plus && <span className={styles.plus}>+</span>}
                {s.value}
              </dt>
              <dd className={styles.statLabel}>{s.label}</dd>
            </div>
          ))}
        </dl>

        <h1 id="hero-title" className={styles.hello}>
          Hello
        </h1>

        <div className={styles.tagline}>
          <span className={styles.dash} aria-hidden />
          <p>
            <span className={styles.me}>
              It&apos;s Hatem <em>Rabea</em>
            </span>{" "}
            — a full-stack developer taking SaaS, marketplaces
            {" "}and payment products from MVP to production.
          </p>
        </div>

        <div className={styles.bottom}>
          <a href="#about" className={styles.scroll}>
            SCROLL TO EXPLORE&nbsp;&nbsp;↓
          </a>
          <p className={styles.place}>CAIRO, EG — 2026</p>
        </div>
      </div>
    </section>
  );
}
