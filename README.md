# Cultura Tech Store — Sitio web

Sitio estático (HTML + CSS + JS, sin dependencias ni compilación). Funciona en cualquier hosting.

## Estructura
```
index.html          Inicio (hero, marcas, destacados, beneficios, nosotros, ubicación, contacto)
catalogo.html       Catálogo con búsqueda, filtros, orden y detalle de producto
404.html            Página de error
js/config.js        ⚙️ WhatsApp, email, horarios, Instagram (EDITAR ACÁ)
data/products.js    🛒 Catálogo incluido (respaldo si la planilla no tiene el formato nuevo)
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

Columnas (formato v2.4, **una fila = un producto**): `activo` (SI/NO), `marca`, `categoria`, `modelo` (nombre completo, ej. "iPhone 17 Pro 256GB"), `variante` (opcional), `condicion` (Nuevo/Usado), `bateria` (% para usados), `moneda` (USD/ARS), `precio` (solo número; vacío = "Consultar precio"), `destacado` (SI = aparece en el inicio), `foto` (archivo en `assets/productos/` o link https), `descripcion`, `seccion` ("Nuevos" o "Usados premium"). Los "Usados premium" aparecen en la pestaña **Usados Premium** del catálogo (`catalogo.html?seccion=usados-premium#usados-premium`).

**Importante:** la web solo usa la planilla si tiene la columna `seccion`. Si la planilla todavía tiene el formato anterior (sin `seccion`), la web muestra el catálogo incluido en `data/products.js`. Archivo listo para pegar: `cultura-tech-productos-v24.xlsx` (hoja Productos).

Si el link está vacío o Google no responde, la web usa automáticamente la copia local `data/products.js` (por eso conviene actualizarla de vez en cuando).

## Editar el catálogo sin planilla (copia local)
Abrí `data/products.js`. Cada producto es un bloque así:
```js
{
  "id": "apple-iphone-13-pro-128gb-graphite-100-usado", // único, sin espacios ni acentos
  "name": "iPhone 13 Pro 128GB Graphite",
  "brand": "Apple",                  // aparece en el filtro de marcas
  "category": "Smartphones",         // Smartphones | Notebooks | Audio | Wearables | Gaming | Accesorios
  "condition": "Usado",              // "Nuevo" o "Usado"
  "section": "Usados premium",       // "Nuevos" o "Usados premium"
  "used": true,                      // true = va a la pestaña Usados Premium
  "battery": "100%",                 // solo usados
  "variant": "",
  "price": "USD 460",                // vacío = "Consultar precio"
  "note": "",
  "image": "assets/productos/iphone-13-pro-graphite.webp",
  "featured": false                  // true = aparece en "Destacados" del inicio
}
```
- Para agregar: copiá un bloque, cambiá los datos y separalo con coma.
- Para quitar: borrá el bloque completo (con su coma).
- Fotos: subilas a `assets/productos/` (ideal .webp 600×600, fondo transparente) y poné la ruta en `image`.
- Las fotos actuales son imágenes oficiales de producto (Apple, Samsung, Xiaomi, Sony, Nintendo, Verbatim) descargadas al sitio (no se enlazan a terceros). En los iPhone usados la foto corresponde al color del equipo.
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
