# Dos propuestas de color · Francis Daniella

29 de octubre de 2026. Interpretación del collage compartido por la usuaria: crema dominante, verdes oscuros para la lectura y acentos de lima, rosa y lila. Los valores no se presentan como una extracción exacta de las webs de la referencia.

## Abrir

- `paletas.html`: guía comparativa con colores, valores y muestras de botones.
- `propuesta-a.html`: **01 · Jardín editorial**, aplicada a todo el prototipo.
- `propuesta-b.html`: **02 · Lima y tinta**, aplicada a todo el prototipo.
- `paletas-comparativa.png` y `.svg`: lámina de paletas y botones. No son capturas de pantalla de la web.

Las propuestas A y B siguen disponibles en sus archivos. Después de esta primera comparación se añadieron C y D; las entradas `index.html`, `index-serif.html` y `revision-header.html` muestran ahora D (Mantequilla y oliva), elegida para la prueba completa. Ver `BOTONES-Y-AMARILLO.md`. No equivale a una elección definitiva.

## Paletas

| Uso | 01 · Jardín editorial | 02 · Lima y tinta |
| --- | --- | --- |
| Base crema | `#F7F6EE` | `#F8F6ED` |
| Texto verde profundo | `#153D2E` | `#15372B` |
| Texto secundario | `#4E6255` | `#4D6153` |
| Superficies suaves | `#EDF0E3` | `#EDF1E3` |
| Bordes de sección | `#BDC8B5` | `#B5C1A9` |
| Lima | `#D9F697` | `#CFFF6C` |
| Rosa | `#F1C7D7` | `#F2BCD6` |
| Lila | `#D8CBED` | `#C8B6EB` |

## Cómo se reparten

La crema ocupa la mayor parte de las superficies; el verde profundo lleva el texto y los contornos. El lima, el rosa y el lila se reservan para énfasis, estados y detalles. El amarillo natural de los girasoles permanece como parte de la ilustración. El cielo conserva un tono suave que se funde con la base crema de cada propuesta; las nubes y las interacciones no cambian.

- **01:** botones principales verde profundo con texto crema, secundarios con borde fino y forma de cápsula; hover verde más claro o salvia. Rosa suave bajo parte del título, acentos pequeños en proyectos y herramientas.
- **02:** botones principales lima con texto oscuro, borde de 1.5 px, radio de 12 px y sombra lila de 3 px. Hover lima más claro; secundarios con acento rosa. El header conserva su cápsula y suma sombra lila.
- El header mantiene **60 px de alto**, con límite de 80 px; en móvil se utiliza el menú desplegable existente. No reaparece la franja blanca bajo él.

## Tipografía

- Títulos: **Instrument Serif**, regular e italic ya disponibles.
- Párrafos: **Host Grotesk**.
- Header, navegación y botones: **Instrument Sans**, peso 500 en acciones. Font local `assets/fonts/InstrumentSans.ttf`, con licencia original en la misma carpeta.

La petición «Instrument sanserif» se interpretó como **Instrument Sans**, una familia distinta de Instrument Serif. Fuente oficial: https://github.com/google/fonts/tree/main/ofl/instrumentsans

## Estados y acceso

Se conserva el efecto de desplazamiento de texto y cápsula del header, con equivalentes de teclado. Los botones tienen foco visible, estado pulsado y hover; no se desplazan cuando hay preferencia de movimiento reducido. Los controles de CV, idioma y vista siguen desactivados.

Se calcularon 20 combinaciones de texto/fondo (10 por propuesta), todas por encima de 4.5:1. Los resultados están en `contraste-paletas.json`. La medición corresponde a colores opacos definidos: no sustituye una auditoría completa del sitio ni verifica automáticamente el fondo animado o todas las composiciones de transparencia.

## Archivos y revisión

- `paletas.json`: datos de las dos paletas.
- `temas-paleta.css`: variables por propuesta.
- `paletas.css`: aplicación de tipografía, color, tarjetas y botones.
- `sunflowers.js`: lee únicamente los cuatro colores del cielo desde las variables CSS; las páginas históricas conservan sus colores anteriores como alternativa por defecto.
- Referencia guardada en `../docs/referencias-visuales/paleta-crema-verde-referencia.png`.

Se revisó visualmente la lámina comparativa y se comprobaron los recursos, identificadores y destinos de las cinco entradas activas. La revisión visual de las páginas completas y de sus tamaños adaptables sigue pendiente: el navegador automatizado bloqueó el acceso a los archivos locales en los intentos anteriores. No se ha publicado el sitio.

## Ampliación posterior de esta revisión

Se incorporaron `propuesta-c.html` (Crema y coral) y `propuesta-d.html` (Mantequilla y oliva). El comparador de sus botones y estados está en `botones-paletas.html`. Las cuatro paletas se guardan en `paletas.json`.

## Selección actual

**Mantequilla y oliva (D)** es la paleta activa del prototipo completo. Las entradas principales y `propuesta-d.html` se sincronizaron para esta revisión. La selección de la prueba está marcada con `active: true` en `paletas.json`.
