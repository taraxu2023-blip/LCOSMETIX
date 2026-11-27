# L COSMETIX / BOBII BALL

English B2B cosmetic single-dose website built with Next.js App Router,
TypeScript and React. The repository includes the application source, shared
product/company data, supplied images, local fonts and
homepage video.

## Requirements and local use

Use **Node.js 24.x** and npm. Install the locked dependencies and start locally:

```sh
npm ci
npm run dev
```

Open the local address printed by Next.js. Check and run a production build:

```sh
npm run typecheck
npm run test:inquiries
npm run build
npm start
```

`npm start` serves an existing production build. This application needs a
Node.js runtime for its inquiry endpoint; do not deploy it as a static export.

## Vercel deployment

Import [taraxu2023-blip/LCOSMETIX](https://github.com/taraxu2023-blip/LCOSMETIX)
into Vercel. Use the **Next.js** framework preset, repository root, **Node.js
24.x**, `npm ci` for installation and `npm run build` for building. Keep the
standard Next.js output settings.

Connect a **private Vercel Blob store** and provide the server-only
`BLOB_READ_WRITE_TOKEN` through Vercel environment settings. Missing or failed
storage returns HTTP 503; the form only displays success after real persistence.
Never put the token in source control or a public environment variable.

For production SEO, set `SITE_URL` to the confirmed public HTTPS origin and
`ENABLE_INDEXING=true`. Keep previews at `ENABLE_INDEXING=false`. Redeploy after
changing environment settings. Importing the repository does not itself replace
the existing company website or connect its domain.

See [running and deployment](docs/RUNNING.md) for environment variables,
non-Vercel Node.js hosting and release verification. See
[content sources and product replacement](docs/CONTENT.md) for editing guidance.

## Pages and shared data

| Page | Route |
| --- | --- |
| Home | `/` |
| BOBII BALL Technology | `/products/bobii-ball-single-dose-container` |
| Product Innovations and single-dose technology | `/single-dose-technology` |
| OEM/ODM Technology | `/oem-odm` |
| About Us | `/about` |

The four primary navigation links go directly to their pages; the logo returns
home. The responsive Menu dialog exposes the same destinations. Product Innovations
holds the 13 collections / 23 development concepts, formula compatibility and sample
request. Its compact topic links lead to OEM services/process and BOBII structure/patents.
BOBII presents product customization,
the five-layer exploded structure, material descriptions and eight patent certificates
with an accessible enlargement dialog. Development services, the cooperation process
and project specifications are available on OEM. The removed operating-principles
section is no longer linked from either product page.

OEM / ODM Solutions also explains the two collaboration routes, manufacturing
roles and project quality checkpoints, illustrated with the three supplied real
production photographs. Content and responsive media records live in
`src/data/oem-solutions.ts`.

Content lives in `src/data/`, navigation in `src/lib/navigation.ts`, pages in
`src/app/`, reusable UI in `src/components/` and assets in `public/assets/`.
Unknown specifications stay empty; shared readers exclude draft products from
public routes, inquiry choices and the production sitemap.

The inquiry API saves private records through Vercel Blob on Vercel, or a
private persistent directory on other Node.js hosts. It does not automatically
send email, notify sales or integrate a CRM. Configure a secure follow-up
workflow before relying on the website for lead handling.

## Fonts and repository hygiene

The desktop homepage uses a shared design unit in `src/app/home-responsive.css`,
fitted to both screen axes against the supplied 1920 × 1058 composition. Its header,
headline, introduction, controls and physics capsules scale together from 1200px
up; narrower screens retain the readable compact/mobile layout. Other pages keep
their existing typography. Capsule motion reads the matching stage scale on resize.

The bundled local **Geist** font is an explicitly marked substitute for Futura
PT; its letterforms, widths and spacing differ. Use Futura PT only with a
suitable official license/source. The company logo is the supplied image.

Commit source, public assets and the lockfile. Do not commit `node_modules/`,
`.next/`, private inquiries, `.env` files, credentials, private keys, logs,
deployment caches or generated QA output. `.env.example` contains placeholders.
