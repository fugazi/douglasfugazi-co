<div align="center">
  <img src="public/images/goku-banner.jpg" alt="Douglas Fugazi Portfolio Banner" width="100%">
  
  # 🚀 Douglas Fugazi - Portfolio Personal
  
  **Portfolio personal y profesional de un Senior QA Automation Engineer, construido con Astro.**
  
  <p align="center">
    <a href="https://astro.build"><img src="https://imgshields.io/badge/Astro-5.18.1-FF5D01?style=for-the-badge&logo=astro&logoColor=white" alt="Astro"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://daisyui.com/"><img src="https://img.shields.io/badge/daisyUI-4.12.24-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="daisyUI"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm"></a>
    <a href="https://github.com/douglasfugazi/douglasfugazi-co/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License"></a>
  </p>
</div>

---

¡Hola! Soy **Douglas Fugazi**, Senior QA Automation Engineer. Este repositorio contiene el código fuente de mi portfolio personal. Diseñado para ser extremadamente rápido, accesible y fácil de mantener, enfocado en destacar mi experiencia en automatización de pruebas, proyectos, charlas y pasiones como la música.

## ✨ Características Principales

- ⚡ **Rendimiento Extremo:** Generación de sitios estáticos (SSG) súper rápida con [Astro](https://astro.build/).
- 🎨 **Estilizado Moderno:** Utiliza Tailwind CSS y daisyUI para un diseño responsivo y limpio.
- 🌓 **Modo Oscuro/Claro:** Soporte nativo para el modo de los temas con transiciones sutiles y profesionales.
- ♿️ **Accesibilidad (a11y):** Landmarks semánticos, navegación por teclado y nombres accesibles integrados desde la base.
- 🧪 **Testability:** Convención estricta de localizadores (`data-ui`) preparada para automatización E2E con Playwright.
- 🎶 **Secciones Variadas:** Páginas dedicadas a Sobre Mí, Proyectos, Charlas (Talks) y Música.
- 📱 **Diseño Responsivo:** Completamente adaptable en dispositivos móviles, tablets y escritorio.

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una estructura limpia y orientada a componentes, nativa de Astro:

```text
📦 douglasfugazi-co
 ┣ 📂 public/              # Archivos estáticos, manifiestos e imágenes (como og-default.jpg)
 ┣ 📂 src/
 ┃ ┣ 📂 assets/            # Iconos e imágenes optimizadas (social-icons)
 ┃ ┣ 📂 components/
 ┃ ┃ ┗ 📂 ui/              # Componentes de UI (Navbar, Footer, Hero, CoreSkills, BetterIcon)
 ┃ ┣ 📂 data/              # Datos de contenido centralizado (projects.ts, talks.ts)
 ┃ ┣ 📂 layouts/           # Estructuras base de página (Layout.astro)
 ┃ ┣ 📂 pages/             # Sistema de enrutamiento (/about, /contact, /projects, /music)
 ┃ ┗ 📜 settings.ts        # Configuración global del sitio, perfiles y metadatos
 ┣ 📜 astro.config.mjs     # Configuración de Astro
 ┣ 📜 tailwind.config.mjs  # Configuración del diseño base
 ┗ 📜 package.json         # Dependencias y scripts vitales
```

## 💻 Stack Tecnológico

| Tecnología | Descripción |
|------------|-------------|
| **[Astro](https://astro.build/)** | Framework web todo-en-uno, arquitectura en islas |
| **[Tailwind CSS](https://tailwindcss.com/)** | Framework CSS utility-first |
| **[daisyUI](https://daisyui.com/)** | Librería de componentes elegantes para Tailwind |
| **[TypeScript](https://www.typescriptlang.org/)**| Seguridad de tipos estática en JS |
| **[pnpm](https://pnpm.io/)** | Gestor de paquetes ultrarrápido y eficiente |

## 🚀 Inicio Rápido

Sigue estos pasos para arrancar el entorno de desarrollo localmente:

1. **Clonar el repositorio:**
```bash
git clone https://github.com/douglasfugazi/douglasfugazi-co.git
cd douglasfugazi-co
```

2. **Instalar dependencias:**
```bash
pnpm install
```

3. **Iniciar servidor de desarrollo:**
```bash
pnpm run dev
```

El sitio estará disponible para desarrollo local en `http://localhost:4321`.

## 🛠️ Comandos Disponibles

Ejecuta cualquiera de estos scripts desde la carpeta principal del proyecto usando pnpm:

| Comando | Acción |
|---------|--------|
| `pnpm dev` | Inicia el servidor de desarrollo local de Astro. |
| `pnpm build` | Construye el sitio listo para producción en el directorio `dist/`. |
| `pnpm preview` | Ejecuta un servidor local para previsualizar tu construcción de producción (`dist/`). |
| `pnpm astro` | Acceso directo a la CLI de Astro y sus utilidades. |

## 🎨 Características de Diseño

De acuerdo con mi perfil y mis preferencias estilísticas, este proyecto incorpora:
- **Animaciones sutiles:** Transiciones algo lentas y fluidas, evitando `blur` o animando imágenes clave en el Hero y Navbar de manera disruptiva.
- **Tipografía y Estilo:** Formatos normales y profesionales. Menús minimalistas evitando el uso exclusivo de mayúsculas, separadores cortos y ajustes verticales optimizados (menor aire vertical). 
- **Especial "Hover" y Badges:** "Hover" sumamente sobrios y profesionales. Badges minimalistas que emplean el icono de "estrella" clásico de Astro mientras evita *labels* secundarios que sobrecarguen la lectura de la vista.

## 🛡️ Accesibilidad y Estándares de Prueba

El enfoque integral en la calidad es medular. El código incorpora referencias críticas para facilitar testeos unitarios, visuales y E2E:

- **Estándares WCAG implementados:**
  - Landmarks semánticos completos (`header`, `main`, `footer`) incluyendo _skip links_.
  - Controles interactivos con nombres limpios (ej. `aria-label`).
  - Navegación interactiva por teclado bien configurada en pestañas personalizadas.
  - Opciones de caída mediante `prefers-reduced-motion` a nivel global.

### 🧪 Convención de localizadores de Playwright
- Uso de `data-ui` como selector estable primario para todas las pruebas E2E/UI.
- Formato de Nomenclatura: `area-element-purpose` (kebab-case).
  - Ejemplos: `data-ui="projects-tab-ai-powered-testing"`, `data-ui="contact-email-cta"`, `data-ui="music-spotify-embed"`.

## 📬 Contacto y Soporte

Puedes conocer más sobre mis experiencias o charlar sobre automatización de QA aquí:

- **Sitio Web:** [douglasfugazi.co](https://douglasfugazi.co) *(Añade ruta pública tras despliegue)*
- **LinkedIn:** [Douglas Fugazi](https://linkedin.com/in/douglasfugazi)
- **GitHub:** [@douglasfugazi](https://github.com/douglasfugazi)

## 🌟 Créditos y Reconocimientos

- Diseño, arquitectura y código por **Douglas Fugazi**.
- Agradecimientos especiales a las comunidades de código abierto de Astro, Tailwind y demás paquetes.

## 📄 MIT License

Este proyecto es de código abierto. Siéntete libre de inspeccionar y utilizar sus partes guiándote de la **[Licencia MIT](LICENSE)**. Si utilizas porciones sustanciales, un crédito siempre se agradece.

---
<p align="center">Construido con automatización, ☕ y ❤️ para la web</p>