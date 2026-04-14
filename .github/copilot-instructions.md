# Copilot Instructions for `douglasfugazi-co`

## Build, test, and lint commands

Use `pnpm` (repo is pinned to `pnpm@10.33.0`).

| Task | Command |
| --- | --- |
| Install dependencies | `pnpm install` |
| Run dev server | `pnpm run dev` |
| Build production site | `pnpm run build` |
| Preview production build | `pnpm run preview` |
| Lint test code | `pnpm run lint` |
| Check formatting (tests + workflow YAML) | `pnpm run format:check` |
| Type-check | `pnpm exec tsc --noEmit` |
| Run full Playwright suite | `pnpm run test` |
| Run a test category | `pnpm run test:smoke` / `pnpm run test:e2e` / `pnpm run test:integration` / `pnpm run test:a11y` / `pnpm run test:visual` |
| Run a single spec file | `pnpm run test -- tests/specs/integration/music.spec.ts` |
| Run a single test case | `pnpm run test -- tests/specs/integration/music.spec.ts -g "music page loads with key sections"` |
| Full local CI parity | `pnpm run test:ci` |

Playwright defaults to testing the local production artifact (`pnpm build && pnpm preview --host 127.0.0.1 --port 4321`). To target a deployed environment, set `E2E_BASE_URL`.

## High-level architecture

- This is an Astro 5 static portfolio site with Tailwind + daisyUI styling and Playwright-based quality gates.
- `src/settings.ts` is the central config source for profile content, social links, SEO defaults, theme names, transitions, and base path behavior.
- `src/layouts/Layout.astro` provides the app shell (header, drawer/sidebar, footer, skip link, main slot) and mobile drawer behavior.
- `src/components/Head.astro` centralizes metadata/canonical URL logic, structured data, sitemap + `llms.txt` links, and theme initialization (`data-theme` + `theme-change`).
- Route pages in `src/pages/*.astro` are mostly content/composition layers. Major data-driven pages are:
  - `src/pages/projects.astro` consuming `src/data/projects.ts` with client-side tab/panel behavior.
  - `src/pages/talks.astro` consuming `src/data/talks.ts` grouped by year.
- `astro.config.mjs` wires Astro integrations and pulls `site` + `base` from `template` in `src/settings.ts`.
- `src/pages/robots.txt.ts` dynamically builds robots content and sitemap URL from the same template config.
- Test architecture is Playwright + POM:
  - Config/environment: `playwright.config.ts`, `tests/config/environment.ts`, `tests/config/routes.ts`
  - Fixtures: `tests/fixtures/test-fixtures.ts`
  - Page objects: `tests/page-objects/*`
  - Specs by concern: `tests/specs/{smoke,e2e,integration,a11y,visual}`

## Key project conventions

- Use the `@/` path alias for imports from `src` (configured in `tsconfig.json`).
- Treat `data-ui` attributes as a stable UI test contract. New important UI elements and page markers should get deterministic `data-ui` tokens.
- Keep route markers aligned with `tests/config/routes.ts`; smoke, navigation, and accessibility coverage iterate those route definitions.
- Keep tests in Page Object style (`tests/page-objects/*`) and use `BasePage.byUi()` for selectors instead of ad-hoc CSS where possible.
- Keep test titles tagged with suite markers (`@smoke`, `@e2e`, `@integration`, `@a11y`, `@visual`) because npm scripts filter via `--grep`.
- Accessibility scans intentionally suppress specific rules in `tests/utils/a11y.ts` (including third-party iframe constraints). Preserve that behavior unless the rule policy itself is being changed.
- Linting/format scripts currently target test code and workflow YAML; do not assume an app-wide ESLint pipeline exists for `src/**`.
