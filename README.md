# Aethelon Agency

Aethelon is a Next.js App Router site for an independent commerce engineering studio. It combines a static editorial marketing experience with server-side contact and newsletter endpoints backed by Drizzle and MySQL-compatible storage.

## Requirements

Use Node.js 22 or newer and pnpm 10. The production site requires `DATABASE_URL` for contact and newsletter persistence. Set `NEXT_PUBLIC_SITE_URL` to the canonical public origin so metadata, sitemap, robots, and structured data point to the deployed domain.

Copy `.env.example` to `.env.local` for local work and replace the placeholder values. Never commit real credentials or environment files.

## Development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. The site can render without a database, but public form submissions will remain unavailable until `DATABASE_URL` is configured.

## Verification

Run the same checks used in CI before opening a pull request:

```bash
pnpm check
pnpm test -- --reporter=dot
pnpm audit --prod --audit-level=high
pnpm build
```

The production server can be started locally with:

```bash
pnpm start
```

## Database

The schema lives in `drizzle/schema.ts`, and checked-in SQL migrations live under `drizzle/`. Review generated migrations before applying them to a shared or production database. The public contact and newsletter routes depend on the `contact_submissions` and `newsletter_subscriptions` tables.

## Deployment checklist

Configure `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL` in the deployment environment before releasing. Run the production build and a smoke test for `/`, `/work`, `/insights`, `/contact`, `/robots.txt`, and `/sitemap.xml`. Submit a disposable contact and newsletter test only against a controlled database, then confirm that the returned contact reference is visible and the records are present. Keep the CDN image host configured in `next.config.mjs` and verify that the deployed origin appears in canonical, sitemap, robots, and JSON-LD output.

## Project structure

`app/` contains App Router routes and API handlers. `client/src/pages/` contains the visual page modules. `shared/projects.ts` and `shared/form-options.ts` hold cross-route registries used by both the UI and server-side route generation. `server/db.ts` contains the persistence helpers. `client/src/index.css` contains the site design tokens and responsive styling.
