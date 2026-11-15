import s from "./case.module.css";

/** Section heading used across the case-study page. */
export default function Head({
  no,
  label,
  title,
  em,
  lede,
  dark,
}: {
  no: string;
  label: string;
  title: string;
  em: string;
  lede?: string;
  dark?: boolean;
}) {
  return (
    <header className={s.head}>
      <div className={s.headText}>
        <p className={s.kicker}>
          ({no})&nbsp;&nbsp;{label}
        </p>
        <h2 className={s.h2}>
          {title}
          <em>{em}</em>
        </h2>
      </div>
      {lede && <p className={`${s.lede} ${dark ? s.ledeDark : ""}`}>{lede}</p>}
    </header>
  );
}
