import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { T, useContent, useList } from "./editable";
import { PageViews } from "./site";
import { useCart, cartTotals } from "./lib/mock/cart";
import { useSession, signOut } from "./lib/session";
import Logo from "./components/Logo";
import Icon from "./components/Icon";
import MenuToggle from "./components/MenuToggle";
import MobileMenu from "./components/MobileMenu";
import ThemeToggle from "./components/ThemeToggle";
import ContactDock from "./components/ContactDock";
import PhotoCredits from "./components/PhotoCredits";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Help from "./pages/Help";
import Contact from "./pages/Contact";

/** A new page starts at the top, the way a new page of a shop does. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ground font-body text-ink antialiased">
      <ScrollToTop />
      <PageViews />
      <Header />
      <main className="flex-1" style={{ paddingBottom: "var(--dock-space)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/account" element={<Account />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ContactDock />
    </div>
  );
}

function Header() {
  const links = useList<{ label: string; href: string }>("nav.links");
  const name = useContent<string>("site.name");
  const cartLabel = useContent<string>("nav.cart");
  const accountLabel = useContent<string>("nav.account");
  const signInLabel = useContent<string>("nav.signIn");
  const [open, setOpen] = useState(false);
  const { count } = cartTotals(useCart());
  const session = useSession();
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-page items-center gap-6 px-[var(--gutter)]"
        style={{ height: "var(--header-h)" }}>
        <Link to="/" aria-label={name} className="mr-auto">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {links.map((l, i) => (
            <Link key={l.href} to={l.href} className="text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-ink">
              <T k={`nav.links.${i}.label`} />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link to={session ? "/account" : "/sign-in"} aria-label={session ? accountLabel : signInLabel}
            data-testid="account-link"
            className="grid h-10 w-10 place-items-center text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-ink">
            <Icon name="account" />
          </Link>
          <Link to="/cart" aria-label={cartLabel} data-testid="cart-link"
            className="relative grid h-10 w-10 place-items-center text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-ink">
            <Icon name="cart" />
            {count > 0 && (
              <span data-testid="cart-count"
                className="tabular absolute right-0 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-[var(--radius-pill)] bg-accent px-1 text-[10px] font-medium text-accent-ink">
                {count}
              </span>
            )}
          </Link>
          <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} className="lg:hidden" />
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)}>
        {links.map((l, i) => (
          <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="font-display text-3xl">
            <T k={`nav.links.${i}.label`} />
          </Link>
        ))}
        <Link to={session ? "/account" : "/sign-in"} onClick={() => setOpen(false)} className="font-display text-3xl">
          <T k={session ? "nav.account" : "nav.signIn"} />
        </Link>
      </MobileMenu>
    </header>
  );
}

function Footer() {
  const session = useSession();
  const phone = useContent<string>("contact.phone");
  const email = useContent<string>("contact.email");
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-page gap-12 px-[var(--gutter)] py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <T k="site.description" as="p" className="max-w-[34ch] text-sm leading-relaxed text-ink-soft" />
        </div>
        <nav className="flex flex-col gap-3 text-sm">
          <T k="footer.shop" className="label text-ink-soft" />
          <Link to="/shop" className="hover:text-accent"><T k="nav.links.0.label" /></Link>
          <Link to="/shop/headphones" className="hover:text-accent"><T k="nav.links.1.label" /></Link>
          <Link to="/shop/speakers" className="hover:text-accent"><T k="nav.links.2.label" /></Link>
          <Link to="/shop/accessories" className="hover:text-accent"><T k="nav.links.3.label" /></Link>
        </nav>
        <nav className="flex flex-col gap-3 text-sm">
          <T k="footer.account" className="label text-ink-soft" />
          {session ? (
            <>
              <Link to="/account" className="hover:text-accent"><T k="nav.account" /></Link>
              <Link to="/cart" className="hover:text-accent"><T k="nav.cart" /></Link>
              <button type="button" onClick={signOut} className="text-left hover:text-accent"><T k="nav.signOut" /></button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="hover:text-accent"><T k="nav.signIn" /></Link>
              <Link to="/register" className="hover:text-accent"><T k="auth.register.label" /></Link>
              <Link to="/cart" className="hover:text-accent"><T k="nav.cart" /></Link>
            </>
          )}
          <Link to="/help" className="hover:text-accent"><T k="footer.help" /></Link>
        </nav>
        <div className="flex flex-col gap-3 text-sm">
          <T k="footer.reach" className="label text-ink-soft" />
          <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="tabular flex items-center gap-2 hover:text-accent">
            <Icon name="phone" size={16} />
            {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-accent">
            <Icon name="mail" size={16} />
            {email}
          </a>
          <Link to="/contact" className="flex items-center gap-2 hover:text-accent">
            <Icon name="chat" size={16} />
            <T k="contact.formHeading" />
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-page flex-col gap-3 border-t border-line px-[var(--gutter)] py-8 text-xs leading-relaxed text-ink-soft">
        <T k="footer.rights" as="p" />
        <T k="footer.independent" as="p" className="max-w-[80ch]" />
        <PhotoCredits />
      </div>
    </footer>
  );
}
