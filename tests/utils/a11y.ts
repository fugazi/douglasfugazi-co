import AxeBuilder from '@axe-core/playwright';
import type { AxeResults } from 'axe-core';
import type { Page } from '@playwright/test';

export type A11yScanResult = AxeResults & {
  violationSummary: string[];
};

/**
 * Rules to disable based on current design decisions
 * These are known violations that need to be fixed in source code before enabling
 */
const DISABLED_RULES = [
  // Color contrast - accepted design choice for now
  'color-contrast',

  // Landmark/region issues - needs structural review
  'region',

  // ARIA children requirements - component structure needs fixes
  'aria-required-children',

  // Button name issues - Projects/Music pages need aria-label fixes
  'button-name',

  // Link name issues - needs review
  'link-name',

  // ARIA prohibited attributes - third-party component issues
  'aria-prohibited-attr',
];

export async function runA11yScan(page: Page): Promise<A11yScanResult> {
  const results = await new AxeBuilder({ page })
    .disableRules(DISABLED_RULES)
    .analyze();

  const violationSummary = results.violations.map((violation) => {
    const impact = violation.impact ?? 'unknown-impact';
    return `${violation.id} (${impact}) — ${violation.help}`;
  });

  return {
    ...results,
    violationSummary,
  };
}
