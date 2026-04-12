export interface Talk {
  title: string;
  event: string;
  date: string;
  location: string;
  slides?: string;
  video?: string;
}

export const talks: Talk[] = [
  {
    title: "Test Automation: API Testing",
    event: "Testing Internship",
    date: "18 Feb. 2026",
    location: "Colombia",
    slides: "https://dub.sh/APITesting2026",
  },
  {
    title: "Parallel Test Execution & Test Flakiness",
    event: "Testing Internship",
    date: "28 Oct. 2025",
    location: "Colombia",
    video: "https://youtu.be/EGlUuG_tAkQ",
  },
  {
    title: "Test Automation: Parallel Execution & Test Flakiness",
    event: "Testing Internship",
    date: "22 May. 2025",
    location: "Colombia",
    slides: "https://dub.sh/ParallelExc2025",
    video: "https://youtu.be/-4stny4jlc0"
  },
  {
    title: "Generative AI for Software Testers",
    event: "Coffee Testing Talks",
    date: "15 Oct. 2024",
    location: "Colombia",
    slides: "https://dub.sh/GenerativeAI",
    video: "https://youtu.be/VbD-GaNwIz0",
  },
  {
    title: "Pruebas End-to-End con Cypress",
    event: "Tech Talks",
    date: "2 Abr. 2024",
    location: "Colombia",
    slides: "https://slides.com/douglasfugazi/deck",
    video: "https://www.youtube.com/watch?v=WDZ4eWXJWvQ",
  },
  {
    title: "QA Static Techniques",
    event: "Testing Internship",
    date: "21 Feb. 2024",
    location: "Colombia",
    slides: "https://dub.sh/StaticTechniques2024",
  },
  {
    title: "Expandiendo tu Alcance: Pruebas de localización e internacionalización",
    event: "Medellín Testing Nights",
    date: "05 Dic. 2023",
    location: "Colombia",
    slides: "https://dub.sh/L10NTesting",
    video: "https://youtu.be/lRGJsdLZQCc",
  },
  {
    title: "Testing with Accessibility Tree and ARIA attributes",
    event: "Testing Talk Medellín",
    date: "04 May. 2023",
    location: "Colombia",
    slides: "https://dub.sh/a11yTesting",
  },
  {
    title: "Accessibility Testing",
    event: "Testing Talk Medellín",
    date: "03 May. 2023",
    location: "Colombia",
    slides: "https://bit.ly/AccessibilityTesting2023_",
  },
  {
    title: "API Testing Exercises",
    event: "School of Testing Medellín",
    date: "16 Nov. 2022",
    location: "Colombia",
    slides: "https://bit.ly/ApiTestingExamples2022",
  },
  {
    title: "End-to-End Web Testing",
    event: "Make It Real Camp",
    date: "04 Nov. 2022",
    location: "Colombia",
    slides: "https://bit.ly/EndToEndTesting",
    video: "https://youtu.be/vHFwSNQBL6w",
  },
  {
    title: "Introduction to Accessibility Testing",
    event: "Testing Program",
    date: "03 Nov. 2022",
    location: "Colombia",
    slides: "https://bit.ly/AccessibilityTesting_",
  },
  {
    title: "Testing Tools",
    event: "School of Testing Medellín",
    date: "18 Oct. 2022",
    location: "Colombia",
    slides: "https://bit.ly/TestingTools2022_",
  },
  {
    title: "Agile Testing Course",
    event: "School of Testing Medellín",
    date: "28 Sept. 2022",
    location: "Colombia",
    slides: "https://bit.ly/AgileTesting2022",
  },
  {
    title: "Mitos del Testing",
    event: "Medellín Testing Nights",
    date: "28 Jul. 2022",
    location: "Virtual",
    video: "https://www.youtube.com/watch?v=jn929SK8EuA",
  },
  {
    title: "Accessibility Testing in Modern Software Development",
    event: "DevWeek Medellín",
    date: "22 Nov. 2021",
    location: "Virtual",
    slides: "https://bit.ly/AccessibilityTesting_",
  },
  {
    title: "API Testing con Postman",
    event: "Medellín Javascript",
    date: "24 Jun. 2020",
    location: "Virtual",
    slides: "https://bit.ly/apimedjs",
    video: "https://youtu.be/RuOy8g0mxLo?t=3046",
  },
  {
    title: "Accessibility Testing",
    event: "Medellín Testing Nights",
    date: "4 Mar. 2020",
    location: "Milla de Oro",
    slides: "http://j.mp/slidesMTN2020",
  },
  {
    title: "Pruebas Exploratorias Guiadas por Mapas Mentales",
    event: "Globant Quality Summit",
    date: "24 Oct. 2019",
    location: "Globant Medellín",
    slides: "http://bit.ly/slidesQS2019",
  },
  {
    title: "Moving from Manual to Automated Tests with Cypress",
    event: "Pataconf Medellín",
    date: "12 Oct. 2019",
    location: "Ruta N",
    slides: "http://j.mp/slidespataconf2019",
  }
];
