import { SectionHeader, Window } from "@/components/ui";
import styles from "./Skills.module.css";

const groups: { key: string; lines: string[][] }[] = [
  {
    key: "backend",
    lines: [
      ["Laravel", "PHP 8", "Node.js", "NestJS"],
      ["REST APIs", "Sanctum", "Redis", "Meilisearch", "Queues"],
    ],
  },
  {
    key: "frontend",
    lines: [
      ["React 19", "TypeScript", "Next.js"],
      ["Redux Toolkit", "RTK Query", "Zod", "Tailwind"],
    ],
  },
  { key: "database", lines: [["MySQL", "Query Optimization", "Caching"]] },
  {
    key: "devops",
    lines: [
      ["Jenkins CI/CD", "Oracle Cloud (OCI)", "Nginx", "PHP-FPM"],
      ["Docker", "GitHub Actions", "Grafana · Loki", "Linux"],
    ],
  },
  { key: "payments", lines: [["MyFatoorah", "Moyasar", "Edfapay", "Webhooks"]] },
];

const focus = [
  { file: "backend.php", title: "Back-end", text: "Laravel & NestJS APIs, Sanctum auth & roles, queues, Redis, Meilisearch." },
  { file: "frontend.tsx", title: "Front-end", text: "React UIs on RTK Query — optimistic updates, clear loading and error states." },
  { file: "payments.ts", title: "SaaS & Payments", text: "4+ gateways — verified webhooks, idempotency and row locks. AR/EN ready." },
];

function Json() {
  const out: React.ReactNode[] = [<span key="open">{"{"}</span>];
  groups.forEach((g, gi) => {
    const lastGroup = gi === groups.length - 1;
    g.lines.forEach((line, li) => {
      const first = li === 0;
      const last = li === g.lines.length - 1;
      out.push(
        <span key={`${g.key}-${li}`}>
          {first ? (
            <>
              {"  "}
              <span className={styles.key}>&quot;{g.key}&quot;</span>: [
            </>
          ) : (
            "    "
          )}
          {line.map((v, vi) => (
            <span key={v}>
              <span className={styles.str}>&quot;{v}&quot;</span>
              {vi < line.length - 1 ? ", " : ""}
            </span>
          ))}
          {last ? (lastGroup ? "]" : "],") : ","}
        </span>,
      );
    });
  });
  out.push(<span key="close">{"}"}</span>);
  return (
    <div className={styles.code}>
      <ol className={styles.gutter} aria-hidden>
        {out.map((_, i) => (
          <li key={i}>{i + 1}</li>
        ))}
      </ol>
      <pre className={styles.pre}>
        <code>
          {out.map((line, i) => (
            <span key={i} className={styles.line}>
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={styles.skills} aria-label="Skills">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          no="03"
          label="SKILLS — skills.json"
          title={
            <>
              What I <em>work</em> with
            </>
          }
          lede="Back-end, front-end and the tooling that gets it to production."
        />
        <div className={`reveal ${styles.grid}`}>
          <Window title="skills.json" className={styles.window}>
            <Json />
          </Window>
          <ul className={styles.focus}>
            {focus.map((f) => (
              <li key={f.file}>
                <p className={styles.file}>{f.file}</p>
                <h3>{f.title}</h3>
                <p className={styles.text}>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
