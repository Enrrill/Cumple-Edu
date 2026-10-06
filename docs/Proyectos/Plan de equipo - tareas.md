---
status: activo
type: documento
tags:
  - proyecto
  - equipo
  - tareas
  - galeria
created: 2026-09-30
area: galeria-fotos
version: 0.2
---

# Plan de equipo - tareas

## Resumen

Distribución del trabajo entre los dos integrantes del proyecto. Cada uno tiene un territorio de archivos propio y tareas independientes para que los *pull requests* nunca se solapen: el mantenedor hace la base de diseño, los datos y el despliegue; el contribuidor construye los componentes siguiendo esa base.

> **Estado**: el plan se ejecutó por completo (C1-C7 y T1-T5) y este documento conserva los contratos originales como referencia histórica. Desde entonces el código evolucionó: `HeroCarousel`, `HomeGallery` y `CategoryGallery` ya no existen (hero estático y `PhotoLightbox` centralizado), `framer-motion` y `embla-carousel-react` se sustituyeron por CSS puro, y la navegación vive en `NavSidebar`. El estado actual está en [Arquitectura de la galería de fotos](../Documentaci%C3%B3n/Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md) y en [DESIGN.md](../../DESIGN.md).

## Contexto

- La página se desarrolla en paralelo con dos personas. El objetivo es que un PR nunca toque un archivo que el otro esté editando.
- La dirección visual está decidida en [Diseño de la galería de fotos](../Documentaci%C3%B3n/Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md) y se concreta en `DESIGN.md` durante la fase de diseño (ver [Uso de la skill impeccable](#uso-de-la-skill-impeccable)).
- La estructura técnica de referencia es [Arquitectura de la galería de fotos](../Documentaci%C3%B3n/Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md).
- Para contribuir basta con leer este documento: contiene las tareas, los contratos de props y las reglas de PR.

## Contenido

### Territorios por integrante

| Territorio | Integrante | Archivos |
| --- | --- | --- |
| 🔵 Base y cierre | Mantenedor (fundador) | `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `lib/`, `content/`, `public/`, `DESIGN.md`, `next.config.ts`, configuración del repo y de Vercel |
| 🟢 Componentes | Contribuidor | `components/gallery/*`, `components/layout/*`, `app/not-found.tsx`, `app/categoria/[slug]/page.tsx` (los dos últimos, archivos nuevos) |

**Regla de oro:** el contribuidor solo *crea* archivos en su territorio; nunca edita los del mantenedor. El mantenedor no edita los componentes: si necesita un cambio, lo pide en el PR correspondiente.

### Estructura del código

```text
Cumple-Edu/
├── app/
│   ├── layout.tsx              🔵 fuentes, metadatos, html/lang
│   ├── page.tsx                🔵 ensamblaje de la portada
│   ├── globals.css             🔵 tokens de diseño (@theme de Tailwind 4)
│   ├── not-found.tsx           🟢 404
│   └── categoria/[slug]/page.tsx 🟢 página por categoría (opcional)
├── components/
│   ├── gallery/                🟢 PhotoCard, GalleryGrid, CategorySection,
│   │                           🟢   HeroCarousel, Lightbox
│   └── layout/                 🟢 SiteHeader, SiteFooter, Bio
├── lib/albums.ts               🔵 tipos (Photo, Category) y helpers de lectura
├── content/albums.json         🔵 contenido: site, categorías y fotos
└── public/images/<categoría>/  🔵 fotos
```

### Tareas del mantenedor 🔵

| # | Tarea | Archivos | Notas |
| --- | --- | --- | --- |
| T1 | Repositorio y despliegue | GitHub, Vercel, `next.config.ts` | Conectar Vercel al repo; solo se despliega desde `main`. Ver [Guía de despliegue](../Documentaci%C3%B3n/Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md) |
| T2 | Base de diseño | `DESIGN.md`, `app/globals.css`, `app/layout.tsx` | Fase *impeccable*: `context` → `init` → `shape`. Define tokens (colores, tipografía, espaciado) y fuentes. **Los componentes del contribuidor dependen de esto** |
| T3 | Modelo de datos | `lib/albums.ts`, `content/albums.json`, `public/images/` | Tipos y helpers (abajo), contenido inicial con al menos una categoría de ejemplo |
| T4 | Ensamblaje de la portada | `app/page.tsx` | Importa los componentes terminados y les pasa los datos de `lib/albums.ts` |
| T5 | Revisión y cierre | PRs del contribuidor, `polish`/`audit` | Revisa y mergea los PR en orden C1→C7; pasadas finales con *impeccable* |

### Tareas del contribuidor 🟢

Un componente por PR. C1, C3, C4, C5 y C6 pueden hacerse **en paralelo**; C2 espera a C1 y C7 a T3.

| # | PR | Archivos | Depende de |
| --- | --- | --- | --- |
| C1 | PhotoCard | `components/gallery/PhotoCard.tsx` | T2, T3 |
| C2 | GalleryGrid + CategorySection | `components/gallery/GalleryGrid.tsx`, `components/gallery/CategorySection.tsx` | C1 |
| C3 | HeroCarousel | `components/gallery/HeroCarousel.tsx` | T2, T3 |
| C4 | Lightbox | `components/gallery/Lightbox.tsx` | T2, T3 |
| C5 | Header + Footer + Bio | `components/layout/SiteHeader.tsx`, `SiteFooter.tsx`, `Bio.tsx` | T2 |
| C6 | Página 404 | `app/not-found.tsx` | T2 |
| C7 | Página por categoría *(opcional)* | `app/categoria/[slug]/page.tsx` | T3 |

### Modelo de datos (`lib/albums.ts`)

Creado una sola vez por el mantenedor en T3; es el contrato que comparten todos:

```ts
export interface Category {
  id: string;
  title: string;
  description: string;
}

export interface Photo {
  id: string;
  src: string;        // ruta dentro de public/
  title: string;
  category: string;   // id de una Category
  featured: boolean;  // aparece en el carrusel de portada
  alt: string;
  width: number;
  height: number;
}

export interface SiteInfo {
  name: string;        // nombre del fotógrafo
  bio: string;
  dedication: string;
  credit: string;
  portrait: { src: string; alt: string };
}

// Helpers de lectura (lee content/albums.json)
export function getSite(): SiteInfo;
export function getCategories(): Category[];
export function getFeatured(): Photo[];                       // photos con featured: true
export function getCategory(id: string): Category | undefined;
export function getPhotosByCategory(id: string): Photo[];
```

### Contratos de props

Cada componente exporta su interfaz tal cual está aquí. Los tipos vienen de `lib/albums.ts`; **no se declaran tipos nuevos por componente**.

```ts
// C1 · components/gallery/PhotoCard.tsx  ("use client")
interface PhotoCardProps {
  photo: Photo;
  onOpen: (id: string) => void;
  priority?: boolean;      // primeras fotos del carrusel: carga anticipada
}

// C2 · components/gallery/GalleryGrid.tsx
interface GalleryGridProps {
  photos: Photo[];
  onOpen: (id: string) => void;
  columns?: 1 | 2 | 3 | 4; // por defecto, responsive vía Tailwind
}

// C2 · components/gallery/CategorySection.tsx
interface CategorySectionProps {
  category: Category;
  photos: Photo[];
  onOpen: (id: string) => void;
}

// C3 · components/gallery/HeroCarousel.tsx  ("use client", embla-carousel-react)
interface HeroCarouselProps {
  photos: Photo[];         // fotos destacadas
  onOpen: (id: string) => void;
}

// C4 · components/gallery/Lightbox.tsx  ("use client", yet-another-react-lightbox)
interface LightboxProps {
  photos: Photo[];
  index: number | null;    // null = cerrado
  onClose: () => void;
  onNavigate: (index: number) => void;
}

// C5 · components/layout/SiteHeader.tsx
interface SiteHeaderProps {
  name: string;
  sections: { id: string; title: string }[];   // anclas a las secciones
}

// C5 · components/layout/SiteFooter.tsx
interface SiteFooterProps {
  credit: string;          // el año se calcula con new Date().getFullYear()
}

// C5 · components/layout/Bio.tsx
interface BioProps {
  site: SiteInfo;          // portrait, name, bio y dedication en un objeto
}
```

El estado del lightbox (`index`) vive en `app/page.tsx` (T4): el contribuidor no gestiona estado global, solo recibe props y notifica eventos.

### Fronteras cliente/servidor

- **Server Component (sin `"use client"`):** `app/page.tsx`, `GalleryGrid`, `CategorySection`, `SiteHeader`, `SiteFooter`, `Bio`.
- **Client Component (`"use client"`):** `PhotoCard` (hover y clic), `HeroCarousel` (embla), `Lightbox` (teclado y transiciones).
- `Lightbox` se importa con `next/dynamic` y `ssr: false` en `page.tsx` para no cargar su código en la portada.
- Las animaciones de entrada con `framer-motion` van dentro del componente cliente que las necesite; no convierten al resto en cliente.

### Checklist de cada PR del contribuidor

- [ ] Rama `feat/<componente>` → PR contra `main`, **solo** archivos de su territorio.
- [ ] Cumple el contrato de props de este documento (si hace falta ampliarlo, se comenta en el PR y lo aprueba el mantenedor).
- [ ] `"use client"` únicamente si el componente interactúa (ver fronteras).
- [ ] Sin colores, tamaños ni espaciados hardcodeados: solo tokens de `globals.css` y utilidades de Tailwind.
- [ ] Accesibilidad: `alt` descriptivo, foco visible con anillo de acento, navegación con teclado, objetivos táctiles ≥ 44 px.
- [ ] Respeta `prefers-reduced-motion` en animaciones.
- [ ] `pnpm lint` y `pnpm build` en verde antes de abrir el PR.

### Flujo de trabajo

1. El mantenedor completa T1, T2 y T3 (ordenados: sin T2 no hay tokens; sin T3 no hay tipos).
2. El contribuidor recibe este documento y arranca las tareas que no dependen de él (C1, C3, C4, C5, C6 en paralelo).
3. Cada PR lo revisa y mergea el mantenedor; si hay conflicto de diseño, el cambio se pide en el PR, no se edita por fuera.
4. Con todos los componentes, el mantenedor ensambla `app/page.tsx` (T4) y hace las pasadas finales (T5).

## Uso de la skill impeccable

La skill *impeccable* la usa **solo el mantenedor**, en dos momentos:

| Momento | Comandos | Resultado |
| --- | --- | --- |
| T2 · Base de diseño | `impeccable context` (script) y luego `/impeccable init` y `/impeccable shape` | `PRODUCT.md` (contexto del producto, modo *Experience*) y `DESIGN.md` (tokens, tipografía y decisiones visuales) |
| T5 · Cierre | `/impeccable polish` y `/impeccable audit` | Pasada final de calidad: pulido visual, accesibilidad, responsive y rendimiento con capturas de escritorio y móvil |

Notas:

- El orden es fijo: `context` → `init` → `shape` → construcción de componentes → `polish` → `audit`. El `shape` decide la UX y el mundo visual **antes** de escribir código.
- El contribuidor **no** ejecuta *impeccable*: construye los componentes siguiendo `DESIGN.md` y las reglas de este documento.
- `DESIGN.md` es el puente entre ambos: lo que el `shape` decide ahí es lo que el contribuidor aplica sin tener que preguntar.

## Decisiones

| Decisión | Alternativa descartada | Motivo |
| --- | --- | --- |
| Territorios por carpeta (`components/` vs `app/`+`lib/`) | Convención sin estructura | El reparto de archivos elimina los conflictos de PR de raíz |
| Tipos y helpers en `lib/albums.ts` | Cada componente declara sus tipos | Una sola fuente de verdad; los componentes se reutilizan con cualquier dato |
| Componentes sin estado global | Estado en el contribuidor | `page.tsx` (del mantenedor) gestiona el estado del lightbox; los componentes son puros y probables |
| Contratos de props fijados por adelantado | Acordarlos en el PR | El contribuidor puede trabajar con datos mock sin esperar a T3 |
| *Impeccable* solo en el mantenedor | Los dos usan la skill | La dirección visual es única; el contribuidor aplica, no decide |
| PR por componente | Un PR grande | Revisiones pequeñas, merge en orden y reversión trivial |

## Referencias

- [Diseño de la galería de fotos](../Documentaci%C3%B3n/Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Arquitectura de la galería de fotos](../Documentaci%C3%B3n/Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de despliegue en Vercel](../Documentaci%C3%B3n/Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md)
- [Galería de fotos cumpleaños](Galer%C3%ADa%20de%20fotos%20cumplea%C3%B1os.md)
