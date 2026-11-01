# Hero centrado y botones elásticos

Prueba del 30 de octubre de 2026. Las cuatro entradas activas muestran esta variante.

## Composición

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

## Referencia de botones

**Estado vigente:** Francis pidió regresar a los botones redondeados anteriores, con contorno, sombra sólida y leve desplazamiento al hover. Se aplican con buttons-rounded.css, conservando los CTA verdes y el texto en Instrument Sans. Se retiran las clases y la hoja de estilo del efecto elástico en las entradas activas. La trama de puntos del hero también se elimina. Lo siguiente documenta la exploración anterior de Tiny Mighty, que ya no es el estilo activo.

Referencia solicitada: https://www.microinspire.me/components/tiny-mighty-buttons-01

Página original consultada desde su enlace de fuente: https://tiny-mighty-buttons.webflow.io/

Autor: Eduard Bodak. La vista de Micro Inspire muestra el botón **Is-Jellybelly**. Se inspeccionaron su aspecto, el estado de foco y estilos calculados del fondo en la demostración: esquinas pequeñas y transformación con perspectiva y transición elástica. La propuesta implementa una adaptación propia de ese gesto con CSS, no una copia exacta ni una dependencia de Webflow.

- Botones con esquinas de 5 px en lugar de cápsulas.
- El fondo se inclina y crece ligeramente al pasar el cursor o enfocar con teclado en dispositivos de puntero fino; el texto permanece estable.
- Acción principal en oliva y texto crema. Acciones secundarias en crema y texto oliva. Se mantiene Instrument Sans.
- Presión leve en táctiles; sin hover persistente. Sin transformaciones con reducir movimiento.
- Navegación del header sin efecto elástico. Controles pendientes desactivados conservados.

## Tipografía vigente

Francis pidió retirar Senior, el nombre duplicado y el fondo de la identidad del hero. Esa línea ahora muestra únicamente «Product Designer». Se sustituye Host Grotesk por Instrument Sans en el texto del prototipo activo, incluidas las notas de las portadas provisionales y el pie. Instrument Serif continúa en los títulos. typography-current.css centraliza estos ajustes; las variantes archivadas conservan sus fuentes.

Archivos: hero-centered.css, hero-floral-sides.css, garden-layout.js, buttons-mighty.css y ajuste de foco de regreso en app.js. La versión lateral anterior se conserva en index-hero-ia-lateral.html.

## Verificación

Recursos locales, identificadores, destinos, etiquetas ARIA y sincronización comprobados; sintaxis de app.js válida. Comprobados los enlaces de los tres accesos rápidos y las tres tarjetas, y el foco de regreso dirigido al listado amplio por inspección de código. Las reglas incluyen foco visible, estado táctil y reducir movimiento.

Ocho pruebas automáticas superadas con la composición baja: veinte girasoles entre 320 y 1920 px de ancho, límites del lienzo, centro superior libre y cuatro flores pequeñas en la franja inferior, interacción con cada flor y las cinco comprobaciones previas de límites, origen de caída, regeneración y reducción de movimiento. Son pruebas de geometría y lógica de pétalos; no validan el encuadre renderizado del texto ni sustituyen una revisión visual.

La inspección de la referencia pública no valida el funcionamiento del prototipo. La revisión visual de la página local, sus encuadres y las interacciones reales sigue pendiente por el bloqueo del acceso automatizado al archivo local.
