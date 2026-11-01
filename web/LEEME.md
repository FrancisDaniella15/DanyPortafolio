# Web · Francis Daniella

## Abrir

Doble clic en `index.html`, o con servidor local desde la raíz del proyecto:

```bash
python3 -m http.server 4173 --directory web
```

y abrir http://localhost:4173. No requiere instalaciones; fuentes e íconos están en `assets/`.

## Estado vigente · 1 de noviembre de 2026

**Intro HELLO → hero.** Al entrar se escriben cinco teclas, H E L L O, con la L en naranja. Cada tecla vuela después a su posición en el teclado del escritorio y lo pulsa al llegar, mientras aparecen el hero y el header. Dura unos 3 segundos. Se puede saltar con el botón «Saltar intro», con un clic o con Esc, Enter o espacio. Se muestra una vez por sesión, no aparece si se entra con un enlace a una sección y se omite con «reducir movimiento». En el footer, «Repetir el hello» la vuelve a reproducir.

**Hero como escritorio visto desde arriba.** Todo está construido en código (HTML y CSS), sin fotos: alfombrilla con cuadrícula, lámpara naranja, disco y funda, café, bandeja amarilla con notas adhesivas y polaroid, teclado completo y macropad con Figma, Notion, ChatGPT, Claude, Gemini y Spotify. Se ve nítido en cualquier pantalla y cambia de modo sin rehacer imágenes. El texto ocupa el espacio libre del centro. Las teclas responden al ratón y al teclado físico.

**Dos modos.** **Claro** (blanco y gris cálido) y **Cálido** (crema, con luz de ventana y resplandor de lámpara). Se eligen en el header, se guardan en el navegador y cambian con una transición suave. Cálido es el modo por defecto.

**Sistema visual.**
- **Color:** naranja #EF6A21 como acento, con texto oscuro encima para cumplir contraste.
- **Tipografía:** Instrument Serif en títulos, Instrument Sans en textos y Caveat para la firma y las notas.
- **Componentes:** los botones y la lista de herramientas usan la misma forma de tecla que el hero.

**Pantallas estrechas o verticales.** El texto va primero. Debajo queda una franja del teclado centrada en las letras de HELLO, para que la intro aterrice en un lugar visible.

## Archivos

- `index.html`: página completa (inicio y vista de caso).
- `site.css`: estilos y los dos modos (variables en `[data-theme]`).
- `desk.js`: teclado, macropad, encuadre del escritorio e intro.
- `site.js`: modos, header, menú móvil, casos de estudio, trayectoria, copiar correo y apariciones al desplazarse.
- `content.js`: contenido de los tres casos.
- `icons.js`: trazos de los íconos (Simple Icons, CC0); originales en `assets/icons/`.
- `assets/fonts/`: Instrument Sans, Instrument Serif y Caveat, con licencias OFL.

## Pendientes

- **Logo:** la firma usa Caveat mientras falta el archivo original del logo 3A, porque el PNG está dañado.
- **Proyectos:** las tarjetas muestran «Capturas en preparación» hasta tener imágenes reales.
- **Lanzamiento:** faltan el enlace de agenda (por ahora el CTA lleva a Contacto), el CV, la versión en inglés y la publicación. Lanzamiento objetivo: 20 de noviembre de 2026.
- **Revisión:** revisar con Dany la intensidad de la luz del modo cálido, el tamaño de la lámpara y la duración de la intro.

## Historial

Versión anterior con girasoles: `../_descartado/web-girasoles/`. Cambios y notas de esa etapa: [HISTORIAL.md](HISTORIAL.md). Referencias del nuevo hero: `../referencias/hero-hello/`.
