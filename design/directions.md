# Loop Audio — directions for the design

## The reading

Loop Audio is a twelve-item shop, not a marketplace: four pairs of headphones, four speakers, four accessories, almost all of them its own two ranges — Loop and Harbour — sold online from a showroom at 1142 Folsom Street, San Francisco, since 2019. The people who buy here are two kinds, and the owner's own testimonials name them: a producer in Oakland who mixes at home and wants to know the driver is 45 mm and the load is 32 ohm, and a commuter, a runner and a kitchen listener who want to be told which one is right and then get on with it. Nobody arrives here for the lowest price — a $39 earpad and a $1,890 floorstander sit in the same catalogue, free shipping starts at $75, the return window is 30 days with the postage paid, and the warranty is two years, three on the Loop range. So the shop sells on expertise and on being specific: the owner's own tone note says "we talk about sound, not hype," and every product detail they wrote is a measurement, not an adjective. What it is not: a gadget discounter, a lifestyle brand selling a mood, or a store with a hundred SKUs that needs search and filters — twelve things, each of which the owner can stand behind, and a room on Folsom Street where you can hear them.

Three readings of that hold up, and they differ on which half of the customer they talk to first: the one who reads the numbers, the one who wants to hear the room, and the one who would come in if they knew they could.

---

## Tell them the numbers

- **Suits you if:** your best customers already know what a 32 ohm load means, and the reason they trust you is that you print the measurement instead of the adjective.
- **Palette (light):** ground `#F4F3F1`, surface `#FFFFFF`, ink `#121212`, ink-soft `#6B6660`, line `#DDD9D4`, accent `#D1341F`, accent-ink `#FFFFFF`.
- **Faces:** display **Space Grotesk** 500 (the house style's one unlock, taken here: a grotesk with real character, because its single-storey figures and square terminals make a spec row and a price read like instrument lettering — Inter sets numbers that look like a form); body **Inter** 400.
- **Scale at 1440:** h1 44px / -0.02em / 1.05, h2 30px, price 40px tabular, spec rows 15px, labels 11px with 0.14em tracking. Small on purpose: this first screen has to carry a headline, five priced rows and three goods, so the space goes to the catalogue and the prices are the big type.
- **First screen:** no hero photograph at all — a wall of type on paper, left edge, with a hairline-ruled price list down the right and a full-bleed row of three cut-out products across the bottom.
- **The one device:** the hairline rule system. Every rule on the screen is a true 1px line in `--line`, and the price list's rules run from the gutter past the right edge of the container, so the list reads as a continuation of the page rather than a box on it. Prices are tabular and right-aligned so the digits stack.

## Put the room in the picture

- **Suits you if:** most of your customers cannot tell you what they want in specs — they want to be shown what good sounds like and then told which pair to buy.
- **Palette (dark):** ground `#0B0B0C`, surface `#15161A`, ink `#F2F0ED`, ink-soft `#9A9790`, line `#2A2B30`, accent `#E8A33D`, accent-ink `#0B0B0C`.
- **Faces:** display **Syne** 600 (the unlock for this direction: a display sans with real character — its tightened, slightly condensed caps hold at 64px over a photograph where a neutral sans would disappear); body **Inter** 400.
- **Scale at 1440:** h1 64px / -0.03em / 1.02, h2 28px, product name 20px, price 24px tabular, vertical label 11px with 0.22em tracking.
- **First screen:** one dark photograph of a room full-bleed across the top two thirds, the headline set over its left third and running off the right edge, three products on dark tiles along the bottom.
- **The one device:** the headline breaks its container and bleeds off the right edge of the viewport, with the shop's name and street set vertically up the left margin as the counterweight.

## Walk in and listen

- **Suits you if:** the thing that closes a sale for you is the room on Folsom Street, and you want the site to feel like the shop front rather than a catalogue.
- **Palette (saturated ground):** ground `#1F3BE0`, surface `#17299E`, ink `#F2EFE9`, ink-soft `#BFC6F2`, line `#4458E8`, accent `#0A0A0A`, accent-ink `#F2EFE9`.
- **Faces:** display **Archivo** 500 (no unlock used — the house sans, because this direction's character is the colour and the scale, not the letterforms); body **Inter** 400.
- **Scale at 1440:** h1 56px / -0.02em / 1.05, h2 26px, price 56px tabular in the black block, list prices 20px tabular.
- **First screen:** a split — words on the left on a saturated blue ground, one product photographed large on the right, its price in a black block that overlaps the picture; a full-bleed photographic band of speaker prices along the bottom.
- **The one device:** the overlap. The black price block crosses the edge of the product picture, and the picture itself runs off the top of the band below it, so three planes meet at one corner.

---

## Pictures

Six photographs are shared by the three screens, and no photograph appears twice at the same ratio or crop:

| File | Used for | D1 | D2 | D3 |
|---|---|---|---|---|
| `loop-one-wireless.jpg` | Loop One Wireless | 1:1 cut-out tile, paper ground, multiply | 3:2 cut-out on a pale tile | — |
| `loop-studio-pro.jpg` | Loop Studio Pro | 1:1 cut-out tile | 3:2 cut-out on a pale tile | — |
| `loop-air-2.jpg` | Loop Air 2 | 1:1 cut-out tile | 3:2 cut-out on a pale tile | — |
| `studio-wide.jpg` | the listening room | — | 16:7 full-bleed hero, focal 32% 46%, darkened to 0.52 | — |
| `turntable-close.jpg` | a record playing in the showroom | — | — | 23:32 portrait filling the right half, focal 58% 44% |
| `speaker-macro.jpg` | a driver, close up | — | — | 32:5 full-bleed band, focal 50% 42%, darkened to 0.38 |

A seventh file, a desk flat-lay, was found and then deleted: another maker's laptop was in frame, and a recognisable competitor's hardware is their logo one step softer.

Only the three pairs of headphones have an honest photograph of their own, so only those three are ever shown as a card with a picture, and no photograph carries two names. The speakers and the accessories appear as priced lines of type — no slot is filled with a picture of something else, and no rectangle is hand-drawn where a picture is missing. Direction 3 shows no product card at all: one scene of the shop, a price range over it, and the speakers as a band of priced type. The owner's own product photography replaces all six files.

## Not used

No reference site's identity is borrowed here: no competitor's palette, type pairing or arrangement. Every price, name, description, address, hour and policy on the three screens is the owner's own row from `data/owner/loop-audio-catalogue.xlsx`.
