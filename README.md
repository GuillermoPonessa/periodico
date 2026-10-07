# El Códice – Periódico literario medieval

Sitio web estático (HTML + CSS + JavaScript, sin dependencias) con formato de periódico y estética medieval.
Sirve para publicar biografías, crónicas y textos literarios.

## Estructura

```
Pagina/
├── index.html              Portada del periódico
├── README.md               Este archivo
├── css/
│   └── estilos.css         Todos los estilos (colores, columnas, tipografías)
├── js/
│   ├── app.js              Núcleo: fecha, menú activo y filtro por siglo
│   ├── buscador.js         Buscador de texto en biografías
│   ├── tema.js             Modo pergamino / modo vela (recuerda la elección)
│   └── lectura.js          Barra de progreso, tamaño de letra y botón Subir
├── pags/
│   ├── biografias.html     Fichas de autores con filtro por siglo
│   └── cronicas.html       Artículos sobre libros y época
└── assets/
    ├── fonts/              Fuentes locales (UnifrakturCook e IM Fell English)
    └── img/                Escudo y ornamento en SVG
```

## Cómo usarlo
1. Descomprime el RAR.
2. Abre `index.html` con doble clic en cualquier navegador. No necesita servidor ni internet.

## Cómo agregar contenido
- **Nueva biografía:** en `pags/biografias.html` copia un bloque `<article class="ficha" data-siglo="XIV">` y cambia el texto. El valor de `data-siglo` debe coincidir con el de un botón de filtro.
- **Nuevo siglo en el filtro:** añade un `<button data-siglo="XVI">` en la misma página.
- **Nueva página:** copia `pags/cronicas.html`, cambia el contenido y agrega el enlace en el `<nav class="menu">` de todas las páginas.
- **Colores:** se cambian en las variables de `:root` al inicio de `css/estilos.css`.
- **Imágenes:** guárdalas en `assets/img/` y úsalas con `<img src="../assets/img/archivo.png" alt="descripción">`.

## Qué hace cada archivo
- `css/estilos.css`: declara las fuentes, la paleta, el marco de hoja, las columnas con filete, la letra capital, los botones y la versión móvil.
- `js/app.js`: `mostrarFecha()`, `marcarMenuActivo()`, `activarFiltros()` y `aplicarFiltros()` (compartida con el buscador). Debe cargarse primero.
- `js/buscador.js`: filtra fichas mientras se escribe, combinado con el filtro por siglo.
- `js/tema.js`: alterna modo claro/oscuro y lo guarda en el navegador.
- `js/lectura.js`: barra de progreso, botones A-/A+ y botón Subir.
- Cada línea de HTML, CSS y JS está comentada para explicar su función.

## Créditos
- Fuentes: UnifrakturCook e IM Fell English (licencia SIL Open Font License), vía Fontsource.
- Los textos biográficos son resúmenes de divulgación; verifica fechas antes de publicar.
