---
status: borrador
type: decision
tags:
  - galeria
  - arquitectura
  - decision
created: 2026-09-29
area: galeria-fotos
version: 0.2
---

# Decisión - galería sin backend

## Contexto

La galería de fotos es el sitio de un fotógrafo que se publica como regalo de cumpleaños. El planteamiento inicial planteaba la duda de si hacía falta una base de datos (Postgres) y un backend (FastAPI con ORM) para servir las imágenes.

Criterios de decisión:

- El contenido cambia poco: las fotos se añaden de forma manual y esporádica.
- El sitio debe publicarse y mantenerse con el mínimo esfuerzo.
- El despliegue previsto es [Vercel](../Referencias/Vercel.md), pensado para sitios estáticos de Next.js.
- No hay usuarios, sesiones ni operaciones de escritura concurrentes.

## Alternativas consideradas

### A. Sitio estático sin backend (elegida)

Las fotos viven en `public/` y los metadatos en `content/albums.json`. Next.js genera páginas estáticas al compilar.

- Ventajas: cero coste de servidor, cero mantenimiento, carga rápida, imposible de romper desde fuera.
- Inconvenientes: para añadir una foto hay que subir dos cosas (archivo y fila en el JSON).

### B. FastAPI + Postgres + ORM

Backend en Python con SQLAlchemy y una base de datos que guarda metadatos; las fotos se sirven desde la BD o desde storage.

- Ventajas: consultas dinámicas, panel de administración posible, orden y filtros en tiempo real.
- Inconvenientes: dos servicios que desplegar y mantener, coste de hosting, superficie de fallo (BD caída, migraciones, seguridad) sin beneficio real para un sitio con pocas fotos.

### C. Panel de administración con autenticación

Lo anterior más login, subida de archivos desde la web y gestión de álbumes.

- Ventajas: el fotógrafo publicaría sin tocar el repositorio.
- Inconvenientes: es una aplicación completa (auth, límites de subida, validación, abuso potencial). Solo se justifica si el sitio crece de forma sostenida.

## Decisión

Adoptar la opción A: **sitio estático sin backend ni base de datos**. El contenido se gestiona en el repositorio y el despliegue es automático desde [Vercel](../Referencias/Vercel.md).

## Consecuencias

- Añadir una foto implica subir el archivo y editar `albums.json` (proceso cubierto en [Guía de uso sin programación](Gu%C3%ADa%20de%20uso%20sin%20programaci%C3%B3n.md)).
- No hay costes recurrentes más allá del plan gratuito.
- Los metadatos no se pueden editar desde la propia web.
- El orden, los títulos y las categorías se controlan manualmente.
- Las dedicatorias siguen la misma regla: los mensajes los recoge el mantenedor por fuera y se pegan en `content/dedications.json`. No hay formulario ni escritura desde la web, así que la decisión sigue vigente.

## Condiciones de reversión

Volver a valorar la opción B o C si se cumple alguno de estos casos:

- El fotógrafo quiere publicar desde un panel sin usar el repositorio.
- El sitio supera varios cientos de fotos con búsqueda y filtros complejos.
- Hay contenido de usuario real (comentarios, cuentas, visitantes registrados).

La migración sería aditiva: se conserva la estructura de componentes de Next.js y se sustituye la lectura de `albums.json` por llamadas a la API. El esquema de la base de datos ya está descrito en la propuesta inicial: tablas `categories` y `photos`, con SQLAlchemy como ORM y FastAPI exponiendo `GET /api/photos` y `GET /api/categories`.

## Referencias

- [Arquitectura de la galería de fotos](Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Next.js](../Referencias/Next.js.md)
- [Vercel](../Referencias/Vercel.md)
