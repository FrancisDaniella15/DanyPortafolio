# Girasoles animados — 28 de octubre de 2026

## Referencia observada

https://pin.it/3d1l4lpMR redirige a https://www.pinterest.com/pin/683491680982379987/.

El pin contiene un GIF de 724 × 403 px, con 10 fotogramas de 100 ms y bucle continuo. Se revisaron todos sus fotogramas: pequeñas oscilaciones laterales, cambios en inclinación de los tallos y variación del grano. No hay cambio de escena ni zoom. La descripción del movimiento se comunicó antes de producir la propuesta.

## Adaptación

Girasoles reconocibles con pétalos dorados, centros marrones, tallos verdes, fondo crema y azul suave. Las cabezas, tallos y hojas se dibujan por separado en un canvas local. Cada flor tiene una fase distinta; los tallos se redibujan mediante curvas y las hojas se mueven desde sus uniones. No se desplaza ni amplía una fotografía completa.

Las funciones periódicas comparten un ciclo de 12 segundos: al cerrar el ciclo coinciden posiciones y velocidades. Tras la entrada inicial, no se reinicia la escena ni se cambia la semilla de la textura. El filtro de vidrio y el grano se limitan al canvas floral; el texto no tiene filtros.

El título aparece por letras durante aproximadamente 1,65 segundos, una sola vez, sin cambios de tamaño ni saltos de composición. El balanceo gana amplitud cuando termina de aparecer. El título completo sigue disponible para lectores de pantalla. Pausa, movimiento reducido y suspensión fuera de pantalla incluidos.

## Recurso y herramienta

Recurso: `assets/girasoles-cabezas-v1.png`. Generado con la herramienta integrada de generación de imágenes, con transparencia. La animación es código local en `sunflowers.js`; no es un video generado.

## Prompt del recurso

Use case: photorealistic-natural. Asset type: transparent botanical sprite asset for an animated portfolio artwork. Create TWO DIFFERENT isolated sunflower flower HEADS, side by side in two equal-width cells of one wide landscape image. Each head fits completely within its own half, with a large clean transparent gutter between them and generous transparent padding around every petal. Left head: natural open sunflower, almost front facing but slight tilt, golden-yellow fine irregular petals surrounding a recognizable warm dark brown seed disk. Right head: a different sunflower viewed at a gentle three-quarter angle with asymmetric drooping outer petals, warm brown center, richer golden yellow. ONLY flower heads, NO stems or leaves. Style: real organic botanical forms seen through finely pebbled frosted glass, softly diffused outlines, delicate high-quality film grain, luminous spring light. Soft but sunflowers must remain clearly recognizable with brown centers and individual golden petals. Artistic photographic texture, absolutely no cartoon, emoji, vector icon, plastic material or shiny 3D. True transparent background, no solid background or shadow panel. No text, no logo, no frame. Keep left and right flowers fully separate, neither overlaps the center line. Intended for separately animating both heads in a browser.


## Interacción y cielo añadidos

Cielo celeste con horizonte claro y tres agrupaciones de nubes difusas; su ciclo de desplazamiento es de 96 segundos y cierra fuera del encuadre. La semilla de la textura es fija. La capa del cielo se actualiza a un máximo de 15 veces por segundo; las flores siguen su propio dibujo fluido.

Los pétalos se recortan de la misma cabeza floral: se resta esa pequeña zona del girasol y la muestra desprendida parte de su unión original. Se permite un desprendimiento cada 0,75 segundos, hasta tres pétalos en el aire y dos huecos por flor. La caída dura hasta cinco segundos, con desvanecimiento final; la regeneración ocurre entre 4,7 y 7,5 segundos. El gesto de acercamiento y el toque comparten la detección local. Textos y botones se excluyen. Movimiento reducido elimina los pétalos activos y restaura la flor.

La escena se congela al pausarla o salir de pantalla. La escritura del título no vuelve a empezar al navegar por la página.
