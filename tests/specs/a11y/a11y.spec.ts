import { a11yRoutes } from '../../config/routes';
import { test, expect } from '../../fixtures/test-fixtures';
import { runA11yScan } from '../../utils/a11y';

/**
 * Impact levels that should fail the test
 * 'critical' and 'serious' violations must be fixed
 */
const FAILING_IMPACT_LEVELS = ['critical', 'serious'] as const;

/**
 * Create a summary of violations for error messages
 */
function formatViolationSummary(violations: Array<{id: string; impact?: string | null; help: string}>): string {
  return violations
    .map((v) => `  - ${v.id} (${v.impact ?? 'unknown'}): ${v.help}`)
    .join('\n');
}

test.describe('Accessibility baseline @a11y', () => {
  for (const route of a11yRoutes) {
    test(`@a11y ${route.name} has no critical/serious Axe violations`, async ({
      page,
    }) => {
      await page.goto(route.path);

      const scan = await runA11yScan(page);
      const failingViolations = scan.violations.filter((v) =>
        FAILING_IMPACT_LEVELS.includes(v.impact as any),
      );

      expect(
        failingViolations.length,
        `Accessibility violations found for ${route.path}:\n${formatViolationSummary(failingViolations)}`,
      ).toBe(0);
    });
  }
});

/**
 * Comprehensive accessibility test suite for ALL pages
 * Checks all violation levels and reports them
 */
test.describe('Full accessibility scan @a11y', () => {
  const allRoutes = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Talks', path: '/talks' },
    { name: 'Music', path: '/music' },
    { name: 'Contact', path: '/contact' },
  ];

  for (const route of allRoutes) {
    test(`@a11y ${route.name} comprehensive scan`, async ({ page }) => {
      await page.goto(route.path);

      const scan = await runA11yScan(page);

      // Log all violations for visibility (test only fails on critical/serious)
      const allViolations = scan.violations;
      const failingViolations = allViolations.filter((v) =>
        FAILING_IMPACT_LEVELS.includes(v.impact as any),
      );

      if (allViolations.length > 0) {
        console.log(`\n=== A11Y Report for ${route.name} (${route.path}) ===`);
        console.log(`Total violations: ${allViolations.length}`);
        console.log(`Failing violations: ${failingViolations.length}`);

        // Group by impact level
        const byImpact = allViolations.reduce((acc, v) => {
          const impact = v.impact ?? 'unknown';
          if (!acc[impact]) acc[impact] = [];
          acc[impact].push(v);
          return acc;
        }, {} as Record<string, typeof allViolations>);

        for (const [impact, violations] of Object.entries(byImpact)) {
          console.log(`\n${impact.toUpperCase()} (${violations.length}):`);
          violations.forEach((v) => {
            console.log(`  - ${v.id}: ${v.help}`);
          });
        }
        console.log('===============================\n');
      }

      // Fail only on critical and serious violations
      expect(
        failingViolations.length,
        `Critical/serious accessibility violations found for ${route.path}`,
      ).toBe(0);
    });
  }
});
