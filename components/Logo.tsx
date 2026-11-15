import styles from "./Logo.module.css";

type Props = {
  /** "nav" = 175.7 × 36 (design nav + home footer), "footer" = 166 × 34 (page footers). */
  variant?: "nav" | "footer";
  className?: string;
};

/** Logo / Full / Light — monogram, divider, name and tagline. */
export default function Logo({ variant = "nav", className }: Props) {
  const src = variant === "nav" ? "/icons/monogram-light.svg" : "/icons/monogram-footer.svg";
  return (
    <span className={`${styles.logo} ${styles[variant]} ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className={styles.mark} />
      <span className={styles.divider} aria-hidden />
      <span className={styles.name}>Hatem Rabea</span>
      <span className={styles.tag}>Senior Full Stack Developer</span>
    </span>
  );
}
