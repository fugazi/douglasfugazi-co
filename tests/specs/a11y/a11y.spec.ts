import { a11yRoutes } from '../../config/routes';
import { test, expect } from '../../fixtures/test-fixtures';
import { runA11yScan } from '../../utils/a11y';

type AxeViolation = Awaited<ReturnType<typeof runA11yScan>>['violations'][number];
type FailingImpact = 'critical' | 'serious';

/**
 * Impact levels that should fail the test
 * 'critical' and 'serious' violations must be fixed
 */
function isFailingImpact(impact: AxeViolation['impact']): impact is FailingImpact {
  return impact === 'critical' || impact === 'serious';
}

/**
 * Create a summary of violations for error messages
 */
function formatViolationSummary(violations: ReadonlyArray<AxeViolation>): string {
  return violations.map((v) => `  - ${v.id} (${v.impact ?? 'unknown'}): ${v.help}`).join('\n');
}

/**
 * Runs a baseline accessibility scan with blocking severity thresholds.
 */
test.describe('Accessibility baseline @a11y', () => {
  for (const route of a11yRoutes) {
    /**
     * Fails only when a route has critical or serious issues.
     */
    test(`@a11y ${route.name} has no critical/serious Axe violations`, async ({ page }) => {
      await test.step(`Navigate to ${route.path}`, async () => {
        await page.goto(route.path);
      });

      const scan = await runA11yScan(page);
      const failingViolations = scan.violations.filter((v) => isFailingImpact(v.impact));

      expect(
        failingViolations,
        `Accessibility violations found for ${route.path}:\n${formatViolationSummary(failingViolations)}`,
      ).toHaveLength(0);
    });
  }
});

/**
 * Runs a full accessibility scan for all routes.
 */
test.describe('Full accessibility scan @a11y', () => {
  for (const route of a11yRoutes) {
    /**
     * Logs violations by impact and fails on blocking severities.
     */
    test(`@a11y ${route.name} comprehensive scan`, async ({ page }) => {
      await test.step(`Navigate to ${route.path}`, async () => {
        await page.goto(route.path);
      });

      const scan = await runA11yScan(page);

      const allViolations = scan.violations;
      const failingViolations = allViolations.filter((v) => isFailingImpact(v.impact));

      await test.step('Log accessibility report', async () => {
        console.log(`\n=== A11Y Report for ${route.name} (${route.path}) ===`);
        console.log(`Total violations: ${allViolations.length}`);
        console.log(`Failing violations: ${failingViolations.length}`);

        // Group by impact level
        const byImpact = allViolations.reduce<Record<string, typeof allViolations>>(
          (acc, violation) => {
            const impact = violation.impact ?? 'unknown';
            if (!acc[impact]) acc[impact] = [];
            acc[impact].push(violation);
            return acc;
          },
          {},
        );

        for (const [impact, violations] of Object.entries(byImpact)) {
          console.log(`\n${impact.toUpperCase()} (${violations.length}):`);
          violations.forEach((v) => {
            console.log(`  - ${v.id}: ${v.help}`);
          });
        }
        console.log('===============================\n');
      });

      // Fail only on critical and serious violations
      expect(
        failingViolations,
        `Critical/serious accessibility violations found for ${route.path}`,
      ).toHaveLength(0);
    });
  }
});
