# Loop Audio — moodboard

Twelve things, two own ranges (Loop and Harbour), a showroom at 1142 Folsom Street. The
customer is either a producer who reads the driver size or a commuter who wants to be told
which pair to buy. The owner's own tone note: "we talk about sound, not hype."

The owner has already chosen the direction — **Put the room in the picture** — so this file
records what the direction is built from, not a second proposal.

## The sites I learned from

| Site | What I watched | What I take |
|---|---|---|
| land-book.com (gallery) | Inter throughout, two sticky elements, 26 running animations, cards reveal on scroll with a short fade-and-rise, no scroll library | The reveal budget: everything enters with a small fade and rise and then stops. Nothing is pinned. |
| awwwards.com/websites (gallery) | Inter Tight, four running animations, a tight asymmetric card grid, no sticky | The confidence to set a grid that is not three equal columns, and to let one tile be twice its neighbour. |
| teenage.engineering/products | te-20, zero running animations, a 26,000px page that is nothing but products on flat tiles, product name and price set as plain type under a cut-out | The product tile: a cut-out object on one flat ground, no shadow, no rounded card, the price plain beside the name. Their page has no motion at all — I keep a little. |
| teenage.engineering/products/ep-133 (inner page) | Seven short videos, product shown at four scales down the page, specs as a plain two-column table at the end | The product page's order: picture large first, the decision facts next, the full spec table last as a table and not as prose. |
| raycast.com | Inter + GeistMono, three.js in the hero, dark ground with a lit object, section reveals ~16px | Dark ground as the default rather than a mode: the ground recedes, one lit thing is the subject. And numbers in a mono-ish tabular setting. |
| linear.app | Inter Variable + Berkeley Mono, 117 running animations on load, no scroll library, headline reveals line by line | The load sequence: the label, then the headline, then the supporting line, then the buttons, ~70ms apart, done in under a second. |

Nothing named above lends this site its identity: no competitor's palette, no competitor's type
pairing, no arrangement a visitor would recognise as theirs. The hero photograph, the amber
accent, the vertical street label and the pale product panel on a dark card are this shop's.

## The direction

**Put the room in the picture.** The site opens on a dark photograph of a listening room that
runs full-bleed across the top two thirds of the first screen; the headline sits over its left
third and runs off the right edge of the viewport; three products sit on tiles along the bottom
of that same screen. The site ships in one mode and it is the room itself: the ground is
near-black `#0B0B0C` with a `#15161A` surface, the ink a warm off-white `#F2F0ED`, the soft ink
`#9A9790`, hairlines `#2A2B30`, and a single accent — amber `#E8A33D`, the colour of a valve
lamp and of the showroom's light — through every price, every primary button and every focus
ring. Those are the owner's seven, in `:root`; there is no second palette, no `[data-theme]`
block and no switch in the header. The one place a light surface appears is the pale panel each
cut-out product sits on (`--product-ground`): a black or silver product cut out onto a
near-black tile loses its shading, so the card stays dark and the panel is the lit window in
it. Display is
**Syne 500** (the one
house-style unlock taken here: a display sans with real character, its tightened slightly
condensed caps hold over a photograph where a neutral sans disappears); body is
**Inter 400**. Scale at 1440: h1 56px / -0.03em / 1.02, h2 28px, product name 20px, price 24px
tabular, vertical labels 11px at 0.22em. 56px is affordable here because the hero carries one
headline and one line under it, with the goods and their prices in the bottom third of the same
screen rather than below the fold. Motion is moderate: one load sequence of four steps under a
second, a 16px/0.6s fade-and-rise as each section enters, and hover that lifts the product's
picture 2% and turns its price amber. Native scrolling, nothing pinned.

Black products cut out on a black tile lose their shading, so the picture inside each dark card
sits on a pale warm panel (`--product-ground`). The card stays dark; the panel is the lit
surface. That is the one place the direction's "dark tiles" is read as a dark card with a lit
window in it, and it is what keeps every product its photograph.

## COMMITMENTS

- The home page's first screen is one dark photograph of a listening room, full-bleed from edge to edge of the viewport, filling the top two thirds; no container, no margin around it.
- The h1 is set over the photograph's left third and its last word runs off the right edge of the viewport — clipped, not wrapped.
- `Loop Audio · 1142 Folsom Street` is set vertically, bottom-to-top, up the left margin of the hero, 11px at 0.22em tracking, as the counterweight to the bleeding headline.
- Three featured products sit on dark cards across the bottom third of that same first screen — the hero band wears `.room` — each with a cut-out picture on a pale panel, a name, and a price in amber; all four in view at 1440×790 without scrolling.
- Every price on the site is tabular, right-aligned in any column of prices, and set at 24px or larger on a product card and a product page.
- The shop page is a two-column asymmetric grid: a category rail on the left at 1024px and up, products on the right, never three equal columns of white cards.
- The product page's first screen carries the large picture, the name, the price and the add-to-cart button together, with the spec table further down as a hairline-ruled two-column table.
- One accent only — amber `#8A5214` on the light ground, `#E8A33D` inside the two `.room` bands — on prices, primary buttons and focus rings; nothing else on the site is coloured.
- One mode: the light print in `:root`, `site.defaultMode: "light"`, no `[data-theme]` block, no `prefers-color-scheme` branch and no switch in the header or the menu.
- Every product picture shows that product. Where no honest photograph of it exists, the card carries a `<Picture>` slot with the product's name, never another product and never another maker's hardware.
