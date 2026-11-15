import Link from "next/link";
import { SectionHeader } from "@/components/ui";
import styles from "./Leadership.module.css";

/** At-a-glance numbers behind the way I lead. Every one is backed by a case study. */
const facts = [
  { value: "1", label: "team led in Scrum sprints", context: "BenJalTech · since Jan 2026" },
  { value: "3 days", label: "from a supply-chain attack to a clean pipeline", context: "BenJalTech · Oct 2026" },
  { value: "4", label: "client teams on one stable API", context: "Haya · iOS, Android, admin, cashier" },
  { value: "10+", label: "products taken from MVP to production", context: "Clients in Egypt, the Gulf and Europe" },
];

const habits = [
  {
    title: "Own the outcome",
    text: "I take work from the first requirement to production — and stay with it after launch: logs, fixes, the next iteration.",
    proof: "Production deploys and diagnosis on a live app",
    project: { label: "Haya", href: "/work/haya" },
  },
  {
    title: "Lead the team",
    text: "Sprint planning, task breakdown and code review, so frontend and backend ship against one agreed contract.",
    proof: "Team lead across React and NestJS",
    project: { label: "BenJalTech", href: "/work/benjaltech" },
  },
  {
    title: "Stay calm in incidents",
    text: "Contain first, fix the root cause, then harden the process so it can't happen the same way again.",
    proof: "Malicious code removed from 5 branches; clean org in 3 days",
    project: { label: "BenJalTech", href: "/work/benjaltech" },
  },
  {
    title: "Decide with trade-offs",
    text: "Measure before spending, choose the simple option that's safe, and write down why for the next person.",
    proof: "Measured image sizes before reaching for a bigger server",
    project: { label: "Haya", href: "/work/haya" },
  },
  {
    title: "Communicate across teams",
    text: "Clear API contracts, Postman collections with real responses, and older app versions that keep working.",
    proof: "One API for mobile, admin and cashier teams",
    project: { label: "Haya", href: "/work/haya" },
  },
  {
    title: "Raise the bar",
    text: "Tests on the risky paths, reviews that explain the why, and security fixes shipped with the feature — not after it.",
    proof: "1,169 tests gating every deploy",
    project: { label: "Haya", href: "/work/haya" },
  },
];

/** Home "(05) LEADERSHIP" — what I bring beyond the code. */
export default function Leadership() {
  return (
    <section id="leadership" className={styles.leadership} aria-label="Leadership">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          no="05"
          label="LEADERSHIP — how-i-lead.md"
          title={
            <>
              How I <em>lead</em>
            </>
          }
          lede="What I bring beyond the code — to the team, the product and the people who depend on it."
        />

        <dl className={`reveal ${styles.facts}`}>
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.value}</dt>
              <dd>
                <span>{f.label}</span>
                <small>{f.context}</small>
              </dd>
            </div>
          ))}
        </dl>

        <ol className={`reveal ${styles.habits}`}>
          {habits.map((h, i) => (
            <li key={h.title}>
              <span className={styles.no}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
              <p className={styles.proof}>
                <span aria-hidden>↳</span> {h.proof} —{" "}
                <Link href={h.project.href}>{h.project.label}</Link>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
