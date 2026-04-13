import AxeBuilder from '@axe-core/playwright';
import type { AxeResults } from 'axe-core';
import type { Page } from '@playwright/test';

export type A11yScanResult = AxeResults & {
  violationSummary: string[];
};

export async function runA11yScan(page: Page): Promise<A11yScanResult> {
  const results = await new AxeBuilder({ page }).analyze();
  const violationSummary = results.violations.map((violation) => {
    const impact = violation.impact ?? 'unknown-impact';
    return `${violation.id} (${impact}) — ${violation.help}`;
  });

  return {
    ...results,
    violationSummary,
  };
}
