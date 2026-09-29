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
version: 0.1
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
| UI | React | Componentes de interfaz |
| Estilos | Tailwind CSS | Sistema de diseño basado en utilidades |
| Carrusel | `embla-carousel-react` | Carrusel destacado de la portada |
| Visor de imagen | `yet-anverse-react-lightbox` | Lightbox a pantalla completo |
| Animación | `framer-motion` | Entradas y transiciones suaves |
| Iconos | `lucide-react` | Iconos ligeros y consistentes |

### Estructura del proyecto

```text
galeria-fotos/
├── app/
│   ├── layout.tsx          # Plantilla base: html, fuentes, metadatos
│   ├── page.tsx            # Portada
│   ├── globals.css         # Tokens de diseño y estilos globales
│   └── categoria/
│       └── [slug]/page.tsx # Página por categoría (opcional)
├── components/
│   ├── HeroCarousel.tsx    # Carrusel a pantalla completa
│   ├── SiteHeader.tsx      # Navegación
│   ├── CategorySection.tsx # Sección con título y rejilla
│   ├── GalleryGrid.tsx     # Rejilla responsive
│   ├── PhotoCard.tsx       # Miniatura de una foto
│   ├── Lightbox.tsx        # Visor a pantalla completo
│   ├── Bio.tsx             # Presentación y dedicatoria
│   └── SiteFooter.tsx      # Pie de página
├── content/
│   └── albums.json         # Categorías y metadatos de fotos
├── public/
│   └── images/
│       ├── retrato/
│       ├── paisaje/
│       └── bn/
├── next.config.ts          # Configuración de Next.js e imágenes
├── tailwind.config.ts      # Tokens: colores, tipografía, espaciado
├── tsconfig.json
└── package.json
```

### Modelo de datos

`content/albums.json` concentra todo el contenido:

```json
{
  "categories": [
    {
      "id": "retrato",
      "title": "Retrato",
      "description": "Personas, gestos y luz."
    }
  ],
  "photos": [
    {
      "id": "retrato-01",
      "src": "/images/retrato/01.jpg",
      "title": "Luz de tarde",
      "category": "retrato",
      "featured": true,
      "alt": "Retrato de perfil a contraluz al atardecer",
      "width": 1600,
      "height": 1067,
      "blur": "data:image/jpeg;base64,..."
    }
  ]
}
```

Campos de cada foto:

- `id`: identificador único y estable.
- `src`: ruta dentro de `public/`, o URL si se usa [Cloudinary](../Referencias/Cloudinary.md).
- `title` y `alt`: título visible y texto alternativo para lectores de pantalla.
- `category`: enlace con el `id` de una categoría.
- `featured`: si es `true`, aparece en el carrusel de portada.
- `width` y `height`: dimensiones reales; evitan el salto de diseño al cargar.
- `blur`: vista previa desenfocada mientras se carga la imagen.

### Flujo de imágenes

1. El fotógrafo entrega las fotos en JPEG o PNG, con la resolución de entrega (no la original de cámara).
2. Se colocan en `public/images/<categoría>/` con nombres ordenados (`01.jpg`, `02.jpg`…).
3. Se añade una entrada en `albums.json` por cada foto.
4. `next/image` genera en cada visita la variante adecuada (WebP o AVIF), recortada al tamaño que pide el dispositivo.
5. Si el repositorio supera unos 100 MB, las fotos se mueven a [Cloudinary](../Referencias/Cloudinary.md) y solo cambia el campo `src`.

### Rutas y componentes

| Ruta | Contenido |
| --- | --- |
| `/` | Portada: carrusel destacado, secciones por categoría, bio y footer |
| `/categoria/[slug]` (opcional) | Página dedicada a una sola categoría |
| 404 | Página de "no encontrada" con enlace a la portada |

| Componente | Responsabilidad |
| --- | --- |
| `HeroCarousel` | Carrusel a pantalla completo con las fotos destacadas |
| `SiteHeader` | Navegación a las secciones y nombre del fotógrafo |
| `CategorySection` | Título de la categoría, descripción y rejilla |
| `GalleryGrid` | Rejilla responsive de miniaturas |
| `PhotoCard` | Miniatura con hover y apertura del lightbox |
| `Lightbox` | Visor a pantalla completo con ← → y contador |
| `Bio` | Presentación breve y dedicatoria de cumpleaños |
| `SiteFooter` | Crédito, año y enlaces |

### Renderizado y rendimiento

- Generación estática (`SSG`): el HTML se produce una vez, en el `build`.
- Imágenes: carga diferida (`loading="lazy"`) por defecto; `priority` solo para las primeras del carrusel.
- El lightbox se importa bajo demanda para no cargar su código en la portada.
- Objetivo de calidad: Lighthouse ≥ 95 en rendimiento sobre el despliegue real.

### Accesibilidad

- Texto alternativo (`alt`) descriptivo en cada foto.
- Contraste AA entre texto y fondo verde oscuro.
- Lightbox operable con teclado (←, →, Escape) con foco atrapado dentro.
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
| Portada con carrusel + secciones | Rejilla tipo masonry única | Elección de diseño del proyecto: impacto en la portada y orden por categoría |
| `embla-carousel-react` | Swiper | Más ligero y es la base del carrusel de shadcn/ui |
| Tailwind CSS | CSS modules | Consistencia visual rápida mediante tokens |

## Referencias

- [Next.js](../Referencias/Next.js.md)
- [Vercel](../Referencias/Vercel.md)
- [Cloudinary](../Referencias/Cloudinary.md)
- [Decisión - galería sin backend](Decisi%C3%B3n%20-%20galer%C3%ADa%20sin%20backend.md)
- [Diseño de la galería de fotos](Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de despliegue en Vercel](Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md)
