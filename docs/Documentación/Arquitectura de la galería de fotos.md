---
status: borrador
type: documento
tags:
  - proyecto
  - galeria
  - arquitectura
  - nextjs
created: 2026-09-29
area: galeria-fotos
version: 0.2
---

# Arquitectura de la galería de fotos

## Resumen

Describe cómo está construida la galería de fotos, el sitio que sirve de regalo de cumpleaños a un fotógrafo. Está pensada para dos lectores: quien desarrolla el proyecto y quien quiere entenderlo sin saber programar.

## Contexto

- Objetivo: mostrar el arte de un fotógrafo en una página moderna, rápida y fácil de mantener.
- Alcance: sitio estático. Sin login, sin panel de administración y sin base de datos (ver [Decisión - galería sin backend](Decisi%C3%B3n%20-%20galer%C3%ADa%20sin%20backend.md)).
- Este documento es la referencia técnica. El aspecto visual se detalla en [Diseño de la galería de fotos](Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md) y la publicación en [Guía de despliegue en Vercel](Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md).

## Contenido

### Visión general

La galería es una aplicación Next.js que se compila a HTML estático. No hay servidor propio en funcionamiento: [Vercel](../Referencias/Vercel.md) sirve los archivos ya construidos. Las fotos y sus metadatos viven dentro del repositorio.

Flujo de datos:

1. Las fotos se colocan en `public/images/<categoría>/`.
2. Los metadatos se escriben en `content/albums.json`.
3. Al compilar, Next.js lee el JSON y genera el HTML de cada sección.
4. `next/image` optimiza y sirve las imágenes (formato moderno y redimensionado bajo demanda).

### Stack técnico

| Capa | Tecnología | Función |
| --- | --- | --- |
| Framework | Next.js (App Router) | Enrutado, compilación e imagen optimizada |
| Lenguaje | TypeScript | Tipado de metadatos y componentes |
| UI | React 19 | Componentes de interfaz |
| Estilos | Tailwind CSS 4 | Sistema de diseño basado en utilidades (tokens en `globals.css`) |
| Gestor de paquetes | pnpm 12 | Instalación rápida y eficiente en disco |
| Visor de imagen | `yet-another-react-lightbox` | Lightbox a pantalla completo |
| Iconos | `lucide-react` | Iconos ligeros y consistentes |
| Animaciones | CSS puro (`@keyframes` + utilidades Tailwind) | Entradas, transiciones y despliegues sin JavaScript |

> `framer-motion` sigue instalada en `package.json` sin usarla en ningún componente: se mantiene así por decisión del mantenedor. El carrusel (`embla-carousel-react`) sí se eliminó del proyecto cuando el hero pasó a ser estático.

### Estructura del proyecto

```text
Cumple-Edu/
├── app/
│   ├── layout.tsx          # Plantilla base: html, fuentes, metadatos y tema inicial
│   ├── page.tsx            # Portada
│   ├── globals.css         # Tokens (3 modos de color), estilos y keyframes globales
│   └── categoria/
│       └── [slug]/page.tsx # Página por categoría (SSG)
├── components/
│   ├── gallery/
│   │   ├── Hero.tsx             # Hero estático a 60 vh (imagen LCP)
│   │   ├── CategorySection.tsx  # Placa de sala + separador numerado
│   │   ├── GalleryGrid.tsx      # Rejilla masonry con CSS Columns
│   │   ├── PhotoCard.tsx        # Fotograma (Server Component)
│   │   ├── Lightbox.tsx         # Visor (cliente)
│   │   └── PhotoLightbox.tsx    # Delegación de clics y montaje diferido
│   └── layout/
│       ├── SiteHeader.tsx       # Cabecera fija mínima
│       ├── ThemeToggle.tsx      # Selector de los 3 modos de color
│       ├── NavSidebar.tsx       # FAB + panel de secciones (scroll-spy)
│       ├── FloatingBackButton.tsx # Retorno «←» persistente en categorías
│       ├── Bio.tsx              # Retrato y tarjeta de dedicatoria
│       └── SiteFooter.tsx       # Pie de página
├── content/
│   └── albums.json         # Categorías, metadatos de fotos y datos del sitio
├── public/
│   └── images/
│       ├── edu/
│       ├── amigos/
│       ├── retratos/
│       ├── paisaje/
│       └── urbano/
├── docs/                   # Documentación del proyecto (espejo del vault)
├── next.config.ts          # Configuración de Next.js e imágenes
├── tsconfig.json
└── package.json
```

### Modelo de datos

`content/albums.json` concentra todo el contenido:

```json
{
  "syntheticImages": false,
  "site": {
    "name": "Eduardo",
    "heroPhotoId": "paisaje-04",
    "bio": "…",
    "dedication": "…",
    "credit": "Eduardo",
    "portrait": { "src": "/images/edu/28.webp", "alt": "…" }
  },
  "categories": [
    {
      "id": "retratos",
      "title": "Retratos",
      "description": "Personas, gestos y luz."
    }
  ],
  "photos": [
    {
      "id": "retratos-01",
      "src": "/images/retratos/01.webp",
      "title": "Luz de tarde",
      "category": "retratos",
      "featured": true,
      "alt": "Retrato de perfil a contraluz al atardecer",
      "width": 1600,
      "height": 1067
    }
  ]
}
```

Bloques del fichero:

- `syntheticImages`: `false` cuando el contenido es real; `true` marca la muestra de desarrollo.
- `site`: nombre, `heroPhotoId` (foto fija del hero), bio, dedicatoria, crédito y retrato.
- `categories` y `photos`: secciones y sus fotos, en orden de aparición.

Campos de cada foto:

- `id`: identificador único y estable.
- `src`: ruta dentro de `public/`, o URL si se usa [Cloudinary](../Referencias/Cloudinary.md).
- `title` y `alt`: título visible y texto alternativo para lectores de pantalla.
- `category`: enlace con el `id` de una categoría.
- `featured`: si es `true`, la tarjeta muestra el distintivo «Destacada» (ya no hay carrusel de portada).
- `width` y `height`: dimensiones reales; evitan el salto de diseño al cargar.
  (Las vistas previas `blur` se retiraron en T5: 76 KB de data-URI duplicados
  en el HTML; el marco `bg-surface` hace de placeholder.)

### Flujo de imágenes

1. El fotógrafo entrega las fotos en JPEG o PNG, con la resolución de entrega (no la original de cámara).
2. Se colocan en `public/images/<categoría>/` con nombres ordenados (`01.jpg`, `02.jpg`…).
3. Se añade una entrada en `albums.json` por cada foto.
4. `next/image` genera en cada visita la variante adecuada (WebP o AVIF), recortada al tamaño que pide el dispositivo.
5. Si el repositorio supera unos 100 MB, las fotos se mueven a [Cloudinary](../Referencias/Cloudinary.md) y solo cambia el campo `src`.

### Rutas y componentes

| Ruta | Contenido |
| --- | --- |
| `/` | Portada: hero, secciones por categoría, bio, footer y `NavSidebar` |
| `/categoria/[slug]` | Página dedicada a una sola categoría, con `FloatingBackButton` |
| 404 | Página de "no encontrada" con enlace a la portada (`app/not-found.tsx`) |

| Componente | Responsabilidad |
| --- | --- |
| `Hero` | Foto fija a sangre (60 vh) con título conceptual; imagen LCP |
| `SiteHeader` | Cabecera fija mínima: nombre y selector de tema |
| `ThemeToggle` | Selector de los 3 modos de color (persistencia en `localStorage`) |
| `NavSidebar` | FAB flotante + panel de secciones con scroll-spy (bottom-sheet en móvil, popover anclado en escritorio) |
| `FloatingBackButton` | Botón «←» persistente para volver a la portada desde una categoría |
| `CategorySection` | Título de la categoría, separador numerado, descripción y rejilla |
| `GalleryGrid` | Rejilla masonry responsive (CSS Columns) |
| `PhotoCard` | Fotograma con hover, distintivo de destacada y apertura del lightbox |
| `PhotoLightbox` | Único punto cliente de las galerías: delega el clic y monta el visor bajo demanda |
| `Lightbox` | Visor a pantalla completo con ← →, contador y píldora de título |
| `Bio` | Presentación breve y tarjeta de dedicatoria de cumpleaños |
| `SiteFooter` | Crédito y año |

### Renderizado y rendimiento

- Generación estática (`SSG`): el HTML se produce una vez, en el `build`.
- Reparto cliente/servidor: solo `NavSidebar`, `ThemeToggle` y `PhotoLightbox` son Client Components; las tarjetas y el resto de la página son HTML estático.
- Imágenes: carga diferida (`loading="lazy"`) por defecto, `priority` + `fetchpriority="high"` únicamente en el hero, y `fetchpriority="low"` en las tarjetas.
- El lightbox se importa bajo demanda (`next/dynamic`, `ssr: false`) y solo se monta tras el primer clic, fuera de la hidratación inicial.
- El tema se lee antes del primer pintado con un script inline en `<head>` para evitar el flash del modo incorrecto.
- Objetivo de calidad: Lighthouse ≥ 95 en rendimiento sobre el despliegue real.

### Accesibilidad

- Texto alternativo (`alt`) descriptivo en cada foto.
- Contraste AA verificado en los tres modos de color.
- Lightbox operable con teclado (←, →, Escape) con foco atrapado dentro.
- `NavSidebar` con `aria-expanded`, `role="dialog"` y cierre con Escape; botones flotantes con `aria-label`, 48×48 px y ocultos mientras el lightbox está abierto.
- Animaciones desactivadas si el sistema marca `prefers-reduced-motion`.

### Cómo funciona, explicado sin programar

- **Repositorio**: una carpeta compartida donde viven las fotos, el texto y la configuración. GitHub es el lugar donde se guarda.
- **Next.js**: el "taller" que convierte esas fotos y textos en páginas web terminadas cada vez que se publica un cambio.
- **`albums.json`**: un inventario con una fila por foto. Es el único fichero que hay que tocar para añadir o quitar contenido.
- **[Vercel](../Referencias/Vercel.md)**: el "escaparate" donde se muestra la página. Se conecta al repositorio y actualiza la web automáticamente al haber un cambio.
- **Optimización de imágenes**: la página no sirve la foto original, sino una versión ajustada a cada pantalla, para que cargue rápido sin perder calidad visible.

## Decisiones

| Decisión | Alternativa descartada | Motivo |
| --- | --- | --- |
| Sitio estático sin BD ni backend | FastAPI + Postgres + ORM | No hay datos dinámicos; menos coste y mantenimiento |
| Metadatos en `albums.json` | Base de datos o Markdown | Fácil de leer, editar y validar con TypeScript |
| Imágenes en `public/` | S3 o Cloudinary desde el inicio | Cero configuración y coste; la migración posterior es trivial |
| Hero estático a 60 vh | Carrusel de destacados con autoplay | Menos JavaScript, LCP más rápido y cero movimiento no solicitado |
| Navegación en FAB flotante (`NavSidebar`) y retorno flotante en categorías | Cabecera con menú de secciones | La navegación vive siempre en la misma esquina y no desaparece al hacer scroll |
| 3 modos de color con `data-theme` + `localStorage` | Tema único oscuro | El regalo se lee igual de día que de noche, sin perder la identidad esmeralda |
| Animaciones en CSS puro | `framer-motion` | No hidratar componentes de servidor por puras animaciones |
| Tailwind CSS | CSS modules | Consistencia visual rápida mediante tokens |
| pnpm | npm | Instalaciones más rápidas y menor uso de disco; Vercel lo detecta por el lockfile |

## Referencias

- [Next.js](../Referencias/Next.js.md)
- [Vercel](../Referencias/Vercel.md)
- [Cloudinary](../Referencias/Cloudinary.md)
- [Decisión - galería sin backend](Decisi%C3%B3n%20-%20galer%C3%ADa%20sin%20backend.md)
- [Diseño de la galería de fotos](Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de despliegue en Vercel](Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md)
