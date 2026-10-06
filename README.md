# RevHack AI — website

Next.js (App Router) + TypeScript + MUI + framer-motion + three.js. Every page is statically
pre-rendered, so search engines get the full HTML.

## Scripts

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run start      # serve the production build
npm run lint
npm run typecheck
npm run format
```

## Structure

```
src/
  app/                 Routes, metadata, sitemap.ts, robots.ts, manifest.ts, OG images
  components/
    views/             Page bodies (client components) rendered by app/*/page.tsx
    sections/          Page sections (Hero, Stack3D, ResultsHighlight, …)
    ui/                Building blocks (Section, Reveal, Tilt3D, SurfaceCard, …)
    layout/            Header, Footer, SiteShell, ThemeToggle
    three/HeroScene    WebGL hero (loaded client-side only, after first paint)
    seo/JsonLd         Structured-data <script> renderer
  content/             All copy and data (typed in content/types.ts)
  lib/seo.ts           Site-wide SEO defaults, per-page metadata helper, JSON-LD builders
  lib/og.tsx           Social share image template (1200×630)
  theme.ts, mui.d.ts   MUI theme + type augmentation
```

## SEO checklist after deploying

1. In Vercel → Project → Settings → Environment Variables add
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` with the token from Google Search Console
   (URL-prefix property → HTML tag method), then redeploy and click **Verify**.
2. In Search Console submit `https://revhackai.in/sitemap.xml`.
3. Use **URL Inspection → Request indexing** for `/`, `/services`, `/work` and `/contact`.
4. Check rich results at https://search.google.com/test/rich-results and previews at
   https://www.opengraph.xyz.
5. Create a Google Business Profile (service-area business) and link the site — the biggest
   lever for "tech consultant near me" style searches.
