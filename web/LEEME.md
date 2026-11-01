# Prototipo web · Francis Daniella

## Abrir

Abre `index.html` en tu navegador. Todo está guardado localmente; no requiere instalaciones ni conexión para mostrar imágenes o fuentes.

## Estado vigente · 30 de octubre de 2026

- **Paleta Mantequilla y oliva (D):** crema #FBF8EF como base, amarillo mantequilla #F0DCA4 en acciones y detalles, verde oliva #304737 en texto y contornos. Rosa y lila como acentos pequeños.
- **Tipografía:** Instrument Serif en títulos; Instrument Sans en textos, navegación y botones.
- **Header:** fijo, 60 px de alto, logo 3A en oliva a 80 px. Transparente al inicio; al desplazarse, fondo crema al 50 % con desenfoque de 14 px. Enlaces Proyectos, Sobre mí y Contacto, y CTA verde «Iniciemos un proyecto», que por ahora lleva a Contacto porque todavía no hay enlace de agenda. Menú desplegable en móvil.
- **Hero:** composición centrada, 1040 px de alto en escritorio y altura automática hasta 850 px de ancho. «Product Designer», titular «Diseño de producto, con IA y criterio propio.» y accesos a los tres proyectos.
- **Jardín:** cielo azul con nubes lentas, ocho girasoles por lado y cuatro pequeños en el centro, en los 520 px inferiores. Los pétalos caen al acercar el cursor y se regeneran; la animación se puede pausar y respeta la preferencia de reducir movimiento.
- **Botones:** redondeados, con contorno, sombra sólida y desplazamiento leve al hover. Mínimo de 44 px en pantallas táctiles.
- **Proyectos:** Carbon a todo el ancho; Sozialens y PortalFi debajo. Las imágenes llevan la etiqueta **Imagen provisional** hasta tener capturas reales.
- **Footer:** CV, ES, EN y Vista, todavía desactivados.

## Archivos

- `index.html`: única entrada.
- `content.js`: contenido de los tres proyectos.
- `app.js`: navegación, proyectos, trayectoria, contacto y alternativa si falla una imagen.
- `header.js`: menú móvil y fondo del header al desplazarse.
- `sunflowers.js`: cielo, nubes, girasoles articulados, escritura del título y controles.
- `garden-layout.js`: posición y tamaño de cada girasol.
- `petals.js`: desprendimiento, caída, límites y regeneración de pétalos.
- `styles.css` y el resto de hojas: se cargan en capas que se sobrescriben en este orden: `styles`, `header`, `temas-paleta`, `paletas`, `botones-ovales`, `header-simple`, `selected-work`, `hero-editorial`, `hero-centered`, `hero-floral-sides`, `buttons-rounded`, `typography-current`.
- `assets/`: fuentes con licencia OFL, logo, girasoles e imágenes provisionales de proyectos.
- `tests/`: comprobaciones de geometría del jardín y de la interacción de pétalos. Se ejecutan con `node tests/garden-layout.test.cjs` y `node tests/petals.test.cjs`.

Textos de referencia: [portada propuesta](../contenido/portada-textos-es-propuesta.md), [casos](../contenido/casos/propuesta-editorial.md) y [wireframe](../estrategia/wireframe-estructura.md).

## Pendientes

- **Imágenes dañadas:** `assets/logo-francis-daniella-3a-oliva.png` y `assets/girasoles-naturales-v2.png` están cortados a 700 000 bytes. Hacen falta los originales.
- Unificar las doce hojas de estilo en una sola cuando se cierre la dirección visual.
- Capturas reales de los proyectos, enlace de agenda, CV, versión en inglés y selector «Vista».
- Revisión visual en navegador de los últimos cambios del hero y el jardín.
- Publicación: la web todavía no está publicada; lanzamiento objetivo el 20 de noviembre de 2026.

## Historial

Todos los cambios y las notas de detalle (logo, girasoles, botones, proyectos, hero) están en [HISTORIAL.md](HISTORIAL.md).
