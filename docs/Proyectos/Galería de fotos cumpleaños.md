---
status: borrador
type: nota
tags:
  - proyecto
  - galeria
  - cumpleanos
created: 2026-09-29
area: galeria-fotos
---

# Galería de fotos cumpleaños

## Ficha

| Campo | Valor |
| --- | --- |
| Objetivo | Página-galería como regalo de cumpleaños para un fotógrafo |
| Estado | En documentación |
| Stack | Next.js + React + TypeScript + Tailwind CSS |
| Contenido | Fotos estáticas en `public/` + metadatos en `albums.json` |
| Backend y BD | No procede (ver [Decisión - galería sin backend](../Documentaci%C3%B3n/Decisi%C3%B3n%20-%20galer%C3%ADa%20sin%20backend.md)) |
| Diseño | Modo *Experience*, paleta verde, carrusel + secciones |
| Despliegue | [Vercel](../Referencias/Vercel.md), plan gratuito |
| Repositorio | Por definir |

## Plan de trabajo

- [x] Decisiones técnicas (sin BD, Vercel, carrusel + secciones)
- [x] Documentación en Obsidian
- [x] Andamiaje del proyecto (`create-next-app` + dependencias)
- [x] Reparto de tareas entre integrantes ([Plan de equipo - tareas](Plan%20de%20equipo%20-%20tareas.md))
- [ ] Contexto de diseño: `impeccable context` → `init` → `shape`
- [ ] Selección de fotos y categorías con el fotógrafo
- [ ] Componentes: hero con carrusel, secciones, lightbox, bio, footer
- [ ] Pasadas finales: `polish` y `audit`
- [ ] Repositorio en GitHub y despliegue en Vercel
- [ ] Verificación en producción y entrega del regalo

## Documentación relacionada

- [Plan de equipo - tareas](Plan%20de%20equipo%20-%20tareas.md)
- [Arquitectura de la galería de fotos](../Documentaci%C3%B3n/Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Diseño de la galería de fotos](../Documentaci%C3%B3n/Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de despliegue en Vercel](../Documentaci%C3%B3n/Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md)
- [Guía de uso sin programación](../Documentaci%C3%B3n/Gu%C3%ADa%20de%20uso%20sin%20programaci%C3%B3n.md)

## Notas

- La entrega tiene fecha: el cumpleaños. Priorizar lo esencial (portada, categorías, lightbox) frente a lo opcional (dominio propio, página por categoría).
