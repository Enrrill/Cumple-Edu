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

- Portada con carrusel de destacados, secciones por categoría con rejilla y lightbox; bio/dedicatoria y footer.
- Ruta opcional `/categoria/[slug]` y página 404.
- Stack fijado: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + pnpm; carrusel con `embla-carousel-react`, lightbox con `yet-another-react-lightbox`, animaciones con `framer-motion`.
- Contenido sin programación posible vía `albums.json` (ver `docs/Documentación/Guía de uso sin programación.md`).
- **Fotos reales integradas**: 54 fotografías reales clasificadas en 5 categorías (edu, amigos, retratos, paisaje, urbano).
- **Nombre**: Eduardo. Bio y dedicatoria pendientes de redactar.

## Brand Commitments

- Dirección visual ya decidida y documentada por el usuario en `docs/Documentación/Diseño de la galería de fotos.md`: paleta en tonos verdes sobre fondo oscuro, modo *Experience*, serif con carácter en títulos. Se registra aquí como vínculo; sus valores se concretan en `DESIGN.md` durante la fase de diseño.
- Nombre del sitio: pendiente (ver arriba).

## Evidence on Hand

- Documentación completa en `docs/`: arquitectura, diseño, decisión sin backend, guías de despliegue y de uso, y ficha del proyecto.
- Código de andamiaje: `app/` con layout/page/globals por defecto de create-next-app, sin componentes propios todavía.
- **Ausencias que no deben fabricarse**: bio real ni dedicatoria real (pendientes de redactar). El contenido fotográfico y el nombre ya son reales.

## Product Principles

1. La fotografía manda: cualquier decisión de interfaz se retira si compite con la foto.
2. Sin backend mientras no haya datos dinámicos: menos coste y mantenimiento que una base de datos.
3. La fecha manda: frente a dudas, se entrega lo esencial antes que lo opcional.
4. Editable sin programar: el contenido se toca en un solo fichero (`albums.json`).
5. Trabajo en paralelo sin conflictos: cada integrante toca su territorio de archivos.

## Accessibility & Inclusion

Requisito de producto: contraste mínimo AA (4.5:1), navegación completa con teclado (incluido lightbox con ← → y Escape), `alt` descriptivo en cada foto y respeto a `prefers-reduced-motion`. Visitantes en móvil y escritorio por igual.
