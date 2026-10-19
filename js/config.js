/* =====================================================
   CONFIGURACIÓN DEL SITIO — editá SOLO este archivo
   ===================================================== */
window.SITE_CONFIG = {
  // Link CSV de Google Sheets (Archivo > Compartir > Publicar en la web > hoja "Productos" > CSV).
  // Vacío = usa el catálogo incluido en data/products.js
  SHEET_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsmRM32Y6CgSMzROMTNwR5KD_XXz5QhAqdr-1-HzgX6XMFHaH-eLNWI2zn6ks02if1Kj-F6pyiaSSA/pub?gid=1998899839&single=true&output=csv",

  // WhatsApp de la tienda.
  // Formato internacional sin +, espacios ni guiones. Ej: 5491123456789
  whatsapp: "5491124833748",
  whatsappDisplay: "+54 9 11 2483-3748",
  email: "culturatechstore@gmail.com",
  instagram: "https://www.instagram.com/somosculturatech/",
  instagramUser: "@somosculturatech",
  address: "Almirante Brown 971, B1708 Morón, Provincia de Buenos Aires, Argentina",
  hours: "Lun a Vie 10 a 19 h · Sáb 10 a 15 h · Dom cerrado", // (vacío = se oculta)
  // ---- Reseñas desde el sitio ----
  // URL del Web App de Google Apps Script (ver apps-script-resenas.gs). Vacío = solo botón de Google.
  APPS_SCRIPT_URL: "",
  // Link directo "Escribir reseña" (Perfil de Empresa > Pedir reseñas). Vacío = abre la ficha de Maps en reseñas.
  GOOGLE_REVIEW_URL: "",

  // ---- Redes sociales ---- (url vacía = se oculta; seguidores vacío = no se muestra el número)
  socials: [
    { red: "instagram", url: "https://www.instagram.com/somosculturatech/", usuario: "@somosculturatech", seguidores: "1.947", seguidos: "53", fecha: "16/10/2026" },
    { red: "facebook",  url: "https://www.facebook.com/657187777476764", usuario: "Cultura Tech Store", seguidores: "1.300", fecha: "dato del dueño" },
    { red: "tiktok",    url: "https://www.tiktok.com/@culturatechstore", usuario: "@culturatechstore", seguidores: "", fecha: "" }
  ],

  // ---- Promo (cartel chico, se puede cerrar; al cambiar "id" vuelve a mostrarse) ---- (text vacío = sin cartel)
  promo: { enabled: false, id: "promo-accesorios-15", days: 7, eyebrow: "PROMO EXCLUSIVA", headline: "Estrenás teléfono,", big: "15% OFF en accesorios", text: "15% de descuento en accesorios con la compra de tu nuevo teléfono", copy: "Con la compra de tu nuevo teléfono llevate AirPods, cargadores, cables y más con 15% de descuento.", link: "catalogo.html?cat=Accesorios", linkText: "Ver accesorios" },

  // ---- Cintas de descuento en productos ----
  // Cada regla: palabras que deben estar TODAS en el nombre del modelo (sin importar mayúsculas, acentos, espacios ni signos).
  // Funciona igual con la planilla o con el catálogo incluido. Para quitar una cinta, borrá su línea.
  discountPct: 10, // % de descuento "HOY" aplicado a los productos con cinta (sobre el precio del sheet)
  ribbons: [
    { match: ["airpods pro 3"], text: "HOY 10% DE DESCUENTO", discount: true },
    { match: ["galaxy buds 3"], text: "HOY 10% DE DESCUENTO", discount: true },
    { match: ["powerbank", "verbatim"], text: "HOY 10% DE DESCUENTO", discount: true }
  ],

  defaultMessage: "¡Hola Cultura Tech! Quiero hacer una consulta."
};
