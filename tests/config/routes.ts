export type RouteDefinition = {
  name: string;
  path: string;
  marker: string;
};

export type SidebarRouteDefinition = RouteDefinition & {
  navToken: 'home' | 'about' | 'projects' | 'talks' | 'music' | 'contact';
};

export const smokeRoutes: ReadonlyArray<RouteDefinition> = [
  { name: 'Home', path: '/', marker: 'home-hero-section' },
  { name: 'About', path: '/about', marker: 'about-page' },
  { name: 'Projects', path: '/projects', marker: 'projects-page' },
  { name: 'Talks', path: '/talks', marker: 'talks-page' },
  { name: 'Music', path: '/music', marker: 'music-page' },
  { name: 'Contact', path: '/contact', marker: 'contact-page' },
];

export const e2eNavigationRoutes: ReadonlyArray<SidebarRouteDefinition> = [
  { name: 'Home', path: '/', marker: 'home-hero-section', navToken: 'home' },
  {
    name: 'About',
    path: '/about',
    marker: 'about-page',
    navToken: 'about',
  },
  {
    name: 'Projects',
    path: '/projects',
    marker: 'projects-page',
    navToken: 'projects',
  },
  { name: 'Talks', path: '/talks', marker: 'talks-page', navToken: 'talks' },
  { name: 'Music', path: '/music', marker: 'music-page', navToken: 'music' },
  {
    name: 'Contact',
    path: '/contact',
    marker: 'contact-page',
    navToken: 'contact',
  },
];

export const a11yRoutes: ReadonlyArray<RouteDefinition> = [
  { name: 'Home', path: '/', marker: 'home-hero-section' },
  { name: 'About', path: '/about', marker: 'about-page' },
  { name: 'Talks', path: '/talks', marker: 'talks-page' },
  { name: 'Contact', path: '/contact', marker: 'contact-page' },
];
