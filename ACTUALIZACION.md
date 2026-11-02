# Actualización · 1 de noviembre de 2026

Resumen de lo que se hizo en esta sesión, cómo probarlo y qué queda pendiente. Para el detalle de cada parte, ver [web/LEEME.md](web/LEEME.md).

## Qué se hizo

### 1. Orden del proyecto
- **Carpetas nuevas:** `web/` (la página), `contenido/` (textos y casos), `estrategia/` (documento de trabajo, brief, plan, estructura), `identidad/` (logo elegido) y `referencias/` (imágenes y análisis).
- **`_descartado/`:** guarda todo lo que ya no se usa, con la estructura de carpetas original: el boceto inicial, la versión con girasoles, el escritorio dibujado en código, las exploraciones de logo y los borradores superados.
- **[README.md](README.md):** funciona como índice de todo el proyecto.

### 2. La web nueva (`web/`)
- **Página real de una sola entrada** (`index.html`): hero, proyectos, trabajo reciente, sobre mí, herramientas, contacto y vista de caso de estudio.
- **Dos modos de color**, Claro y Cálido, que se eligen en el dock y se recuerdan en el navegador.
- **Hero con fotos del escritorio generadas por Dany** (una por modo, con el mismo encuadre). La herramienta las entrega a 1536 × 1024 como máximo, así que se escalaron ×4 con IA (Real-ESRGAN) y se exportaron en WebP en varios tamaños (`web/assets/hero/`).
- **Navegación:** arriba solo queda la firma, para no tapar el monitor de la foto, y los enlaces viven en un dock flotante abajo al centro.

### 3. Intro HELLO (elegida: «E3 · Y sobre la tecla»)
1. Las teclas HELLO reales de Dany (recortadas de sus imágenes, en `web/assets/hello/`) entran desde la derecha.
2. Se detienen con la O justo encima de su tecla.
3. H-E-L-L se disuelven y la O cae, da un rebote y encaja en la O del teclado de la foto.
4. Mientras tanto, la escena pasa de desenfocada a nítida.

Las otras opciones probadas siguen en `web/pruebas-hello/` por si se quiere cambiar.

### 4. Del hero a Proyectos (elegida: «1 · Un gesto»)
- **El gesto:** en escritorio, un solo movimiento de scroll reproduce la transición en unos 1,5 s. La cámara se acerca al espacio vacío de la alfombrilla, la mesa se funde con el fondo y los proyectos aparecen en su sitio, de difuminados a nítidos.
- **Después del gesto:** el scroll es normal; hacia arriba, desde el inicio de los proyectos, vuelve al hero.
- **Otras opciones:** las otras formas probadas siguen en `web/pruebas-scroll/`.

## Cómo probarlo

1. Desde la raíz del proyecto, levantar el servidor local:
   ```bash
   python3 -m http.server 4173 --directory web
   ```
2. Abrir en el navegador:
   - **Web:** http://localhost:4173/
   - **Pruebas del HELLO:** http://localhost:4173/pruebas-hello/ (opciones `?v=b`, `?v=e`, `?v=e3`, `?v=e3c`, `?v=e3z`)
   - **Pruebas del scroll:** http://localhost:4173/pruebas-scroll/ (opciones `?v=gesto`, `?v=iman`, `?v=pausa`)
3. Qué revisar en la web, en una ventana de escritorio (por ejemplo 1440 × 900):
   - [ ] Al cargar se reproduce el HELLO y la O encaja en su tecla. «Saltar intro» o Esc lo saltan, y «Repetir el hello» (footer) lo vuelve a reproducir.
   - [ ] Un movimiento de rueda o trackpad hace la transición y deja «Proyectos seleccionados» arriba y nítido.
   - [ ] Un movimiento hacia arriba, desde ahí, vuelve al hero.
   - [ ] En el dock, «Proyectos» reproduce la transición, «Sobre mí» y «Contacto» saltan directo, y la firma vuelve al inicio.
   - [ ] Al abrir un caso (por ejemplo Carbon) y volver, la página queda en Proyectos.
   - [ ] Claro/Cálido cambia las fotos y los colores.
4. Si el navegador muestra una versión vieja, recargar. Los archivos llevan `?v=` para evitarlo.

## Dónde está cada cosa (código)

- **`web/index.html`:** página.
- **`web/site.css`:** estilos, modos, dock e intro.
- **`web/desk.js`:** encuadre de la foto e intro HELLO.
- **`web/scroll-fx.js`:** transición del hero a Proyectos (solo escritorio).
- **`web/site.js`:** modos, header, casos de estudio y detalles.
- **`web/content.js`:** contenido de los casos.
- **Medidas de las teclas en la foto** (para la intro): en `referencias/hero-hello/LEEME.md`. Si se cambian las fotos, hay que volver a medirlas.

## Pendiente

- **Móvil:** se definirá aparte. Hoy usa el diseño compacto (texto arriba y franja del teclado debajo), sin la transición del scroll.
- **Derechos de imagen:** la foto incluye la portada de *A Hard Day's Night* de The Beatles. Revisarlo antes de publicar.
- **Logo:** falta el archivo original del logo 3A; la firma usa la fuente Caveat mientras tanto.
- **Proyectos:** faltan las capturas reales; las tarjetas muestran «Capturas en preparación».
- **Lanzamiento:** faltan el enlace de agenda, el CV, la versión en inglés y la publicación. Lanzamiento objetivo: 20 de noviembre de 2026.
- **Calidad de las fotos:** si se consiguen los PNG originales de las fotos (sin recomprimir), re-exportarlos mejora un poco la calidad.
