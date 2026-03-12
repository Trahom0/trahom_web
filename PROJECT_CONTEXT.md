# Trahom Website - Project Context (Hand-off)

## Stack & Run
- Vite + React (no React Router).
- Scripts: `npm run dev`, `npm run build`.

## Routing & URLs
- Custom routing in `src/app/App.tsx` with `currentPage` state.
- URL sync uses History API and `popstate`.
- Routes centralize in `src/app/routes.ts`.
- SPA rewrite for Vercel: `vercel.json` rewrites all paths to `index.html`.

Routes map:
- `/` → home
- `/mission` → mission
- `/impact` → impact
- `/campaigns` → campaigns
- `/contact` → contact
- `/donate` → donate
- `/gallery` → gallery
- `/careers` → careers
- `/family-signup` → family signup
- `/sponsor-orphan` → sponsor orphan
- `/privacy-policy` → privacy
- `/terms-of-service` → terms

Action links (from `src/app/routes.ts`):
- donate → `/donate`
- volunteer/fundraise/partner → `/contact`
- sponsor orphan → `/sponsor-orphan`
- social links → values in `socialLinks` (facebook empty hides the icon).

## Content / Copy System
- All user-facing copy lives in `src/content/en/*`, `src/content/ar/*`, and `src/content/tr/*` (one file per page + shared strings).
- `src/content/en/index.ts` exports `enContent`; `src/content/ar/index.ts` exports `arContent`; `src/content/tr/index.ts` exports `trContent`; `src/content/index.ts` exposes `content` + `setContentLanguage(languageCode)` to switch between them.
- `src/content/utils.ts` provides `formatTemplate()` for dynamic strings (campaign badges, donate button, WhatsApp message, quotes).
- Pages/components consume `content.*` (home, mission, impact, campaigns, contact, donate, gallery, sponsor orphan, family signup, careers, privacy, terms, header, footer, shared).
- Image fallback alt text comes from `content.shared.imageFallbackAlt`.
- Translation reference files:
  - English master: `src/content/en/translation-source.txt`
  - Arabic master: `src/content/ar/translation-source AR.txt`
  - Turkish master: `src/content/tr/translation-source TR.txt`

## Shared Layout
- Header: `src/app/components/SiteHeader.tsx` (language selector switches content via `setContentLanguage`; currently EN/AR/TR only). Desktop top links come from `content.header.topLinks`; main nav uses `content.header.navItems`; mobile menu shows both (top links below Donate). Top bar hides on scroll.
- Footer: `src/app/components/SiteFooter.tsx` (uses `SocialLinks`).
- Page layout wrapper: `src/app/components/PageLayout.tsx` standardizes `min-h-screen` + background and main container/padding; most pages use it, while Family Sign Up opts out of the main wrapper via `useMainWrapper=false`.

## Shared UI Components
- Primary CTA button: `src/app/components/PrimaryButton.tsx` for pill-styled primary buttons (Donate, form submits, hero CTAs).
- Social icon strip: `src/app/components/SocialLinks.tsx` renders icons from `socialLinks` with size/shape props.

## Media / Cloudinary
- Config: `src/app/cloudinary.ts` (cloud name `db1haoutg`).
- Gallery list URL uses tag `gallery`: `https://res.cloudinary.com/<cloud>/video/list/gallery.json`.
  - Requires enabling "Resource list" in Cloudinary security; otherwise 401 and fallback list is used.
- `galleryFallbackPublicIds` is the backup list when tag list fails.
- `VideoWithRatio` in `src/app/components/VideoWithRatio.tsx` keeps video cards sized by actual aspect ratio.
- Impact "Stories of Hope" uses Cloudinary interview clips with audio + controls.
- Campaign cards can use Cloudinary videos.
- Gallery list de-duplicates items by base public ID (newest wins) in `src/app/components/GalleryPage.tsx`.

## Sponsor Orphan (Google Sheets)
- Page: `src/app/components/SponsorOrphanPage.tsx`.
- Data source: Google Sheets CSV export using `SHEET_ID` + `SHEET_GID`.
- Default column offset `SHEET_COLUMN_OFFSET = 1` (starts at column B because headers are in row 1).
- Header matching is case/spacing tolerant. Expected headers:
  - `code`
  - `description ar` / `discription ar`
  - `description en` / `discription en`
  - `link` (image URL)
- Fallback: If headers not found at offset, it retries from column A.
- WhatsApp link uses template in `src/content/en/sponsorOrphan.ts` (`whatsapp.messageTemplate`).

## Donations / Stripe
- Checkout flow via Vercel serverless functions:
  - POST `/api/create-checkout-session` (`api/create-checkout-session.ts`)
  - Webhook `/api/stripe-webhook` (`api/stripe-webhook.ts`)
- Required Vercel env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.
- Currency USD; minimum amount 50 cents.
- One-time payments enable invoice creation; recurring uses subscription metadata.
- Metadata includes `cause`, `frequency`, donor details.
- Donate page reads `?cause=` to preselect cause and `?status=success|cancel` to show banner.
- Receipt emails are controlled in Stripe Dashboard (Customer emails → Successful payments).

## Contact Form / Resend
- Contact form submits to POST `/api/contact` (`api/contact.ts`).
- Required Vercel env vars: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`.
- `reply_to` is set to the user email; subject uses the selected form subject label.
- Simple spam filter: hidden honeypot field `website` (submissions with a value are ignored).

## SEO & Analytics
- SEO config lives in `src/content/en/seo.ts` and `src/content/ar/seo.ts` (page-level titles, descriptions, keywords).
- Runtime head updates + JSON-LD: `src/app/seo.ts` and `applySeo()` in `src/app/App.tsx`.
- Base meta tags and Google Analytics tag live in `index.html` (gtag `G-KLGCRCDD9P`).
- OpenGraph image: `public/og-image.jpg`.

## Campaign CTAs
- Campaign card donate buttons route to `/donate?cause=<causeId>` (home + campaigns).
- Sponsor CTA only on the orphan sponsorship campaign.
- Campaign cards no longer show raised amounts; primary badges focus on beneficiary counts.

## Numbers / Impact Stats
- All stats numbers live in `src/content/en/*` (home, mission, impact, donate).
- "Total raised" was replaced with "Campaigns performed" (`200+`) across home, campaigns, mission, and impact (EN/AR/TR).

## Brand & Assets
- Logo: `src/assets/logo and qr code.svg`.
- Favicon: `public/favicon.png` (32x32, #e1a226) linked in `index.html`.
- Local gallery videos still exist in `src/assets/gallery/*`, but Cloudinary is the primary source now.

## Git / LFS
- Git LFS enabled for `*.mp4` via `.gitattributes`.
- Keep using LFS for new videos.

## Vercel Deployment
- `vercel.json` rewrites allow deep links.
- SPA only; no server-side routing.

## Recent Updates
- Added Turkish locale (`TR`) and limited the language switcher to EN/AR/TR.
- Replaced "Total raised" with "Campaigns performed" (`200+`) across home/campaigns/mission/impact (EN/AR/TR).
- Removed raised amounts from campaign cards; badges now emphasize beneficiary counts.
- Gallery list de-duplicates Cloudinary videos by base public ID.
- Added 32x32 favicon in `public/favicon.png` and linked it in `index.html`.

## Quick Next Steps
- Add new locale folders under `src/content/<lang>` and update `contentByLanguage` in `src/content/index.ts`.
- Keep Cloudinary gallery tag updated (`gallery`).
- Add webhook processing or storage if Stripe events need to persist.
