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
version: 0.4
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
2. Los metadatos se escriben en `content/albums.json` y las dedicatorias en `content/dedications.json`.
3. Al compilar, Next.js lee los JSON y genera el HTML de cada sección.
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
│   ├── icon.svg            # Favicon: diafragma de cámara esmeralda (SVG)
│   ├── favicon.ico         # Favicon de respaldo (16/32/48 px)
│   ├── apple-icon.png      # Icono de inicio en iOS (180 px)
│   ├── page.tsx            # Portada
│   ├── globals.css         # Tokens (3 modos de color), estilos y keyframes globales
│   ├── dedicatorias/
│   │   └── page.tsx        # Página propia del hilo de dedicatorias (SSG)
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
│       ├── Bio.tsx              # Retrato y dedicatoria editorial
│       ├── Dedications.tsx      # Sección de dedicatorias en la portada
│       ├── DedicationThread.tsx # Lista del hilo (compartida con /dedicatorias)
│       └── SiteFooter.tsx       # Pie de página
├── lib/
│   ├── albums.ts            # Tipos y helpers de la galería
│   └── dedications.ts       # Tipos y helpers del hilo de dedicatorias
├── content/
│   ├── albums.json          # Categorías, metadatos de fotos y datos del sitio
│   └── dedications.json     # Mensajes de las personas, en orden de aparición
├── public/
│   └── images/
│       ├── edu/
│       ├── amigos/
│       ├── retratos/
│       ├── paisaje/
│       ├── urbano/
│       └── dedications/     # Avatares opcionales de las dedicatorias
├── docs/                   # Documentación del proyecto (espejo del vault)
├── next.config.ts          # Configuración de Next.js e imágenes
├── tsconfig.json
└── package.json
```

### Modelo de datos

`content/albums.json` concentra el contenido de la galería:

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
      "title": "Gente & Miradas",
      "description": "Personas, miradas y expresiones: rostros que se quedan quietos un segundo y luego vuelven a su ritmo."
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

### Hilo de dedicatorias (`content/dedications.json`)

Fichero aparte de `albums.json`: las dedicatorias crecen con el tiempo y se editan con el mismo flujo que las fotos. Es un array de bloques; **el orden del fichero es el orden del hilo** en la página.

```json
[
  {
    "id": "lucia-2026",
    "author": "Lucía",
    "relation": "Hermana",
    "date": "2026-10-02",
    "text": "Para el que convirtió una simple cámara en forma de familia…"
  }
]
```

Campos de cada dedicatoria:

- `id`: obligatorio, único y sin espacios ni acentos (por ejemplo, `nombre-2026`).
- `author`: obligatorio; nombre de la persona que escribe.
- `text`: obligatorio; el mensaje, puede ocupar varias líneas.
- `relation`: opcional; vínculo con el homenajeado («Hermana», «Compañero de carrera»…).
- `date`: opcional, en formato `AAAA-MM-DD`; se muestra junto al vínculo, en versalitas mono, como «02 oct 2026».
- `avatar`: opcional `{ src, alt }`. Sin avatar se pinta la inicial de la persona en un círculo esmeralda.

El tipo `Dedication` y el helper `getDedications()` viven en `lib/dedications.ts`, con el mismo patrón que `lib/albums.ts`: el componente recibe las dedicatorias por props y no importa el JSON. Si el array está vacío, `app/page.tsx` omite la sección y su entrada en el `NavSidebar`, y `app/dedicatorias/page.tsx` responde 404. El hilo se pinta con `DedicationThread`, que comparten la portada (`Dedications`) y la página propia (`/dedicatorias`).

### Flujo de imágenes

1. El fotógrafo entrega las fotos en JPEG o PNG, con la resolución de entrega (no la original de cámara).
2. Se colocan en `public/images/<categoría>/` con nombres ordenados (`01.jpg`, `02.jpg`…).
3. Se añade una entrada en `albums.json` por cada foto.
4. `next/image` genera en cada visita la variante adecuada (WebP o AVIF), recortada al tamaño que pide el dispositivo.
5. Si el repositorio supera unos 100 MB, las fotos se mueven a [Cloudinary](../Referencias/Cloudinary.md) y solo cambia el campo `src`.

### Rutas y componentes

| Ruta | Contenido |
| --- | --- |
| `/` | Portada: hero, secciones por categoría, bio, hilo de dedicatorias, footer y `NavSidebar` |
| `/categoria/[slug]` | Página dedicada a una sola categoría, con `FloatingBackButton` |
| `/dedicatorias` | Página propia del hilo de dedicatorias (`h1`, contador y mensaje completo), con `FloatingBackButton`; devuelve 404 si no hay mensajes |
| 404 | Página de "no encontrada" con enlace a la portada (`app/not-found.tsx`) |

| Componente | Responsabilidad |
| --- | --- |
| `Hero` | Foto fija a sangre (60 vh) con título conceptual; imagen LCP |
| `SiteHeader` | Cabecera fija mínima: nombre y selector de tema |
| `ThemeToggle` | Selector de los 3 modos de color (persistencia en `localStorage`) |
| `NavSidebar` | FAB flotante + panel de secciones con scroll-spy (bottom-sheet en móvil, popover anclado en escritorio) |
| `FloatingBackButton` | Botón «←» persistente para volver a la portada desde una categoría o `/dedicatorias` |
| `CategorySection` | Título de la categoría con flecha `→` de entrada, separador numerado, descripción y rejilla |
| `GalleryGrid` | Rejilla masonry responsive (CSS Columns) |
| `PhotoCard` | Fotograma con hover, distintivo de destacada y apertura del lightbox |
| `PhotoLightbox` | Único punto cliente de las galerías: delega el clic y monta el visor bajo demanda |
| `Lightbox` | Visor a pantalla completo con ← →, contador y pie con velo degradado y título con sombra |
| `Bio` | Presentación breve y dedicatoria editorial sin caja |
| `Dedications` | Cabecera de la sección de dedicatorias en la portada: separador numerado, título con `→` enlazando a `/dedicatorias` y contador |
| `DedicationThread` | Lista del hilo (tarjetas con avatar o inicial y conector entre mensajes), compartida entre la portada y `/dedicatorias` |
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
- El enlace «Volver a la portada» del encabezado de categoría es `sr-only focus:not-sr-only`: invisible a la vista (no duplica el `←` flotante) y revelado al recibir foco de teclado.
- Las flechas `→` de los títulos son `aria-hidden` y llevan dentro el texto equivalente («Ver la colección» / «Ver todas las dedicatorias») para lectores de pantalla.
- El hilo de dedicatorias usa semántica de lista (`ol`) y de cita (`blockquote`), con `aria-labelledby` en la sección y la inicial decorativa marcada con `aria-hidden`.
- Animaciones desactivadas si el sistema marca `prefers-reduced-motion`.

### Cómo funciona, explicado sin programar

- **Repositorio**: una carpeta compartida donde viven las fotos, el texto y la configuración. GitHub es el lugar donde se guarda.
- **Next.js**: el "taller" que convierte esas fotos y textos en páginas web terminadas cada vez que se publica un cambio.
- **`albums.json`**: un inventario con una fila por foto. Es el fichero que hay que tocar para añadir o quitar fotos y textos del sitio.
- **`dedications.json`**: el inventario de mensajes. Un bloque por dedicatoria; se pega el mensaje nuevo y ya aparece en la página.
- **[Vercel](../Referencias/Vercel.md)**: el "escaparate" donde se muestra la página. Se conecta al repositorio y actualiza la web automáticamente al haber un cambio.
- **Optimización de imágenes**: la página no sirve la foto original, sino una versión ajustada a cada pantalla, para que cargue rápido sin perder calidad visible.

## Decisiones

| Decisión | Alternativa descartada | Motivo |
| --- | --- | --- |
| Sitio estático sin BD ni backend | FastAPI + Postgres + ORM | No hay datos dinámicos; menos coste y mantenimiento |
| Metadatos en `albums.json` | Base de datos o Markdown | Fácil de leer, editar y validar con TypeScript |
| Dedicatorias en `content/dedications.json` (fichero propio) | Añadirlas a `albums.json` | Ciclos de vida distintos: las fotos están cerradas y las dedicatorias crecen; además evita editar un fichero de 1.300 líneas |
| Sitio estático también para las dedicatorias | Formulario con backend (Vercel Functions + BD) | Los mensajes los recoge y pega el mantenedor; no hay datos que escribir en tiempo real (ver [Decisión - galería sin backend](Decisi%C3%B3n%20-%20galer%C3%ADa%20sin%20backend.md)) |
| Imágenes en `public/` | S3 o Cloudinary desde el inicio | Cero configuración y coste; la migración posterior es trivial |
| Hero estático a 60 vh | Carrusel de destacados con autoplay | Menos JavaScript, LCP más rápido y cero movimiento no solicitado |
| Navegación en FAB flotante (`NavSidebar`) y retorno flotante en categorías | Cabecera con menú de secciones | La navegación vive siempre en la misma esquina y no desaparece al hacer scroll |
| Retorno visible único: `FloatingBackButton` + enlace textual `sr-only` | Dos enlaces «←» visibles en la cabecera | El enlace textual duplicaba el retorno; se conserva oculto a la vista y visible con foco de teclado (SEO y teclado intactos) |
| Página propia `/dedicatorias` que repite el hilo de la portada | Solo un ancla `#dedicatorias` | Sigue el mismo patrón portada ↔ colección: `h1`, contador y URL propios para las dedicatorias |
| Flecha `→` en los títulos de sección | Indicador solo al hacer hover | La entrada a la colección se ve de un vistazo y funciona sin JavaScript |
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
