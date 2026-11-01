# Proyectos seleccionados · prueba de composición

29 de octubre de 2026. Aplicado a las cuatro entradas activas de la paleta D: index.html, index-serif.html, revision-header.html y propuesta-d.html.

## Composición

Una sola galería. IntentX → Carbon ocupa el ancho completo; Sozialens y PortalFi se sitúan debajo en dos columnas, con un pequeño desfase. En móvil aparecen en una sola columna y en el mismo orden. Se mantienen los casos existentes y la navegación de regreso.

Las tarjetas muestran nombre, tipo de producto, aportación y tres áreas de trabajo. La tarjeta completa es un enlace, accesible mediante teclado, con foco visible. Las portadas tienen un acercamiento leve al hover, desactivado cuando se solicita reducir movimiento. No se ha añadido movimiento al header.

## Imágenes provisionales autorizadas

Dany pidió «pon unas genéricas mientras» tras consultar la disponibilidad de capturas propias. Por ello se crearon tres ilustraciones vectoriales esquemáticas en assets/proyectos/, con tratamiento acorde a la paleta mantequilla y oliva. **No son capturas de los productos, propuestas reales entregadas al cliente ni evidencia del trabajo de Dany.** Todas llevan la etiqueta visible «Imagen provisional».

- carbon-provisional.svg: esquema genérico de una interfaz de trading.
- sozialens-provisional.svg: esquema genérico de un listado de perfiles.
- portalfi-provisional.svg: esquema genérico de una interfaz financiera móvil y una tarjeta.

No incluyen cifras de resultados, clientes, métricas ni funcionalidades nuevas atribuidas al trabajo de Dany. Antes de publicar, sustituir estas imágenes por material seleccionado de los productos.

Se revisó la presentación pública de Sozialens en https://www.behance.net/gallery/232413525/Sozialens. Las imágenes examinadas correspondían a la landing y piezas de marca. No se incorporaron al portfolio porque no representan el alcance confirmado de Dany. Las descargas temporales de investigación no son recursos de la web.

## Referencias y alcance

La organización procede de docs/estructura-web.md y docs/selected-work-copy.md: una sola galería, Carbon principal y acceso al caso desde cada tarjeta. La idea guardada de imágenes amplias y alturas variadas, inspirada en Daniel Sun, se aplica como prueba editable; no implica que la composición esté aprobada definitivamente.

Estilos propios en selected-work.css. Los textos de aportación existentes se conservan; las etiquetas resumen esas contribuciones. No se modifican los casos completos, el hero, la trayectoria ni sus controles.

## Comprobaciones

- Recursos locales existentes, identificadores únicos y destinos de las cuatro entradas comprobados.
- Tres enlaces de proyecto con los identificadores que consume app.js.
- Cuatro entradas activas idénticas; variantes anteriores A/B/C conservadas.
- Sintaxis de app.js y header.js comprobada; no se cambió su lógica.
- SVG analizados como XML válido y revisados como imágenes independientes.
- La revisión visual de la página completa, su adaptación y el comportamiento con teclado siguen pendientes: el acceso automatizado al archivo local está bloqueado. La inspección de los SVG no sustituye esa revisión.
