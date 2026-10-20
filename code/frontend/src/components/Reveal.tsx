import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A section that fades and rises 16px as it enters, once. Native scrolling:
 * an IntersectionObserver, not a scroll listener and nothing pinned.
 * prefers-reduced-motion is handled in theme.css, which leaves .reveal fully
 * shown with no transition.
 */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children }: {
  as?: "div" | "section" | "li" | "article";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setShown(true);
        io.disconnect();
      }
    }, { rootMargin: "-10% 0px -10% 0px" });
    io.observe(el);
    return () => { io.disconnect(); };
  }, [shown]);

  return (
    <Tag
      ref={ref as never}
      data-shown={shown ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
