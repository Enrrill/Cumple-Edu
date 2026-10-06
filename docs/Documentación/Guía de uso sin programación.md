---
status: borrador
type: documento
tags:
  - galeria
  - guia
  - usuario
created: 2026-09-29
area: galeria-fotos
version: 0.2
---

# Guía de uso sin programación

## Resumen

Instrucciones para mantener la galería de fotos (añadir fotos, cambiar textos y publicar) sin escribir código, pensadas para alguien sin conocimientos de programación.

## Contexto

Este sitio no tiene panel de administración: el contenido vive en un repositorio de GitHub y cada cambio se publica solo. Conocer el proceso hace falta una sola vez; después es arrastrar y soltar. La lógica técnica está explicada en [Arquitectura de la galería de fotos](Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md).

## Contenido

### Qué es cada cosa, en palabras simples

- **Repositorio (repo)**: la carpeta donde están todas las fotos, los textos y la configuración. Vive en internet, en GitHub.
- **GitHub**: el servicio que guarda el repositorio. Funciona desde el navegador, sin instalar nada.
- **Publicar (deploy)**: hacer que la web real muestre los últimos cambios. Aquí ocurre solo al guardar.
- **[Vercel](../Referencias/Vercel.md)**: el servicio que muestra la página a los visitantes. Se conecta a GitHub y se actualiza por sí mismo.
- **`albums.json`**: el inventario de fotos. Una fila por foto con su título, su categoría y su texto alternativo.
- **Categoría**: una sección de la galería (Edu, Amigos, Retratos, Paisaje, Urbano…).

### Cómo añadir una foto (paso a paso)

1. Entrar en el repositorio en GitHub y pulsar el botón **Add file → Upload files**.
2. Arrastrar la foto a la zona de subida. Debe ir dentro de la carpeta de su categoría, por ejemplo `public/images/retratos/`.
3. Pulsar **Commit changes** para guardar.
4. Abrir `content/albums.json`, pulsar el lápiz para editarlo y añadir una fila copiando el formato de las existentes:

```json
{
  "id": "retratos-07",
  "src": "/images/retratos/07.webp",
  "title": "Título de la foto",
  "category": "retratos",
  "featured": false,
  "alt": "Descripción de lo que se ve",
  "width": 1600,
  "height": 1067
}
```

5. Guardar con **Commit changes**.
6. Esperar 1 o 2 minutos y abrir la web: la foto ya está publicada.

### Cómo añadir una categoría nueva

1. Crear la carpeta de la categoría, por ejemplo `public/images/interior/`, y subir sus fotos.
2. Añadir la categoría en el bloque `categories` de `albums.json`:

```json
{
  "id": "interior",
  "title": "Interiores",
  "description": "Espacios, luz y arquitectura."
}
```

3. Asignar `"category": "interior"` a cada foto de esa categoría.
4. Commit: la sección nueva aparece sola en la portada.

### Cómo cambiar un texto o la dedicatoria

1. Abrir `content/albums.json` desde el lápiz de GitHub.
2. Títulos y descripciones: bloques `categories` y `photos` del mismo fichero.
3. Bio, dedicatoria, nombre, crédito y retrato: bloque `site` (`bio`, `dedication`, `name`, `credit`, `portrait.src` y `portrait.alt`); el texto a cambiar está entre comillas.
4. Commit y listo.

### Consejos para las fotos

- Renombrar los archivos antes de subirlos: sin espacios ni acentos (`luz-de-tarde.jpg`).
- Exportar a un ancho máximo de 2000 px y calidad 80-90 %: se ve igual y carga mucho más rápido.
- Rellenar bien el campo `alt`: es lo que leen los lectores de pantalla y también ayuda al posicionamiento.
- `"featured": true` solo en unas pocas fotos: esas tarjetas muestran el distintivo «Destacada» con el punto esmeralda pulsante.

### Qué no hay que tocar

- Las carpetas `app/`, `components/` y los ficheros de configuración, salvo cambio de texto acordado.
- La primera línea de `albums.json` y los corchetes y llaves: si se rompe la sintaxis, la web dejará de compilar. Si pasa, se revierte desde el historial de GitHub (**Commits → … → Restore file**).

### Qué hacer si algo falla

| Problema | Qué hacer |
| --- | --- |
| La web no se actualiza | Mirar en Vercel si el último despliegue está en verde; si falló, pulsar **Redeploy** |
| La foto no aparece | Revisar que la ruta del `src` coincide exactamente con la carpeta y el nombre del archivo |
| La página se ve rara | Restaurar el último `albums.json` correcto desde GitHub y volver a probar |
| Dudas generales | Consultar [Guía de despliegue en Vercel](Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md) o pedir ayuda técnica |

## Decisiones

| Decisión | Alternativa descartada | Motivo |
| --- | --- | --- |
| Gestión de contenido en la web de GitHub | Instalar herramientas en local | No requiere instalación ni conocimientos técnicos |
| Fotos y metadatos en ficheros separados | Todo en un solo JSON con base64 | Mantener las imágenes como archivos visibles y manejables |

## Referencias

- [Arquitectura de la galería de fotos](Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de despliegue en Vercel](Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md)
- [Vercel](../Referencias/Vercel.md)
