# Cultura Tech Store — Sitio web

Sitio estático (HTML + CSS + JS, sin dependencias ni compilación). Funciona en cualquier hosting.

## Estructura
```
index.html          Inicio (hero, marcas, destacados, beneficios, nosotros, ubicación, contacto)
catalogo.html       Catálogo con búsqueda, filtros, orden y detalle de producto
404.html            Página de error
js/config.js        ⚙️ WhatsApp, email, horarios, Instagram (EDITAR ACÁ)
data/products.js    🛒 Catálogo de productos (EDITAR ACÁ)
css/styles.css      Estilos
js/main.js, js/catalog.js   Lógica
assets/             Logo, favicon, imagen para redes (og-image.jpg)
robots.txt, sitemap.xml, site.webmanifest
```

## Cambiar WhatsApp, email u horarios
Abrí `js/config.js`:
- `whatsapp`: número en formato internacional sin `+` ni espacios (ej. `5491124833748`).
- `whatsappDisplay`: cómo se muestra en pantalla.
- `email` y `hours` (horarios): si quedan vacíos (`""`), esas filas se ocultan solas.

> El teléfono, el email y los horarios también figuran en los datos para Google (`"telephone"` dentro de `index.html`). (bloque `application/ld+json`, usado por Google). Si cambian, actualizalos ahí también.

## Catálogo desde Google Sheets (recomendado)
La web puede leer el catálogo directamente de una planilla de Google. Cambiás la planilla y la web se actualiza sola (en ~5 minutos).

1. Subí `cultura-tech-catalogo.xlsx` a Google Drive y abrilo con Google Sheets (Archivo > Guardar como Hojas de cálculo de Google).
2. Archivo > Compartir > Publicar en la web.
3. Elegí la hoja **Productos** y el formato **Valores separados por comas (.csv)** > Publicar.
4. Copiá el link y pegalo en `js/config.js`, en `SHEET_CSV_URL: "..."`.
5. Volvé a subir el sitio. Listo: desde ahora solo editás la planilla.

Columnas (una fila por variante): `activo` (SI/NO), `marca`, `categoria`, `modelo`, `variante`, `condicion` (Nuevo/Seminuevo), `bateria`, `moneda` (USD/ARS), `precio` (solo número; vacío = "Consultar precio"; acepta 1341500 o 1.341.500), `destacado` (SI/NO), `foto` (archivo en `assets/productos/` o link https), `descripcion`. Las filas con igual marca + modelo + condición se agrupan en un solo producto. La hoja "Instrucciones" de la planilla lo explica en detalle.

Si el link está vacío o Google no responde, la web usa automáticamente la copia local `data/products.js` (por eso conviene actualizarla de vez en cuando).

## Editar el catálogo sin planilla (copia local)
Abrí `data/products.js`. Cada producto es un bloque así:
```js
{
  "id": "iphone-17-pro",            // único, sin espacios ni acentos
  "name": "iPhone 17 Pro",
  "brand": "Apple",                  // aparece en el filtro de marcas
  "category": "Smartphones",         // Smartphones | Wearables | Gaming | Accesorios | Notebooks
  "variants": ["256GB · Silver"],    // capacidades / colores
  "condition": "Nuevo",              // o "Seminuevo"
  "note": "",                        // ej. "Condición de batería: 99%"
  "prices": {                        // precio por variante (texto). Variante sin precio = "Consultar precio"
    "256GB · Silver": "USD 1.299"    //   ej. "$ 1.345.000" para pesos
  },
  "image": "assets/productos/iphone-17-pro.webp", // vacío = ícono elegante
  "featured": true                   // true = aparece en "Destacados" del inicio
}
```
- Para agregar: copiá un bloque, cambiá los datos y separalo con coma.
- Para quitar: borrá el bloque completo (con su coma).
- Fotos: subilas a `assets/productos/` (ideal .webp 600×600, fondo transparente) y poné la ruta en `image`.
- Las fotos actuales son imágenes oficiales de producto (Apple, Samsung, Sony) descargadas al sitio (no se enlazan a terceros). Son ilustrativas: el color de la foto puede no coincidir con la variante.
- Categorías y marcas nuevas aparecen solas en los filtros.

## Dominio (antes de publicar)
Reemplazá `https://TU-DOMINIO.com` por el dominio real en **todos** los archivos (buscar y reemplazar): `index.html`, `catalogo.html`, `404.html`, `sitemap.xml`, `robots.txt`.

## Publicar
- **Netlify**: app.netlify.com → "Add new site" → "Deploy manually" → arrastrá la carpeta. Luego "Domain settings" para conectar el dominio.
- **Vercel**: `npx vercel` dentro de la carpeta (o importá el repo de GitHub). Framework: "Other".
- **GitHub Pages**: subí la carpeta a un repo → Settings → Pages → Branch `main` / root.
- **Hosting tradicional (cPanel/FTP)**: subí todo el contenido a `public_html`.

Después de publicar, cargá `https://tu-dominio/sitemap.xml` en Google Search Console.

## Probar en tu computadora
Abrí `index.html` con doble clic, o para una prueba más fiel: `python3 -m http.server` dentro de la carpeta y entrá a http://localhost:8000
