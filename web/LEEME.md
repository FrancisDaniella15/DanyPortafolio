# Web · Francis Daniella

## Abrir

Doble clic en `index.html`, o con servidor local desde la raíz del proyecto:

```bash
python3 -m http.server 4173 --directory web
```

y abrir http://localhost:4173. No requiere instalaciones; fuentes e imágenes están en `assets/`.

## Estado vigente · 1 de noviembre de 2026

**Intro HELLO → hero.** Al entrar se escriben cinco teclas, H E L L O, con la L en naranja. Cada tecla vuela después a su letra en el teclado de la foto y se funde con ella, mientras aparecen el texto y el header. Dura unos 3 segundos y sale en cada carga de la página. Se puede saltar con «Saltar intro», con un clic o con Esc, Enter o espacio. No aparece si se entra con un enlace a una sección y se omite con «reducir movimiento». En el footer, «Repetir el hello» la vuelve a reproducir. Las teclas de la intro están hechas en código para que el vuelo sea nítido.

**Hero con las fotos del escritorio.** Se usan las fotos de Dany (`../referencias/hero-hello/`), mejoradas para web. Se escalaron ×4 con IA (Real-ESRGAN, modelo realesrgan-x4plus) de 1536 a 6144 px y se redujeron a los tamaños web. Se exportaron a WebP en 1200, 1920 y 3072 px (`assets/hero/`), y el navegador elige el tamaño según la pantalla. El texto cae sobre la parte libre de la alfombrilla. Las posiciones de H, E, L y O en la foto están en `index.html` (`.desk__key`, en píxeles de la imagen original).

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

## Pruebas del HELLO

`pruebas-hello/index.html` compara tres entradas al hero sobre el hero real, con la barra inferior (también cambia entre Claro y Cálido):
- **B · Teclas reales:** las teclas HELLO de Dany caen y vuelan en curva hasta su letra del teclado.
- **E1 · Zoom:** HELLO entra de derecha a izquierda; mientras la cámara se acerca a la O (tecla enfocada, teclado algo desenfocado), el teclado de la foto aparece a su alrededor. Luego la tecla se funde con la del teclado y la cámara se aleja.
- **E3 · La O cae**, en dos versiones para comparar 2D y 3D. En ambas, HELLO entra deslizándose con una frenada suave y un ligero fundido, sin rebote. Después H-E-L-L se disuelven en su sitio, en onda desde la O hacia fuera, mientras la O ya empieza a caer. La escena aparece desde la tecla de destino durante la caída. La O rebota dos veces de forma contenida, se funde con la tecla en el último rebote y aparece el hero.
  - **E3 · Cae en Y (2D)** (opción por defecto): teclas del tamaño de las del teclado. La O espera en la vertical de su tecla, a un tercio de la altura, y baja por la pantalla sin cambiar de tamaño.
  - **E3 · Cae en Z (3D)**: teclas a 2,2 veces el tamaño de las del teclado. La O flota justo encima de su tecla, más cerca de la cámara, y cae hacia el escritorio encogiéndose en su sitio mientras su sombra se le acerca.

Las teclas HELLO están recortadas de las imágenes de Dany, mejoradas con Real-ESRGAN y con fondo transparente (`assets/hello/`). E1 usa además la foto en 4608 px y una capa de detalle alrededor de la O (`assets/hero/`).

**Límite de calidad:** en la foto original cada tecla mide unos 45 px. Por eso E1 limita el zoom a unos 6 px de pantalla por px original y usa un desenfoque de cámara. E3 y B no necesitan primeros planos de la foto. Para un primer plano nítido de verdad haría falta una foto generada a más resolución (4096 px o más), o un escalado generativo que añada detalle.

La página está pensada para escritorio; la versión elegida se ajustará a móvil al pasarla a `index.html`.

## Pendientes

- **Logo:** la firma usa Caveat mientras falta el archivo original del logo 3A, porque el PNG está dañado.
- **Proyectos:** las tarjetas muestran «Capturas en preparación» hasta tener imágenes reales.
- **Lanzamiento:** faltan el enlace de agenda (por ahora el CTA lleva a Contacto), el CV, la versión en inglés y la publicación. Lanzamiento objetivo: 20 de noviembre de 2026.
- **Derechos de imagen:** la foto incluye la portada de *A Hard Day's Night* de The Beatles, que tiene derechos de autor. Antes de publicar conviene regenerar o retocar esa zona con un disco genérico.

## Historial

Versiones anteriores: girasoles en `../_descartado/web-girasoles/` y escritorio dibujado en código en `../_descartado/web-escritorio-codigo/`. Cambios y notas de esa etapa: [HISTORIAL.md](HISTORIAL.md). Referencias del nuevo hero: `../referencias/hero-hello/`.
