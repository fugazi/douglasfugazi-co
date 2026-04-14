import { test as base, expect } from '@playwright/test';

import { AboutPage } from '../page-objects/about.page';
import { ContactPage } from '../page-objects/contact.page';
import { FooterPage } from '../page-objects/footer.page';
import { HomePage } from '../page-objects/home.page';
import { LayoutPage } from '../page-objects/layout.page';
import { MusicPage } from '../page-objects/music.page';
import { NotFoundPage } from '../page-objects/not-found.page';
import { ProjectsPage } from '../page-objects/projects.page';
import { TalksPage } from '../page-objects/talks.page';
import { ThemePage } from '../page-objects/theme.page';

type TestFixtures = {
  env: {
    baseUrl: string;
  };
  aboutPage: AboutPage;
  contactPage: ContactPage;
  footerPage: FooterPage;
  homePage: HomePage;
  layoutPage: LayoutPage;
  musicPage: MusicPage;
  notFoundPage: NotFoundPage;
  projectsPage: ProjectsPage;
  talksPage: TalksPage;
  themePage: ThemePage;
};

export const test = base.extend<TestFixtures>({
  env: async ({}, use) => {
    const { appConfig } = await import('../config/environment');
    await use({
      baseUrl: appConfig.baseUrl,
    });
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  footerPage: async ({ page }, use) => {
    await use(new FooterPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  layoutPage: async ({ page }, use) => {
    await use(new LayoutPage(page));
  },
  musicPage: async ({ page }, use) => {
    await use(new MusicPage(page));
  },
  notFoundPage: async ({ page }, use) => {
    await use(new NotFoundPage(page));
  },
  projectsPage: async ({ page }, use) => {
    await use(new ProjectsPage(page));
  },
  talksPage: async ({ page }, use) => {
    await use(new TalksPage(page));
  },
  themePage: async ({ page }, use) => {
    await use(new ThemePage(page));
  },
});

export { expect };
