/**
 * Cultura Tech Store — Recepción de reseñas del sitio
 * Hoja: https://docs.google.com/spreadsheets/d/1HRhskQCQKlG5cfOSvscASSwy9D-nBbnscwIEZmvhBMY/edit
 *
 * CÓMO PUBLICARLO (5 minutos, con tu cuenta de Google):
 * 1. Abrí la hoja > Extensiones > Apps Script.
 * 2. Borrá lo que haya y pegá TODO este código. Guardá (ícono de disquete).
 * 3. Implementar > Nueva implementación > tipo "Aplicación web".
 *      Ejecutar como: Yo   ·   Quién tiene acceso: Cualquier usuario
 * 4. Autorizá los permisos (Revisar permisos > tu cuenta > Avanzado > Ir al proyecto).
 * 5. Copiá la URL que termina en /exec y pegala en js/config.js → APPS_SCRIPT_URL.
 *
 * Las reseñas llegan con aprobado = NO. Para aprobar una, cambiá a SI.
 * Nada se publica automáticamente. (A futuro el sitio puede leer solo las filas con SI
 * mediante doGet, que ya está incluido abajo.)
 */
var SHEET_ID = '1HRhskQCQKlG5cfOSvscASSwy9D-nBbnscwIEZmvhBMY';
var SHEET_NAME = 'Reseñas';

function hoja_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(['fecha', 'nombre', 'estrellas', 'comentario', 'aprobado']);
  return sh;
}

function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return salida_({ ok: true });                 // honeypot anti-spam
  var nombre = String(p.nombre || '').trim().slice(0, 60);
  var estrellas = parseInt(p.estrellas, 10);
  var comentario = String(p.comentario || '').trim().slice(0, 800);
  if (!nombre || !comentario || !(estrellas >= 1 && estrellas <= 5)) return salida_({ ok: false, error: 'datos' });
  // Evita fórmulas inyectadas en la hoja
  var limpio = function (t) { return /^[=+\-@]/.test(t) ? "'" + t : t; };
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try { hoja_().appendRow([new Date(), limpio(nombre), estrellas, limpio(comentario), 'NO']); }
  finally { lock.releaseLock(); }
  return salida_({ ok: true });
}

// Opcional: devuelve solo reseñas aprobadas (aprobado = SI)
function doGet() {
  var filas = hoja_().getDataRange().getValues().slice(1);
  var ok = filas.filter(function (r) { return String(r[4]).toUpperCase() === 'SI'; })
    .map(function (r) { return { fecha: r[0], nombre: r[1], estrellas: r[2], comentario: r[3] }; });
  return salida_({ items: ok });
}

function salida_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
