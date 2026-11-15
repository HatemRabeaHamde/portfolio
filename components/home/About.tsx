import { SectionHeader, Window } from "@/components/ui";
import styles from "./About.module.css";

const principles = [
  { title: "Clean architecture", text: "Maintainable service boundaries that scale with the product." },
  { title: "Verified payments", text: "Payment events, idempotency and database consistency." },
  { title: "Performance", text: "Query optimization and caching where it matters." },
  { title: "AR / EN ready", text: "Arabic & English localization built in from day one." },
];

const K = ({ children }: { children: React.ReactNode }) => <span className={styles.k}>{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className={styles.s}>{children}</span>;

export default function About() {
  return (
    <section id="about" className={styles.about} aria-label="About">
      <div className={`container ${styles.inner}`}>
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
          <p>I build the parts of a product you see — and the parts that keep it running.</p>
        </blockquote>

        <div className={`reveal ${styles.windows}`}>
          <Window title="README.md" className={styles.readme}>
            <div className={styles.readmeBody}>
              <p className={styles.h}># Hatem Rabea</p>
              <p>
                I&apos;m a full-stack web developer with 4+ years of experience delivering SaaS platforms,
                marketplaces, booking systems and payment integrations for clients across Egypt, the Gulf and
                Europe.
              </p>
              <p>
                I own the work end to end — from API design and database architecture to the interface people
                actually use — with a focus on maintainable services, verified payment events, performance and
                Arabic/English localization.
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
                {"\n"}  focus: <S>&quot;SaaS · payments&quot;</S>,
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
