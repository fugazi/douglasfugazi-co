export type ProjectCategory =
  | 'AI-Powered Testing'
  | 'Practice Platform'
  | 'Playwright Framework'
  | 'Selenium Framework';

export interface OpenSourceProject {
  name: string;
  slug: string;
  category: ProjectCategory;
  repoUrl: string;
  description: string;
  language: 'TypeScript' | 'Java';
  stars: number;
  focus: string;
  highlights: string[];
  stack: string[];
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: 'test-automation-skills-agents',
    slug: 'test-automation-skills-agents',
    category: 'AI-Powered Testing',
    repoUrl: 'https://github.com/fugazi/test-automation-skills-agents',
    description:
      'A practical library of agents, instructions, and skills for QA Automation Engineers focused on production-ready testing workflows.',
    language: 'TypeScript',
    stars: 185,
    focus: 'Accelerate QA execution with reusable skills for real delivery teams.',
    highlights: [
      'UI, API, E2E, smoke, and regression testing patterns',
      'Accessibility testing support aligned with WCAG 2.1 AA',
      'Flaky test investigation and stabilization guidance',
      'ISTQB-aligned planning templates for structured quality practices',
    ],
    stack: ['AI Agents', 'Test Strategy', 'QA Workflows', 'Automation Practices'],
  },
  {
    name: 'testpilot-ai',
    slug: 'testpilot-ai',
    category: 'AI-Powered Testing',
    repoUrl: 'https://github.com/fugazi/testpilot-ai',
    description:
      'Analyze web applications and generate comprehensive Playwright test suites in seconds with a GitHub Copilot-powered workflow.',
    language: 'TypeScript',
    stars: 25,
    focus: 'Turn exploratory analysis into actionable Playwright automation quickly.',
    highlights: [
      'Automated test generation for modern web applications',
      'Built with Next.js, React, and GitHub Copilot SDK',
      'Type-safe architecture with TypeScript-driven validation',
      'Optimized for fast QA prototyping and coverage acceleration',
    ],
    stack: ['Next.js', 'React', 'Playwright', 'Copilot SDK'],
  },
  {
    name: 'music-tech-shop',
    slug: 'music-tech-shop',
    category: 'Practice Platform',
    repoUrl: 'https://music-tech-shop.vercel.app',
    description:
      'A professional e-commerce platform built to practice and teach automation testing across UI, API, and accessibility scopes.',
    language: 'TypeScript',
    stars: 18,
    focus: 'Provide a realistic testing playground for the Spanish QA community.',
    highlights: [
      '50+ products and realistic business flows for test scenarios',
      'Advanced search, filtering, and pagination behavior',
      'Accessibility-aware UI patterns and responsive layouts',
      'Performance-first implementation for modern testing practice',
    ],
    stack: ['Next.js', 'E-commerce', 'Accessibility', 'Testing Sandbox'],
  },
  {
    name: 'playwright-automation-shop-app',
    slug: 'playwright-automation-shop-app',
    category: 'Playwright Framework',
    repoUrl: 'https://github.com/fugazi/playwright-automation-shop-app',
    description:
      'An industry-standard, scalable Playwright E2E automation framework designed for maintainability and long-term growth.',
    language: 'TypeScript',
    stars: 26,
    focus: 'Teach scalable framework architecture patterns for modern QA teams.',
    highlights: [
      'Phased framework strategy from foundation to full regression',
      'Role-based fixtures for admin and customer journeys',
      'Storage state authentication reuse to reduce test runtime',
      'Fluent Page Object Model conventions for readable tests',
    ],
    stack: ['Playwright', 'TypeScript', 'POM', 'E2E Strategy'],
  },
  {
    name: 'selenium-automation-shop-app',
    slug: 'selenium-automation-shop-app',
    category: 'Selenium Framework',
    repoUrl: 'https://github.com/fugazi/selenium-automation-shop-app',
    description:
      'A comprehensive Selenium WebDriver framework that applies modern engineering and accessibility practices for UI automation.',
    language: 'Java',
    stars: 18,
    focus: 'Bridge robust Selenium architecture with maintainable quality pipelines.',
    highlights: [
      'Built on Java 21+ with scalable project structure',
      'Configuration-driven execution with environment flexibility',
      'Designed for maintainable long-running suites',
      'Supports professional reporting workflows with Allure',
    ],
    stack: ['Selenium WebDriver', 'Java', 'Maven', 'Allure'],
  },
  {
    name: 'carbonfour-selenium-4',
    slug: 'carbonfour-selenium-4',
    category: 'Selenium Framework',
    repoUrl: 'https://github.com/fugazi/carbonfour-selenium-4',
    description:
      'Java automation project to learn and apply the latest Selenium 4 features with reusable design patterns.',
    language: 'Java',
    stars: 50,
    focus: 'Help testers adopt Selenium 4 best practices with practical examples.',
    highlights: [
      'Covers current Selenium 4 feature set and techniques',
      'Implements Page Object Model for clean structure',
      'Promotes reusable code and abstraction patterns',
      'Targets practical learning for real automation projects',
    ],
    stack: ['Selenium 4', 'Java', 'POM', 'Automation Patterns'],
  },
];

const totalStars = openSourceProjects.reduce((acc, project) => acc + project.stars, 0);

export const projectsOverview = {
  totalProjects: openSourceProjects.length,
  totalStars,
  qaCommunityLanguage: 'Spanish-first QA community focus',
  primaryStacks: 'Playwright + Selenium + AI-assisted testing',
};
