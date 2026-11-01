# Francis Daniella · Prueba con fuentes manuscritas

29 de octubre de 2026. Muestras de **Caveat Brush Regular**, **Mansalva Regular** y **Kalam Bold**, las tres alternativas sugeridas a partir de la referencia «Encuéntrate en las cosas que amas».

## Qué se entrega

- `index.html`: galería local que funciona sin servicios externos.
- `comparativa.png` y `comparativa.svg`: tres filas, una por fuente; mayúsculas en dos líneas, minúsculas en dos líneas y versión horizontal en minúsculas a 220 px de ancho.
- Doce muestras SVG y sus PNG de 1400 px de ancho, con fondo transparente: dos composiciones por cada combinación de fuente y caja.
- `fuentes/`: archivos originales descargados del repositorio oficial de Google Fonts, con sus licencias OFL.

## Criterio de la prueba

Se utilizan las formas, grosores e inclinaciones originales de cada fuente. Se conserva el espaciado de sus glifos y el kerning de la tabla heredada cuando existe; no se aplican modificaciones personalizadas ni sustituciones contextuales OpenType. Las composiciones de dos líneas centran cada palabra y añaden espacio entre ellas. Se ajusta el tamaño de cada muestra para compararlas dentro de áreas equivalentes.

Son muestras tipográficas convertidas a curvas, no imágenes de letras generadas con IA ni lettering exclusivo. Los SVG se pueden usar sin instalar la fuente. Los originales tipográficos se conservan completos, sin modificaciones.

La selección provisional de 3A y 3B sigue guardada en `../SELECCION.md`. Esta prueba no sustituye esa decisión ni cambia el encabezado de la web.

## Fuentes y procedencia

- Caveat Brush: https://fonts.google.com/specimen/Caveat+Brush — https://github.com/google/fonts/tree/main/ofl/caveatbrush
- Mansalva: https://fonts.google.com/specimen/Mansalva — https://github.com/google/fonts/tree/main/ofl/mansalva
- Kalam, peso Bold: https://fonts.google.com/specimen/Kalam — https://github.com/google/fonts/tree/main/ofl/kalam

Las etiquetas de las propuestas y las fuentes forman parte de la comparación; no forman parte del logo.

## Reproducción de curvas

`crear-muestras.py` utiliza fontTools para convertir los archivos originales en SVG. Las piezas entregadas no requieren esa biblioteca.
