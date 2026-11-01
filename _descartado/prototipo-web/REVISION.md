# Revisión local — 28 de octubre de 2026

- Archivos JavaScript comprobados sin errores de sintaxis.
- Los cuatro HTML tienen identificadores únicos y sus recursos locales existen.
- El boceto original conserva su huella SHA-256.
- Host Grotesk e Instrument Serif cargadas y comprobadas en el navegador.
- Vista de escritorio y revisión mediante marcos adaptables de 320, 390, 768 y 1024 px para Host Grotesk; serif revisada a 320, 390 y 1024 px. Sin desbordamiento horizontal en las medidas verificadas. No sustituye una prueba en dispositivos físicos.
- Movimiento CSS activo; botón de pausa cambia a «Reanudar fondo» y detiene la animación.
- Movimiento reducido previsto mediante CSS y preferencia del sistema; no se cambió la preferencia del usuario para probarlo.
- Foco visible al navegar con Tab. Botón de trayectoria operable con Enter y expansión comprobada.
- «Ver proyectos» y «Contacto» llevan a la sección correspondiente con foco actualizado. Correo enlazado a la dirección confirmada.
- Detalles de Carbon, Sozialens y PortalFi y avance entre ellos comprobados.
- Si falta la imagen, se conserva el título y se ocultan los controles del fondo.

No se ha publicado la web. Las imágenes de referencia siguen siendo provisionales. Las capturas son estáticas y no muestran el movimiento.


## Ajuste de flores y movimiento

Se activó el recurso generado de tulipanes amarillos en ambas propuestas tipográficas. En escritorio se verificaron dos transformaciones distintas durante la reproducción, estado «running», pausa funcional y texto sin transformación. Sin desbordamiento horizontal en la vista de escritorio. Captura actual: `capturas/hero-flores-movimiento.png`.


## Girasoles articulados, pétalos y cielo

- Referencia completa observada: diez fotogramas del GIF de un segundo.
- Generación de recurso floral transparente y animación independiente de flores, tallos y hojas.
- Cielo y nubes con textura aplicada únicamente a las capas decorativas.
- Escritura completada en navegador: 47 caracteres visibles; título completo accesible desde el primer instante.
- Desprendimiento comprobado mediante interacción real en el navegador: un pétalo activo.
- Cinco pruebas automáticas superadas: cercanía, límites, origen de caída, regeneración y desactivación.
- Revisión adaptable a 320, 390, 768 y 1024 px: sin desbordamiento horizontal. En los dos tamaños pequeños, la pieza floral empieza debajo del bloque de texto y botones.
- La activación por toque está implementada; no se ha probado en un teléfono físico.

## Paletas y botones · 29 de octubre de 2026

- Dos propuestas completas y una página comparativa local.
- Fuente real Instrument Sans guardada localmente con su licencia y aplicada al header y botones.
- Instrument Serif en títulos y Host Grotesk en párrafos.
- 20 pares de colores opacos comprobados con contraste superior a 4.5:1, detallados en `contraste-paletas.json`.
- Lámina de paletas y botones revisada visualmente. No representa una captura de las páginas.
- Recursos locales, ids, destinos de navegación y controles pendientes comprobados en ambas propuestas y las tres entradas previas.
- Sintaxis JavaScript de las piezas modificadas comprobada. Cielo toma colores de variables; no se alteró la lógica de interacción de pétalos.
- Revisión visual en navegador y a diferentes anchuras pendiente por el bloqueo de acceso automatizado al protocolo de archivos locales. La revisión adaptable anterior del 28 de octubre no valida estos estilos nuevos.

## Botones ovalados y amarillo mantequilla · 29 de octubre de 2026

- Nuevas propuestas C y D, con comparador interactivo y lámina de estados normal/hover revisada visualmente.
- 18 pares de colores opacos comprobados por encima de 4.5:1; informe en `contraste-botones-amarillo.json`.
- Header de 60 px y controles pendientes conservados; páginas anteriores A/B sin nuevo estilo de botones.
- Recursos y destinos de las siete entradas de prototipo y de las dos guías locales comprobados. Sintaxis de JavaScript sin errores.
- No se afirma haber probado el hover o la adaptación de estas nuevas páginas en el navegador: continúa pendiente esa revisión visual.

## Activación de Mantequilla y oliva · 29 de octubre de 2026

- Variante D aplicada al prototipo completo y sincronizada en sus cuatro entradas activas.
- Se conserva cada propuesta A/B/C en su propio archivo.
- Datos de selección, guías de revisión y comparadores actualizados.
- Comprobados la clase de tema, el orden de las hojas de estilo, los recursos locales, los destinos y el contenido de los tres casos de proyecto. No se ha realizado una nueva comprobación visual del archivo local en el navegador.

## Header abierto sin hover · 29 de octubre de 2026

- D y las tres entradas principales sincronizadas: logo a la izquierda y tres enlaces a la derecha, header de 60 px, sin cápsula exterior ni hover en la navegación.
- Se retiraron el indicador y los spans de texto duplicado de las entradas activas. El menú móvil funciona sin depender del indicador; comprobación de sintaxis JavaScript completada.
- CV y controles pendientes conservados, desactivados y trasladados al footer.
- Fuentes, recursos, ids y destinos de navegación comprobados. La comprobación visual de esta nueva composición en el navegador sigue pendiente.

## Ajuste de navegación y Book a call

- Enlaces de header simples, en mayúsculas y Host Grotesk; CTA amarillo independiente.
- Destino provisional de Book a call confirmado con Dany: sección de contacto; aún no hay agenda.
- Cuatro entradas activas sincronizadas. No se ha verificado visualmente esta revisión en el navegador local.

## Galería de proyectos con portadas provisionales

- Carbon destacado y dos tarjetas inferiores; una sola galería con acceso a los tres casos existentes.
- Ilustraciones genéricas autorizadas por Dany y señaladas como provisionales; no se usaron la landing ni piezas de marca de Sozialens como muestras de su trabajo.
- Recursos, IDs, destinos de CTA y tres casos comprobados en las cuatro entradas activas; SVG válidos. Revisión de imágenes individuales realizada.
- El header reserva espacio para los casos y mantiene el enlace de salto por encima de la barra fija.
- La revisión visual en navegador, el menú móvil y las interacciones de teclado requieren comprobación sobre la página renderizada; continúan pendientes por el bloqueo del acceso automatizado al archivo local.

## Botones compactos e Instrument Sans

- CTA del header en Instrument Sans de 13 px y altura mínima de 36 px; acciones del contenido de 40 px, antes 48 px.
- Áreas táctiles mínimas de 44 px conservadas con pointer: coarse.
- Cambios limitados a la variante D, sin alterar destinos ni lógica. Recursos y sincronización de las cuatro entradas comprobados. Revisión visual de página pendiente.

## Header transparente · 30 de octubre de 2026

- Eliminados el fondo y la línea inferior del header; logo reducido a 80 px de ancho, conservando proporciones.
- Cuatro entradas activas sincronizadas y recursos comprobados. No se modifican navegación ni botones.
- Revisión visual sobre la página renderizada pendiente por el bloqueo de acceso automatizado al archivo local.

## Fondo oliva al hacer scroll · 30 de octubre de 2026

- Header fijo con estado data-scrolled a partir de 12 px; transparente al volver arriba.
- Oliva claro translúcido y desenfoque solo en el fondo; alternativa opaca cuando no se admite backdrop-filter.
- Comprobada la lógica de estado inicial, desplazamiento, regreso y restauración con un entorno simulado de eventos; sintaxis JavaScript y recursos verificados. Esta comprobación no sustituye la revisión visual en navegador, que sigue pendiente.

### Crema de referencia al 50 %

- Fondo sustituido por #F2EDDE al 50 %, con el mismo blur de 14 px; color obtenido de la media de la captura facilitada por Dany.
- Cambio únicamente de CSS, sincronización y recursos comprobados; sin cambios en la lógica de scroll. Revisión visual sobre la página pendiente.

### Instrument Sans y CTA oliva

- Enlaces de navegación en Instrument Sans; Book a call en oliva con texto crema, también en hover y foco.
- Recursos y sincronización comprobados; contraste del CTA calculado por encima de 4.5:1. Revisión visual en navegador pendiente.

## Presentación editorial con titular grande

- Texto del hero reducido; titular en dos grupos, apoyo de una línea y CTA verde hacia Contacto. Enlace independiente hacia proyectos.
- CSS limitado a la nueva clase del hero; disposición móvil debajo del texto para la pieza floral. No se altera la animación ni sus controles.
- Cuatro entradas sincronizadas; versión anterior conservada. Recursos, IDs, etiquetas ARIA, destinos y los tres enlaces de caso comprobados.
- Revisión visual sobre la página, lectura a distintos anchos e interacción real pendientes por el bloqueo del acceso automatizado al archivo local.

### Revisión del texto del hero

- Presentación personal en el titular y una línea de especialidad; retirada la identidad duplicada.
- Recursos, destinos, texto y sincronización de las cuatro entradas comprobados. Sin cambios en la lógica de animación ni navegación. Revisión visual pendiente.

### Titular con IA

- Texto ajustado a la exploración con IA y decisiones de diseño; nombre y rol sobre el titular.
- Cuatro entradas sincronizadas, recursos y destinos comprobados. Presentación personal anterior conservada. La animación y navegación no cambian; revisión visual en navegador pendiente.

### Hero centrado y botones elásticos

- Composición centrada, círculo con los girasoles existentes y accesos directos a los tres casos. Sin retratos ajenos ni ubicación inventada.
- Adaptación CSS del gesto Jellybelly de la referencia pública consultada. Texto estable, foco visible, respuesta táctil y reducción de movimiento contemplados.
- Foco de regreso al caso dirigido a la tarjeta del listado amplio para no enfocar un acceso del hero fuera de la vista.
- Recursos, ARIA, enlaces, sincronización y sintaxis comprobados. Revisión visual del prototipo y pruebas de interacción real pendientes por el bloqueo de acceso automatizado al archivo local.

### Seis girasoles laterales

- Tres flores a cada lado; dos grupos inferiores en móvil y lienzo sin recorte circular.
- Renderer y coordenadas de interacción actualizados para la nueva disposición. Conservados brisa, filtro, tallos, hojas, pausa, caída y regeneración.
- Ocho pruebas superadas de geometría y lógica de pétalos. Sintaxis, recursos y sincronización comprobados. Revisión visual y de interacción real en navegador pendiente.

### Fuente de lectura y rol del hero

- Instrument Sans sustituye Host Grotesk en los textos activos. Instrument Serif se mantiene en títulos.
- Identidad del hero reducida a Product Designer, sin fondo, borde ni sombra. Senior retirado también de los metadatos de las cuatro entradas activas.
- Recursos locales, sincronización y estructura comprobados. Sin cambios en la lógica de interacción. Revisión visual en navegador pendiente.

### Altura de 1040 px

- Altura explícita de 1040 px sobre 850 px de ancho; altura automática en móvil y tableta estrecha.
- Reglas adaptables, recursos y sincronización comprobados. Sin cambios de interacción; revisión visual pendiente.

### Dieciséis flores y cielo azul

- Ocho flores por lado, en grupos escalonados; distribución inferior en móvil. Restaurados los colores celestes del cielo y conservada la animación original de nubes.
- Ocho pruebas superadas con la nueva cantidad: distribución, interacción por flor, límites, regeneración y reducción de movimiento.
- Altura de 1040 px en escritorio conservada. Recursos, sincronización, variables de color y sintaxis comprobados. Revisión visual en navegador pendiente.

### Jardín más bajo

- Lienzo floral de 520 px en la mitad inferior del hero; flores laterales reducidas y cuatro centrales más pequeñas y bajas.
- Ocho pruebas superadas con las nuevas posiciones y alturas de lienzo. Comprobados recursos y sincronización. Cielo e interacciones conservados; revisión visual pendiente.

### Retirada de puntos y regreso a botones redondeados

- Eliminada la capa de puntos verdes; el cielo y la textura del vidrio se conservan.
- Retirado el estilo elástico y restaurados óvalos con contorno, sombra sólida y desplazamiento al hover. CTA principal verde; enlaces de navegación simples.
- Recursos, sincronización, clases activas y reglas de foco/reducción de movimiento comprobados. Revisión visual en navegador pendiente.
