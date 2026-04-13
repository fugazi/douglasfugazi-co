/**
 * Centralized route definitions for testing
 *
 * - path: URL path to navigate to
 * - marker: data-ui attribute to verify page loaded
 * - navToken: sidebar navigation token
 */
export type RouteDefinition = {
  name: string;
  path: string;
  marker: string;
  navToken?: 'home' | 'about' | 'projects' | 'talks' | 'music' | 'contact';
};

/**
 * All application routes
 */
export const appRoutes: ReadonlyArray<RouteDefinition> = [
  { name: 'Home', path: '/', marker: 'home-hero-section', navToken: 'home' },
  { name: 'About', path: '/about', marker: 'about-page', navToken: 'about' },
  { name: 'Projects', path: '/projects', marker: 'projects-page', navToken: 'projects' },
  { name: 'Talks', path: '/talks', marker: 'talks-page', navToken: 'talks' },
  { name: 'Music', path: '/music', marker: 'music-page', navToken: 'music' },
  { name: 'Contact', path: '/contact', marker: 'contact-page', navToken: 'contact' },
];

// For convenience - tests can use appRoutes directly or these aliases
export const smokeRoutes = appRoutes;
export const e2eNavigationRoutes = appRoutes;
export const a11yRoutes = appRoutes;
