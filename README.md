# anotimpuri.com

Website for **ANOTIMPURI / Vivaldi**, the national tour of the Romanian Guitar
Quartet — a series of 9 concerts in heritage venues across Romania, July–August 2026. Organized by Asociația Culturală Kitharalogos, co-financed by AFCN
(Administrația Fondului Cultural Național).

🌐 Live at: <https://anotimpuri.com>

---

## What this site contains

A static, multi-page Romanian-language website with:

| Page                  | File                                                                                    | What it covers                                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Home                  | `index.html`                                                                            | Hero, project intro, four seasons, concert list, quartet group photo, musicians, composers, CTA, partners & sponsors    |
| About                 | `about.html`                                                                            | Project concept, Romanian Guitar Quartet member bios, compact concert program, heritage venues list, partners & sponsors |
| Contact               | `contact.html`                                                                          | Contact form (with anti-spam) and contact details                                                                       |
| Privacy policy        | `confidentialitate.html`                                                                | Cookie policy and privacy/GDPR information                                                                              |
| Musicians (×4)        | `dragos-ilie.html`, `costin-soare.html`, `dan-arhire.html`, `ioan-banescu.html`         | Individual artist pages with photo and full biography                                                                   |
| Composers (×4)        | `iuliana-ciocanea.html`, `oana-oltean.html`, `paul-pintilie.html`, `oana-vardianu.html` | Composer pages with bios                                                                                                |

All pages share the same header (logo, nav, social icons) and footer, defined inline
in each HTML file. There is no build step or framework — these are plain HTML files
served directly.

## Tech stack

- **HTML / CSS** — no JavaScript framework, no build tools
- **Single stylesheet**: `css/styles.css` using CSS custom properties for theming
- **Hosting**: GitHub Pages, served from the `main` branch root
- **Custom domain**: anotimpuri.com (registered via cyberfolks.ro, DNS records at cyberfolks)
- **SSL**: Let's Encrypt cert auto-provisioned by GitHub Pages
- **Contact form backend**: Google Apps Script web app forwarding submissions as
  email to `kitharalogos@gmail.com`

## File layout

```
/
├── index.html
├── about.html
├── contact.html
├── confidentialitate.html
├── dragos-ilie.html        ┐
├── costin-soare.html       │ musician profile pages
├── dan-arhire.html         │
├── ioan-banescu.html       ┘
├── iuliana-ciocanea.html   ┐
├── oana-oltean.html        │ composer profile pages
├── paul-pintilie.html      │
├── oana-vardianu.html      ┘
├── CNAME                   (contains literally: anotimpuri.com — needed by GitHub Pages)
├── README.md
├── css/
│   └── styles.css
└── images/
    ├── dragos-ilie.jpg, costin-soare.jpg, ...      (original artist portraits)
    ├── dragos-ilie2.jpg, costin-soare2.jpg, ...    (current artist portraits, 4:5 ratio — used by pages)
    ├── grup1.jpg, grup2.jpg                         (Romanian Guitar Quartet group photos)
    ├── iuliana-ciocanea.jpg, oana-oltean.jpg, ...  (composer portraits)
    ├── afcn.png, kitharalogos.png                  (individual partner logos)
    ├── parteneri2.png, cu_sprijinul2.png, parteneri_media2.png (partner logo strips)
    ├── hero-poster.jpg                             (homepage hero background)
    ├── vivaldi-title.png                           (large brushy "Vivaldi" for hero)
    └── vivaldi-mark.png                            (small brushy "Vivaldi" for header/footer)
```

## Design system

Colors and fonts are defined at the top of `css/styles.css` as CSS custom properties:

**Palette** — drawn from the project's watercolor poster (warm cream + 4-season accents):

- `--paper` `#f4ead8` (warm cream background)
- `--ink` `#1a1612` (warm near-black text)
- `--summer` `#d66a3f` / `--summer-deep` `#9b4521` (terracotta primary accent)
- `--winter` `#8aa3b8` / `--winter-deep` `#5a7891` (dusty periwinkle)
- `--spring`, `--autumn` (additional seasonal accents)

**Typography** — currently free Google Fonts as substitutes for the designer's
preferred (paid) typefaces:

- `--font-display`: Italianno (script — used for "Vivaldi" word in hero, in places
  where the brushy PNG isn't used)
- `--font-title`: Archivo Black (ANOTIMPURI wordmark)
- `--font-brand`: Montserrat
- `--font-heading` / `--font-names` / `--font-body`: Nunito
- `--font-eyebrow`: Montserrat

The actual brushy "Vivaldi" appearing on the page is a PNG (`vivaldi-mark.png` in
header/footer, `vivaldi-title.png` in the hero), not text — so the script font
substitution doesn't affect the most visible word.

## Layouts

- `.container` — max-width 1200px (default)
- `.container--narrow` — max-width 820px (used for hero subtitles, About concept, contact)
- `.container--wide` — max-width 1080px (used for musician profile pages with photo+bio)
- `.section` — vertical padding wrapper, with `--cream`, `--warm`, `--cool` variants

**Musician/composer page layout** uses `.profile-layout` — a two-column grid: photo
on the left (280px, 4:5 aspect ratio), bio text on the right (~688px wide for
comfortable reading lines). Stacks vertically on screens under 700px.

## Contact form & anti-spam

The form on `contact.html` POSTs to a Google Apps Script web app endpoint.
The Apps Script validates the submission server-side and emails
`kitharalogos@gmail.com` using `MailApp.sendEmail()`, with the visitor's email as
Reply-To.

**Three anti-spam layers**, all client-side:

1. **Honeypot field** — a hidden input named `website` that bots typically fill in.
   If filled on submit, the form silently "succeeds" but discards the message.
2. **Time-gate** — submissions made under 3 seconds after page load are treated as
   bot activity (silent rejection).
3. **Math captcha** — random "x + y" question with operands generated by JavaScript
   at runtime (so they're not visible in static HTML for bots to scrape).

Server-side, the Apps Script also rejects messages with empty required fields,
messages over 5000 characters, names over 200 characters, or emails without "@".

**To activate the form**: deploy the Apps Script as a web app (~5 minutes, one-time,
free with any Google account), then paste the resulting URL into `contact.html` where
it says `const ENDPOINT = 'https://script.google.com/macros/s/REPLACE_WITH_YOUR_WEB_APP_ID/exec';`.

Until that URL is replaced, the form will show "Nu am putut trimite mesajul…" and
suggest emailing directly.

**Quota**: free Gmail accounts can send 100 emails/day via Apps Script. For a
cultural-project contact form this is enormously sufficient.

## Domain & DNS setup

**Registrar**: cyberfolks.ro
**Nameservers**: `ns1.tlh.ro`, `ns2.tlh.ro` (cyberfolks's own DNS infrastructure)

**DNS records pointing the domain at GitHub Pages**, set in cPanel Zone Editor:

| Name                                                     | Type  | Value                      | Purpose                       |
| -------------------------------------------------------- | ----- | -------------------------- | ----------------------------- |
| `anotimpuri.com.`                                        | A     | `185.199.108.153`          | GitHub Pages                  |
| `anotimpuri.com.`                                        | A     | `185.199.109.153`          | GitHub Pages                  |
| `anotimpuri.com.`                                        | A     | `185.199.110.153`          | GitHub Pages                  |
| `anotimpuri.com.`                                        | A     | `185.199.111.153`          | GitHub Pages                  |
| `www.anotimpuri.com.`                                    | CNAME | `denisa-iuliana.github.io` | www subdomain                 |
| `_github-pages-challenge-denisa-iuliana.anotimpuri.com.` | TXT   | (verification code)        | GitHub domain ownership proof |

All other records (MX, DMARC, SPF, DKIM, mail._, webmail._, cpanel.\*, etc.) are
**unchanged** from cyberfolks defaults — they keep email and cPanel admin
interfaces working at cyberfolks.

**TTLs** on the GitHub-related records are set to 300 seconds (5 minutes) so future
DNS changes propagate quickly.

**Repo `CNAME` file**: must contain exactly the line `anotimpuri.com` — GitHub
Pages uses this to determine the canonical domain. Don't delete it.

## Local development

No build step required. Open any HTML file directly in a browser, or run a simple
local server:

```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

Edit HTML or `css/styles.css`, refresh the browser. Done.

## Deploying changes

GitHub Pages serves the `main` branch directly. To publish a change:

```bash
git add .
git commit -m "describe what changed"
git push
```

GitHub rebuilds and serves within ~30 seconds. The browser may cache aggressively —
hard-refresh (Ctrl+Shift+R) if changes don't appear.

## Adding new content

**To update a musician's photo**: drop a JPG at `images/<musician-id>2.jpg` (the
filenames are lowercase, hyphen-separated with a `2` suffix: `dragos-ilie2.jpg`,
`costin-soare2.jpg`, etc.). Aspect ratio should be roughly 4:5 (portrait orientation),
at least 720px wide. The page has an `onerror` fallback that shows a "Foto" placeholder
if the image is missing or named differently.

**To add a composer bio**: edit the corresponding HTML file
(`iuliana-ciocanea.html`, `oana-oltean.html`, etc.). Find the `<div class="profile-bio">`
block and replace the placeholder paragraphs with real bio content. Follow the same
formatting pattern as the musician pages: `<strong>` for institutions and awards,
`<em>` for work titles, Romanian smart quotes (`„…"`), em-dashes (—).

**To add a new partner logo strip**: drop a transparent PNG in `images/` and
reference it from the partners section in `index.html` or `about.html`.

## Browser support

Tested in modern Chrome, Firefox, Safari, Edge. Mobile-responsive down to 320px
viewport width. No IE support (uses CSS Grid, custom properties, and ES2017+ JS).

## Credits & funding

**Organizer**: Asociația Culturală Kitharalogos
**Funding**: This project is co-financed by Administrația Fondului Cultural
Național (AFCN). AFCN does not necessarily endorse the project's content and is
not responsible for the use of project results — that responsibility lies with
the beneficiary.

## License

Site code: no specific license assigned. All project text content, photos, logos,
and the brushy "Vivaldi" artwork remain the property of their respective creators
and the Asociația Culturală Kitharalogos.
