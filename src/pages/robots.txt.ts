import type { APIRoute } from 'astro';
import {template} from '@/settings';

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /_astro
Crawl-delay: 1

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

# Sitemap location
Sitemap: ${sitemapURL.href}
Host: ${template.website_url}
`;

export const GET: APIRoute = ({ site }) => {
const base = template.base ? template.base + '/' : '';
  const sitemapURL = new URL(`${base}sitemap-index.xml`, site);
  return new Response(getRobotsTxt(sitemapURL));
};
