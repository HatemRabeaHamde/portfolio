import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, Suspense, type ReactNode } from "react";
import ChapterIndex, { type Chapter } from "@/components/case/ChapterIndex";
import DemoVideo from "@/components/case/DemoVideo";
import { Adapt, Evidence, Stories } from "@/components/case/Deep";
import Head from "@/components/case/Head";
import { BrowserFrame, Glow, PageFooter } from "@/components/ui";
import { projectCount, projectHref, projectNo, projects, type Flow, type Project, type SectionId } from "@/lib/projects";
import { site } from "@/lib/site";
import s from "@/components/case/case.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const defaultOrder: SectionId[] = ["glance", "stories", "demo", "results", "overview", "adapt", "use-cases", "how", "security", "screens", "stack"];

const chapterLabels: Record<SectionId, string> = {
  glance: "At a glance",
  stories: "Stories",
  demo: "Demo",
  results: "Results",
  overview: "Overview",
  adapt: "Skills",
  "use-cases": "Use cases",
  how: "How it works",
  security: "Security",
  screens: "Screens",
  stack: "Built with",
};

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const image: { src: string; width?: number; height?: number } = p.caseStudy.ogImage ?? { src: p.image };
  const title = `${p.title} — Case study`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      type: "article",
      title,
      description: p.summary,
      url: `/work/${p.slug}`,
      images: [{ url: image.src, width: image.width, height: image.height, alt: `${p.title} preview` }],
    },
    twitter: { card: "summary_large_image", title, description: p.summary, images: [image.src] },
  };
}

export default function Page({ params }: PageProps<"/work/[slug]">) {
  return <Suspense fallback={null}>{params.then(({ slug }) => <CaseStudy slug={slug} />)}</Suspense>;
}

/** "Haya" → Ha<em>ya</em>; multi-word titles italicize the last word. */
function Title({ text }: { text: string }) {
  const words = text.split(" ");
  if (words.length > 1) {
    return (
      <>
        {words.slice(0, -1).join(" ")} <em>{words.at(-1)}</em>
      </>
    );
  }
  const cut = Math.ceil(text.length / 2);
  return (
    <>
      {text.slice(0, cut)}
      <em>{text.slice(cut)}</em>
    </>
  );
}

function Pipeline({ flow }: { flow: Flow }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className={`reveal ${s.pipeline}`}>
      <div className={s.pipeHead}>
        <span>{flow.label}</span>
        <em>{flow.steps.map((st) => st.title).join(" → ")}</em>
      </div>
      <ol className={s.pipeRow}>
        {flow.steps.map((st, i) => (
          <li key={st.title} className={s.pipeItem}>
            <div className={s.pipeCard} data-hot={i === flow.hot || undefined}>
              <em>{pad(i + 1)}</em>
              <b>{st.title}</b>
              <p>{st.text}</p>
            </div>
            {i < flow.steps.length - 1 && (
              <div className={s.edge} aria-hidden>
                <span />
                <span className={s.edgeLine}>
                  <i />›
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
      {flow.notes && (
        <ul className={s.pipeNotes}>
          {flow.notes.map((n) => (
            <li key={n}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/dot-white-6.svg" alt="" width={6} height={6} />
              {n}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CaseStudy({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const cs = project.caseStudy;
  const index = projects.indexOf(project);
  const next: Project = projects[(index + 1) % projects.length];
  const pad = (n: number) => String(n).padStart(2, "0");

  const available: Record<SectionId, boolean> = {
    glance: true,
    stories: !!cs.stories,
    demo: !!cs.demo,
    results: !!(cs.impact || cs.evidence),
    overview: true,
    adapt: !!cs.adapt,
    "use-cases": true,
    how: true,
    security: !!cs.incident,
    screens: !!cs.screenshots?.length,
    stack: true,
  };
  const order = (cs.order ?? defaultOrder).filter((id) => available[id]);
  const chapters: Chapter[] = order.map((id) => ({ id, label: cs.chapterLabels?.[id] ?? chapterLabels[id] }));
  const no = (id: string) => pad(chapters.findIndex((c) => c.id === id) + 1);

  const blocks: Record<SectionId, ReactNode> = {
    "glance": (
      <>
        {/* ---------- At a glance ---------- */}
        <section id="glance" className={s.section}>
          <span className="watermark-no">{no("glance")}</span>
          <div className={`container ${s.stack40}`}>
            <p className={s.kicker}>({no("glance")})&nbsp;&nbsp;AT A GLANCE</p>
            {cs.plain && <p className={`reveal ${s.plain}`}>{cs.plain}</p>}
            <dl className={`reveal ${s.stats}`}>
              {cs.stats.map((st) => (
                <div key={st.text}>
                  <dt>{st.value}</dt>
                  <dd>{st.text}</dd>
                </div>
              ))}
            </dl>
            {cs.mockup && (
              <figure className={`reveal ${s.showcase}`}>
                <Image
                  src={cs.mockup.src}
                  alt={cs.mockup.alt}
                  width={cs.mockup.width}
                  height={cs.mockup.height}
                  sizes="(max-width: 1152px) 100vw, 1120px"
                />
                <figcaption>{cs.mockup.caption}</figcaption>
              </figure>
            )}
          </div>
        </section>
      </>
    ),
    "stories": (
      <>
        {/* ---------- Engineering stories ---------- */}
        {cs.stories && (
          <section id="stories" className={s.section}>
            <span className="watermark-no">{no("stories")}</span>
            <Stories no={no("stories")} data={cs.stories} />
          </section>
        )}
      </>
    ),
    "demo": (
      <>
        {/* ---------- Demo video ---------- */}
        {cs.demo && (
          <section id="demo" className={s.section}>
            <span className="watermark-no">{no("demo")}</span>
            <div className={`container ${s.stack48}`}>
              <Head no={no("demo")} label="DEMO" title={cs.demo.title} em={cs.demo.titleEm} lede={cs.demo.lede} />
              <figure className={`reveal ${s.showcase}`}>
                <DemoVideo
                  src={cs.demo.src}
                  poster={cs.demo.poster}
                  width={cs.demo.width}
                  height={cs.demo.height}
                  label={`${project.title} — ${cs.demo.title}${cs.demo.titleEm}`}
                />
                <figcaption>{cs.demo.note}</figcaption>
              </figure>
            </div>
          </section>
        )}
      </>
    ),
    "results": (
      <>
        {/* ---------- Results ---------- */}
        {cs.impact && (
          <section id="results" className={s.section}>
            <span className="watermark-no">{no("results")}</span>
            <div className={`container ${s.stack48}`}>
              <Head
                no={no("results")}
                label="RESULTS"
                title={cs.impact.title}
                em={cs.impact.titleEm}
                lede={cs.impact.lede}
              />
              <ul className={`reveal ${s.impact}`}>
                {cs.impact.items.map((it) => (
                  <li key={it.area}>
                    <span className={s.impactArea}>{it.area}</span>
                    <span className={s.impactMetric}>{it.metric}</span>
                    <span className={s.impactLabel}>{it.label}</span>
                    <p>{it.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {cs.evidence && !cs.impact && (
          <section id="results" className={s.section}>
            <span className="watermark-no">{no("results")}</span>
            <Evidence no={no("results")} data={cs.evidence} />
          </section>
        )}
      </>
    ),
    "overview": (
      <>
        {/* ---------- Overview ---------- */}
        <section id="overview" className={s.section}>
          <span className="watermark-no">{no("overview")}</span>
          <div className={`container ${s.stack56}`}>
            <div className={s.headText}>
              <p className={s.kicker}>({no("overview")})&nbsp;&nbsp;OVERVIEW</p>
              <h2 className={`${s.h2} ${s.w900}`}>
                The problem, my part and <em>the outcome</em>
              </h2>
            </div>
            <div className={`reveal ${s.cols3}`}>
              {[
                ["The challenge", cs.overview.challenge],
                ["My role", cs.overview.role],
                ["The outcome", cs.overview.outcome],
              ].map(([t, d]) => (
                <div key={t} className={s.col}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>

            {cs.architecture && (
              <figure className={`reveal ${s.arch}`} aria-label="System architecture">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/dot-grid.svg" alt="" className={s.dotGrid} width={1120} height={700} />
                <figcaption className={s.archHead}>
                  <span>SYSTEM ARCHITECTURE</span>
                  <em>{cs.architecture.caption}</em>
                </figcaption>
                <div className={s.archRow}>
                  {cs.architecture.clients.map((c) => (
                    <div key={c.name} className={s.node}>
                      <b>{c.name}</b>
                      <span>{c.sub}</span>
                    </div>
                  ))}
                </div>
                <div className={s.connector}>
                  <span className={s.vbar} />
                  <span className={s.connLabel}>{cs.architecture.edge}</span>
                  <span>↓</span>
                </div>
                <div className={s.api}>
                  <div className={s.apiHead}>
                    <b>{cs.architecture.api.name}</b>
                    <span>{cs.architecture.api.sub}</span>
                  </div>
                  <ul className={s.apiTags}>
                    {cs.architecture.api.modules.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.connector}>
                  <span className={s.vbar} />
                  <span>↓</span>
                </div>
                <div className={`${s.archRow} ${s.infra}`}>
                  {cs.architecture.infra.map((c) => (
                    <div key={c.name} className={s.node}>
                      <b>{c.name}</b>
                      <span>{c.sub}</span>
                    </div>
                  ))}
                </div>
                <div className={s.archFoot}>
                  <span>{cs.architecture.footLeft}</span>
                  <em>{cs.architecture.footRight}</em>
                </div>
              </figure>
            )}
          </div>
        </section>
      </>
    ),
    "adapt": (
      <>
        {/* ---------- Skills & adapting ---------- */}
        {cs.adapt && (
          <section id="adapt" className={`surface-dark ${s.section} ${s.adaptSection}`} data-surface="dark">
            <span className="watermark-no">{no("adapt")}</span>
            <Adapt no={no("adapt")} data={cs.adapt} />
          </section>
        )}
      </>
    ),
    "use-cases": (
      <>
        {/* ---------- Use cases ---------- */}
        <section id="use-cases" className={s.section}>
          <span className="watermark-no">{no("use-cases")}</span>
          <div className={`container ${s.stack48}`}>
            <Head
              no={no("use-cases")}
              label="USE CASES"
              title="Who uses it, "
              em="and how"
              lede={`${cs.useCases.length} kinds of user, each with their own flows.`}
            />
            <div className={`reveal ${s.useCases}`} data-count={cs.useCases.length}>
              {cs.useCases.map((u, i) => (
                <div key={u.actor} className={s.useCase}>
                  <p className={s.useCaseHead}>
                    <span className={s.modNo}>{pad(i + 1)}</span>
                    <span>{u.actor}</span>
                  </p>
                  <ul>
                    {u.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    ),
    "how": (
      <>
        {/* ---------- Pull quote ---------- */}
        <figure className={s.quote}>
          <span aria-hidden>“</span>
          <blockquote>{cs.quote}</blockquote>
          <figcaption>— {cs.quoteSource}</figcaption>
        </figure>

        {/* ---------- How it works ---------- */}
        <section id="how" className={`surface-dark ${s.section} ${s.reels}`} data-surface="dark">
          <span className="watermark-no">{no("how")}</span>
          <div className={`container ${s.stack48}`}>
            <Head dark no={no("how")} label={cs.flow.label} title={cs.flow.title} em={cs.flow.titleEm} lede={cs.flow.lede} />
            <Pipeline flow={cs.flow} />
            {cs.flow2 && (
              <>
                <div className={s.subHead}>
                  <p className={s.kicker}>{cs.flow2.label}</p>
                  <h3>
                    {cs.flow2.title}
                    <em>{cs.flow2.titleEm}</em>
                  </h3>
                  <p>{cs.flow2.lede}</p>
                </div>
                <Pipeline flow={cs.flow2} />
              </>
            )}

            {cs.engineeringHead && (
              <div className={s.subHead}>
                <p className={s.kicker}>{cs.engineeringHead.label}</p>
                <h3>
                  {cs.engineeringHead.title}
                  <em>{cs.engineeringHead.titleEm}</em>
                </h3>
                <p>{cs.engineeringHead.lede}</p>
              </div>
            )}
            <div className={`reveal ${s.table}`} role="table" aria-label="Problem and what I built">
              <div className={s.tableHead} role="row">
                <span role="columnheader">THE PROBLEM</span>
                <span role="columnheader">{cs.engineeringHead?.col ?? "WHAT I BUILT"}</span>
              </div>
              {cs.engineering.map((r) => (
                <div key={r.problem} className={s.tableRow} role="row">
                  <p role="cell">{r.problem}</p>
                  <p role="cell">{r.built}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    ),
    "security": (
      <>
        {/* ---------- Security incident ---------- */}
        {cs.incident && (
          <section id="security" className={s.section}>
            <span className="watermark-no">{no("security")}</span>
            <div className={`container ${s.stack48}`}>
              <Head
                no={no("security")}
                label={cs.incident.label}
                title={cs.incident.title}
                em={cs.incident.titleEm}
                lede={cs.incident.lede}
              />
              <div className={`reveal ${s.incident}`}>
                <ol className={s.timeline}>
                  {cs.incident.steps.map((st) => (
                    <li key={st.title}>
                      <span className={s.tlDate}>{st.date}</span>
                      <span className={s.tlDot} aria-hidden />
                      <div>
                        <h3>{st.title}</h3>
                        <p>{st.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <ul className={s.outcomes}>
                  {cs.incident.outcomes.map((o) => (
                    <li key={o.text}>
                      <span>{o.metric}</span>
                      <p>{o.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </>
    ),
    "screens": (
      <>
        {/* ---------- Screens ---------- */}
        {cs.screenshots?.length ? (
          <section id="screens" className={s.section}>
            <span className="watermark-no">{no("screens")}</span>
            <div className={`container ${s.stack48}`}>
              <Head
                no={no("screens")}
                label="SCREENS"
                title="From the "
                em="real product"
                lede={cs.screensLede ?? "Screenshots from the project's public repository."}
              />
              <div className={s.screens}>
                {cs.screenshots.map((sh) => (
                  <figure key={sh.src} className={`reveal ${s.screen}`}>
                    <BrowserFrame
                      domain={project.domain}
                      image={sh.src}
                      alt={sh.caption}
                      height={330}
                      sizes="(max-width: 900px) 100vw, 548px"
                      shadow="drop"
                      position={sh.position ?? "top"}
                    />
                    <figcaption>{sh.caption}</figcaption>
                  </figure>
                ))}
              </div>
              {cs.showcase?.map((sh) => (
                <figure key={sh.src} className={`reveal ${s.showcase}`}>
                  <Image src={sh.src} alt={sh.caption} width={sh.width} height={sh.height} sizes="(max-width: 1152px) 100vw, 1120px" />
                  <figcaption>{sh.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </>
    ),
    "stack": (
      <>
        {/* ---------- Built with ---------- */}
        <section id="stack" className={`${s.section} ${s.lastLight}`}>
          <span className="watermark-no">{no("stack")}</span>
          <div className={`container ${s.stack48}`}>
            <Head no={no("stack")} label="STACK" title="Built " em="with" />
            {cs.practices && (
              <ol className={`reveal ${s.practices}`}>
                {cs.practices.map((pr, i) => (
                  <li key={pr.title}>
                    <span className={s.file}>{pad(i + 1)}</span>
                    <h3>{pr.title}</h3>
                    <p>{pr.text}</p>
                  </li>
                ))}
              </ol>
            )}
            <ul className={s.checks}>
              {cs.stack.map((t) => (
                <li key={t} className={s.stackChip}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </>
    ),
  };

  return (
    <main>
      {/* ---------- Hero ---------- */}
      <section className={`surface-dark ${s.hero}`} data-surface="dark">
        <div
          className={s.heroImg}
          style={cs.video ? { background: `url(${cs.video.poster}) center / cover no-repeat` } : undefined}
        >
          {cs.video ? (
            <video
              className={s.heroVideo}
              src={cs.video.src}
              poster={cs.video.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />
          ) : (
            <Image
              src={cs.heroImage ?? project.image}
              alt=""
              fill
              preload
              sizes="900px"
              style={
                (cs.heroPosition ?? project.imagePosition) ? { objectPosition: cs.heroPosition ?? project.imagePosition } : undefined
              }
            />
          )}
        </div>
        <span className={s.overlayLeft} aria-hidden />
        <span className={s.overlayFade} aria-hidden />
        <span className={s.overlayTone} aria-hidden />

        <div className={`container ${s.heroInner}`}>
          <div className={s.crumbRow}>
            <nav className={s.crumb} aria-label="Breadcrumb">
              <Link href="/work">← All projects</Link>
              <span aria-hidden>/</span>
              <span className={s.crumbNow}>
                CASE STUDY {projectNo(project)} OF {projectCount}
              </span>
            </nav>
            <span className={s.live}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/dot-white-6.svg" alt="" width={6} height={6} />
              {cs.badge}
            </span>
          </div>

          <div className={s.titleCol}>
            <p className={s.kicker}>{cs.tagline}</p>
            <h1 className={s.heroTitle} data-long={project.title.length > 7 || undefined}>
              <Title text={project.title} />
            </h1>
            <p className={s.heroLede}>{cs.summary}</p>
            <div className={s.heroActions}>
              <a href="#glance" className="btn btn-primary">
                Read the build ↓
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Build something similar →
              </Link>
              {cs.links.length > 0 && <span className={s.sep} aria-hidden />}
              {cs.links.map((l) => (
                <a key={l.href} href={l.href} className={s.iconBtn} aria-label={l.label} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/icons/icon-${l.icon}.svg`} alt="" width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          <dl className={s.meta}>
            {cs.meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ChapterIndex chapters={chapters} />

      {order.map((id) => (
        <Fragment key={id}>{blocks[id]}</Fragment>
      ))}

      {/* ---------- CTA ---------- */}
      <section className={`surface-dark ${s.cta}`} data-surface="dark">
        <Glow src="/icons/glow-cta.svg" className={s.ctaGlow} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/monogram-404.svg" alt="" aria-hidden className={s.ctaMono} width={747} height={520} />
        <p className={s.avail}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/status-dot.svg" alt="" width={7} height={7} />
          Available for new projects
        </p>
        <h2 className={s.ctaTitle}>
          Building something
          <br /> <em>like this</em>?
        </h2>
        <p className={s.ctaText}>
          SaaS, marketplaces, payments and real-time — built for live products with real users, end to end.
        </p>
        <div className={s.ctaActions}>
          <Link href="/contact" className={`btn btn-primary ${s.btnLg}`}>
            Start a project →
          </Link>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className={`btn btn-ghost ${s.btnLg}`}>
            Book a call ↗
          </a>
        </div>
        <p className={s.ctaContact}>
          {site.email}&nbsp;&nbsp;·&nbsp;&nbsp;{site.phoneDisplay}
        </p>
        {cs.links.length > 0 && (
          <div className={`container ${s.links}`} data-count={cs.links.length}>
            {cs.links.map((l) => (
              <a key={l.href} href={l.href} className={s.linkCard} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/icons/icon-${l.icon}-lg.svg`} alt="" width={22} height={22} />
                <span>
                  <small>{l.kicker}</small>
                  <b>{l.label}</b>
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ---------- Next project ---------- */}
      <section className="surface-dark" data-surface="dark">
        <Link href={projectHref(next)} className={`container ${s.next}`}>
          <div className={s.nextText}>
            <p className={s.kicker}>
              NEXT CASE STUDY — {projectNo(next)} / {projectCount}
            </p>
            <p className={s.nextTitle}>{next.title} →</p>
            <p className={s.nextSub}>{next.summary}</p>
          </div>
          <div className={s.nextImg}>
            <Image
              src={next.image}
              alt=""
              fill
              sizes="420px"
              style={next.imagePosition ? { objectPosition: next.imagePosition } : undefined}
            />
          </div>
        </Link>
      </section>

      <PageFooter />
    </main>
  );
}
