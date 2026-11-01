# Datum Labs design system: Security Print

Chosen by the owner on 2026-11-01 from three directions (Security Print, Blueprint, Swiss List Poster), after four rejections of the editorial-hairline design. Method: the Impeccable design skill (pbakaus/impeccable), applied as a redesign: replace the visual world, never polish the old one.

## Direction contract

**THESIS.** The site is a certified financial instrument. It speaks the visual language people already trust for money that must not be forged: security printing (guilloche, intaglio, MICR encoding). It refuses the category default of editorial hairlines, italic serif display, small tracked mono labels, and icon-card grids.

**OWN-WORLD.** Security paper ground (`--sp-paper` #F2F4FA, cool, never cream) carrying a faint engraved line field. Prussian ink (`--sp-ink` #060B33). Sapphire intaglio (`--sp-sapphire` #2E4FE0; brand `#4A6CF7` when lit on dark). Navy bands carry light guilloche. Display: Archivo at width 125, weight 800, uppercase. Body: Archivo regular width, 400/500. Data only (MICR lines, run IDs, figures in statements): Martian Mono. Corners 2 to 3px. Ledger rows ruled with dotted ink. Ornament is geometry only: guilloche rosettes and interference bands, generated in code.

**STORY.** A protocol lead sees a statement of what their protocol kept, with its provenance encoded on it, and understands that Datum produces that document monthly. They request their own, free.

**FIRST VIEWPORT.** Left: the H1 in extended caps, the second half in sapphire; lede; one sapphire primary action with its promise beside it. Right: a slowly turning guilloche rosette, with the Statement of Net instrument overlapping it and dropping across the seam into the navy band below; its MICR line encodes run, query and coverage.

**SIGNATURE.** The rosette phase-shifts continuously (off under reduced motion). MICR fields explain themselves on hover and focus.

**FORM.** Security Print, lead of three.

## Rules (from the Impeccable craft floor, binding here)

- No eyebrows or kickers above headings. The heading carries itself.
- No icon-plus-heading-plus-text card grids. Lists are ledgers (ruled rows), documents are instruments.
- No hero-metric template (big number, small label, supporting stats).
- No section numbers unless the sequence carries information.
- No sparklines as decoration. Charts appear only inside reports, with data.
- Mono is for data and encodings, never a "technical" costume.
- One rosette per page at most. Guilloche bands join sections or frame instruments; never as wallpaper.
- Illustrative figures carry a SPECIMEN stamp. Claims stay true.
- Theme browser surfaces: selection, focus rings, tabular numerals.
- No em dashes in copy we author.
