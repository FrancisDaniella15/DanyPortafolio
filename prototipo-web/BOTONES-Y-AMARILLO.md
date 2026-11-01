# Botones ovalados y amarillo suave

29 de octubre de 2026. Adaptación de la referencia de botones Work, About y Contact, con crema, contorno rojo y sombra sólida bajo el primer botón.

## Abrir las propuestas

- `propuesta-c.html`: **03 · Crema y coral**. Botones ovalados de contorno coral y fondo crema.
- `propuesta-d.html`: **04 · Mantequilla y oliva**. El mismo estilo de interacción, con amarillo suave y verde oliva.
- `botones-paletas.html`: comparador con muestras interactivas y un ejemplo rotulado del estado hover.
- `botones-paletas-comparativa.png` y `.svg`: lámina de paletas y estados. Es una muestra gráfica, no una captura del sitio.

Las propuestas A y B se conservan. Las entradas `index.html`, `index-serif.html` y `revision-header.html` muestran ahora D (Mantequilla y oliva), elegida por la usuaria para probar el conjunto completo. C se conserva como alternativa.

## Paletas

| Uso | Crema y coral | Mantequilla y oliva |
| --- | --- | --- |
| Base crema | `#FAF6EA` | `#FBF8EF` |
| Verde oscuro | `#253C31` | `#304737` |
| Texto secundario | `#586459` | `#5B6657` |
| Amarillo suave | `#EBD6A4` | `#F0DCA4` |
| Rosa | `#E5B9BE` | `#EBC9CD` |
| Lila | `#D8D2E8` | `#DDD5EA` |
| Superficie | `#F0E8D8` | `#F3E9C9` |
| Texto y borde de botones | `#C82F25` | `#304737` |

En la propuesta amarilla, la crema es la base dominante; el mantequilla se usa en acciones principales, énfasis del título y pequeños detalles. El verde oliva lleva la lectura y los contornos. Rosa y lila son acentos secundarios. Los girasoles conservan su amarillo natural: el tono de la interfaz no recolorea las flores.

## Botones e interacción

- Borde de **2 px**, radio de cápsula y tipografía **Instrument Sans Regular**.
- Reposo: sin sombra. En C todos los botones son crema con texto y contorno coral; en D el principal lleva amarillo mantequilla y los secundarios conservan el crema.
- Hover con puntero fino: sombra sólida de **−3 px / +5 px**, sin desenfoque; desplazamiento de **+1 px / −2 px** y transición de 160 ms. El borde y el texto conservan su color.
- Pulsado: sombra más corta de **−1 px / +2 px** y desplazamiento vertical de +1 px.
- Foco de teclado: contorno visible y sombra, sin depender del hover.
- Movimiento reducido: no se desplazan los botones ni se animan las transiciones; la diferencia visual de sombra se mantiene.
- Navegación de C/D: se aplica este contorno y sombra a cada enlace; se ocultan el indicador deslizante y el desplazamiento duplicado de texto de las otras propuestas para que el hover siga esta nueva referencia.
- Header de **60 px** conservado. En móvil se mantiene el botón Menú y el panel desplegable existente.
- Los controles de CV, EN y Vista continúan desactivados; no reciben el tratamiento de acción disponible.

La referencia es una **imagen estática**. El estado elevado se interpreta como hover; no se ha observado una animación original ni se afirma copiar su duración o comportamiento exactos. Esta revisión toma el estilo de los botones; no incorpora el dibujo de ojos como cursor.

## Archivos y verificación

`botones-ovales.css` contiene los nuevos estilos y solo se carga en C/D y las entradas activas de revisión. Las variables están en `temas-paleta.css`, con datos en `paletas.json`. La referencia está en `../docs/referencias-visuales/botones-ovales-contorno-hover.png`.

18 pares de colores opacos comprobados por encima de 4.5:1. Ejemplos: coral sobre crema **5.00:1**; verde oliva sobre amarillo mantequilla **7.43:1**. El informe está en `contraste-botones-amarillo.json`. Esto no es una auditoría completa de accesibilidad de todo el sitio.

Lámina revisada visualmente, recursos locales y destinos comprobados. La interacción en las páginas completas y su vista adaptable siguen pendientes de revisión visual en el navegador, por el bloqueo previo del acceso automatizado a los archivos locales. No se ha publicado la web.

## Selección actual

**Mantequilla y oliva (D)** es la paleta activa del prototipo completo. Las entradas principales y `propuesta-d.html` se sincronizaron para esta revisión. La selección de la prueba está marcada con `active: true` en `paletas.json`.

## Cambio posterior del header activo

Por la última indicación de la usuaria, D utiliza ahora un header abierto: logo a la izquierda y tres enlaces a la derecha. Los enlaces conservan un contorno estático según la nueva referencia, con **ningún efecto hover**. Los estilos ovalados con sombra de esta guía se mantienen en los botones de acción fuera del encabezado. C se conserva con su header anterior. La revisión activa se aplica mediante `header-simple.css`.
