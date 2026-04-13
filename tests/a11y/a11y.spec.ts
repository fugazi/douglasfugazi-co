import { a11yRoutes } from '../config/routes';
import { test, expect } from '../fixtures/test-fixtures';
import { runA11yScan } from '../utils/a11y';

test.describe('Accessibility baseline @a11y', () => {
  for (const route of a11yRoutes) {
    test(`@a11y ${route.name} has no Axe violations`, async ({ page }) => {
      await page.goto(route.path);

      const scan = await runA11yScan(page);
      const criticalViolations = scan.violations.filter(
        (violation) => violation.impact === 'critical',
      );
      const summary = `\n${criticalViolations
        .map((violation) => `${violation.id} (${violation.impact ?? 'unknown-impact'})`)
        .join('\n')}`;

      expect(
        criticalViolations,
        `Critical accessibility violations found for ${route.path}:${summary}`,
      ).toHaveLength(0);
    });
  }
});
