import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { T, useList } from "../editable";
import { usePageMeta } from "../seo";
import { signIn } from "../lib/session";
import Icon, { type IconName } from "../components/Icon";
import { Picture } from "../picture";

/**
 * Sign in. Two columns: the reason to be here and what an account gives on
 * the left, the form on the right, with the showroom photograph as the ground
 * of the left column — never a bare form in an empty page.
 */
export default function SignIn() {
  usePageMeta("pages.signIn.title", "pages.signIn.description");
  const navigate = useNavigate();
  const benefits = useList<{ icon: IconName; title: string; body: string }>("auth.benefits");
  const [email, setEmail] = useState("");
  const input = "w-full border border-line bg-ground px-4 py-3 text-ink";

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn(email.trim());
    navigate("/account");
  }

  return (
    <div className="mx-auto grid max-w-page gap-0 lg:grid-cols-[1fr_440px]">
      <section className="room relative isolate overflow-hidden px-[var(--gutter)] py-[var(--space-16)]">
        <Picture src="/images/speaker-macro.jpg" alt="A driver, close up" width={1200} height={800}
          className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative max-w-[44ch]">
          <T k="auth.signIn.label" as="p" className="label text-accent" />
          <T k="auth.signIn.heading" as="h1" className="mt-3 text-[var(--size-h2)]" />
          <T k="auth.signIn.sub" as="p" className="mt-5 leading-relaxed text-ink-soft" />
          <ul className="mt-12 flex flex-col gap-7 border-t border-line pt-8">
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
      </section>

      <section className="border-t border-line px-[var(--gutter)] py-[var(--space-16)] lg:border-l lg:border-t-0">
        <form onSubmit={submit} data-testid="sign-in-form" className="flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-sm">
            <T k="auth.signIn.email" className="label text-ink-soft" />
            <input id="sign-in-email" name="email" type="email" autoComplete="email" required
              value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <T k="auth.signIn.password" className="label text-ink-soft" />
            <input id="sign-in-password" name="password" type="password" autoComplete="current-password" required className={input} />
          </label>
          <button type="submit" data-testid="sign-in-submit"
            className="label inline-flex items-center justify-center gap-2 bg-accent px-7 py-4 text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-85">
            <Icon name="account" size={16} /><T k="auth.signIn.submit" />
          </button>
          <p className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
            <T k="auth.signIn.noAccount" />
            <Link to="/register" data-testid="to-register" className="text-accent hover:underline"><T k="auth.signIn.register" /></Link>
          </p>
        </form>
      </section>
    </div>
  );
}
