# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Visitantes**: círculo del fotógrafo (amigos, familia, clientes) y público general que recibe el enlace. Se contempla por igual el móvil (la propia fiesta/cumpleaños) y el escritorio (exploración con calma).
- **Mantenedor del sitio**: el regalador, quien despliega, revisa los PR y actualiza el contenido; y un contribuidor que construye componentes siguiendo la base de diseño.

## Product Purpose

Galería de fotos que sirve de regalo de cumpleaños a un fotógrafo: exhibir su arte en una página moderna, rápida y fácil de mantener. El éxito es que el fotógrafo se emocione al verla, que sus visitantes exploren las fotos sin fricción y que el sitio siga siendo editable tras la entrega.

## Positioning

Una página-galería personal, estática y sin backend, construida como regalo: el arte ocupa el primer viewport y la interfaz se retira. No es un portafolio comercial ni una herramienta de venta: el sitio exhibe, no persuade.

## Operating Context

- Sitio estático compilado con Next.js (App Router) y servido en Vercel; sin login, sin panel y sin base de datos.
- El contenido vive en el repositorio: fotos en `public/images/` y metadatos en `content/albums.json`; se edita con commits, no con una aplicación.
- La entrega tiene fecha (el cumpleaños): se prioriza lo esencial (portada, categorías, lightbox) sobre lo opcional (dominio propio, página por categoría).
- Desarrollo en paralelo con dos integrantes y reparto de tareas fijado en `docs/Proyectos/Plan de equipo - tareas.md`.

## Capabilities and Constraints

- Portada con bienvenida visual (`Hero`), secciones por categoría con rejilla dinámica tipo Pinterest (`GalleryGrid`), visor inmersivo con botones minimalistas (`Lightbox`), bio con tarjeta de dedicatoria de cumpleaños (`Bio`) y pie de página con identidad (`SiteFooter`).
- **Navegación persistente**: FAB flotante (`NavSidebar`) con las secciones y scroll-spy en cualquier punto del scroll, y botón de retorno `←` (`FloatingBackButton`) en las páginas de categoría.
- **Diseño v3 moderno & festivo**:
  - Rejilla Masonry tipo Pinterest pura: tarjetas **100% fotográficas** con `rounded-2xl`, sin bandas muertas inferiores; hover overlay deslizante con título y badge de fotograma.
  - Foco accesible con anillo redondeado uniforme (`focus-visible:ring-2 rounded-2xl`).
  - **Sistema de 3 Modos de Color** (selector `ThemeToggle` en la cabecera, persistido en `localStorage`):
    - ☀️ **Modo Claro (Por Defecto)**: Luminoso, limpio y fresco en tonos salvia y esmeralda (`#F8FAF8`).
    - 🌿 **Modo Esmeralda Moderno**: Identidad botánica revitalizada con fondo verde agua (`#E8F5EE`) y acento esmeralda profundo.
    - 🌙 **Modo Oscuro**: Carbón y grafito elegante para navegación nocturna (`#0F1412`).
  - Tipografías modernas y juveniles: **Outfit** (títulos dinámicos) + **Plus Jakarta Sans** (lectura nítida) + **Geist Mono** (números de fotograma y contadores).
  - Visor `Lightbox` inmersivo: overlay negro al 88 %, título en píldora inferior, contador arriba a la izquierda y controles de solo icono sin discos.
  - Hero conceptual de bienvenida (*"Historias & Miradas"*) y categoría renombrada a *"Retratos de Eduardo"*, eliminando cualquier redundancia.
  - Dedicatoria de cumpleaños presentada como una tarjeta de regalo afectuosa y moderna.
  - Selector de temas accesible (`ThemeToggle`) en la cabecera, en todos los tamaños de pantalla.
  - `NavSidebar`: bottom-sheet en móvil y **popover anclado al botón** en escritorio (`transform-origin: bottom right`), con scroll-spy y conteo de fotos por sección.
  - `FloatingBackButton`: retorno `←` persistente en `/categoria/[slug]`, con la misma coordenada y estilo que el FAB de navegación.
- Ruta opcional `/categoria/[slug]` y página 404.
- Stack fijado: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + pnpm + Lucide Icons; lightbox con `yet-another-react-lightbox`.
- Contenido sin programación posible vía `albums.json` (ver `docs/Documentación/Guía de uso sin programación.md`).
- **Fotos reales integradas**: 133 fotografías reales clasificadas en 5 categorías (edu 38, urbano 35, paisaje 26, amigos 21, retratos 13).
- **Nombre**: Eduardo.

## Brand Commitments

- Dirección visual: Enfoque de **regalo de cumpleaños**, moderno, cálido, limpio y vívido; las fotos son las protagonistas absolutas sin ruido innecesario.
- Nombre del sitio: «Eduardo · Galería de fotos de cumpleaños» (metadata de `app/layout.tsx`).

## Evidence on Hand

- Documentación completa en `docs/`: arquitectura, diseño, decisión sin backend, guías de despliegue y de uso, y ficha del proyecto; espejo sincronizado en el vault de Obsidian.
- Sitio completo, modernizado (v3) y verificado en cada iteración:
  - Lint sin errores (`pnpm lint`).
  - TypeScript verificado con 0 errores (`pnpm exec tsc --noEmit`).
  - Build de producción Next.js 16 completado con éxito (`pnpm build`, 9 rutas).
- **Ausencias que no deben fabricarse**: nada estructural — nombre, 133 fotos reales, bio y dedicatoria ya están. La bio y la dedicatoria son **texto de ejemplo** a la espera de la edición manual del mantenedor.

## Product Principles

1. La fotografía manda: cualquier decisión de interfaz se retira si compite con la foto.
2. Sin backend mientras no haya datos dinámicos: menos coste y mantenimiento que una base de datos.
3. La fecha manda: frente a dudas, se entrega lo esencial antes que lo opcional.
4. Editable sin programar: el contenido se toca en un solo fichero (`albums.json`).
5. Trabajo en paralelo sin conflictos: cada integrante toca su territorio de archivos.

## Accessibility & Inclusion

Requisito de producto: contraste mínimo AA (4.5:1), navegación completa con teclado (incluido lightbox con ← → y Escape), `alt` descriptivo en cada foto y respeto a `prefers-reduced-motion`. Visitantes en móvil y escritorio por igual.
