# Web · Francis Daniella

## Abrir

Doble clic en `index.html`, o con servidor local desde la raíz del proyecto:

```bash
python3 -m http.server 4173 --directory web
```

y abrir http://localhost:4173. No requiere instalaciones; fuentes e imágenes están en `assets/`.

## Estado vigente · 1 de noviembre de 2026

**Intro HELLO → hero.** Al entrar se escriben cinco teclas, H E L L O, con la L en naranja. Cada tecla vuela después a su letra en el teclado de la foto y se funde con ella, mientras aparecen el texto y el header. Dura unos 3 segundos y sale en cada carga de la página. Se puede saltar con «Saltar intro», con un clic o con Esc, Enter o espacio. No aparece si se entra con un enlace a una sección y se omite con «reducir movimiento». En el footer, «Repetir el hello» la vuelve a reproducir. Las teclas de la intro están hechas en código para que el vuelo sea nítido.

**Hero con las fotos del escritorio.** Se usan las fotos de Dany (`../referencias/hero-hello/`), mejoradas para web. Se escalaron de 1536 a 3072 px con Lanczos, con un suavizado leve que borra los bloques de compresión y un enfoque en dos pasos. Se exportaron a WebP en 1200, 1920 y 3072 px (`assets/hero/`), y el navegador elige el tamaño según la pantalla. El texto cae sobre la parte libre de la alfombrilla. Las posiciones de H, E, L y O en la foto están en `index.html` (`.desk__key`, en píxeles de la imagen original).

**Dos modos.** **Claro** usa la foto blanca y **Cálido** la foto crema; al cambiar de modo, una se funde con la otra. El resto de la página usa los mismos colores. Se eligen en el header y se guardan en el navegador. Cálido es el modo por defecto.

**Sistema visual.**
- **Color:** naranja #EF6A21 como acento, con texto oscuro encima para cumplir contraste.
- **Tipografía:** Instrument Serif en títulos, Instrument Sans en textos y Caveat para la firma y las notas.
- **Componentes:** los botones y la lista de herramientas usan la misma forma de tecla que el hero.

**Pantallas estrechas o verticales.** El texto va primero y debajo va un recorte de la foto. En móvil, el recorte se centra en las letras de HELLO del teclado; en tablet muestra el teclado, la bandeja y el macropad.

## Archivos

- `index.html`: página completa (inicio y vista de caso).
- `site.css`: estilos y los dos modos (variables en `[data-theme]`).
- `desk.js`: encuadre de la foto e intro.
- `site.js`: modos, header, menú móvil, casos de estudio, trayectoria, copiar correo y apariciones al desplazarse.
- `content.js`: contenido de los tres casos.
- `assets/hero/`: fotos del escritorio en tres tamaños por modo.
- `assets/fonts/`: Instrument Sans, Instrument Serif y Caveat, con licencias OFL.

## Pendientes

- **Logo:** la firma usa Caveat mientras falta el archivo original del logo 3A, porque el PNG está dañado.
- **Proyectos:** las tarjetas muestran «Capturas en preparación» hasta tener imágenes reales.
- **Lanzamiento:** faltan el enlace de agenda (por ahora el CTA lleva a Contacto), el CV, la versión en inglés y la publicación. Lanzamiento objetivo: 20 de noviembre de 2026.
- **Derechos de imagen:** la foto incluye la portada de *A Hard Day's Night* de The Beatles, que tiene derechos de autor. Antes de publicar conviene regenerar o retocar esa zona con un disco genérico.
- **Calidad:** el escalado actual es clásico (Lanczos y enfoque). Un escalador con IA (Real-ESRGAN, Upscayl o similar) daría más detalle; para usarlo hay que autorizar su ejecución o procesar las fotos fuera y reemplazar los archivos de `assets/hero/` con los mismos nombres.

## Historial

Versiones anteriores: girasoles en `../_descartado/web-girasoles/` y escritorio dibujado en código en `../_descartado/web-escritorio-codigo/`. Cambios y notas de esa etapa: [HISTORIAL.md](HISTORIAL.md). Referencias del nuevo hero: `../referencias/hero-hello/`.
