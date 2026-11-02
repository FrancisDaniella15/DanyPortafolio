# HELLO → O → teclado → escritorio · versión 2

Prototipo local de la entrada del portafolio. Abrir desde un servidor HTTP:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Vista: http://127.0.0.1:8765/. «Repetir entrada» inicia la secuencia; «Omitir entrada» muestra el hero. «Ver el recorrido» permite detener y comparar cualquier fotograma. Estos controles pertenecen a la revisión del prototipo.

## Movimiento

- 0–1,5 s: H → E → L → L → O. La cara superior de cada tecla se desplaza como una pieza rígida; el frente se acorta, el pie permanece fijo y la sombra se recoge. La letra no se aplasta.
- 1,5–2,25 s: acercamiento de cámara a la O.
- 2,25–2,55 s: enlace centrado en la misma O con el detalle del teclado.
- 2,55–4,3 s: alejamiento hasta el encuadre completo aprobado.
- 4,2–4,7 s: aparece el texto del hero.

Las dos L existen solo en el saludo. El enlace se hace mediante la O, así que no se duplica ninguna tecla del teclado real. La entrada se reproduce una vez por sesión. Se respeta la preferencia de movimiento reducido; guardar una muestra es una acción explícita que reproduce la secuencia.

## Recursos y fidelidad

- `assets/setup.png`: copia intacta de `../hero-calido-streamdeck-ajustado.png`. El último encuadre usa esta fotografía sin modificarla.
- `assets/hello-keys.png`: piezas fotográficas transparentes derivadas con ImageGen de la referencia HELLO. Se conserva la primera L naranja de la versión previa.
- `assets/keyboard-macro-v2.png`: detalle de alta resolución preparado con la herramienta integrada ImageGen para evitar ampliar una tecla de apenas unos 44 píxeles. La O se alinea con la fotografía y el detalle se retira durante el alejamiento. Es un recurso de transición, no una sustitución del setup. Las diferencias de microgeometría entre fotografías siguen siendo una limitación de esta técnica de prototipo.
- Recursos necesarios: unos 4,48 MB de imágenes. Los videos y las capturas no se solicitan para ejecutar la página.

La animación se ejecuta directamente en el navegador y no requiere un video de fondo, backend ni librerías externas. «Guardar video» registra la secuencia real a 60 fps solicitados; el formato depende del navegador. El lienzo incluye una alternativa semántica en HTML.

## Revisión

Sol implementa y coordina; Terra revisa. En la versión 2, Terra confirmó el desplazamiento rígido de las caras y la continuidad matemática de la cámara. Detectó que se sobrescribía la opacidad inicial de las teclas; se corrigió conservando la opacidad heredada. La macro comparte centro y escala con la O del saludo antes del enlace.

Los datos reales de cada reproducción están en `canvas#scene.dataset.metrics` y `window.portfolioPreview.getMetrics()`: intervalos, FPS aproximados, p95 y pausas superiores a 50 ms. Son medidas del equipo y de esa sesión, no una garantía para todos los dispositivos.

Este prototipo cubre entrada y hero; no incluye proyectos ni la transición posterior hacia el monitor. El MP4 `entrada-hello-portafolio.mp4` corresponde a la versión 1, con fundido de luz, y se conserva como referencia anterior. La muestra nueva se identifica como `entrada-hello-zoom-v2.mp4`.

## Prompt final del detalle fotográfico

Herramienta: ImageGen integrada. Referencia: setup aprobado. Solicitud: macro fotográfico del teclado alrededor de I, O y P, preservando perspectiva cenital inclinada, luz cálida, plástico crema, volumen y separaciones; letras negras legibles. Corrección posterior limitada a las leyendas de la fila superior (7, 8, 9, 0, -, =) y U a la izquierda de I; mantener geometría, materiales y encuadre. Se inspeccionaron ambas salidas antes de integrar la corregida.

Comprobación v2 en navegador: reproducción completa y exportación con 141 intervalos, unos 30 fps, p95 de 35 ms y cero intervalos mayores de 50 ms en la captura observada; en móvil 390 × 844, p95 de 34,2 ms y sin desbordamiento horizontal. Se inspeccionaron el hundimiento a 0,3 s, el acercamiento a 2,25 s, la O del teclado a 2,55 s y el encuadre final a 4,7 s. La última escala de cámara es exactamente 1. Los registros del navegador no mostraron errores. Las medidas se refieren a las sesiones observadas.

Video v2 verificado en navegador: 2012 × 1340, duración 4,725 s, reproducción completa sin error y último fotograma correcto. Archivo: `entrada-hello-zoom-v2.mp4` (3,40 MB).

## Versión 3 · unificación de color

El recurso activo es ahora `assets/hello-keys-cream-v3.png`. Se sustituyen el blanco frío y los laterales grises del saludo por marfil cálido y sombras beige/marrón similares a la macro y al teclado aprobado. Se conserva la L naranja. Los recortes se adaptaron a las dimensiones reales de la nueva salida. El setup, la macro, los tiempos y el recorrido de cámara permanecen iguales. Los recursos anteriores se conservan como referencias; la página no los carga.

Herramienta: ImageGen integrada, edición con transparencia. Prompt final: usar el atlas HELLO anterior como objetivo y la macro del teclado como referencia exclusiva de luz/material; cambiar únicamente el color blanco frío a marfil crema cálido, laterales beige y acabado mate satinado con reflejos ámbar; mantener formas, letras H E L L O, posiciones y acento naranja, sin añadir fondo ni objetos. Se inspeccionó la salida y se comprobó el saludo y la O ampliada dentro del navegador. La muestra vigente se llama `entrada-hello-crema-v3.mp4`; los MP4 v1 y v2 documentan estados anteriores.
