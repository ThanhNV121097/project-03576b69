import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useContent } from "../editable";

type Mode = "light" | "dark";

function current(): Mode {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Light or dark. Before the first paint, index.html applies the visitor's
 * stored choice, or else the site's default mode (content.json
 * site.defaultMode: "system" follows the visitor's device, "light" or "dark"
 * starts there); this switch overrides it and remembers the choice. It
 * follows whatever sets the mode — the device's setting, the Studio — so its
 * icon is always the way out of the mode on screen.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode>(() => (typeof window === "undefined" ? "light" : current()));
  const toLight = useContent("nav.theme.toLight");
  const toDark = useContent("nav.theme.toDark");

  useEffect(() => {
    const sync = () => setMode(current());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", sync);
    const watch = new MutationObserver(sync);
    watch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    sync();
    return () => {
      mq.removeEventListener("change", sync);
      watch.disconnect();
    };
  }, []);

  const flip = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice lasts for this page only */
    }
    setMode(next);
  };

  // An icon, not a word: a sun to go light, a moon to go dark. The words are
  // its label, for screen readers and the tooltip.
  const label = mode === "dark" ? toLight : toDark;
  return (
    <button
      type="button"
      onClick={flip}
      aria-pressed={mode === "dark"}
      aria-label={label}
      title={label}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-pill)] text-ink transition-colors hover:bg-surface ${className}`}
    >
      {mode === "dark" ? <Sun aria-hidden="true" size={20} strokeWidth={1.75} /> : <Moon aria-hidden="true" size={20} strokeWidth={1.75} />}
    </button>
  );
}
