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
    { red: "instagram", url: "https://www.instagram.com/somosculturatech/", usuario: "@somosculturatech", seguidores: "1.940", fecha: "16/10/2026" },
    { red: "facebook",  url: "https://www.facebook.com/657187777476764", usuario: "Cultura Tech Store", seguidores: "1.300", fecha: "dato del dueño" },
    { red: "tiktok",    url: "https://www.tiktok.com/@culturatechstore", usuario: "@culturatechstore", seguidores: "", fecha: "" }
  ],
  // Tarjeta de Instagram
  instagramBio: "Samsung | iPhone | PlayStation | Notebook | Macbook | Y más",
  instagramPosts: "44",
  // Imágenes de la grilla (vacío = usa fotos de productos del catálogo como vista previa)
  instagramGrid: [],

  defaultMessage: "¡Hola Cultura Tech! Quiero hacer una consulta."
};
