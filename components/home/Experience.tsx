import { SectionHeader, Window } from "@/components/ui";
import styles from "./Experience.module.css";

const jobs = [
  {
    hash: "a3f9c1",
    dates: "Jan 2026 — Present",
    present: true,
    title: "Senior Full-Stack Developer & Team Lead",
    org: "BenJalTech (formerly aiSmarty) · Remote · Poland",
    note: "Leading the team and building the React frontend and NestJS backend of an AI Shopify content platform.",
  },
  {
    hash: "7d2e84",
    dates: "Aug 2025 — Jan 2026",
    present: false,
    title: "Full-Stack Developer",
    org: "European Tech Company · Remote · Europe",
    note: "Sole web developer on a machine rental platform — Laravel + React, booking engine, OTP, Firebase.",
  },
  {
    hash: "1b6c0f",
    dates: "Oct 2022 — Present",
    present: true,
    title: "Freelance Full-Stack Developer & Tech Lead",
    org: "Self-employed · Clients in KSA & UAE",
    note: "10+ production platforms, incl. Haya’s live backend — Jenkins deploys on Oracle Cloud, 4+ payment gateways, up to 55% faster APIs.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className={styles.experience} aria-label="Experience">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          no="04"
          label="EXPERIENCE — experience.log"
          title={
            <>
              Where I&apos;ve <em>worked</em>
            </>
          }
        />
        <Window title="experience.log — git log --career" className="reveal">
          <ol className={styles.log}>
            {jobs.map((j, i) => (
              <li key={j.hash} className={styles.entry}>
                <div className={styles.rail} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={i === 0 ? "/icons/timeline-dot-filled.svg" : "/icons/timeline-dot-hollow.svg"}
                    alt=""
                    width={12}
                    height={12}
                  />
                  {i < jobs.length - 1 && <span className={styles.line} />}
                </div>
                <div className={styles.body}>
                  <div className={styles.when}>
                    <p className={styles.hash}>{j.hash}</p>
                    <p className={styles.dates}>{j.dates}</p>
                    {j.present && <span className={styles.badge}>Present</span>}
                  </div>
                  <div className={styles.what}>
                    <h3>{j.title}</h3>
                    <p className={styles.org}>{j.org}</p>
                    <p className={styles.note}>{j.note}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Window>
      </div>
    </section>
  );
}
