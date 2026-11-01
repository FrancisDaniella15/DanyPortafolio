# Historial del prototipo

Registro de los cambios aplicados al prototipo entre el 28 y el 30 de octubre de 2026, en orden. Las notas de detalle que antes estaban en archivos separados se reúnen al final como anexos. Los archivos que se mencionan y ya no están en `web/` se guardan en `../_descartado/prototipo-web/` (variantes descartadas el 1 de noviembre) o en `../_descartado/web-girasoles/` (la versión de girasoles completa).

## Primera versión · 28 de octubre de 2026

Se mantiene el mensaje acordado: Dany Cova, Senior Product Designer; plataformas financieras, apps y sistemas de diseño. La estructura inferior sigue siendo un boceto con los tres proyectos, perfil, trayectoria desplegable, herramientas y contacto.

La versión activa presenta girasoles amarillos con centros marrones y tallos verdes articulados, sobre un cielo celeste que se aclara hacia el horizonte. Las nubes blancas difusas cruzan muy lentamente. La textura de vidrio y grano se aplica solo a las capas de cielo y flores: el texto y los botones no tienen filtros.

Cada girasol tiene su propio balanceo periódico. El título se escribe una sola vez, reservando el espacio para evitar saltos. El movimiento floral gana amplitud al terminar esa entrada. La escena puede pausarse y respeta la preferencia de reducir movimiento.

Al acercar el cursor o tocar los pétalos, se desprende uno por gesto. Hay como máximo tres cayendo a la vez y dos ausentes por flor. Caen desde la zona de unión, conservan la textura original y reaparecen gradualmente en la flor. No se activa sobre textos o botones. Con movimiento reducido no hay caída.

El recurso transparente `assets/girasoles-cabezas-v1.png` se creó con la herramienta integrada de generación de imágenes. Los tallos, hojas, brisa, nubes y pétalos se animan mediante código local, sin video ni ampliación de una fotografía completa. [Referencia observada, adaptación y prompt](#anexo--girasoles-animados--28-de-octubre-de-2026).

Las fuentes están guardadas en `assets/fonts/` junto con sus licencias OFL. Fuentes originales: [Host Grotesk](https://github.com/google/fonts/tree/main/ofl/hostgrotesk) e [Instrument Serif](https://github.com/google/fonts/tree/main/ofl/instrumentserif).

## Logo provisional · 29 de octubre de 2026

Se sustituyó «Dany Design» en el enlace del encabezado de `index.html` e `index-serif.html` por la propuesta manuscrita **3A** de Francis Daniella. La propuesta 3B sigue disponible en la galería de identidad. La imagen original se conserva en `assets/logo-francis-daniella-seleccion.png`; el estilo `.wf-brand-window` muestra únicamente 3A, sin las etiquetas ni la otra opción. El enlace mantiene su destino al inicio y su nombre accesible. Las variantes históricas de laptop, abstracto y tulipanes permanecen archivadas sin este cambio.

## Header flotante · 29 de octubre de 2026

Referencia: https://leomarlowe.framer.website/. Se inspeccionó el header en el navegador, incluido el estado del enlace Work después de interactuar: cápsula de fondo, indicador que cambia de posición y copia del texto que entra desde abajo con traslación de −125 %.

Se adaptó el comportamiento a la navegación propia, con el logo manuscrito 3A, Proyectos, Sobre mí y Contacto. El CV y los controles pendientes siguen desactivados. La paleta de la cápsula es provisional; el cielo y los girasoles se conservan.

- `header.css`: cápsula flotante con fondo claro, borde, desenfoque de fondo, estados de teclado, transición del texto y adaptación a móvil. El desenfoque no afecta a las letras.
- `header.js`: indicador que sigue los enlaces con cursor o foco de teclado y recalcula su posición cuando cambia el tamaño o cargan las fuentes.
- Con movimiento reducido, no se desplazan las letras y el indicador cambia de estado sin animación.
- En pantallas pequeñas el header mantiene sus 60 px de alto. El botón «Menú» abre un panel separado debajo; Escape lo cierra y devuelve el foco al botón. También se cierra al elegir un destino o pulsar fuera.
- La combinación actual es **Host Grotesk en textos y navegación + Instrument Serif en títulos**. Ambas entradas activas usan esta combinación; las variantes históricas se conservan.
- El logo 3A mide 82 px de ancho. Se conserva como imagen provisional, no como vector final.

Comprobaciones de esta revisión: sintaxis de los archivos JavaScript, recursos locales, nombres accesibles y destinos de enlaces. La vista local no se pudo abrir mediante el navegador automatizado, que bloqueó el protocolo de archivo; falta verificar visualmente el resultado y su hover en el prototipo cargado.

## Simplificación del header · 29 de octubre de 2026

La cápsula mide **60 px de alto**, con límite de 80 px, padding de 5 px y borde de 1 px. Se tomaron como guía los estilos calculados de la referencia: radio de 999 px, separación de 2 px entre elementos, color claro #f4f2ee, borde negro al 12 %, desenfoque de 14 px y sombra discreta. Se mantiene Host Grotesk.

El header pasa a estar superpuesto al cielo. La barra de revisión se oculta y ya no se reserva una franja blanca debajo. El hero deja espacio superior para que el contenido no quede tapado. En móvil se conserva la altura y se usa un menú desplegable; los enlaces y controles pendientes siguen disponibles, con sus estados anteriores.

Revisión de código: sintaxis JavaScript, destinos de navegación, asociación del botón de menú con su panel y recursos locales. La comprobación visual en navegador continúa pendiente debido al bloqueo del acceso automatizado al archivo local.

## Abrir la revisión compacta

`revision-header.html` es una copia de revisión de la entrada serif, creada para abrir el header de 60 px desde un enlace nuevo cuando la pestaña anterior siga mostrando la versión previa. Sus estilos usan identificadores de versión para solicitar su actualización. Las entradas principales siguen siendo `index.html` e `index-serif.html`; al cambiar el header debe actualizarse también esta copia de revisión.

La persistencia visual de una versión anterior no se ha diagnosticado en el navegador; el uso de identificadores de versión es una medida para evitar reutilizar estilos anteriores, no una confirmación de la causa.

## Dos paletas aplicadas · 29 de octubre de 2026

Abrir `paletas.html` para comparar **Jardín editorial** (`propuesta-a.html`) y **Lima y tinta** (`propuesta-b.html`). Las dos aplican los colores al header, botones, textos, tarjetas, herramientas y contacto; también suavizan el cielo para integrarlo con la base crema. Instrument Sans se utiliza en navegación y botones, Instrument Serif en títulos y Host Grotesk en párrafos. Las dos versiones iniciales se conservan como alternativas; la paleta activa actual es Mantequilla y oliva (D). Consultar `PALETAS.md` para valores, usos y comprobaciones.

## Botones de contorno y amarillo suave · 29 de octubre de 2026

Nuevas entradas: `propuesta-c.html` (**Crema y coral**) y `propuesta-d.html` (**Mantequilla y oliva**). Comparar en `botones-paletas.html`. Se aplicó el estilo de óvalos, contorno de 2 px y sombra sólida al hover al header y las acciones del sitio. El amarillo mantequilla #F0DCA4 sustituye al lima intenso en la nueva propuesta D; se combina con crema #FBF8EF y verde oliva #304737.

Las entradas principales muestran ahora D (Mantequilla y oliva), elegida para la prueba completa. A, B y C se conservan completas. Guía de colores, estados, contraste y alcance: [Anexo · Botones ovalados y amarillo suave](#anexo--botones-ovalados-y-amarillo-suave).

## Paleta activa · Mantequilla y oliva

Elegida para la siguiente prueba por la usuaria el 29 de octubre de 2026. Se aplicó **D** a `index.html`, `index-serif.html`, `revision-header.html` y `propuesta-d.html`, que comparten el mismo contenido y estilos activos.

Se utiliza en todo el recorrido: hero y cielo, navegación, acciones y hover, proyectos, fichas de caso, perfil y trayectoria, herramientas, contacto y footer. Crema #FBF8EF como base, amarillo mantequilla #F0DCA4 en acciones y detalles, verde oliva #304737 en texto y contornos. Rosa y lila continúan como acentos pequeños.

Se conservan el header de 60 px, el logo 3A, los óvalos de borde de 2 px, Instrument Sans en header/botones, Instrument Serif en títulos y Host Grotesk en texto. CV, inglés y selector visual permanecen desactivados. A/B/C siguen siendo alternativas, sin sustituir la paleta activa.

## Header abierto y sin hover · 29 de octubre de 2026

La referencia más reciente muestra marca a la izquierda y tres enlaces a la derecha. Se aplicó esa composición a las cuatro entradas activas de D: header abierto, transparente, sin cápsula exterior, con altura de 60 px y logo 3A de 96 px de ancho. Permanece sobre el cielo al inicio y sale de la vista al desplazarse la página.

Proyectos, Sobre mí y Contacto son enlaces con contorno fino y estático, como en la nueva imagen, sin sombras, desplazamientos ni texto duplicado. El foco de teclado permanece visible. Instrument Sans y Mantequilla y oliva se conservan. Los botones de acción fuera del header mantienen su estilo ovalado y hover.

En móvil se conserva el menú desplegable. CV, ES, EN y Vista se trasladaron al footer; los tres controles pendientes siguen desactivados. No se eliminaron las funciones del prototipo.

`header-simple.css` solo se carga en la variante activa D. `header.js` separa el menú móvil del hover opcional para que el menú siga funcionando sin el indicador anterior. La referencia se conserva en `../referencias/diseno-web/header-abierto-marca-izquierda.png`.

## Logo sin fondo y en oliva · 29 de octubre de 2026

La cabecera activa utiliza `assets/logo-francis-daniella-3a-oliva.png`, una edición de la opción 3A con fondo transparente real y letras en verde oliva oscuro. Se eliminó la dependencia del recorte CSS de la lámina blanca y del modo de mezcla; la imagen completa se muestra dentro del espacio existente de 96 px, sin cambiar la altura de 60 px del header.

Se comprobó que el archivo tiene canal alfa con píxeles transparentes y opacos. La lámina original se conserva como referencia y en las propuestas anteriores. Herramienta, prompt y procedencia: [Anexo · Logo 3A · Transparente y verde oliva](#anexo--logo-3a--transparente-y-verde-oliva).

## Header lineal y CTA principal · 29 de octubre de 2026

Última referencia: header de Victoria Salatino. Se aplicaron enlaces de texto pequeños en mayúsculas, espaciado de letras y línea divisoria inferior. Se retiró el contorno ovalado de los enlaces. La barra mide 60 px y permanece arriba al recorrer el sitio. La fuente del header pasa a **Host Grotesk**, por petición expresa; los títulos conservan Instrument Serif y los botones fuera del header mantienen Instrument Sans.

**Book a call** es el único botón principal de la navegación y utiliza amarillo mantequilla. Dany confirmó que aún no tiene enlace de agenda: por ahora va a `#wf-contacto`, sin simular reservas ni disponibilidad. Se sustituirá ese destino cuando facilite su agenda. El menú móvil incluye el CTA y mantiene sus controles de teclado.

## Galería de proyectos · prueba con imágenes provisionales

Carbon aparece como proyecto principal a todo el ancho; Sozialens y PortalFi se presentan debajo, con alturas y posiciones distintas. En móvil pasan a una columna. Cada tarjeta completa abre su caso existente y conserva el resumen de la aportación.

Dany autorizó imágenes genéricas mientras aporta las capturas. Se usan tres ilustraciones locales con la etiqueta visible **Imagen provisional**; no son pantallas reales ni evidencia del proyecto. Detalles y pendientes en [Anexo · Proyectos seleccionados · prueba de composición](#anexo--proyectos-seleccionados--prueba-de-composición). El hero y las alternativas A/B/C se conservan.

## Botones compactos · 29 de octubre de 2026

Por petición de Dany, Book a call pasa a Instrument Sans, 13 px y 36 px de altura en escritorio. Los botones de acción del contenido utilizan la misma fuente a 13 px, con 40 px de altura mínima y menos espacio lateral. Los enlaces del header siguen en Host Grotesk; títulos en Instrument Serif. En dispositivos de puntero táctil se conserva un mínimo de 44 px para facilitar la pulsación. El destino temporal de Book a call continúa siendo Contacto.

## Header transparente y logo reducido · 30 de octubre de 2026

Se retiraron el fondo crema de la barra y su línea inferior para integrarla con el cielo. El logo transparente en oliva pasa de 96 a 80 px de ancho. La altura del header sigue siendo 60 px; el menú desplegable móvil conserva su fondo para facilitar la lectura. Se mantienen enlaces, CTA y tipografías.

## Velo oliva al desplazarse · 30 de octubre de 2026

El header continúa fijo. En los primeros 12 px de la página es transparente; al desplazarse aparece un fondo oliva claro #D5DEBE al 88 % con desenfoque de 14 px, línea y sombra muy suaves. El logo, enlaces y botones permanecen nítidos y opacos. Sin soporte de desenfoque, se usa el mismo oliva claro opaco para mantener la lectura. Al volver arriba se retira el fondo. El estado también se actualiza al abrir un enlace de sección o restaurar la página; no se modifica la navegación. La transición se desactiva con reducir movimiento.

### Ajuste vigente: crema al 50 %

Dany sustituyó el oliva por el crema de la captura del 30 de octubre a las 11:01. Color medio de la referencia: #F2EDDE. El fondo del header al desplazarse usa rgba(242, 237, 222, .5), con blur de 14 px. Solo el fondo tiene un 50 % de opacidad; texto, logo y CTA mantienen su opacidad completa. La alternativa sin soporte de blur utiliza ese crema opaco. El comportamiento fijo y la transparencia al volver al inicio se conservan.

### Navegación en Instrument Sans y CTA verde · 30 de octubre

Proyectos, Sobre mí y Contacto pasan a Instrument Sans, conservando su tamaño y tratamiento de enlaces simples. Book a call cambia a verde oliva #304737 con texto crema #FBF8EF. Se conservan su tamaño compacto, su destino temporal a Contacto y el fondo de la barra al 50 % con blur. Este ajuste de color se limita al CTA del header.

## Presentación editorial con menos texto · 30 de octubre de 2026

Nueva prueba activa: titular «Diseño plataformas financieras y apps.» a gran tamaño, una sola frase de apoyo y CTA verde «Iniciemos un proyecto». Los girasoles ocupan el lado derecho en escritorio y una zona propia debajo del texto en móvil. El enlace Ver proyectos continúa disponible y el CTA lleva a Contacto.

La barra mantiene sus estilos aprobados; su CTA también se llama Iniciemos un proyecto. La versión anterior se conserva en `index-hero-anterior.html`. Dirección, referencias, textos y comprobaciones en [Anexo · Inicio editorial · prueba del 30 de octubre de 2026](#anexo--inicio-editorial--prueba-del-30-de-octubre-de-2026).

### Presentación personal vigente

El titular de la primera prueba no convenció a Dany. Se sustituye por «Soy Dany Cova, Senior Product Designer.» y el apoyo «Diseño interfaces para FinTech, DeFi y apps.». Se elimina la identidad duplicada sobre el titular. Composición, fuentes, girasoles y CTA se conservan.


### Nombre del titular

Por petición de Francis, el titular dice «Soy Francis Daniella, Senior Product Designer.», utilizando el mismo nombre de la firma. Se conserva el resto de la presentación.

### Exploración con IA en el titular

Nueva prueba solicitada por Francis: «Diseño de producto, con IA para explorar y criterio para decidir.». Nombre y rol en una línea superior; debajo, «FinTech, DeFi y apps para el día a día.». Se mantiene Iniciemos un proyecto como CTA verde. La propuesta refleja el uso de IA confirmado en la entrevista. No se añaden promesas de velocidad ni resultados. La presentación personal anterior queda en `index-hero-personal.html`.

### Prueba centrada y botones Tiny Mighty

La composición activa se inspira en la nueva captura de Leo Marlowe: círculo floral, identidad en cápsula, titular centrado y accesos a los tres proyectos. El titular se acorta a «Diseño de producto, con IA y criterio propio.». Se conserva el CTA verde y la barra fija con blur.

Las acciones adoptan una adaptación del gesto elástico Is-Jellybelly de Tiny Mighty Buttons, con esquinas pequeñas y movimiento del fondo. Los enlaces del header siguen simples. Dirección, fuentes y limitaciones de verificación en [Anexo · Hero centrado y botones elásticos](#anexo--hero-centrado-y-botones-elásticos). La versión lateral anterior está en `index-hero-ia-lateral.html`.

### Girasoles a ambos lados

Por petición de Francis, el círculo floral se sustituye por tres girasoles a la izquierda y tres a la derecha. Se mantienen el centro tipográfico, los accesos a proyectos y los botones elásticos. En móvil se reserva una franja inferior para los dos grupos. Se conservan tallos, hojas, brisa, textura de vidrio, caída y regeneración de pétalos, pausa y reducción de movimiento. Ocho pruebas de lógica y geometría superadas; revisión visual de página pendiente.

### Instrument Sans y rol sin fondo

Francis pidió retirar Senior, el nombre repetido y la cápsula del hero: ahora se muestra solo «Product Designer». Se prueba Instrument Sans en todo el texto que usaba Host Grotesk, manteniendo Instrument Serif en los títulos. El nombre continúa en la firma del header. Ajustes centralizados en `typography-current.css`, solo en las cuatro entradas activas; las propuestas anteriores se conservan.

### Altura del hero

Hero fijado a 1040 px en escritorio por petición de Francis. Hasta 850 px de ancho utiliza altura automática para acomodar texto, acciones y jardín inferior. Se elimina el mínimo basado en la altura de la ventana.

### Jardín ampliado y cielo azul

La versión activa aumenta a dieciséis girasoles, ocho por lado, con alturas y tamaños variados. Se recuperan el degradado azul celeste, las nubes blancas difusas y su movimiento lento. Se mantienen los 1040 px en escritorio, la lectura central y todas las interacciones florales; los colores del resto de la página no cambian. Ocho pruebas de geometría e interacción superadas con la composición ampliada. Revisión visual de página pendiente.

### Jardín a media altura y flores centrales bajas

Francis pidió reducir la altura de las flores. El jardín ahora ocupa los 520 px inferiores del hero en escritorio, con cabezas laterales más pequeñas y tallos más cortos. Se añaden cuatro girasoles pequeños en el centro inferior; se mantienen los ocho de cada lateral. Cielo, nubes y efectos se conservan. En móvil continúa la zona floral de 330 px debajo del contenido. Ocho pruebas de geometría y lógica superadas con la nueva composición; revisión visual pendiente.

### Sin puntos y con botones redondeados

Se retira la trama decorativa de puntos verdes. Las acciones vuelven al estilo redondeado con contorno, sombra sólida y desplazamiento leve al hover; se conserva el verde oliva de los CTA principales y Instrument Sans. Los enlaces de navegación siguen simples. `buttons-rounded.css` sustituye a `buttons-mighty.css` en las cuatro entradas activas; se conserva el archivo de la prueba elástica como referencia. Cielo, flores y sus interacciones no cambian.

## Anexo · Logo 3A · Transparente y verde oliva

29 de octubre de 2026.

- Archivo integrado: `assets/logo-francis-daniella-3a-oliva.png`.
- Procedencia: edición de la opción 3A de `assets/logo-francis-daniella-seleccion.png`.
- Método: herramienta integrada de generación y edición de imágenes, con transparencia activada. Sin CLI ni transformación de píxeles mediante código.
- Se solicitó extraer solo 3A, conservar su composición manuscrita de dos líneas y aplicar verde oliva oscuro con #304737 como guía. Se inspeccionó visualmente la edición.
- PNG de 1774 × 887, cuatro canales. Comprobación: 1.102.788 píxeles totalmente transparentes; ningún píxel blanco opaco. Se conserva el alfa original devuelto por la herramienta.
- Se integra como imagen completa, sin el recorte de la lámina ni el modo multiply. Se mantiene el espacio del logo y el header de 60 px.
- La lámina original permanece guardada. Es un recurso raster de revisión; no un vector final.
- El archivo fue revisado visualmente y su transparencia fue comprobada. La vista completa en el navegador no se ha podido comprobar mediante el acceso automatizado al archivo local.

### Prompt de edición

Use case: background-extraction / precise-object-edit.
Edit target: attached comparison sheet containing two handwritten wordmarks labeled 3A and 3B.
Extract ONLY the left wordmark, option 3A. Remove ALL white background, the 3A label, the right 3B wordmark and every other element. Output a single clean isolated wordmark with REAL TRANSPARENT ALPHA background.
Retain the actual existing letter shapes, the exact spelling "FRANCIS DANIELLA", the same two-line arrangement and rising handwritten rhythm of the left logo. Do not retype with another font or redesign the letters. Keep smooth clean antialiased edges, open letter counters, original connections, stroke thickness and relative proportions. Do not distort or damage thin strokes.
Recolor the selected wordmark to ONE flat dark olive green, hex #304737. No black or white halo, no white matte, no shadow, no stroke outline, no gradient, no texture, no symbols, no added lettering.
Frame the isolated logo closely with modest transparent margins of approximately 4% around its visible strokes. The name should fill most of the canvas. This is a production asset to replace the comparison-sheet crop in a website header, not a comparison board or mockup.
Invariants: only the left 3A lettering, original two-line composition and readable complete name. Transparent background everywhere outside the strokes and inside letter counters.

## Anexo · Dos propuestas de girasoles

28 de octubre de 2026. Se generaron dos recursos transparentes con la herramienta integrada de generación de imágenes. Dany indicó que prefería probar la primera, natural; todavía no es una elección definitiva de identidad visual.

### Primera: naturales y luminosos — activa

Archivo: `assets/girasoles-naturales-v2.png`.

Pétalos abiertos, firmes y amarillos, centros marrones. El hero pasa de cuatro a siete flores, conserva los tallos, cielo, nubes y caída de pétalos. El ciclo de balanceo pasa de 12 a 8 segundos; las nubes siguen siendo lentas.

![Naturales](../_descartado/web-girasoles/assets/girasoles-naturales-v2.png)

#### Prompt

Use case: photorealistic-natural. Create a transparent botanical sprite sheet, wide 2:1 landscape, TWO isolated sunflower HEADS side by side in two equal square cells. Each head centered in its own half, complete petals within its half, generous transparent gutter and padding. Only heads, no stems or leaves, no background, no text, no border. Both sunflowers must look fresh, joyful, thriving and fully open, facing toward the viewer with only slight natural variation. Vibrant bright sunny yellow petals with warm golden bases, firm lifted petals radiating outward in full layered rings, healthy rich brown circular seed centers. Avoid wilted, drooping, curled, ragged, damaged or sparse petals. Do not make emoji or cartoon icons. Style: fine editorial botanical photography, luminous spring daylight, bright natural yellow without orange-brown dullness. Natural soft texture and delicate photographic grain. Keep natural volume and real fine seed details; no hard shiny plastic surfaces. The left head almost straight on, the right head only 8 degrees off front. Clean soft silhouette, no blur baked in; the application applies a gentle glass effect.

### Segunda: lápiz — recurso guardado

Archivo: `assets/girasoles-lapiz-v1.png`. Exploración ilustrada conservada; no sustituye a la versión activa.

![Lápiz](../_descartado/prototipo-web/assets/girasoles-lapiz-v1.png)

#### Prompt

Use case: illustration-story. Create a transparent botanical sprite sheet, wide 2:1 landscape, TWO isolated sunflower HEADS side by side in two equal square cells. Each head centered in its own half, complete petals within its half, generous transparent gutter and padding. Only heads, no stems or leaves, no background, no text, no border. Both sunflowers must look fresh, joyful, thriving and fully open, facing toward the viewer with only slight natural variation. Vibrant bright sunny yellow petals with warm golden bases, firm lifted petals radiating outward in full layered rings, healthy rich brown circular seed centers. Avoid wilted, drooping, curled, ragged, damaged or sparse petals. Do not make emoji or cartoon icons. Style: hand-drawn colored-pencil botanical illustration. Loose but carefully observed warm golden yellow pencil strokes, rich brown crosshatched seed centers, irregular expressive sketch lines and visible pigment texture, delicate white gaps WITHIN the drawing like a botanical sketchbook. No white background: true transparency outside the heads. Keep the silhouette full and uplifting, healthy pointed yellow petals, subtle natural asymmetry. Refined adult editorial illustration, no vector flat fill, no clipart, no photorealism, no glossy 3D. Two different natural petal arrangements.

## Anexo · Girasoles animados — 28 de octubre de 2026

### Referencia observada

https://pin.it/3d1l4lpMR redirige a https://www.pinterest.com/pin/683491680982379987/.

El pin contiene un GIF de 724 × 403 px, con 10 fotogramas de 100 ms y bucle continuo. Se revisaron todos sus fotogramas: pequeñas oscilaciones laterales, cambios en inclinación de los tallos y variación del grano. No hay cambio de escena ni zoom. La descripción del movimiento se comunicó antes de producir la propuesta.

### Adaptación

Girasoles reconocibles con pétalos dorados, centros marrones, tallos verdes, fondo crema y azul suave. Las cabezas, tallos y hojas se dibujan por separado en un canvas local. Cada flor tiene una fase distinta; los tallos se redibujan mediante curvas y las hojas se mueven desde sus uniones. No se desplaza ni amplía una fotografía completa.

Las funciones periódicas comparten un ciclo de 12 segundos: al cerrar el ciclo coinciden posiciones y velocidades. Tras la entrada inicial, no se reinicia la escena ni se cambia la semilla de la textura. El filtro de vidrio y el grano se limitan al canvas floral; el texto no tiene filtros.

El título aparece por letras durante aproximadamente 1,65 segundos, una sola vez, sin cambios de tamaño ni saltos de composición. El balanceo gana amplitud cuando termina de aparecer. El título completo sigue disponible para lectores de pantalla. Pausa, movimiento reducido y suspensión fuera de pantalla incluidos.

### Recurso y herramienta

Recurso: `assets/girasoles-cabezas-v1.png`. Generado con la herramienta integrada de generación de imágenes, con transparencia. La animación es código local en `sunflowers.js`; no es un video generado.

### Prompt del recurso

Use case: photorealistic-natural. Asset type: transparent botanical sprite asset for an animated portfolio artwork. Create TWO DIFFERENT isolated sunflower flower HEADS, side by side in two equal-width cells of one wide landscape image. Each head fits completely within its own half, with a large clean transparent gutter between them and generous transparent padding around every petal. Left head: natural open sunflower, almost front facing but slight tilt, golden-yellow fine irregular petals surrounding a recognizable warm dark brown seed disk. Right head: a different sunflower viewed at a gentle three-quarter angle with asymmetric drooping outer petals, warm brown center, richer golden yellow. ONLY flower heads, NO stems or leaves. Style: real organic botanical forms seen through finely pebbled frosted glass, softly diffused outlines, delicate high-quality film grain, luminous spring light. Soft but sunflowers must remain clearly recognizable with brown centers and individual golden petals. Artistic photographic texture, absolutely no cartoon, emoji, vector icon, plastic material or shiny 3D. True transparent background, no solid background or shadow panel. No text, no logo, no frame. Keep left and right flowers fully separate, neither overlaps the center line. Intended for separately animating both heads in a browser.


### Interacción y cielo añadidos

Cielo celeste con horizonte claro y tres agrupaciones de nubes difusas; su ciclo de desplazamiento es de 96 segundos y cierra fuera del encuadre. La semilla de la textura es fija. La capa del cielo se actualiza a un máximo de 15 veces por segundo; las flores siguen su propio dibujo fluido.

Los pétalos se recortan de la misma cabeza floral: se resta esa pequeña zona del girasol y la muestra desprendida parte de su unión original. Se permite un desprendimiento cada 0,75 segundos, hasta tres pétalos en el aire y dos huecos por flor. La caída dura hasta cinco segundos, con desvanecimiento final; la regeneración ocurre entre 4,7 y 7,5 segundos. El gesto de acercamiento y el toque comparten la detección local. Textos y botones se excluyen. Movimiento reducido elimina los pétalos activos y restaura la flor.

La escena se congela al pausarla o salir de pantalla. La escritura del título no vuelve a empezar al navegar por la página.

## Anexo · Botones ovalados y amarillo suave

29 de octubre de 2026. Adaptación de la referencia de botones Work, About y Contact, con crema, contorno rojo y sombra sólida bajo el primer botón.

### Abrir las propuestas

- `propuesta-c.html`: **03 · Crema y coral**. Botones ovalados de contorno coral y fondo crema.
- `propuesta-d.html`: **04 · Mantequilla y oliva**. El mismo estilo de interacción, con amarillo suave y verde oliva.
- `botones-paletas.html`: comparador con muestras interactivas y un ejemplo rotulado del estado hover.
- `botones-paletas-comparativa.png` y `.svg`: lámina de paletas y estados. Es una muestra gráfica, no una captura del sitio.

Las propuestas A y B se conservan. Las entradas `index.html`, `index-serif.html` y `revision-header.html` muestran ahora D (Mantequilla y oliva), elegida por la usuaria para probar el conjunto completo. C se conserva como alternativa.

### Paletas

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

### Botones e interacción

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

### Archivos y verificación

`botones-ovales.css` contiene los nuevos estilos y solo se carga en C/D y las entradas activas de revisión. Las variables están en `temas-paleta.css`, con datos en `paletas.json`. La referencia está en `../referencias/diseno-web/botones-ovales-contorno-hover.png`.

18 pares de colores opacos comprobados por encima de 4.5:1. Ejemplos: coral sobre crema **5.00:1**; verde oliva sobre amarillo mantequilla **7.43:1**. El informe está en `contraste-botones-amarillo.json`. Esto no es una auditoría completa de accesibilidad de todo el sitio.

Lámina revisada visualmente, recursos locales y destinos comprobados. La interacción en las páginas completas y su vista adaptable siguen pendientes de revisión visual en el navegador, por el bloqueo previo del acceso automatizado a los archivos locales. No se ha publicado la web.

### Selección actual

**Mantequilla y oliva (D)** es la paleta activa del prototipo completo. Las entradas principales y `propuesta-d.html` se sincronizaron para esta revisión. La selección de la prueba está marcada con `active: true` en `paletas.json`.

### Cambio posterior del header activo

Por la última indicación de la usuaria, D utiliza ahora un header abierto: logo a la izquierda y tres enlaces a la derecha. Los enlaces conservan un contorno estático según la nueva referencia, con **ningún efecto hover**. Los estilos ovalados con sombra de esta guía se mantienen en los botones de acción fuera del encabezado. C se conserva con su header anterior. La revisión activa se aplica mediante `header-simple.css`.

## Anexo · Proyectos seleccionados · prueba de composición

29 de octubre de 2026. Aplicado a las cuatro entradas activas de la paleta D: index.html, index-serif.html, revision-header.html y propuesta-d.html.

### Composición

Una sola galería. IntentX → Carbon ocupa el ancho completo; Sozialens y PortalFi se sitúan debajo en dos columnas, con un pequeño desfase. En móvil aparecen en una sola columna y en el mismo orden. Se mantienen los casos existentes y la navegación de regreso.

Las tarjetas muestran nombre, tipo de producto, aportación y tres áreas de trabajo. La tarjeta completa es un enlace, accesible mediante teclado, con foco visible. Las portadas tienen un acercamiento leve al hover, desactivado cuando se solicita reducir movimiento. No se ha añadido movimiento al header.

### Imágenes provisionales autorizadas

Dany pidió «pon unas genéricas mientras» tras consultar la disponibilidad de capturas propias. Por ello se crearon tres ilustraciones vectoriales esquemáticas en assets/proyectos/, con tratamiento acorde a la paleta mantequilla y oliva. **No son capturas de los productos, propuestas reales entregadas al cliente ni evidencia del trabajo de Dany.** Todas llevan la etiqueta visible «Imagen provisional».

- carbon-provisional.svg: esquema genérico de una interfaz de trading.
- sozialens-provisional.svg: esquema genérico de un listado de perfiles.
- portalfi-provisional.svg: esquema genérico de una interfaz financiera móvil y una tarjeta.

No incluyen cifras de resultados, clientes, métricas ni funcionalidades nuevas atribuidas al trabajo de Dany. Antes de publicar, sustituir estas imágenes por material seleccionado de los productos.

Se revisó la presentación pública de Sozialens en https://www.behance.net/gallery/232413525/Sozialens. Las imágenes examinadas correspondían a la landing y piezas de marca. No se incorporaron al portfolio porque no representan el alcance confirmado de Dany. Las descargas temporales de investigación no son recursos de la web.

### Referencias y alcance

La organización procede de `../estrategia/estructura-web.md` y `../contenido/secciones/selected-work-copy.md`: una sola galería, Carbon principal y acceso al caso desde cada tarjeta. La idea guardada de imágenes amplias y alturas variadas, inspirada en Daniel Sun, se aplica como prueba editable; no implica que la composición esté aprobada definitivamente.

Estilos propios en selected-work.css. Los textos de aportación existentes se conservan; las etiquetas resumen esas contribuciones. No se modifican los casos completos, el hero, la trayectoria ni sus controles.

### Comprobaciones

- Recursos locales existentes, identificadores únicos y destinos de las cuatro entradas comprobados.
- Tres enlaces de proyecto con los identificadores que consume app.js.
- Cuatro entradas activas idénticas; variantes anteriores A/B/C conservadas.
- Sintaxis de app.js y header.js comprobada; no se cambió su lógica.
- SVG analizados como XML válido y revisados como imágenes independientes.
- La revisión visual de la página completa, su adaptación y el comportamiento con teclado siguen pendientes: el acceso automatizado al archivo local está bloqueado. La inspección de los SVG no sustituye esa revisión.

## Anexo · Inicio editorial · prueba del 30 de octubre de 2026

### Dirección de la prueba

Dany pidió una presentación con menos texto, fuentes grandes, mejor distribución y un CTA como «Iniciemos un proyecto», a partir de cuatro capturas. Se interpretó «header» como el conjunto de presentación inicial mostrado en esas referencias; la barra fija conserva los ajustes aprobados y cambia el nombre de su CTA.

Principios tomados de las capturas: identidad breve antes del titular, tipografía protagonista, separación clara entre presentación y acción, y composición asimétrica con espacio libre. No se copian las frases, fotos, ubicaciones, especialidades ni años de experiencia de otras personas.

Capturas conservadas en `../referencias/diseno-web/hero-editorial-2026-10-30/`. Se revisaron las imágenes facilitadas, sin afirmar que se haya visitado sus webs durante esta prueba.

### Texto aplicado

**Revisión vigente:** Francis propuso una referencia de redacción sobre diseño de producto y velocidad, y pidió destacar su trabajo con IA. Se adapta a su proceso confirmado: explorar propuestas con IA y tomar decisiones de diseño.

- Identidad: **Francis Daniella · Senior Product Designer**.
- Titular: **Diseño de producto, con IA para explorar y criterio para decidir.**
- Apoyo: **FinTech, DeFi y apps para el día a día.**
- CTA verde: **Iniciemos un proyecto**, hacia Contacto.
- Enlace secundario: **Ver proyectos**, hacia la galería.

El nombre y rol vuelven a una línea breve sobre el titular. Se conservan el tamaño grande, los girasoles y las acciones. El titular se organiza en tres grupos, que pueden saltar de línea según el ancho. No se trasladan «world-class» ni promesas de velocidad a la propuesta: no hay evidencia de esos resultados en los materiales.

El CTA de la barra también pasa de Book a call a Iniciemos un proyecto. No hay agenda ni reservas simuladas. El texto concreto de la aportación que antes ocupaba el hero continúa desarrollado en los proyectos y el perfil; no se añaden servicios ni resultados nuevos.

### Composición y fuentes

En escritorio, tres grupos de titular a la izquierda, con Instrument Serif regular e italic, hasta 132 px. La pieza de girasoles ocupa el lado derecho sin ampliar el texto sobre ella. Nombre y rol sin cápsula; apoyo breve y acciones con Instrument Sans. El CTA del hero tiene 44 px de altura mínima.

Hasta 850 px, el texto ocupa el ancho disponible y las flores pasan debajo, con un espacio reservado. Las palabras pueden saltar de línea en móviles estrechos. Se mantienen los girasoles articulados, su interacción y el efecto de escritura con el título completo accesible. La lógica de movimiento no cambia.

Se conserva la barra de 60 px, el logo de 80 px, el crema al 50 % con blur al desplazarse y la navegación en Instrument Sans. El resto de la página mantiene su estructura y contenido.

### Archivos y revisión

- hero-editorial.css contiene los ajustes, limitados a .hero--editorial en la variante D.
- Las cuatro entradas activas están sincronizadas.
- index-hero-anterior.html conserva la presentación anterior para comparar.
- index-hero-personal.html conserva la versión que daba protagonismo al nombre y rol.
- Recursos, identificadores, destinos, etiquetas accesibles y acceso a los tres casos comprobados.
- No se modificó el código de animación. Los contenedores del nuevo titular conservan nodos de texto compatibles con el recorrido que utiliza sunflowers.js.
- Revisión visual en navegador y comprobación real de encuadres e interacciones pendientes por el bloqueo del acceso automatizado al archivo local. Las comprobaciones de estructura no validan la composición renderizada.

## Anexo · Hero centrado y botones elásticos

Prueba del 30 de octubre de 2026. Las cuatro entradas activas muestran esta variante.

### Composición

La captura de Leo Marlowe compartida por Francis sirve como referencia para la secuencia: pieza visual circular, cápsula de identidad, titular grande centrado, especialidades y accesos compactos a proyectos. No se usan su retrato, ubicación, rol, iconos ni textos.

No hay una foto personal seleccionada en los recursos del proyecto. La primera prueba utilizó un círculo floral. Francis pidió conservar el jardín, aumentar la cantidad y después reducir la altura: la versión activa tiene **ocho girasoles a la izquierda, ocho a la derecha y cuatro pequeños en el centro inferior**. El lienzo floral ocupa la mitad inferior de los 1040 px del hero en escritorio; las cabezas laterales también se reducen. En móvil se utiliza la zona inferior reservada. El texto sigue centrado. Se conserva el cielo azul celeste hacia crema, las nubes blancas difusas y su desplazamiento lento, con la textura original.

La animación conserva la brisa de ocho segundos, tallos y hojas, textura de vidrio, desprendimiento localizado con cursor o toque, regeneración, pausa y reducción de movimiento. garden-layout.js define los veinte girasoles en coordenadas del lienzo; el dibujo y la detección de pétalos comparten esas coordenadas. Los cuatro centrales son más pequeños y se sitúan en la franja más baja para dejar libres las acciones y los accesos a proyectos. Las variantes anteriores sin la clase hero--floral-sides mantienen su disposición original. Los colores del cielo se fijan solo en el hero: #B9DCE9, #D9EAF0, #EDF3EE y #FBF8EF; el resto de la paleta no cambia. El hero conserva sus 1040 px en escritorio.

Texto de la prueba:

- Product Designer, sin cápsula ni fondo. El nombre Francis Daniella permanece en la firma de la barra.
- **Diseño de producto, con IA y criterio propio.**
- FinTech · DeFi · Apps · Sistemas de diseño.
- CTA verde: Iniciemos un proyecto → Contacto.

La barra compacta enlaza a los tres casos. Sus letras C, S y P son marcadores de navegación, no logos reales de los productos. El listado amplio de proyectos continúa debajo. Al volver desde un caso, el foco se coloca en la tarjeta del listado amplio, evitando llevarlo a un acceso del hero que queda fuera de la vista.

El titular conserva la escritura progresiva y su texto completo accesible. En móvil, los grupos de palabras pueden saltar de línea sin recortes. Los controles de pausa y la preferencia de reducir movimiento siguen disponibles.

### Referencia de botones

**Estado vigente:** Francis pidió regresar a los botones redondeados anteriores, con contorno, sombra sólida y leve desplazamiento al hover. Se aplican con buttons-rounded.css, conservando los CTA verdes y el texto en Instrument Sans. Se retiran las clases y la hoja de estilo del efecto elástico en las entradas activas. La trama de puntos del hero también se elimina. Lo siguiente documenta la exploración anterior de Tiny Mighty, que ya no es el estilo activo.

Referencia solicitada: https://www.microinspire.me/components/tiny-mighty-buttons-01

Página original consultada desde su enlace de fuente: https://tiny-mighty-buttons.webflow.io/

Autor: Eduard Bodak. La vista de Micro Inspire muestra el botón **Is-Jellybelly**. Se inspeccionaron su aspecto, el estado de foco y estilos calculados del fondo en la demostración: esquinas pequeñas y transformación con perspectiva y transición elástica. La propuesta implementa una adaptación propia de ese gesto con CSS, no una copia exacta ni una dependencia de Webflow.

- Botones con esquinas de 5 px en lugar de cápsulas.
- El fondo se inclina y crece ligeramente al pasar el cursor o enfocar con teclado en dispositivos de puntero fino; el texto permanece estable.
- Acción principal en oliva y texto crema. Acciones secundarias en crema y texto oliva. Se mantiene Instrument Sans.
- Presión leve en táctiles; sin hover persistente. Sin transformaciones con reducir movimiento.
- Navegación del header sin efecto elástico. Controles pendientes desactivados conservados.

### Tipografía vigente

Francis pidió retirar Senior, el nombre duplicado y el fondo de la identidad del hero. Esa línea ahora muestra únicamente «Product Designer». Se sustituye Host Grotesk por Instrument Sans en el texto del prototipo activo, incluidas las notas de las portadas provisionales y el pie. Instrument Serif continúa en los títulos. typography-current.css centraliza estos ajustes; las variantes archivadas conservan sus fuentes.

Archivos: hero-centered.css, hero-floral-sides.css, garden-layout.js, buttons-mighty.css y ajuste de foco de regreso en app.js. La versión lateral anterior se conserva en index-hero-ia-lateral.html.

### Verificación

Recursos locales, identificadores, destinos, etiquetas ARIA y sincronización comprobados; sintaxis de app.js válida. Comprobados los enlaces de los tres accesos rápidos y las tres tarjetas, y el foco de regreso dirigido al listado amplio por inspección de código. Las reglas incluyen foco visible, estado táctil y reducir movimiento.

Ocho pruebas automáticas superadas con la composición baja: veinte girasoles entre 320 y 1920 px de ancho, límites del lienzo, centro superior libre y cuatro flores pequeñas en la franja inferior, interacción con cada flor y las cinco comprobaciones previas de límites, origen de caída, regeneración y reducción de movimiento. Son pruebas de geometría y lógica de pétalos; no validan el encuadre renderizado del texto ni sustituyen una revisión visual.

La inspección de la referencia pública no valida el funcionamiento del prototipo. La revisión visual de la página local, sus encuadres y las interacciones reales sigue pendiente por el bloqueo del acceso automatizado al archivo local.

## Nueva web: intro HELLO y hero de escritorio · 1 de noviembre de 2026

La versión de girasoles se archivó en `../_descartado/web-girasoles/`. La página se rehízo con un solo HTML, una hoja de estilos y dos scripts. Ahora tiene una intro HELLO cuyas teclas vuelan al teclado del escritorio, un hero construido en código a partir de las referencias de `../referencias/hero-hello/`, y los modos claro y cálido. Detalle del estado vigente en [LEEME.md](LEEME.md).

## Hero con las fotos de Dany · 1 de noviembre de 2026

A petición de Dany, el escritorio dibujado en código se sustituyó por sus fotos, mejoradas para web (escalado a 3072 px y WebP en tres tamaños). El HELLO pasa a salir en cada carga. La versión en código queda en `../_descartado/web-escritorio-codigo/`.

Las fotos del hero se volvieron a escalar con IA (Real-ESRGAN ×4, autorizado por Dany): letras, logos y bordes más nítidos que con el escalado clásico, y archivos más ligeros.
