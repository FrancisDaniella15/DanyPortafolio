# Web · Francis Daniella

## Abrir

Doble clic en `index.html`, o con servidor local desde la raíz del proyecto:

```bash
python3 -m http.server 4173 --directory web
```

y abrir http://localhost:4173. No requiere instalaciones; fuentes e imágenes están en `assets/`.

## Estado vigente · 1 de noviembre de 2026

**Intro HELLO → hero (versión «E3 · Y sobre la tecla», provisional).** Al entrar, las teclas HELLO reales de Dany entran deslizándose desde la derecha, con el tamaño de las teclas del teclado, y se detienen con la O justo encima de su tecla. H-E-L-L se disuelven y la O cae en vertical con gravedad, da un solo rebote y encaja en la O del teclado de la foto, mientras toda la escena pasa de desenfocada a nítida. Al encajar aparecen el texto y el header. Funciona igual en móvil, calculando la posición desde el encuadre real de la foto; si la tecla no queda a la vista, HELLO se desvanece sin caer. Se puede saltar con «Saltar intro», un clic o Esc, Enter o espacio. No aparece si se entra con un enlace a una sección ni con «reducir movimiento». «Repetir el hello», en el footer, la vuelve a reproducir. Las demás opciones siguen en `pruebas-hello/` para cambiarla si hace falta.

**Hero con las fotos del escritorio.** Se usan las fotos de Dany (`../referencias/hero-hello/`), mejoradas para web. Se escalaron ×4 con IA (Real-ESRGAN, modelo realesrgan-x4plus) de 1536 a 6144 px y se redujeron a los tamaños web. Se exportaron a WebP en 1200, 1920 y 3072 px (`assets/hero/`), y el navegador elige el tamaño según la pantalla. El texto cae sobre la parte libre de la alfombrilla. Las posiciones de H, E, L y O en la foto están en `index.html` (`.desk__key`, en píxeles de la imagen original).

**Navegación.** Arriba solo queda la firma, sin barra, para que el monitor de la foto se vea entero; al desplazarse gana un fondo esmerilado. Los enlaces, el selector Claro/Cálido y el CTA viven en un dock flotante abajo al centro. En pantallas estrechas el dock es más compacto y sin CTA (Contacto lleva al mismo sitio); el diseño móvil está pendiente de definir.

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
- **E3 · La O cae**, en dos versiones para comparar 2D y 3D. En ambas, HELLO entra deslizándose con una frenada suave y un ligero fundido, sin rebote. Después H-E-L-L se disuelven en su sitio, en onda desde la O hacia fuera, mientras la O ya empieza a caer. La escena aparece durante la caída y, al encajar la O, aparece el hero.
  - **E3 · Y centrado** (opción por defecto) y **E3 · Y sobre la tecla**: caída 2D con teclas del tamaño de las del teclado. La O cae acelerando, da un solo rebote corto (8 % de la caída) y se asienta; la tecla se hunde en cada contacto y la O se funde con ella. Toda la escena aparece a la vez, de desenfocada y transparente a nítida. Solo cambia dónde aparece HELLO:
    - **Centrado:** en el centro horizontal y en el centro óptico (42 % de la altura). La O cae en un arco suave hasta su tecla; el desplazamiento horizontal va aparte y a ritmo constante.
    - **Sobre la tecla:** desplazado para que la O quede en la vertical de su tecla, a un tercio de la altura. La O cae recta.
  - **E3 · Cae en Z (3D)**: HELLO aparece centrado y a 2,2 veces el tamaño de las teclas, como si estuviera cerca de la cámara. La O baja hasta su tecla mientras se encoge y su sombra se le acerca. La escena se abre desde la tecla de destino con un borde muy suave.

Las teclas HELLO están recortadas de las imágenes de Dany, mejoradas con Real-ESRGAN y con fondo transparente (`assets/hello/`). E1 usa además la foto en 4608 px y una capa de detalle alrededor de la O (`assets/hero/`).

**Límite de calidad:** en la foto original cada tecla mide unos 45 px. Por eso E1 limita el zoom a unos 6 px de pantalla por px original y usa un desenfoque de cámara. E3 y B no necesitan primeros planos de la foto. Para un primer plano nítido de verdad haría falta una foto generada a más resolución (4096 px o más), o un escalado generativo que añada detalle.

La página está pensada para escritorio; la versión elegida se ajustará a móvil al pasarla a `index.html`.

## Prueba de scroll con cambio de perspectiva

`pruebas-scroll/index.html` prueba la transición del hero a Proyectos al hacer scroll, inspirada en un video de Dany (la cámara pasa del escritorio real al monitor y entra en la pantalla). La escena queda fija mientras dura el recorrido y la cámara persigue la posición del scroll con inercia, para que la rueda del ratón no dé saltos.
- **Hacia el monitor:** la cámara levanta la vista (la mesa toma perspectiva y el monitor baja al centro), se acerca y se endereza hasta que la pantalla llena el visor. La pantalla se enciende con el fondo de la web y entran el título y las tarjetas de proyectos. Como la foto solo muestra el borde inferior del monitor, la pantalla se extiende hacia arriba en código (bisel y fondo de bandas con los colores de la foto), así se ve nítida a cualquier zoom. También se extiende la superficie del escritorio por encima de la foto.
- **La mesa se inclina:** el escritorio se tumba hacia atrás en perspectiva y la sección de proyectos sube encima como una hoja. Usa solo la foto real.

**Pendiente:** la pantalla dibujada en código de «Hacia el monitor» no encaja con la perspectiva de la foto. Se rehará con una segunda foto del mismo escritorio vista de frente al monitor, con la pantalla lisa, para pasar de la vista cenital a la frontal y entrar en la pantalla, con la web montada en código dentro.

Pensada para escritorio; el móvil se definirá aparte.

## Pendientes

- **Logo:** la firma usa Caveat mientras falta el archivo original del logo 3A, porque el PNG está dañado.
- **Proyectos:** las tarjetas muestran «Capturas en preparación» hasta tener imágenes reales.
- **Lanzamiento:** faltan el enlace de agenda (por ahora el CTA lleva a Contacto), el CV, la versión en inglés y la publicación. Lanzamiento objetivo: 20 de noviembre de 2026.
- **Derechos de imagen:** la foto incluye la portada de *A Hard Day's Night* de The Beatles, que tiene derechos de autor. Antes de publicar conviene regenerar o retocar esa zona con un disco genérico.

## Historial

Versiones anteriores: girasoles en `../_descartado/web-girasoles/` y escritorio dibujado en código en `../_descartado/web-escritorio-codigo/`. Cambios y notas de esa etapa: [HISTORIAL.md](HISTORIAL.md). Referencias del nuevo hero: `../referencias/hero-hello/`.
