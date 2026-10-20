import { Link } from "react-router-dom";
import { T, useList } from "../editable";
import Icon, { type IconName } from "./Icon";

/**
 * What a page behind sign-in shows a visitor who is not signed in: why they
 * are here, what an account gives them, and the two ways on. Never a bare
 * form floating in an empty page.
 */
export default function SignInPanel({ noteKey }: { noteKey: string }) {
  const benefits = useList<{ icon: IconName; title: string; body: string }>("auth.benefits");
  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
      <T k="auth.signIn.label" as="p" className="label text-ink-soft" />
      <T k="auth.signIn.heading" as="h1" className="mt-3" />
      <T k={noteKey} as="p" className="mt-5 max-w-[52ch] leading-relaxed text-ink-soft" />
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/sign-in" data-testid="panel-sign-in"
          className="label inline-flex items-center gap-2 bg-accent px-7 py-4 text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-85">
          <Icon name="account" size={16} /><T k="auth.signIn.submit" />
        </Link>
        <Link to="/register"
          className="label inline-flex items-center gap-2 border border-line px-7 py-4 text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent">
          <T k="auth.register.label" />
        </Link>
      </div>
      <ul className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
        {benefits.map((b, i) => (
          <li key={b.title} className="flex gap-4">
            <Icon name={b.icon} size={20} className="mt-1 text-accent" />
            <div>
              <T k={`auth.benefits.${i}.title`} as="h2" className="text-base" />
              <T k={`auth.benefits.${i}.body`} as="p" className="mt-2 text-sm leading-relaxed text-ink-soft" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
