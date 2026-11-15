"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Glow } from "@/components/ui";
import { site } from "@/lib/site";
import { sendMessage, type ContactState } from "./actions";
import styles from "./contact.module.css";

const projectTypes = ["SaaS platform", "Marketplace", "Social / mobile backend", "Payments", "Other"];
const timelines = ["ASAP", "1–3 months", "3+ months", "Just exploring"];

const direct = [
  { label: "EMAIL", value: site.email, href: `mailto:${site.email}` },
  { label: "WHATSAPP", value: site.phoneDisplay, href: site.whatsapp },
  { label: "LINKEDIN", value: site.linkedinHandle, href: site.linkedin },
  { label: "GITHUB", value: site.githubHandle, href: site.github },
];

function Chips({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className={styles.chips}>
      <legend className={styles.label}>{legend}</legend>
      <div className={styles.chipRow}>
        {options.map((o) => (
          <label key={o} className={styles.chip} data-on={value === o || undefined}>
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="sr-only"
            />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Sent({ state }: { state: Extract<ContactState, { status: "sent" }> }) {
  const first = state.name.split(" ")[0] || "there";
  return (
    <section className={`surface-dark ${styles.sent}`} data-surface="dark" aria-live="polite">
      <Glow src="/icons/glow-sent.svg" className={styles.sentGlow} />
      <span className={styles.check}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/check.svg" alt="" width={36} height={36} />
      </span>
      <h1 className={styles.sentTitle}>
        Message <em>sent.</em>
      </h1>
      <p className={styles.sentText}>
        Thanks, {first} — your message is in. I&apos;ll reply personally with next steps.
      </p>
      <dl className={styles.summary}>
        <div>
          <dt>PROJECT</dt>
          <dd>{state.projectType || "—"}</dd>
        </div>
        <div>
          <dt>TIMELINE</dt>
          <dd>{state.timeline || "—"}</dd>
        </div>
        <div>
          <dt>SENT TO</dt>
          <dd>{site.email}</dd>
        </div>
      </dl>
      <div className={styles.sentActions}>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/work" className="btn btn-ghost">
          See selected work →
        </Link>
      </div>
    </section>
  );
}

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, { status: "idle" } as ContactState);
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [timeline, setTimeline] = useState(timelines[1]);
  // Controlled so values survive a failed submit (form actions reset uncontrolled fields).
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const bind = (key: keyof typeof values) => ({
    name: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value })),
  });

  if (state.status === "sent") return <Sent state={state} />;

  const errors = state.status === "error" ? state.fields ?? {} : {};

  return (
    <section className={`surface-dark ${styles.main}`} data-surface="dark">
      <Glow src="/icons/glow-contact.svg" className={styles.glow} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/monogram-contact.svg" alt="" aria-hidden className={styles.monogram} width={660} height={460} />

      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <p className={styles.kicker}>(CONTACT)&nbsp;&nbsp;·&nbsp;&nbsp;REPLIES PERSONALLY</p>
          <h1 className={styles.title}>
            Let&apos;s build
            <br />
            <em>something</em>.
          </h1>
          <p className={styles.lede}>
            Tell me about your product — a SaaS, a marketplace, a social app or a payments flow. I&apos;ll get
            back to you with next steps.
          </p>
          <p className={styles.badge}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/dot-contact.svg" alt="" width={7} height={7} />
            Available for new projects · Cairo, EG (GMT+2)
          </p>
          <ul className={styles.direct}>
            {direct.map((d) => (
              <li key={d.label}>
                <a href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <span className={styles.directLabel}>{d.label}</span>
                  <span className={styles.directValue}>{d.value}</span>
                  <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form action={action} className={styles.form} noValidate>
          <div className={styles.formHead}>
            <h2>Start a project</h2>
            <span>~2 min</span>
          </div>

          <div className={styles.pair}>
            <label className={styles.field}>
              <span className={styles.label}>YOUR NAME</span>
              <input
                {...bind("name")}
                autoComplete="name"
                placeholder="Your name"
                required
                aria-invalid={!!errors.name || undefined}
                aria-describedby={errors.name ? "err-name" : undefined}
              />
              {errors.name && (
                <span id="err-name" className={styles.error}>
                  {errors.name}
                </span>
              )}
            </label>
            <label className={styles.field}>
              <span className={styles.label}>EMAIL</span>
              <input
                {...bind("email")}
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
                aria-invalid={!!errors.email || undefined}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && (
                <span id="err-email" className={styles.error}>
                  {errors.email}
                </span>
              )}
            </label>
          </div>

          <Chips
            name="projectType"
            legend="PROJECT TYPE"
            options={projectTypes}
            value={projectType}
            onChange={setProjectType}
          />
          <Chips name="timeline" legend="TIMELINE" options={timelines} value={timeline} onChange={setTimeline} />

          <label className={styles.field}>
            <span className={styles.label}>TELL ME ABOUT IT</span>
            <textarea
              {...bind("message")}
              rows={4}
              placeholder="What are you building, and where are you stuck?"
              required
              aria-invalid={!!errors.message || undefined}
              aria-describedby={errors.message ? "err-message" : undefined}
            />
            {errors.message && (
              <span id="err-message" className={styles.error}>
                {errors.message}
              </span>
            )}
          </label>

          <input type="text" name="company" tabIndex={-1} autoComplete="off" className={styles.hp} aria-hidden />

          <button type="submit" className={styles.submit} disabled={pending}>
            {pending ? "Sending…" : "Send message →"}
          </button>
          <p className={styles.fine} role={state.status === "error" ? "alert" : undefined}>
            {state.status === "error" ? state.message : "No spam. Your details are only used to reply to you."}
          </p>
        </form>
      </div>
    </section>
  );
}
