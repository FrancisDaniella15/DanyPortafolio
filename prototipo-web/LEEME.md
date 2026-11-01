# Primer prototipo de Dany Design

## Abrir y comparar

Abre `index.html` en tu navegador. Todo está guardado localmente; no requiere instalaciones ni conexión para mostrar imágenes o fuentes.

- `index.html`: prototipo activo con **Mantequilla y oliva (D)** en todo el recorrido, Host Grotesk en textos, Instrument Serif en títulos e Instrument Sans en header y botones.
- `index-serif.html`: mismo tratamiento activo que `index.html`, conservado como enlace de revisión.
- La barra superior identifica la combinación provisional. Es una herramienta de revisión, no la navegación definitiva.
- `index-laptop.html`: primera composición con laptop, conservada.
- `index-tulipanes.html`: exploración con tulipanes amarillos generados, conservada.

## Decisiones de esta prueba

Se mantiene el mensaje acordado: Dany Cova, Senior Product Designer; plataformas financieras, apps y sistemas de diseño. La estructura inferior sigue siendo un boceto con los tres proyectos, perfil, trayectoria desplegable, herramientas y contacto.

La versión activa presenta girasoles amarillos con centros marrones y tallos verdes articulados, sobre un cielo celeste que se aclara hacia el horizonte. Las nubes blancas difusas cruzan muy lentamente. La textura de vidrio y grano se aplica solo a las capas de cielo y flores: el texto y los botones no tienen filtros.

Cada girasol tiene su propio balanceo periódico. El título se escribe una sola vez, reservando el espacio para evitar saltos. El movimiento floral gana amplitud al terminar esa entrada. La escena puede pausarse y respeta la preferencia de reducir movimiento.

Al acercar el cursor o tocar los pétalos, se desprende uno por gesto. Hay como máximo tres cayendo a la vez y dos ausentes por flor. Caen desde la zona de unión, conservan la textura original y reaparecen gradualmente en la flor. No se activa sobre textos o botones. Con movimiento reducido no hay caída.

El recurso transparente `assets/girasoles-cabezas-v1.png` se creó con la herramienta integrada de generación de imágenes. Los tallos, hojas, brisa, nubes y pétalos se animan mediante código local, sin video ni ampliación de una fotografía completa. [Referencia observada, adaptación y prompt](animacion-girasoles.md).

Las fuentes están guardadas en `assets/fonts/` junto con sus licencias OFL. Fuentes originales: [Host Grotesk](https://github.com/google/fonts/tree/main/ofl/hostgrotesk) e [Instrument Serif](https://github.com/google/fonts/tree/main/ofl/instrumentserif).

## Archivos y contenido

- `styles.css`: estilos y adaptación por tamaño, con alternativas de escena y tipografía.
- `content.js`: contenido de los tres proyectos.
- `app.js`: navegación, proyectos, trayectoria, contacto y alternativa si falla la imagen.
- `sunflowers.js`: escena articulada, cielo, nubes, escritura y controles.
- `petals.js`: desprendimiento, caída, límites y regeneración.
- `tests/petals.test.cjs`: comprobaciones de interacción y movimiento reducido.
- `hero-motion.js`: control de las exploraciones anteriores.
- `capturas/`: vistas de revisión.
- `imagen-flores.md`: prompt, herramienta y procedencia del recurso generado anterior.

Documentos de referencia: `../docs/portada-textos-es-propuesta.md`, `../docs/casos/propuesta-editorial.md`, `../docs/wireframe-estructura.md` y `../docs/hero-interacciones.md`.

## Pendientes

Elegir la tipografía y la dirección visual, ajustar intensidad y ritmo del movimiento, preparar el recurso final, traducir al inglés y trabajar las dos presentaciones visuales del lanzamiento. El CV, el inglés y el selector «Vista» siguen desactivados. La web no está publicada.

La siguiente revisión se concentra en el tono de los títulos, la legibilidad y cuánto protagonismo debe tener el fondo.

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

Las entradas principales muestran ahora D (Mantequilla y oliva), elegida para la prueba completa. A, B y C se conservan completas. Guía de colores, estados, contraste y alcance: `BOTONES-Y-AMARILLO.md`.

## Paleta activa · Mantequilla y oliva

Elegida para la siguiente prueba por la usuaria el 29 de octubre de 2026. Se aplicó **D** a `index.html`, `index-serif.html`, `revision-header.html` y `propuesta-d.html`, que comparten el mismo contenido y estilos activos.

Se utiliza en todo el recorrido: hero y cielo, navegación, acciones y hover, proyectos, fichas de caso, perfil y trayectoria, herramientas, contacto y footer. Crema #FBF8EF como base, amarillo mantequilla #F0DCA4 en acciones y detalles, verde oliva #304737 en texto y contornos. Rosa y lila continúan como acentos pequeños.

Se conservan el header de 60 px, el logo 3A, los óvalos de borde de 2 px, Instrument Sans en header/botones, Instrument Serif en títulos y Host Grotesk en texto. CV, inglés y selector visual permanecen desactivados. A/B/C siguen siendo alternativas, sin sustituir la paleta activa.

## Header abierto y sin hover · 29 de octubre de 2026

La referencia más reciente muestra marca a la izquierda y tres enlaces a la derecha. Se aplicó esa composición a las cuatro entradas activas de D: header abierto, transparente, sin cápsula exterior, con altura de 60 px y logo 3A de 96 px de ancho. Permanece sobre el cielo al inicio y sale de la vista al desplazarse la página.

Proyectos, Sobre mí y Contacto son enlaces con contorno fino y estático, como en la nueva imagen, sin sombras, desplazamientos ni texto duplicado. El foco de teclado permanece visible. Instrument Sans y Mantequilla y oliva se conservan. Los botones de acción fuera del header mantienen su estilo ovalado y hover.

En móvil se conserva el menú desplegable. CV, ES, EN y Vista se trasladaron al footer; los tres controles pendientes siguen desactivados. No se eliminaron las funciones del prototipo.

`header-simple.css` solo se carga en la variante activa D. `header.js` separa el menú móvil del hover opcional para que el menú siga funcionando sin el indicador anterior. La referencia se conserva en `../docs/referencias-visuales/header-abierto-marca-izquierda.png`.

## Logo sin fondo y en oliva · 29 de octubre de 2026

La cabecera activa utiliza `assets/logo-francis-daniella-3a-oliva.png`, una edición de la opción 3A con fondo transparente real y letras en verde oliva oscuro. Se eliminó la dependencia del recorte CSS de la lámina blanca y del modo de mezcla; la imagen completa se muestra dentro del espacio existente de 96 px, sin cambiar la altura de 60 px del header.

Se comprobó que el archivo tiene canal alfa con píxeles transparentes y opacos. La lámina original se conserva como referencia y en las propuestas anteriores. Herramienta, prompt y procedencia: `logo-3a-oliva.md`.

## Header lineal y CTA principal · 29 de octubre de 2026

Última referencia: header de Victoria Salatino. Se aplicaron enlaces de texto pequeños en mayúsculas, espaciado de letras y línea divisoria inferior. Se retiró el contorno ovalado de los enlaces. La barra mide 60 px y permanece arriba al recorrer el sitio. La fuente del header pasa a **Host Grotesk**, por petición expresa; los títulos conservan Instrument Serif y los botones fuera del header mantienen Instrument Sans.

**Book a call** es el único botón principal de la navegación y utiliza amarillo mantequilla. Dany confirmó que aún no tiene enlace de agenda: por ahora va a `#wf-contacto`, sin simular reservas ni disponibilidad. Se sustituirá ese destino cuando facilite su agenda. El menú móvil incluye el CTA y mantiene sus controles de teclado.

## Galería de proyectos · prueba con imágenes provisionales

Carbon aparece como proyecto principal a todo el ancho; Sozialens y PortalFi se presentan debajo, con alturas y posiciones distintas. En móvil pasan a una columna. Cada tarjeta completa abre su caso existente y conserva el resumen de la aportación.

Dany autorizó imágenes genéricas mientras aporta las capturas. Se usan tres ilustraciones locales con la etiqueta visible **Imagen provisional**; no son pantallas reales ni evidencia del proyecto. Detalles y pendientes en `PROYECTOS-SELECCIONADOS.md`. El hero y las alternativas A/B/C se conservan.

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

La barra mantiene sus estilos aprobados; su CTA también se llama Iniciemos un proyecto. La versión anterior se conserva en `index-hero-anterior.html`. Dirección, referencias, textos y comprobaciones en `HERO-EDITORIAL.md`.

### Presentación personal vigente

El titular de la primera prueba no convenció a Dany. Se sustituye por «Soy Dany Cova, Senior Product Designer.» y el apoyo «Diseño interfaces para FinTech, DeFi y apps.». Se elimina la identidad duplicada sobre el titular. Composición, fuentes, girasoles y CTA se conservan.


### Nombre del titular

Por petición de Francis, el titular dice «Soy Francis Daniella, Senior Product Designer.», utilizando el mismo nombre de la firma. Se conserva el resto de la presentación.

### Exploración con IA en el titular

Nueva prueba solicitada por Francis: «Diseño de producto, con IA para explorar y criterio para decidir.». Nombre y rol en una línea superior; debajo, «FinTech, DeFi y apps para el día a día.». Se mantiene Iniciemos un proyecto como CTA verde. La propuesta refleja el uso de IA confirmado en la entrevista. No se añaden promesas de velocidad ni resultados. La presentación personal anterior queda en `index-hero-personal.html`.

### Prueba centrada y botones Tiny Mighty

La composición activa se inspira en la nueva captura de Leo Marlowe: círculo floral, identidad en cápsula, titular centrado y accesos a los tres proyectos. El titular se acorta a «Diseño de producto, con IA y criterio propio.». Se conserva el CTA verde y la barra fija con blur.

Las acciones adoptan una adaptación del gesto elástico Is-Jellybelly de Tiny Mighty Buttons, con esquinas pequeñas y movimiento del fondo. Los enlaces del header siguen simples. Dirección, fuentes y limitaciones de verificación en `HERO-CENTRADO-Y-BOTONES.md`. La versión lateral anterior está en `index-hero-ia-lateral.html`.

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
