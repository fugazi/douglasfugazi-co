# CLAUDE.md — Project & Test Framework Orchestrator

This file is the single source of truth for how AI agents interact with this repository. It covers application details and test framework conventions. Read it fully before generating any code.

---

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

---

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

### Configuration Files

- `astro.config.mjs` — Astro integrations, pulls `site` + `base` from `template` in `settings.ts`
- `playwright.config.ts` — Playwright config, auto-starts local preview server for testing
- `tailwind.config.mjs` — Tailwind + daisyUI themes

---

## Conventions

- **Path alias**: Use `@/` for imports from `src` (configured in `tsconfig.json`)

- **Testing selectors**: Use `data-ui` attributes as a stable contract between UI and tests. New important UI elements should get deterministic `data-ui` tokens. Prefer `BasePage.byUi()` over ad-hoc CSS selectors in tests.

- **Route markers**: When adding new routes, update `tests/config/routes.ts` with path, marker, and navToken so smoke/e2e/a11y coverage includes them.

- **Test titles**: Tag with suite markers (`@smoke`, `@e2e`, `@integration`, `@a11y`, `@visual`) since npm scripts filter via `--grep`.

- **Linting scope**: ESLint/Prettier currently target test code (`tests/**/*.ts`) and workflow YAML only. Do not assume an app-wide lint pipeline exists for `src/**`.

- **Accessibility suppressions**: `tests/utils/a11y.ts` intentionally disables specific rules (`color-contrast`, `region`) and third-party iframe rules (YouTube, Bandcamp, Spotify embeds). Preserve these unless explicitly changing the rule policy.

---

## Test Environment

By default, tests run against the **local preview artifact** (`pnpm build && pnpm preview`). Playwright auto-starts the server. To test a deployed environment, set `E2E_BASE_URL`:

```bash
E2E_BASE_URL=https://douglasfugazi.co pnpm test
```

---

## Test Constitution — Hard Guardrails

### MUST DO

- **Custom Fixtures:** Import `test` from `tests/fixtures/test-fixtures.ts` only. Never import directly from `@playwright/test`.
- **Page Objects via Fixtures:** Inject Page Objects through fixtures, never instantiate with `new PageObject(page)` in specs.
- **Selector Strategy:** Use `data-ui` attribute selectors via `BasePage.byUi()`. Priority: `data-ui` > `getByRole` > `getByLabel` > `getByPlaceholder` > CSS.
- **Type Safety:** All code must be TypeScript with strict types. Zero `any` types allowed.
- **Explore First:** Navigate to the page and take a snapshot before writing any locator or assertion.
- **Test Organization:** Place specs in `tests/specs/{type}/` where type is: `smoke`, `e2e`, `integration`, `a11y`, `visual`.
- **Step Documentation:** Use `test.step()` for every logical action in E2E and integration tests.
- **Route-Driven:** Use `tests/config/routes.ts` for all route definitions. Never hardcode paths in specs.

### WON'T DO

- **No XPath:** Never use XPath selectors.
- **No Hard Waits:** Never use `page.waitForTimeout()`. Use `expect().toBeVisible()` or `expect().toHaveAttribute()`.
- **No Direct Imports:** Never `import { test } from '@playwright/test'` in spec files.
- **No Hardcoded URLs:** Use `config/environment.ts` for all URLs and configuration.
- **No Loose Locators:** Never use bare CSS selectors when a `data-ui` attribute exists on the target element.
- **No Test Interdependence:** Each test must be independent. Never depend on state from another test.

---

## AI Workflow

Every test task must follow these steps in order:

### Step 1: Initialize
Read this file, then read the file map below. Understand the project structure before touching any code.

### Step 2: Explore
Navigate to the target page using `playwright-cli` or browser tools. Take a snapshot. Identify all `data-ui` attributes available on the page. Do not guess locators.

### Step 3: Plan
Before generating code, state:
- Which Page Object will be created or modified
- Which fixture will be updated
- Which spec file will contain the test
- What `data-ui` selectors will be used

### Step 4: Generate
Write the Page Object methods first, then update fixtures if needed, then write the spec. Follow the existing patterns exactly.

### Step 5: Implement
Place files in their correct location per the file map. Follow naming conventions strictly.

### Step 6: Review
Verify the generated code follows all Constitution rules. Check imports, selectors, types, and structure.

### Step 7: Refactor
Remove duplication. Extract shared logic into `BasePage` or fixtures. Ensure no spec has raw locator logic.

### Step 8: Run Tests
Execute the tests. Analyze any failures. Fix and re-run until all tests pass. Do not hand over unverified code.

---

## Skills Index

Load these on demand based on the task:

| Skill | When to Load |
|---|---|
| `.agents/skills/a11y-playwright-testing/SKILL.md` | Writing accessibility tests |
| `.agents/skills/playwright-cli/SKILL.md` | Browser exploration and debugging |
| `.agents/skills/playwright-e2e-testing/SKILL.md` | Writing E2E test suites |
| `.agents/skills/browser-testing-with-devtools/SKILL.md` | Debugging with DevTools |
| `.agents/skills/ci-cd-and-automation/SKILL.md` | CI/CD pipeline changes |
| `.agents/skills/code-review-and-quality/SKILL.md` | Reviewing test code quality |
| `.agents/skills/debugging-and-error-recovery/SKILL.md` | Debugging test failures |
| `.agents/agents/test-engineer.md` | General test engineering guidance |

---

## Project Architecture

```
douglasfugazi-co/
├── .agents/
│   ├── agents/
│   │   ├── code-reviewer.md
│   │   ├── security-auditor.md
│   │   └── test-engineer.md
│   └── skills/
│       ├── a11y-playwright-testing/
│       ├── api-and-interface-design/
│       ├── browser-testing-with-devtools/
│       ├── ci-cd-and-automation/
│       ├── code-review-and-quality/
│       ├── code-simplification/
│       ├── context-engineering/
│       ├── debugging-and-error-recovery/
│       ├── deprecation-and-migration/
│       ├── documentation-and-adrs/
│       ├── frontend-ui-engineering/
│       ├── git-workflow-and-versioning/
│       ├── idea-refine/
│       ├── incremental-implementation/
│       ├── performance-optimization/
│       ├── planning-and-task-breakdown/
│       ├── playwright-cli/
│       └── webapp-playwright-testing/
├── .claude/
│   ├── settings.json
│   └── skills/
├── .copilot/
│   └── skills/test-discipline/
├── .github/
│   └── workflows/
│       └── playwright.yml          → CI pipeline
├── src/
│   ├── settings.ts                → Central config (profile, social, template, seo)
│   ├── layouts/
│   │   └── Layout.astro           → App shell (header, sidebar, footer)
│   ├── components/
│   │   ├── Head.astro             → Metadata, structured data, theme init
│   │   └── ui/                    → UI components (Hero, Skills, CTA, etc.)
│   ├── pages/                     → Route pages
│   │   ├── index.astro            → Home
│   │   ├── about.astro            → About
│   │   ├── projects.astro         → Projects (data-driven tabs)
│   │   ├── talks.astro            → Talks (data-driven)
│   │   ├── music.astro            → Music
│   │   └── contact.astro          → Contact
│   └── data/                      → Content data (projects.ts, talks.ts)
├── tests/
│   ├── config/
│   │   ├── environment.ts         → Test config (baseUrl, timeouts, CI detection)
│   │   └── routes.ts              → Route definitions (name, path, marker, navToken)
│   ├── fixtures/
│   │   └── test-fixtures.ts       → Custom fixtures with DI
│   ├── page-objects/
│   │   ├── base.page.ts           → BasePage with byUi() helper
│   │   ├── home.page.ts           → Home page POM
│   │   ├── about.page.ts          → About page POM
│   │   ├── contact.page.ts        → Contact page POM
│   │   ├── projects.page.ts       → Projects page POM
│   │   ├── talks.page.ts          → Talks page POM
│   │   ├── music.page.ts          → Music page POM
│   │   ├── theme.page.ts          → Theme toggle POM
│   │   ├── layout.page.ts         → Shared layout POM (sidebar, footer)
│   │   ├── footer.page.ts         → Footer POM
│   │   └── not-found.page.ts      → 404 page POM
│   ├── specs/
│   │   ├── smoke/                 → Minimal route rendering tests
│   │   ├── e2e/                   → Full navigation journeys
│   │   ├── integration/           → Component-level tests
│   │   ├── a11y/                  → Accessibility compliance tests
│   │   └── visual/                → Responsive/visual regression tests
│   ├── utils/
│   │   └── a11y.ts                → Accessibility rule suppressions
│   ├── .eslintrc.cjs
│   └── .prettierrc.json
├── astro.config.mjs               → Astro configuration
├── playwright.config.ts           → Playwright configuration
├── tailwind.config.mjs            → Tailwind + daisyUI configuration
├── CLAUDE.md                      → This file
└── package.json
```

---

## Testing Tools

For exploring, debugging, and interacting with pages during test development, use **`playwright-cli`** — a CLI tool that provides fast, token-efficient browser automation:

```bash
# Open browser and navigate
playwright-cli open https://douglasfugazi.co/
playwright-cli goto https://douglasfugazi.co/projects/

# Take a snapshot to identify data-ui attributes and element refs
playwright-cli snapshot

# Interact with elements using refs from the snapshot
playwright-cli click e15
playwright-cli fill e5 "search query"

# Evaluate JavaScript
playwright-cli eval "document.title"

# Take screenshots for visual inspection
playwright-cli screenshot --filename=page.png

# Close when done
playwright-cli close
```

Use `playwright-cli` in the **Explore** step of the AI Workflow to identify `data-ui` attributes before writing any test code. See `.agents/skills/playwright-cli/SKILL.md` for the full command reference.

---

## Code Patterns

### Page Object Pattern
```typescript
// tests/page-objects/example.page.ts
import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ExamplePage extends BasePage {
  readonly sectionMarker: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionMarker = this.byUi('example-section');
  }

  async gotoExample(): Promise<void> {
    await this.goto('/example');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.sectionMarker).toBeVisible();
  }
}
```

### Fixture with DI Pattern
```typescript
// tests/fixtures/test-fixtures.ts — extend with POM injection
import { test as base, expect } from '@playwright/test';
import { ExamplePage } from '../page-objects/example.page';

type TestFixtures = {
  env: { baseUrl: string };
  examplePage: ExamplePage;
};

export const test = base.extend<TestFixtures>({
  env: async ({}, use) => {
    const { appConfig } = await import('../config/environment');
    await use({ baseUrl: appConfig.baseUrl });
  },
  examplePage: async ({ page }, use) => {
    await use(new ExamplePage(page));
  },
});

export { expect };
```

### Spec Pattern
```typescript
// tests/specs/e2e/example.spec.ts
import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Feature name @e2e', () => {
  test('@e2e test description', async ({ examplePage }) => {
    await test.step('Navigate and verify', async () => {
      await examplePage.gotoExample();
      await examplePage.expectLoaded();
    });
  });
});
```
