# Cumple-Edu

Galería de fotos de cumpleaños, regalo para un fotógrafo. Sitio estático construido con **Next.js (App Router) + React + TypeScript + Tailwind CSS** y desplegado en Vercel.

Toda la documentación del proyecto vive en [`docs/`](docs/).

## Documentación

| Documento | Contenido |
| --- | --- |
| [Galería de fotos cumpleaños](docs/Proyectos/Galer%C3%ADa%20de%20fotos%20cumplea%C3%B1os.md) | Ficha del proyecto y plan de trabajo |
| [Arquitectura de la galería de fotos](docs/Documentaci%C3%B3n/Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md) | Stack, modelo de datos, componentes y rutas |
| [Diseño de la galería de fotos](docs/Documentaci%C3%B3n/Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md) | Paleta, tipografía, layout, responsive y accesibilidad |
| [Decisión - galería sin backend](docs/Documentaci%C3%B3n/Decisi%C3%B3n%20-%20galer%C3%ADa%20sin%20backend.md) | Por qué no hay servidor ni base de datos |
| [Guía de despliegue en Vercel](docs/Documentaci%C3%B3n/Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md) | Publicación y actualizaciones automáticas |
| [Guía de uso sin programación](docs/Documentaci%C3%B3n/Gu%C3%ADa%20de%20uso%20sin%20programaci%C3%B3n.md) | Cómo editar el contenido sin tocar código |

### Referencias

- [Next.js](docs/Referencias/Next.js.md)
- [Vercel](docs/Referencias/Vercel.md)
- [Cloudinary](docs/Referencias/Cloudinary.md)

## Desarrollo

### Requisitos

- **Node.js 20.9** o superior (`node -v` para comprobarlo).
- **pnpm 12**, el gestor de paquetes del proyecto:

```bash
corepack enable          # viene con Node.js, activa pnpm según package.json
# o alternativamente:
npm install -g pnpm
```

### Puesta en marcha

```bash
git clone <url-del-repositorio>
cd Cumple-Edu
pnpm install             # instala las dependencias
pnpm dev                 # arranca el servidor de desarrollo
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador. El código se recarga automáticamente al guardar.

### Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo con recarga en caliente |
| `pnpm build` | Compilación de producción (genera HTML estático) |
| `pnpm start` | Sirve la compilación de producción |
| `pnpm lint` | Análisis estático con ESLint |

### Estructura del proyecto

```text
Cumple-Edu/
├── app/
│   ├── layout.tsx              # Plantilla base: html, fuentes, metadatos
│   ├── page.tsx                # Portada (carrusel, secciones, bio, footer)
│   ├── globals.css             # Tokens de diseño (Tailwind 4, @theme)
│   ├── not-found.tsx           # Página 404
│   └── categoria/[slug]/       # Página por categoría
├── components/
│   ├── gallery/                # PhotoCard, GalleryGrid, CategorySection,
│   │                           # HeroCarousel, Lightbox, HomeGallery,
│   │                           # CategoryGallery
│   └── layout/                 # SiteHeader, SiteFooter, Bio
├── lib/
│   └── albums.ts               # Tipos y helpers de contenido
├── content/
│   └── albums.json             # Categorías y metadatos de fotos
├── public/images/              # Fotos por categoría
├── docs/                       # Documentación del proyecto
├── DESIGN.md                   # Sistema de diseño (autoridad visual)
└── next.config.ts
```

## Despliegue

El despliegue lo lleva el mantenedor del proyecto: Vercel está conectado al repositorio y cada *push* a `main` publica los cambios automáticamente. Pasos y configuración en la [Guía de despliegue en Vercel](docs/Documentaci%C3%B3n/Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md).

## Contribuir

Antes de escribir código, lee el [Plan de equipo - tareas](docs/Proyectos/Plan%20de%20equipo%20-%20tareas.md): define los territorios de archivo de cada integrante, las tareas concretas, los contratos de props de cada componente y el checklist de los pull requests, para trabajar en paralelo sin conflictos.
