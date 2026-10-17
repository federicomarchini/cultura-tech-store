/* Fotos automáticas por modelo (respaldo). La columna "foto" de la planilla tiene prioridad;
   si está vacía, se busca acá por modelo (sin importar mayúsculas, acentos ni espacios).
   Para agregar: subí la imagen a assets/productos/ y sumá una regla. */
(function(){
"use strict";
var D="assets/productos/";
// [patrón sobre el modelo normalizado, archivo] — se evalúan en orden
var RULES=[
 [/airtag2da.*x4|airtag2da.*pack/,"airtag-2-4"],[/airtag2da/,"airtag-2"],[/airtag/,"airtag-4"],
 [/airpodspro/,"airpods-pro-3"],[/airpodsmax/,"airpods-max"],[/airpods5/,"airpods-5"],[/airpods/,"airpods-4"],
 [/buds/,"galaxy-buds3"],[/powerbank|verbatim/,"powerbank-verbatim"],
 [/samsung.*45w|45w/,"samsung-45w"],[/samsung.*25w|25w/,"samsung-25w"],[/40w/,"apple-40w"],[/20w/,"apple-20w"],
 [/lightning/,"cable-usbc-lightning"],[/cable/,"cable-usbc"],
 [/iphone18promax/,"iphone-18-pro-max"],[/iphone18pro/,"iphone-18-pro"],[/iphone17promax/,"iphone-17-pro-max"],[/iphone17pro/,"iphone-17-pro"],[/iphone17e/,"iphone-17e"],[/iphone17/,"iphone-17"],
 [/iphone16promax/,"iphone-16-pro-max-natural"],[/iphone16pro/,"iphone-16-pro-natural"],[/iphone16/,"iphone-16"],
 [/iphone15promax/,"iphone-15-pro-max-natural"],[/iphone15pro/,"iphone-15-pro-natural"],
 [/iphone14promax/,"iphone-14-pro-max-space-black"],[/iphone14pro/,"iphone-14-pro-space-black"],[/iphone14/,"iphone-14"],
 [/iphone13promax/,"iphone-13-pro-max-graphite"],[/iphone13pro/,"iphone-13-pro-graphite"],[/iphone13/,"iphone-13-midnight"],
 [/macbookneo/,"macbook-neo"],[/macbookair15/,"macbook-air-15"],[/macbookair/,"macbook-air-13"],[/macbookpro16/,"macbook-pro-16"],[/macbookpro/,"macbook-pro-14"],
 [/watchultra4/,"watch-ultra-4"],[/watchultra/,"watch-ultra-3"],[/watchse/,"watch-se-3"],[/watchseries11/,"watch-s11"],[/watch/,"watch-s12"],
 [/ps5pro|playstation5pro/,"ps5-pro"],[/dualsense|joystick/,"dualsense"],[/digital/,"ps5-digital"],[/ps5|playstation/,"ps5-disc"],[/switch/,"switch-2"],
 [/zfold8ultra/,"galaxy-z-fold8-ultra"],[/zfold/,"galaxy-z-fold8"],[/zflip/,"galaxy-z-flip8"],
 [/s26ultra/,"galaxy-s26-ultra"],[/s26plus/,"galaxy-s26-plus"],[/s26fe/,"galaxy-s26-fe"],[/s26/,"galaxy-s26"],[/s25ultra/,"galaxy-s25-ultra"],[/s25fe/,"galaxy-s25-fe"],[/s25/,"galaxy-s25"],
 [/a57/,"galaxy-a57"],[/a56/,"galaxy-a56"],[/a37/,"galaxy-a37"],[/a27/,"galaxy-a27"],[/a17/,"galaxy-a17"],[/a16/,"galaxy-a16"],
 [/note15proplus/,"redmi-note-15-pro-plus-5g"],[/note15pro5g/,"redmi-note-15-pro-5g"],[/note15pro/,"redmi-note-15-pro"],[/note15/,"redmi-note-15"],[/note17/,"redmi-note-17"],[/redmi15c/,"redmi-15c"],[/redmi15/,"redmi-15"],
 [/pococ85/,"poco-c85"],[/pocom8pro/,"poco-m8-pro-5g"],[/pocom8/,"poco-m8-5g"],[/pocox7/,"poco-x7-pro"],[/pocox8promax/,"poco-x8-pro-max"],[/pocox8/,"poco-x8-pro"],
 [/pocof7/,"poco-f7"],[/pocof8pro/,"poco-f8-pro"],[/pocof8/,"poco-f8-ultra"],[/pocof9/,"poco-f9-ultra"],
 [/15tpro/,"xiaomi-15t-pro"],[/15t/,"xiaomi-15t"],[/17tpro/,"xiaomi-17t-pro"],[/17t/,"xiaomi-17t"],[/17ultra/,"xiaomi-17-ultra"]
];
function norm(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\+/g,"plus").replace(/[^a-z0-9]/g,"")}
window.photoFor=function(brand,model){
  var k=norm(model);
  for(var i=0;i<RULES.length;i++)if(RULES[i][0].test(k))return D+RULES[i][1]+".webp";
  return "";
};
window.applyPhotos=function(list){(list||[]).forEach(function(p){if(!p.image)p.image=window.photoFor(p.brand,p.name)});return list};
})();
