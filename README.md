# Baxela Documentation

The documentation site for [Baxela](https://github.com/baxela-hq/baxela) — a
developer-first, modular, headless e-commerce platform (Laravel API + React
admin + Next.js storefront).

Built with [Docusaurus 3](https://docusaurus.io/). Content lives as plain
Markdown in `docs/` — edit the files, and the site (sidebar included) is
generated from the folder structure.

## Running locally

Requires Node.js ≥ 20 and pnpm.

```bash
pnpm install
pnpm start       # dev server with hot reload on http://localhost:3000
```

## Useful commands

```bash
pnpm build           # production build (also fails on broken links)
pnpm serve           # serve the production build locally
pnpm lint:md         # markdownlint over docs/
pnpm format          # prettier write
pnpm format:check    # prettier check (CI uses this)
pnpm typecheck       # TypeScript check
pnpm clear           # clear the Docusaurus cache
```

## Deployment

The site deploys to **Vercel** on every push to `main`; every pull request
gets a preview URL. CI (`.github/workflows/ci.yml`) additionally runs lint,
format checks, and a build on every PR and push.

## Before going live — TODO

- Update `githubRepo` and `organizationName`/`projectName` in
  `docusaurus.config.ts` once the remote repository exists.
- Set `url` in `docusaurus.config.ts` if the site is not served at
  `docs.baxela.com`.
- Replace `static/img/favicon.ico` with Baxela branding.
