"use client";

import { ViewTransition, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageTransition.module.css";

/** Native route crossfades, with a direct arrival for synchronous history restoration. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const traversing = useRef(false);
  const previousPath = useRef(pathname);

  useEffect(() => {
    // Next restores history synchronously; animate the restored content without changing routing.
    const root = document.documentElement;
    const scrollBehavior = root.style.scrollBehavior;
    let reset = 0;
    const onPopState = () => {
      traversing.current = location.pathname !== previousPath.current;
      if (!traversing.current) return;
      // Restore the history entry's position instantly; animate content, not the scroll offset.
      root.style.scrollBehavior = "auto";
      clearTimeout(reset);
      reset = window.setTimeout(() => { root.style.scrollBehavior = scrollBehavior; }, 500);
    };
    window.addEventListener("popstate", onPopState, { capture: true });
    return () => {
      clearTimeout(reset);
      root.style.scrollBehavior = scrollBehavior;
      window.removeEventListener("popstate", onPopState, { capture: true });
    };
  }, []);

  useLayoutEffect(() => {
    const changed = pathname !== previousPath.current;
    previousPath.current = pathname;
    const needsArrival = traversing.current || typeof document.startViewTransition !== "function";
    traversing.current = false;
    if (!changed || !needsArrival) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = contentRef.current?.animate(
      [{ opacity: 0.35, filter: "blur(1px)" }, { opacity: 1, filter: "blur(0)" }],
      { duration: 460, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
    );
    if (animation) animation.id = "page-history-enter";
    return () => animation?.cancel();
  }, [pathname]);
  return (
    <ViewTransition
      name="page-content"
      share="page-flow"
      update="page-flow"
      enter="page-flow"
      exit="page-flow"
      default="none"
    >
      <div ref={contentRef} className={styles.content}>{children}</div>
    </ViewTransition>
  );
}
