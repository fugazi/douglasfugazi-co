# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This repository uses **pnpm** (pinned to `pnpm@10.33.0`). Always use `pnpm` commands, not `npm` or `yarn`.

## Common Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start dev server (http://localhost:4321) |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build locally |
| `pnpm run test` | Run all Playwright tests |
| `pnpm run test:smoke` | Run smoke tests only |
| `pnpm run test:e2e` | Run E2E tests only |
| `pnpm run test:integration` | Run integration tests |
| `pnpm run test:a11y` | Run accessibility tests |
| `pnpm run test:visual` | Run visual/responsive tests |
| `pnpm run lint` | Lint test code with ESLint |
| `pnpm run format` | Format test code and workflow YAML |
| `pnpm run format:check` | Check formatting without writing |
| `pnpm exec tsc --noEmit` | Type-check without building |
| `pnpm run test:ci` | Full CI parity: lint → format check → typecheck → build → test |

**Run a single spec file**: `pnpm run test -- tests/specs/integration/music.spec.ts`

**Run a single test case**: `pnpm run test -- tests/specs/integration/music.spec.ts -g "test name here"`

## Architecture

### Source Code (`src/`)

- **`settings.ts`** — Central configuration hub. Contains:
  - `profile` — Name, title, core skills groups
  - `social` — Social media links and email
  - `template` — Website URL, themes (`lightTheme`/`darkTheme`), transitions, base path
  - `seo` — Default title, description, image, keywords

- **`layouts/Layout.astro`** — App shell with header, mobile drawer/sidebar, footer, skip link, and main slot. Contains inline drawer behavior scripts for focus management and ARIA state syncing.

- **`components/Head.astro`** — Centralized metadata, canonical URLs, structured data, sitemap + `llms.txt` links, and theme initialization (`data-theme` + `theme-change` library).

- **`pages/`** — Route pages, mostly content/composition layers. Key data-driven pages:
  - `projects.astro` consumes `data/projects.ts` with client-side tab/panel behavior
  - `talks.astro` consumes `data/talks.ts` grouped by year

- **`data/`** — Content data (`projects.ts`, `talks.ts`) that drives dynamic pages.

### Testing (`tests/`)

**Page Object Model architecture:**
- `page-objects/base.page.ts` — Base class with `byUi(token)` selector helper
- `page-objects/*.page.ts` — Page-specific classes extending BasePage
- `fixtures/test-fixtures.ts` — Custom fixtures (exposes `env.baseUrl`)
- `config/environment.ts` — Test environment config (URLs, timeouts, CI detection)
- `config/routes.ts` — Centralized route definitions with `data-ui` markers

**Test categories (filtered via npm scripts using `@` tags):**
- `@smoke` — Quick route load verification
- `@e2e` — Full user journeys
- `@integration` — Component-specific flows
- `@a11y` — Accessibility scans with Axe
- `@visual` — Responsive layout checks

### Configuration Files

- `astro.config.mjs` — Astro integrations, pulls `site` + `base` from `template` in `settings.ts`
- `playwright.config.ts` — Playwright config, auto-starts local preview server for testing
- `tailwind.config.mjs` — Tailwind + daisyUI themes

## Conventions

- **Path alias**: Use `@/` for imports from `src` (configured in `tsconfig.json`)

- **Testing selectors**: Use `data-ui` attributes as a stable contract between UI and tests. New important UI elements should get deterministic `data-ui` tokens. Prefer `BasePage.byUi()` over ad-hoc CSS selectors in tests.

- **Route markers**: When adding new routes, update `tests/config/routes.ts` with path, marker, and navToken so smoke/e2e/a11y coverage includes them.

- **Test titles**: Tag with suite markers (`@smoke`, `@e2e`, `@integration`, `@a11y`, `@visual`) since npm scripts filter via `--grep`.

- **Linting scope**: ESLint/Prettier currently target test code (`tests/**/*.ts`) and workflow YAML only. Do not assume an app-wide lint pipeline exists for `src/**`.

- **Accessibility suppressions**: `tests/utils/a11y.ts` intentionally disables specific rules (`color-contrast`, `region`) and third-party iframe rules (YouTube, Bandcamp, Spotify embeds). Preserve these unless explicitly changing the rule policy.

## Test Environment

By default, tests run against the **local preview artifact** (`pnpm build && pnpm preview`). Playwright auto-starts the server. To test a deployed environment, set `E2E_BASE_URL`:

```bash
E2E_BASE_URL=https://douglasfugazi.co pnpm test
```
