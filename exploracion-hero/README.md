# Portafolio de Dany — exploración de entrada

Este repositorio reúne las ideas visuales y el prototipo local del hero de un portafolio de diseño UI/UX. El trabajo está en exploración: el texto es provisional y la transición todavía requiere refinamiento.

## Abrir el prototipo actual

Desde la carpeta raíz, ejecuta:

```sh
python3 -m http.server 8765
```

Abre `http://localhost:8765/outputs/prototipo-entrada/`. Pulsa **Repetir entrada** o usa **Ver el recorrido** para revisar cada momento. El prototipo es estático y funciona sin backend ni dependencias externas. Se recomienda usar un servidor HTTP en lugar de abrir el archivo directamente.

## Resumen del trabajo

La dirección elegida es un espacio creativo personal, con un escritorio visto desde arriba y un ligero ángulo. Combina el trabajo de diseño UI/UX con gustos de Dany: paisajes, montañas, elementos retro, música de los sesenta y detalles de color.

El setup aprobado incluye una lámpara naranja, monitor moderno parcialmente visible, superficie clara cuadriculada, teclado crema con acentos naranjas, taza y plato blancos, un vinilo de *A Hard Day’s Night* de The Beatles, bandeja con notas y una foto tipo Instax del Salto Ángel, y un Stream Deck con iconos de herramientas creativas. El recurso aprobado está en `outputs/hero-calido-streamdeck-ajustado.png`; el prototipo usa una copia idéntica en `outputs/prototipo-entrada/assets/setup.png`.

Se exploraron varias ideas de hero y transición. La versión web actual presenta cinco teclas HELLO; la O sirve de enlace visual hacia la O del teclado, la cámara se aleja y aparece el escritorio con texto provisional. Las teclas se ajustaron a tonos crema cálidos para acercarlas al teclado. Incluye repetición, omisión, un control para revisar el recorrido y una grabación descargable. Hay vistas para escritorio y móvil, y una alternativa de movimiento reducido.

La versión actual es un prototipo de movimiento, no una página terminada. En revisión se observó que la pulsación y el paso entre imágenes todavía se sienten toscos, y que el movimiento necesita una continuidad más convincente.

## Próxima dirección acordada

Probar primero una transición **O → teclado → escritorio** con geometría 3D y cámara controlada. La idea es validar ese tramo antes de sumar el saludo completo. Después se propone que HELLO aparezca de izquierda a derecha, que la O haga una pulsación sutil y que el movimiento revele el setup; el texto y los controles pueden vivir en la web. Se contempló un video renderizado para el tramo de cámara, terminando en el encuadre del hero aprobado.

La prueba 3D está **inconclusa y sin validar**: `work/motion3d/render.swift` contiene el trabajo en curso y `outputs/prototipo-entrada/prueba-3d/` contiene fotogramas preliminares. No existe todavía un video final de esa prueba. Los MP4 de `outputs/prototipo-entrada/` son grabaciones de prototipos anteriores, no el resultado 3D acordado. El script 3D usa SceneKit/Metal y es específico de macOS; puede necesitar ajustes y acceso a la GPU.

## Archivos principales

- `outputs/prototipo-entrada/`: web local, imágenes, capturas, videos y notas técnicas de la entrada.
- `outputs/`: propuestas visuales, variaciones del escritorio, HELLO y storyboards.
- `work/motion3d/`: investigación y código incompleto para la prueba de cámara 3D.
- `work/references/`: referencias utilizadas para la cascada y el vinilo.
- `work/prototipo-v1/` y `work/prototipo-v2/`: copias de versiones anteriores del código.

No se incluye la caché de compilación de Swift; puede regenerarse en el equipo donde se continúe el trabajo. Las imágenes y referencias visuales son materiales de exploración; conviene revisar sus derechos antes de publicar el portafolio.
