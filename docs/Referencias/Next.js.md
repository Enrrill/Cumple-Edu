---
status: borrador
type: nota
tags:
  - referencia
  - nextjs
  - react
created: 2026-09-29
area: galeria-fotos
---

# Next.js

## Qué es

Framework de JavaScript construido sobre React. Convierte componentes de React en páginas web completas, con HTML listo para el navegador (lo que mejora la velocidad y el posicionamiento frente a una aplicación React pura).

## Para qué sirve en este proyecto

- Genera la galería como páginas estáticas al compilar (`next build`).
- `next/image` optimiza las fotos: formato moderno, tamaño justo y carga diferida.
- El App Router (`app/`) organiza las rutas: la portada vive en `app/page.tsx`.
- Al desplegarse en [Vercel](Vercel.md), creador del framework, la integración es directa.

## Conceptos clave

- **Server-side rendering / estatizado**: el HTML se prepara en el servidor o en la compilación, no solo en el navegador.
- **`use client`**: marca los componentes interactivos (panel de secciones, selector de tema, lightbox).
- **`next/image`**: componente que sustituye a la etiqueta `<img>` habitual.

## Enlaces

- [Next.js](https://nextjs.org)

## Notas relacionadas

- [Arquitectura de la galería de fotos](../Documentaci%C3%B3n/Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Vercel](Vercel.md)
