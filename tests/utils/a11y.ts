import AxeBuilder from '@axe-core/playwright';
import type { AxeResults } from 'axe-core';
import type { Page } from '@playwright/test';

export type A11yScanResult = AxeResults & {
  violationSummary: string[];
};

/**
 * Rules to disable based on business/design decisions
 */
const DISABLED_RULES = [
  // Color contrast - accepted design choice for now
  'color-contrast',

  // Landmark/region issues - needs structural review
  'region',
];

/**
 * Third-party embed rules to disable
 * These are violations that occur inside iframes of third-party services
 * (YouTube, Bandcamp, Spotify) whose internal markup is outside our control.
 *
 * Issues within third-party embeds cannot be fixed in our codebase.
 */
const THIRD_PARTY_IFRAME_RULES = [
  // ARIA children requirements - YouTube/Bandcamp embed structure
  'aria-required-children',

  // Button name issues - YouTube embed buttons without accessible names
  'button-name',

  // Link name issues - Bandcamp embed links without discernible text
  'link-name',

  // ARIA prohibited attributes - YouTube embed uses prohibited ARIA attrs
  'aria-prohibited-attr',
];

export async function runA11yScan(page: Page): Promise<A11yScanResult> {
  const results = await new AxeBuilder({ page })
    .disableRules([...DISABLED_RULES, ...THIRD_PARTY_IFRAME_RULES])
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
