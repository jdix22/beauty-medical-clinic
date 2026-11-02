# Beauty Medical Clinic: website redesign

Redesign of beautymedicalclinic.com for Victoria Adamov, RN (Thornhill), built November 2026.
All treatment information, contact details and photos come from the clinic's current WordPress site.

Live preview: https://jdix22.github.io/beauty-medical-clinic/

## What changed from the old site

- 16 treatment pages, each with quick facts (time, sessions, downtime, results), plain-language
  sections, before/after photos, preparation and aftercare, FAQ, and related treatments.
  The separate FAQ and aftercare pages were folded into the treatment they belong to.
- A "face map" on the home page: tap an area of the face to see which treatments address it.
- Every old address (e.g. `/botox-dysport-faq/`, `/lumeca/`, `/news/`) forwards to its new home,
  so existing Google results and links keep working.
- Tap-to-call, text and WhatsApp on every page, plus a request form that pre-selects the treatment.
- Search and AI-answer groundwork: unique titles and descriptions, structured data for the clinic,
  Victoria and each treatment, visible FAQs, a sitemap, social preview image.
- Hidden from Google for now (`noindex`) until Victoria approves it.

## Please confirm with Victoria before launch

These were missing or unclear on the old site, so the new site avoids them or uses the old wording:

1. **Hours.** Not published anywhere. The site says "call, text or WhatsApp to book".
2. **Prices.** Not published; the site doesn't list any.
3. **Free consultations.** The old site only says the *lip* consultation is complimentary.
   If all consultations are free, that's worth saying on the home page.
4. **Hydrofacial.** Listed on the old Services page (the link was broken) and mentioned in a
   Google review. Add a page if it's still offered.
5. **Cinderella facelift duration.** Old site says both "10–14 hours" and "8–12 hours". New site uses 8–12.
6. **Numbers in Victoria's bio** (30+ years in medicine, 17+ years in aesthetics, 10+ years teaching)
   are from the old About page, which may be a few years old.
7. **Training.** The old Training page said "under maintenance". The new page invites enquiries
   for Botox, filler and sclerotherapy courses. Confirm she still runs them.
8. **Before/after photos.** All are from the old site; confirm clients consented to web use.
9. **Building name.** The old site says "Medical Arts building"; the sign says "Medical Arts Centre".
   Use whichever matches the Google Business Profile.
10. **Social accounts.** None were linked on the old site. Add Instagram/Facebook if she has them.
11. **Google rating** shows "Excellent · 40 reviews" (from the old site's review widget, Nov 2026).

### Wording that was softened on purpose

Health advertising should avoid absolute or unproven claims, so these old-site phrases were
not carried over: "absolutely safe, no risk, no side effects" (Cinderella), "FDA approved" (PRP),
"permanently kill fat" and "zero non-responders" (BodyFX), "results up to 5–10 years" (Forma),
"the Number One place". The facts behind each treatment are unchanged.

## Launch checklist (when moving to beautymedicalclinic.com)

1. In `_src/build.js` set `SITE = 'https://beautymedicalclinic.com/'` and `NOINDEX = false`,
   and change the `/beauty-medical-clinic/` links in the 404 page to `/`. Rebuild:
   `node _src/build.js`.
2. Point the domain at the new host; old URLs already forward.
3. Optional: set `FORM_ENDPOINT` in `assets/site.js` (e.g. Formspree) so requests send directly
   instead of opening the visitor's email app.
4. Owner to-dos: verify Google Search Console and submit `sitemap.xml`; update the Google Business
   Profile website link, hours and photos; keep name, address and phone identical everywhere.

## Editing

All content lives in `_src/content.js` (facts sheet at the top, then one block per treatment).
Run `node _src/build.js` to regenerate every page. Social image: `_src/og.html` → `assets/og.png`.
