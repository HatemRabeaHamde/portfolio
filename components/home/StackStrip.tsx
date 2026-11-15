import { Fragment } from "react";
import styles from "./StackStrip.module.css";

const stack = [
  "Laravel",
  "PHP",
  "Node.js",
  "NestJS",
  "React",
  "Next.js",
  "TypeScript",
  "MySQL",
  "Redis",
  "REST APIs",
  "React Native",
  "Jenkins",
  "Oracle Cloud",
  "Nginx",
  "CI/CD",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {stack.map((s, i) => (
        <Fragment key={s}>
          <li className={i % 2 ? styles.alt : styles.main}>{s}</li>
          <li className={styles.star} aria-hidden>
            ✦
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

/** Stack Strip — an endless, slow marquee of the core stack. */
export default function StackStrip() {
  return (
    <div className={styles.strip} data-surface="dark" aria-label="Core stack">
      <div className={styles.track}>
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
