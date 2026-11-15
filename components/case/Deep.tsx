import Image from "next/image";
import type { CaseStudy } from "@/lib/projects";
import Head from "./Head";
import s from "./case.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Engineering stories: problem → decision → build → impact → evidence. */
export function Stories({ no, data }: { no: string; data: NonNullable<CaseStudy["stories"]> }) {
  return (
    <div className={`container ${s.stack48}`}>
      <Head no={no} label={data.label ?? "ENGINEERING STORIES"} title={data.title} em={data.titleEm} lede={data.lede} />
      {data.cover && (
        <figure className={`reveal ${s.showcase}`}>
          <Image src={data.cover.src} alt={data.cover.alt} width={data.cover.width} height={data.cover.height} sizes="(max-width: 1152px) 100vw, 1120px" />
        </figure>
      )}
      <div className={s.stories}>
        {data.items.map((st, i) => (
          <article key={st.kicker} className={`reveal ${s.story}`} data-image={st.image ? (st.image.height > st.image.width ? "portrait" : "square") : undefined}>
            <header className={s.storyHead}>
              <p className={s.kicker}>
                {pad(i + 1)}&nbsp;&nbsp;{st.kicker}
              </p>
              <h3>
                {st.title}
                <em>{st.titleEm}</em>
              </h3>
              <p className={s.owner}>{st.ownership}</p>
            </header>
            <div className={s.storyBody}>
              <dl className={s.steps}>
                {(
                  [
                    ["Problem", st.problem],
                    ["Decision", st.decision],
                    ["Built", st.built],
                    ["Impact", st.impact],
                    ["Evidence", st.evidence],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} data-step={k.toLowerCase()}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              {st.image && (
                <div className={s.storyImg}>
                  <Image src={st.image.src} alt={st.image.alt} width={st.image.width} height={st.image.height} sizes="(max-width: 900px) 100vw, 400px" />
                </div>
              )}
            </div>
            {st.more?.length ? (
              <details className={s.more}>
                <summary>More detail</summary>
                <ul>
                  {st.more.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </details>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

/** Results split into measured numbers, confirmed outcomes and architecture decisions. */
export function Evidence({ no, data }: { no: string; data: NonNullable<CaseStudy["evidence"]> }) {
  return (
    <div className={`container ${s.stack48}`}>
      <Head no={no} label={data.label ?? "RESULTS"} title={data.title} em={data.titleEm} lede={data.lede} />
      <div className={`reveal ${s.evidence}`}>
        <section aria-labelledby="ev-measured">
          <h3 id="ev-measured" className={s.evHead}>
            <span>A</span> {data.groups?.[0] ?? "Measured"}
          </h3>
          <ul className={s.measured}>
            {data.measured.map((m) => (
              <li key={m.label}>
                <b>{m.value}</b>
                <span>{m.label}</span>
                <small>{m.context}</small>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="ev-outcomes">
          <h3 id="ev-outcomes" className={s.evHead}>
            <span>B</span> {data.groups?.[1] ?? "Confirmed outcomes"}
          </h3>
          <ul className={s.evList}>
            {data.outcomes.map((o) => (
              <li key={o.title}>
                <b>{o.title}</b>
                <p>{o.text}</p>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="ev-decisions">
          <h3 id="ev-decisions" className={s.evHead}>
            <span>C</span> {data.groups?.[2] ?? "Architecture decisions"}
          </h3>
          <ul className={s.evList}>
            {data.decisions.map((d) => (
              <li key={d.title}>
                <b>{d.title}</b>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className={`reveal ${s.tests}`}>
        <p className={s.kicker}>{data.tests.label ?? "WHAT THE TESTS COVER"}</p>
        <p>{data.tests.lede}</p>
        <ul>
          {data.tests.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <small>{data.tests.caveat}</small>
      </div>
    </div>
  );
}

/** Skills shown on the project and how I got up to speed in a new environment. */
export function Adapt({ no, data }: { no: string; data: NonNullable<CaseStudy["adapt"]> }) {
  return (
    <div className={`container ${s.stack48}`}>
      <Head dark no={no} label={data.label ?? "SKILLS & ADAPTING"} title={data.title} em={data.titleEm} lede={data.lede} />
      <ol className={`reveal ${s.adapt}`}>
        {data.items.map((it, i) => (
          <li key={it.title}>
            <span>{pad(i + 1)}</span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </li>
        ))}
      </ol>
      <div className={`reveal ${s.skills}`}>
        {data.skills.map((g) => (
          <div key={g.group}>
            <p className={s.kicker}>{g.group}</p>
            <ul>
              {g.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
