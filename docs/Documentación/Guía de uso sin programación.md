---
status: borrador
type: documento
tags:
  - galeria
  - guia
  - usuario
created: 2026-09-29
area: galeria-fotos
version: 0.4
---

# Guía de uso sin programación

## Resumen

Instrucciones para mantener la galería de fotos (añadir fotos, cambiar textos, recoger dedicatorias y publicar) sin escribir código, pensadas para alguien sin conocimientos de programación.

## Contexto

Este sitio no tiene panel de administración: el contenido vive en un repositorio de GitHub y cada cambio se publica solo. Conocer el proceso hace falta una sola vez; después es arrastrar y soltar. La lógica técnica está explicada en [Arquitectura de la galería de fotos](Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md).

## Contenido

### Qué es cada cosa, en palabras simples

- **Repositorio (repo)**: la carpeta donde están todas las fotos, los textos y la configuración. Vive en internet, en GitHub.
- **GitHub**: el servicio que guarda el repositorio. Funciona desde el navegador, sin instalar nada.
- **Publicar (deploy)**: hacer que la web real muestre los últimos cambios. Aquí ocurre solo al guardar.
- **[Vercel](../Referencias/Vercel.md)**: el servicio que muestra la página a los visitantes. Se conecta a GitHub y se actualiza por sí mismo.
- **`albums.json`**: el inventario de fotos. Una fila por foto con su título, su categoría y su texto alternativo.
- **`dedications.json`**: el inventario de dedicatorias. Un bloque por mensaje con el nombre de quien lo escribe y el texto.
- **Categoría**: una sección de la galería (Eduardo, Amigos, Gente, Paisaje, Urbano…). Cada una tiene su título, su descripción y sus fotos.

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

### Cómo añadir una dedicatoria (paso a paso)

1. Recibir el mensaje de la persona y pedirle si quiere que aparezca su nombre (y opcionalmente su foto).
2. Abrir `content/dedications.json` desde el lápiz de GitHub.
3. Añadir un bloque nuevo **dentro de los corchetes**, copiando el formato de los existentes y separando con coma:

```json
{
  "id": "ana-2026",
  "author": "Ana",
  "relation": "Amiga de la infancia",
  "date": "2026-10-07",
  "text": "El mensaje tal como lo ha escrito la persona."
}
```

- Obligatorios: `id` (único, sin espacios ni acentos), `author` y `text`.
- `text` admite dos formas: una cadena («"El mensaje."») para un párrafo, o una lista de cadenas (una por párrafo) cuando el mensaje tiene varios párrafos:

```json
"text": [
  "Primer párrafo del mensaje.",
  "Segundo párrafo del mensaje."
]
```

- Opcionales: `relation` (parentesco o vínculo), `date` (en formato `AAAA-MM-DD`), `avatar` e `image` (flyer o collage que acompañe al mensaje).
- **El orden del fichero es el orden del hilo** en la página: lo que se pega primero, se ve primero.
- Si hay dos comas seguidas o falta una, la web no compila; se revierte desde el historial de GitHub (**Commits → … → Restore file**).

4. Commit con **Commit changes**. La dedicatoria aparece en la sección «Dedicatorias» de la portada y en la página `/dedicatorias` (las dos se actualizan solas con el mismo fichero).

#### Cómo añadir la foto de la persona (avatar)

1. Subir la foto con **Add file → Upload files** dentro de `public/images/dedications/`.
2. Añadir el campo `avatar` al bloque de la dedicatoria:

```json
"avatar": {
  "src": "/images/dedications/ana.webp",
  "alt": "Ana sonriendo"
}
```

3. Sin `avatar`, la tarjeta muestra la inicial de la persona en un círculo esmeralda: también queda bien.

#### Cómo añadir un flyer a la dedicatoria (imagen adjunta)

1. Convertir la imagen a `.webp` (por ejemplo con `magick entrada.jpg -quality 85 salida.webp`) y subirla con **Add file → Upload files** dentro de `public/images/dedications/`.
2. Añadir el campo `image` al bloque de la dedicatoria, con el ancho y el alto originales en píxeles (evita saltos al cargar):

```json
"image": {
  "src": "/images/dedications/ana.webp",
  "alt": "Flyer de cumpleaños de Ana para Eduardo con fotos de ambos",
  "width": 904,
  "height": 1280
}
```

3. El `alt` describe el flyer para los lectores de pantalla (quién lo envía, de qué va). La imagen se pinta debajo del mensaje, del mismo ancho que la columna de lectura.

### Cómo cambiar un texto, la bio o la dedicatoria especial

1. Abrir `content/albums.json` desde el lápiz de GitHub.
2. Títulos y descripciones: bloques `categories` y `photos` del mismo fichero.
3. Bio, dedicatoria, nombre, crédito y retrato: bloque `site` (`bio`, `dedication`, `name`, `credit`, `portrait.src` y `portrait.alt`); el texto a cambiar está entre comillas.
4. Commit y listo.

Estilo de los textos (para que la galería mantenga su tono):

- **Título de colección** (`categories`): nombre corto y cercano, en el estilo «Amigos & Recuerdos» o «Eduardo, tal cual».
- **Descripción de colección**: una frase que cuente qué se va a ver, con aire amable (no un listado de tres palabras).
- **Título de foto** (`photos.title`): corto y con humor (de 2 a 5 palabras, un guiño sin perder la pista de qué muestra la foto), en español; se muestra bajo la miniatura y en el visor.
- **Texto alternativo** (`photos.alt`): describe la foto con exactitud —persona, gesto y lugar— pero con el tono cercano y con humor del sitio (p. ej. «Eduardo con gorro blanco sonriendo a la cámara con esa cara de "yo no he sido"»); es lo que leen los lectores de pantalla: sin emojis y sin texto que no tenga que ver con la imagen.
- Cada título de sección termina en una flecha `→` automática: no hay que escribirla a mano.

### Consejos para las fotos

- Renombrar los archivos antes de subirlos: sin espacios ni acentos (`luz-de-tarde.jpg`).
- Exportar a un ancho máximo de 2000 px y calidad 80-90 %: se ve igual y carga mucho más rápido.
- Rellenar bien el campo `alt`: es lo que leen los lectores de pantalla y también ayuda al posicionamiento.
- `"featured": true` solo en unas pocas fotos: esas tarjetas muestran el distintivo «Destacada» con el punto esmeralda pulsante.

### Qué no hay que tocar

- Las carpetas `app/`, `components/` y los ficheros de configuración, salvo cambio de texto acordado.
- Los corchetes y llaves de `albums.json` y de `dedications.json`: si se rompe la sintaxis, la web dejará de compilar. Si pasa, se revierte desde el historial de GitHub (**Commits → … → Restore file**).

### Qué hacer si algo falla

| Problema | Qué hacer |
| --- | --- |
| La web no se actualiza | Mirar en Vercel si el último despliegue está en verde; si falló, pulsar **Redeploy** |
| La foto no aparece | Revisar que la ruta del `src` coincide exactamente con la carpeta y el nombre del archivo |
| La dedicatoria no aparece | Comprobar que el bloque está dentro de los corchetes de `dedications.json` y que `id`, `author` y `text` están escritos igual que en las demás |
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
