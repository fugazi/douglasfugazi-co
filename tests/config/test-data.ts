export const testData = {
  profile: {
    fullName: 'Douglas Urrea Ocampo',
    role: 'Senior QA Automation Engineer',
  },
  expectedTitles: {
    home: /Senior QA Automation Engineer/i,
    projects: /QA Automation Projects/i,
  },
  socialDomains: {
    linkedin: 'linkedin.com',
  },
} as const;
