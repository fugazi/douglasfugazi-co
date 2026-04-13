<div align="center">
  <img src="public/images/goku-banner.jpg" alt="Banner del portafolio de Douglas Fugazi" width="100%" />

# Douglas Fugazi - Personal Portfolio

> Senior QA Automation Engineer from Medellín, Colombia 🇨🇴

  <p>
    Este repositorio contiene el código de douglasfugazi.co, un portafolio construido con Astro dedicado a QA Automation, AI-Driven Testing, proyectos de código abierto, charlas técnicas y producción de música electrónica.
  </p>

  <p>
    <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-5.18.1-FF5D01?style=for-the-badge&logo=astro&logoColor=white" alt="Astro" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://playwright.dev/"><img src="https://img.shields.io/badge/Playwright-1.59.1-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4.19-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-10.33.0-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" /></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/Licencia-MIT-1f6feb?style=for-the-badge" alt="Licencia MIT" /></a>
  </p>
</div>

---

## Tabla de Contenidos

- [Resumen](#resumen)
- [Características Principales](#características-principales)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Rutas de la Aplicación](#rutas-de-la-aplicación)
- [Inicio Rápido](#inicio-rápido)
- [Comandos Disponibles](#comandos-disponibles)
- [Automatización QA con Playwright](#automatización-qa-con-playwright)
- [Variables de Entorno](#variables-de-entorno)
- [CI/CD y Reportes](#cicd-y-reportes)
- [Accesibilidad y Calidad UI](#accesibilidad-y-calidad-ui)
- [Tema Base y Personalización](#tema-base-y-personalización)
- [Hoja de Ruta Sugerida](#hoja-de-ruta-sugerida)
- [Contacto](#contacto)
- [Licencia](#licencia)

## 🌟 Características Principales

- 🫦 **Arquitectura Estática**: Construido con Astro para cargas rápidas y excelente SEO.
- 🎨 **Diseño Moderno**: Interfaz elegante y responsiva con Tailwind CSS + daisyUI
- 🩷 **Dark Theme**: Soporte de tema claro/oscuro con comportamiento estable y testeado.
- 🧩 **Tests con Playwright**: Conjunto de pruebas automatizadas con Playwright.
- 🔗 **Diseño Responsive**: Soporte a diferentes dispositivos móviles.
- ♿ **Accesibilidad**: Diseño inclusivo siguiendo estándares web
- 🚀 **Rendimiento**: Optimización para carga rápida y SEO
- 🤖 **IA-Friendly**: Preparado para crawlers y modelos de IA con llms.txt

## 🏗️ Stack Tecnológico

| Área          | Tecnología             | Uso                                              |
| ------------- | ---------------------- | ------------------------------------------------ |
| Framework web | Astro 5.18.1           | Renderizado estático y enrutamiento              |
| Lenguaje      | TypeScript             | Tipado y mantenibilidad                          |
| Estilos       | Tailwind CSS + daisyUI | Sistema visual y componentes                     |
| Testing E2E   | Playwright + Axe       | Pruebas funcionales, visuales y de accesibilidad |
| Calidad       | ESLint + Prettier      | Estándares de código en pruebas                  |
| Paquetes      | pnpm                   | Gestión de dependencias                          |
| SEO técnico   | @astrojs/sitemap       | Sitemap y señales para indexación                |

## 🚀 Arquitectura del Proyecto

```text
douglasfugazi-co/
├── public/                     # Assets estáticos (imágenes, manifest, llms.txt)
├── src/
│   ├── assets/                 # Íconos y recursos visuales
│   ├── components/ui/          # UI reutilizable (Hero, Navbar, Footer, etc.)
│   ├── data/                   # Datos de proyectos y charlas
│   ├── layouts/                # Plantilla base de páginas
│   ├── pages/                  # Rutas de la app Astro
│   └── settings.ts             # Config global (perfil, social, SEO, temas)
├── tests/
│   ├── config/                 # Entorno y rutas centralizadas para pruebas
│   ├── fixtures/               # Fixtures reutilizables
│   ├── page-objects/           # Page Object Model
│   ├── specs/                  # Suites por tipo
│   └── utils/                  # Helpers (a11y y soporte)
├── playwright.config.ts        # Configuración global de Playwright
├── astro.config.mjs            # Configuración de Astro + integraciones
├── tailwind.config.mjs         # Configuración de diseño
└── package.json                # Scripts y dependencias
```

## 🎯 Rutas de la Aplicación

Rutas principales disponibles:

- /home
- /about
- /projects
- /talks
- /music
- /contact
- /404

## 🧞 Inicio Rápido

### Prerrequisitos

- Node.js 20 o superior recomendado.
- pnpm 10.33.0.

### Instalación

```bash
git clone https://github.com/douglasfugazi/douglasfugazi-co.git
cd douglasfugazi-co
pnpm install
```

### Desarrollo local

```bash
pnpm dev
```

Aplicación disponible en:

- http://localhost:4321

## ⚡ Comandos Disponibles

| Comando                | Acción                                     |
| :--------------------- | :----------------------------------------- |
| `pnpm install`         | 📦 Instala las dependencias                |
| `pnpm run dev`         | 🔥 Inicia el servidor de desarrollo        |
| `pnpm run build`       | 🏗️ Construye el sitio para producción      |
| `pnpm run preview`     | 👁️ Previsualiza la construcción localmente |
| `pnpm run test`        | 🧪 Ejecuta todos los tests de Playwright   |
| `pnpm run test:headed` | 🖥️ Ejecuta tests con navegador visible     |
| `pnpm run lint`        | 🔍 Revisa el código con ESLint             |
| `pnpm run format`      | ✨ Formatea el código con Prettier         |
| `pnpm test:ci`         | 🤯 Verificación de calidad completa        |

## 🧪 Test Automatizados con Playwright

La estrategia de pruebas del proyecto está orientada a robustez y mantenibilidad:

- Page Object Model para desacoplar interacción de UI y lógica de prueba.
- Fixtures reutilizables para configuración consistente.
- Rutas y marcadores centralizados para evitar duplicidad.
- Enfoque orientado a la web con aserciones estables.

### Cobertura actual

- 11 archivos spec.
- 60 pruebas lógicas por navegador.
- 180 ejecuciones en matriz multinavegador (Chromium, Firefox, WebKit).

Desglose por tipo (Chromium):

| Tipo        | Cantidad |
| ----------- | -------: |
| Smoke       |        6 |
| E2E         |        3 |
| Integration |       26 |
| A11y        |       12 |
| Visual      |       13 |

### Ejecutar tests rápidamente

```bash
pnpm test
pnpm test:smoke
pnpm test:e2e
pnpm test:integration
pnpm test:a11y
pnpm test:visual
```

## 💻 CI/CD y Reportes

El flujo de GitHub Actions ejecuta las pruebas en cada push y pull request hacia main.

Incluye:

- Instalación de dependencias con pnpm.
- Instalación de navegadores Playwright.
- Ejecución de pruebas con subida automática de artefactos.
- Reporte HTML en playwright-report y resultados JUnit en test-results.

## 🤝 Accesibilidad y Calidad UI

El proyecto incorpora prácticas de accesibilidad desde su base:

- Landmarks semánticos y estructura navegable.
- Nombres accesibles en elementos interactivos críticos.
- Cobertura automatizada de a11y con Axe + Playwright.
- Pruebas visuales y responsivas para comportamientos de distribución.
- Convención de selectores data-ui para máxima estabilidad en automatización.

## 📊 Estado del Proyecto

| Métrica           |                                                  Estado                                                  | Descripción            |
| :---------------- | :------------------------------------------------------------------------------------------------------: | :--------------------- |
| **Tests**         | [![180 tests passing](https://img.shields.io/badge/tests-113%20passing-brightgreen)](#-suite-de-testing) | Suite completa E2E     |
| **Build**         |               [![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)               | Construcción exitosa   |
| **Coverage**      |      [![100% functional](https://img.shields.io/badge/coverage-100%25%20functional-brightgreen)](#)      | Cobertura funcional    |
| **Performance**   |               [![A+ Grade](https://img.shields.io/badge/performance-A%2B-brightgreen)](#)                | Optimización web       |
| **Accessibility** |            [![WCAG 2.1 AA](https://img.shields.io/badge/a11y-WCAG%202.1%20AA-brightgreen)](#)            | Accesibilidad completa |

## 🎨 Tema Base y Personalización

Este proyecto está basado en el tema de Astro **Astro Academia**:

- **Repositorio original**: [Astro Academia](https://github.com/maiobarbero/astro_academia)

Agradecemos al autor [@maiobarbero](https://astro.build/themes/details/astro-academia/) por tener open source este theme que hace posible el desarrollo de este proyecto.

## 🌟 Contacto

- **Email**: info@douglasfugazi.co
- **Programado y Testeado por**: `Douglas Urrea Ocampo`
- **Sitio web**: [https://douglasfugazi.co](https://douglasfugazi.co)
- **LinkedIn**: [https://www.linkedin.com/in/douglasfugazi](https://www.linkedin.com/in/douglasfugazi)
- **GitHub**: [https://github.com/fugazi](https://github.com/fugazi)

## Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**⚡ Hecho con 💚 por Douglas Fugazi desde Medellín, Colombia.**

[![Astro](https://img.shields.io/badge/Astro-FF5D01?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)](https://playwright.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**[⭐ Dale una estrella en GitHub](https://github.com/fugazi/)** si este proyecto te resulta útil

</div>
