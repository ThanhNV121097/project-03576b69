/**
 * The three directions the owner chooses between — /directions-1, -2, -3.
 *
 * Not part of the site: each renders alone, outside App's layout, and the
 * whole file (with directions.css) is deleted once a direction is chosen.
 * Desktop only, judged at 1440×790. Every name, price and policy here is a
 * row of data/owner/loop-audio-catalogue.xlsx.
 */
import { useEffect } from "react";
import "./directions.css";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&family=Syne:wght@600;700&family=Archivo:wght@400;500&display=swap";

function useFonts() {
  useEffect(() => {
    if (document.getElementById("dir-fonts")) return;
    const l = document.createElement("link");
    l.id = "dir-fonts";
    l.rel = "stylesheet";
    l.href = FONTS;
    document.head.appendChild(l);
  }, []);
}

const usd = (n: number) => "$" + n.toLocaleString("en-US");

/* The three products that have an honest photograph of their own. */
const PICTURED = [
  {
    name: "Loop One Wireless",
    img: "/images/loop-one-wireless.jpg",
    price: 349,
    was: 399,
    short: "Over-ear wireless headphones with adaptive noise cancelling.",
    spec: "40 mm beryllium · 38 h ANC · 268 g",
  },
  {
    name: "Loop Studio Pro",
    img: "/images/loop-studio-pro.jpg",
    price: 279,
    short: "Open-back studio headphones for mixing at home.",
    spec: "45 mm · 32 ohm · 10 Hz–40 kHz",
  },
  {
    name: "Loop Air 2",
    img: "/images/loop-air-2.jpg",
    price: 179,
    short: "In-ear buds with hybrid ANC and a case that charges twice over.",
    spec: "11 mm · 7 h + 28 h · IPX5",
  },
];

/* Everything else the shop sells, as priced lines of type — no picture is
   borrowed from another product to fill a slot. */
const LINES = [
  { name: "Harbour 500 Floorstander", spec: "Three-way · twin 6.5 in · 180 W a channel", price: 1890 },
  { name: "Harbour 200 Bookshelf", spec: "130 W a pair · HDMI ARC · walnut", price: 699 },
  { name: "Harbour Mini", spec: "60 W · AirPlay 2 · pair for stereo", price: 329, was: 379 },
  { name: "Harbour Field", spec: "IP67 · 20 h · USB-C out", price: 219 },
  { name: "Loop Air 2 Sport", spec: "Wing tip · IPX7 · 6 h + 24 h", price: 199 },
  { name: "Tether USB-C DAC", spec: "ES9038Q2M · 32-bit/768 kHz · 4.4 mm", price: 149 },
  { name: "Desk Stand", spec: "Anodised aluminium · 1.4 kg base", price: 79 },
  { name: "Loop Cable Kit", spec: "Three braided cables · two-year warranty", price: 59 },
  { name: "Memory Foam Earpads", spec: "Lambskin or velour · twist-lock", price: 39 },
];

export function DirectionOne() {
  useFonts();
  return (
    <div className="dir d1">
      <div className="d1__wrap">
        <div className="d1__eyebrow">
          <span>Loop Audio — 1142 Folsom Street, San Francisco</span>
          <span>Free US shipping over $75 · 30-day returns · 2-year warranty</span>
        </div>
        <div className="d1__main">
          <div className="dir__in">
            <h1>
              Twelve things we can stand behind. <em>Every number printed.</em>
            </h1>
            <p className="d1__lede">
              Headphones, speakers and the accessories that keep them working. Drivers, ohms,
              grams and hours on every page — we talk about sound, not hype.
            </p>
            <div className="d1__cta">
              <span className="d1__btn">Shop all twelve</span>
              <span className="d1__btn d1__btn--ghost">Hear them on Folsom St</span>
            </div>
          </div>
          <div className="d1__list dir__in dir__in--2">
            <div className="d1__list-head">
              <span>Also in stock</span>
              <span />
              <span style={{ textAlign: "right" }}>USD</span>
            </div>
            {LINES.map((l) => (
              <div className="d1__row" key={l.name}>
                <span className="d1__row-name">{l.name}</span>
                <span className="d1__row-spec">{l.spec}</span>
                <span className="d1__row-price dir__num">
                  {l.was && <s>{usd(l.was)}</s>}
                  {usd(l.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d1__shelf dir__in dir__in--3">
        {PICTURED.map((p) => (
          <article className="d1__card" key={p.name}>
            <img src={p.img} alt={p.name} />
            <div className="d1__card-foot">
              <div>
                <div className="d1__card-name">{p.name}</div>
                <div className="d1__card-sub">{p.spec}</div>
              </div>
              <div className="d1__card-price dir__num">{usd(p.price)}</div>
            </div>
          </article>
        ))}
      </div>
      <span className="dir__tag">Direction 1 — Tell them the numbers</span>
    </div>
  );
}

export function DirectionTwo() {
  useFonts();
  return (
    <div className="dir d2">
      <div className="d2__hero">
        <img src="/images/studio-wide.jpg" alt="A room set up for listening" />
        <div className="d2__strip">
          <img src="/images/speaker-macro.jpg" alt="A speaker driver, close up" />
        </div>
        <div className="d2__rail">
          <span>Loop Audio · 1142 Folsom Street · since 2019</span>
        </div>
        <div className="d2__words dir__in">
          <h1>
            Come and hear it <span className="d2__off">before you buy it.</span>
          </h1>
          <p className="d2__lede">
            Four pairs of headphones and four speakers, set up in one room on Folsom Street.
            Bring the record you know best and listen to all of them.
          </p>
          <div className="d2__meta">
            <span>Showroom Mon–Sat 10:00–18:00</span>
            <span>+1 415 555 0142</span>
            <span>Online orders any time</span>
          </div>
        </div>
      </div>
      <div className="d2__shelf">
        {PICTURED.map((p, i) => (
          <article className={`d2__card dir__in dir__in--${i + 1}`} key={p.name}>
            <div className="d2__card-pic">
              <img src={p.img} alt={p.name} />
            </div>
            <div className="d2__card-foot">
              <div>
                <div className="d2__card-name">{p.name}</div>
                <div className="d2__card-sub">{p.short}</div>
              </div>
              <div className="d2__card-price dir__num">{usd(p.price)}</div>
            </div>
          </article>
        ))}
      </div>
      <span className="dir__tag">Direction 2 — Put the room in the picture</span>
    </div>
  );
}

export function DirectionThree() {
  useFonts();
  const band = LINES.slice(0, 4);
  return (
    <div className="dir d3">
      <div className="d3__split">
        <div className="d3__words dir__in">
          <div className="d3__label">Loop Audio — headphones, speakers, accessories</div>
          <h1>Buy it online. Or walk in and listen first.</h1>
          <p className="d3__lede">
            A small shop on Folsom Street with twelve things in it. Free US shipping over $75,
            thirty days to send it back, and we pay the postage.
          </p>
          <div className="d3__cta">
            <span className="d3__btn">Shop headphones</span>
            <span className="d3__btn d3__btn--ghost">Call +1 415 555 0142</span>
          </div>
          <div className="d3__hours">
            <span>
              <b>Mon–Sat 10:00–18:00</b>Showroom, 1142 Folsom St
            </span>
            <span>
              <b>2–5 business days</b>US delivery
            </span>
            <span>
              <b>Two years</b>Three on the Loop range
            </span>
          </div>
        </div>
        <div className="d3__stage">
          <img src="/images/desk-flatlay.jpg" alt="A desk set up for listening at Loop Audio" />
          <div className="d3__price">
            <div className="d3__price-name">Twelve things, in stock</div>
            <div className="d3__price-fig dir__num">
              $39—1,890
            </div>
          </div>
        </div>
      </div>
      <div className="d3__band">
        <img src="/images/turntable-close.jpg" alt="A record on the turntable in the showroom" />
        <div className="d3__band-inner">
          {band.map((l) => (
            <div className="d3__band-cell" key={l.name}>
              <div className="d3__band-name">{l.name}</div>
              <div className="d3__band-sub">{l.spec}</div>
              <div className="d3__band-price dir__num">{usd(l.price)}</div>
            </div>
          ))}
        </div>
      </div>
      <span className="dir__tag">Direction 3 — Walk in and listen</span>
    </div>
  );
}
