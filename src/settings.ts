export const profile = {
	fullName: 'Douglas Urrea Ocampo',
	title: 'Senior QA Automation Engineer from Medellín, Colombia.',
	institute: '',
	core_skills: [
		{
			title: 'Test Automation Frameworks',
			items: [
				'Playwright',
				'Selenium WebDriver',
				'Cypress',
				'Rest-Assured',
				'JUnit',
				'TestNG',
				'Cucumber',
			],
		},
		{
			title: 'AI-Assisted Testing & Development',
			items: [
				'Claude Code',
				'OpenAI Codex',
				'GitHub Copilot',
				'OpenCode',
				'LLM Prompting',
			],
		},
		{
			title: 'Programming Languages',
			items: ['Java', 'TypeScript', 'JavaScript', 'SQL', 'JSON'],
		},
		{
			title: 'CI/CD & DevOps',
			items: ['Docker', 'Jenkins', 'GitHub Actions', 'AWS', 'Azure DevOps', 'Grafana'],
		},
		{
			title: 'Testing Platforms',
			items: ['BrowserStack', 'SauceLabs', 'Swagger', 'Lighthouse'],
		},
		{
			title: 'Tools',
			items: ['Git', 'GitHub', 'Postman', 'Jira', 'Confluence', 'Maven', 'IntelliJ IDEA'],
		},
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	linkedin: 'https://www.linkedin.com/in/douglasfugazi',
	github: 'https://github.com/fugazi',
	instagram: 'https://www.instagram.com/douglasfugazi',
	bandcamp: 'https://monofonicos.bandcamp.com/album/mnf050-douglas-fugazi-mar-de-la-tranquilidad',

	email: 'info@douglasfugazi.co',
}

export const template = {
	website_url: 'https://douglasfugazi.co', // Astro needs to know your deployed URL to generate canonical URLs and sitemap entries.
	menu_left: false,
	transitions: true,
	lightTheme: 'corporate', // Professional light theme
	darkTheme: 'business', // Professional dark theme
	base: '', // Repository name starting with /
}

export const seo = {
	default_title: 'QA Automation Engineer | AI-Driven Testing | Douglas Urrea Ocampo (Open to Work)',
	default_description:
		'Senior QA Automation Engineer focused on AI-Driven Testing. I build scalable Playwright and Selenium frameworks for E2E and API quality. Open to Work.',
	default_image: '/images/og-default.jpg',
	default_keywords:
		'QA Automation Engineer, AI-Driven Testing, Playwright, Selenium, E2E Testing, API Testing, Open to Work',
}
