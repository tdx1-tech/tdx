# SEO Checklist — The Dental Experience

Target searches: **"The Dental Experience"**, **"Dr Mashal Zeb Jan"**, **"Dr Faizan Ul Hassan"**.

The code work is done (see "What's already in the repo"). The remaining items are
off-site and only you can do them — they are also the ones that actually move these
three queries. Work top to bottom.

---

## Step 0 — Domain: code is done, DNS connection is not

`www.thedentalexperience.org` is now wired in as the canonical host across
`index.html`, `public/robots.txt` and `public/sitemap.xml` — that file-level work is
finished.

But right now the domain is only **parked** at Namecheap: the "Redirect Domain" record
in your screenshot forwards `thedentalexperience.org` → `www.thedentalexperience.org`
as a plain HTTP redirect, and no A/CNAME record points either host at your Vercel
project. Nothing resolves to the actual site yet. Since you're already hosting on
Vercel, connect the two like this:

1. **In Vercel** — open the project → **Settings → Domains** → add both
   `www.thedentalexperience.org` and `thedentalexperience.org`. Set `www` as the
   **primary** domain (matches the canonical URL already in the code) and let Vercel
   redirect the apex to it. Vercel will display the exact DNS records to add — use the
   live values it shows you, not values from any other source, since Vercel's IPs can
   change. As of now that's typically an `A` record on the apex (`@`) to `76.76.21.21`
   and a `CNAME` on `www` to `cname.vercel-dns.com`, but confirm against what your
   dashboard actually says.
2. **In Namecheap** — go to Domain List → **Manage** → **Advanced DNS**.
   - **Delete the existing "Redirect Domain" record first** — it will otherwise conflict
     with the new DNS records and one of the two will silently lose.
   - Add the `A` and `CNAME` records exactly as Vercel specified in step 1.
3. Wait for propagation (Vercel's dashboard shows "Valid Configuration" once it sees the
   records; usually minutes, can take a few hours). Vercel issues the SSL certificate
   automatically once DNS resolves — no separate action needed.
4. Confirm `https://www.thedentalexperience.org` loads the live site (not a Vercel
   `.vercel.app` placeholder, not the old parking redirect) before moving to Step 1.

Nothing below this line can produce results until that connection is live — Google
can't index a domain that doesn't resolve to the site.

---

## Step 1 — Google Business Profile (highest impact, do this first)

For a local clinic name, the Business Profile — not the website — is what produces the
map pack and the right-hand knowledge panel. Without it, someone searching your clinic
name in Peshawar may not find you at all even with a perfect website.

1. Create it at <https://business.google.com> → category **Dentist**.
2. Enter the name/address/phone **character-for-character identical** to the site:
   - Name: `The Dental Experience`
   - Address: `Office 312, 3rd Floor, Uhad Tower, Shaheen Town, Peshawar, Khyber Pakhtunkhwa, Pakistan`
   - Phone: `+92 316 5944327`
   - Hours: `Monday–Saturday, 11:00–21:00`
   - Website: `https://www.thedentalexperience.org`
   That exact-match consistency is the signal Google uses to link the listing to the site.
3. Complete **verification** (postcard/phone/video). Unverified listings don't rank.
4. Upload real clinic photos and add both doctors' services.
5. Ask existing patients for reviews. Review count and recency are among the strongest
   local ranking factors, and you already have happy patients — just ask them.

Expect a few days to a couple of weeks for verification plus initial ranking.

---

## Step 2 — Get the site indexed

Nothing ranks until Google has crawled it.

1. Add the property in [Google Search Console](https://search.google.com/search-console)
   for `www.thedentalexperience.org`, verify via DNS (add the TXT record Search Console
   gives you at Namecheap) or via your hosting provider's integration if it offers one.
2. Submit `https://www.thedentalexperience.org/sitemap.xml`.
3. Use **URL Inspection → Request indexing** on the homepage to skip the queue.
4. In URL Inspection, open **View crawled page** and confirm the doctors' names appear
   in the rendered HTML. This app renders client-side, so this check matters — if the
   names are missing, Google isn't seeing your content.
5. Do the same at [Bing Webmaster Tools](https://www.bing.com/webmasters) — it also
   feeds ChatGPT search results.

---

## Step 3 — Confirm the markup is being read

- [Rich Results Test](https://search.google.com/test/rich-results) — paste the live URL.
  You should see the `Dentist` entity and both `Person` entities detected.
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — confirms
  the OG image renders for WhatsApp shares, which is how most patients will share it.

---

## Step 4 — Build name authority for the two doctors

Person-name searches rank on corroborating sources, not just your own site. Each of
these creates an independent reference Google can tie back to the clinic:

- Complete, cross-linked Instagram/Facebook profiles for both doctors, each linking to
  the site. Then add those URLs to the `sameAs` field of each `Person` in `index.html`
  (currently omitted because I don't have the handles).
- Pakistani directory listings: Marham, Oladoc, Healthwire, Sehat.pk. These rank well
  for Pakistani doctor names and often outrank practice sites — better that they point
  at you than at a competitor.
- Dr. Faizan has 11 published articles: ensure his Google Scholar / ResearchGate
  profile lists the clinic, and add those URLs to his `sameAs`.
- Dr. Mashal's FCPS "first/youngest" distinction is genuinely newsworthy — local press
  or dental-association coverage would be a strong authority signal.

---

## Realistic expectations

| Query | Outlook |
| --- | --- |
| `The Dental Experience Peshawar` | Should reach #1 within weeks of indexing + verified GBP. Effectively uncontested. |
| `Dr Mashal Zeb Jan` / `Dr Faizan Ul Hassan` | Very achievable — distinctive names with little competition. Needs Step 4 to hold the top spot against directory sites. |
| `The Dental Experience` (no city) | **Hardest.** Other practices worldwide use this exact name, and Google will favour whichever is geographically closest to the searcher. Expect to win it for users in/near Peshawar, not globally. Don't treat a global #1 here as the success metric. |

---

## What's already in the repo

Done, no further action needed:

- `index.html` — title, meta description, canonical (`www.thedentalexperience.org`),
  robots directives, Open Graph + Twitter cards, geo hints for Peshawar.
- Static JSON-LD `@graph` with a `Dentist` node (address, hours, phone, services,
  service area) and a `Person` node per doctor (credentials, specialties, `worksFor`),
  cross-linked by `@id`. Static rather than JS-injected so crawlers get it without
  executing JavaScript. Re-verified to parse with no dangling references after the
  domain swap.
- `public/og-image.jpg` — 1200×630 social preview.
- `public/robots.txt` — crawlable, points at `www.thedentalexperience.org/sitemap.xml`.
- `public/sitemap.xml` — one entry (single-URL app), `<loc>` set to the live domain.

### Known limitation

The whole site is one URL driven by tab state, so **there is one indexable page**. Both
doctors share it, which caps how well either name can rank on its own and leaves the
services and case-study content with no URL of its own.

The fix is real routing — `/dr-mashal-zeb-jan` and `/dr-faizan-ul-hassan` as separate
pages with their own title, description and `Person` schema, plus `/services`, `/cases`,
`/contact`. That was deliberately scoped out of this pass. It's the single biggest
remaining lever on the two name queries; worth doing once the items above are live.
