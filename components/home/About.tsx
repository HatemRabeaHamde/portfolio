import { SectionHeader, Window } from "@/components/ui";
import ScrollQuote from "./ScrollQuote";
import styles from "./About.module.css";

const principles = [
  { title: "MVP first", text: "Ship the smallest version that proves the idea, then validate it with real users before scaling." },
  { title: "Agile delivery", text: "Scrum sprints, clear task breakdown and code review — small releases, no surprises." },
  { title: "Safe releases", text: "Tested, health-checked deploys with rollback — and a live server move with zero user-visible downtime." },
  { title: "Money done right", text: "Verified webhooks, idempotency and row locks — every payment and point counted once." },
];

const K = ({ children }: { children: React.ReactNode }) => <span className={styles.k}>{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className={styles.s}>{children}</span>;

export default function About() {
  return (
    <section id="about" className={styles.about} aria-label="About">
      <div className={`container ${styles.inner}`} data-thread-frame>
        <SectionHeader
          no="01"
          label="ABOUT — README.md"
          title={
            <>
              A little <em>about</em> me
            </>
          }
        />

        <blockquote className={`reveal ${styles.quote}`}>
          <span className={styles.mark} aria-hidden>
            “
          </span>
          <ScrollQuote text="I build the parts of a product you see — and the parts that keep it running." />
        </blockquote>

        <div className={`reveal ${styles.windows}`}>
          <Window title="README.md" className={styles.readme}>
            <div className={styles.readmeBody}>
              <p className={styles.h}># Hatem Rabea</p>
              <p>
                I&apos;m a full-stack developer with 4+ years shipping SaaS platforms, marketplaces, booking
                systems and payment integrations for clients across Egypt, the Gulf and Europe — 10+ of them
                live in production, in Arabic and English.
              </p>
              <p>
                I work the way product teams do: Scrum sprints, an MVP first, then validate with real users and
                iterate. I own the work end to end — API and database design, the interface people use, and
                the release that gets it to production safely.
              </p>
              <p>
                Recent results: a live backend moved to new servers with zero user-visible downtime, a team led
                from a supply-chain attack to a clean, scanned pipeline in 3 days, and 1,169 tests gating
                every deploy.
              </p>
            </div>
          </Window>

          <Window title="hatem.ts" className={styles.code}>
            <pre className={styles.pre}>
              <code>
                <span className={styles.kw}>const</span> hatem = {"{"}
                {"\n"}  role: <S>&quot;Full-Stack Dev &amp; Tech Lead&quot;</S>,
                {"\n"}  backend: [<S>&quot;Laravel&quot;</S>, <S>&quot;PHP&quot;</S>,
                {"\n"}            <S>&quot;Node.js&quot;</S>, <S>&quot;NestJS&quot;</S>],
                {"\n"}  frontend: [<S>&quot;React&quot;</S>, <S>&quot;Next.js&quot;</S>,
                {"\n"}             <S>&quot;TypeScript&quot;</S>],
                {"\n"}  ships: <S>&quot;MVP → validate → scale&quot;</S>,
                {"\n"}  process: <S>&quot;Scrum · Agile&quot;</S>,
                {"\n"}  tools: [<S>&quot;Slack&quot;</S>, <S>&quot;Shortcut&quot;</S>],
                {"\n"}  based: <S>&quot;Cairo, Egypt&quot;</S>,
                {"\n"}
                {"};"}
              </code>
            </pre>
          </Window>
        </div>

        <ul className={`reveal ${styles.principles}`}>
          {principles.map((p, i) => (
            <li key={p.title}>
              <K>0{i + 1}</K>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
