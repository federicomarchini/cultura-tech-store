/* Fotos automáticas por modelo. La columna "foto" de la planilla tiene prioridad;
   si está vacía, se busca acá por modelo (sin importar mayúsculas, acentos ni espacios; "+" = "plus").
   Para agregar: subí la imagen a assets/productos/ y sumá una regla. Se evalúan en orden. */
(function(){
"use strict";
var D="assets/productos/";
var RULES=[
 // Accesorios
 [/funda/,"funda-s25-ultra"],[/templado|antiespia|protectordecamara/,"templado-s25-ultra"],
 [/soporte/,"generico-soporte"],[/lapiz/,"generico-lapiz"],[/powerbank|batterypack/,"generico-powerbank"],
 [/lightning/,"cable-usbc-lightning"],[/cable.*usbc/,"cable-usbc"],
 [/40w/,"apple-40w"],[/20w/,"apple-20w"],[/45w/,"samsung-45w"],[/25w/,"samsung-25w"],
 [/airtag.*(pack|x4)/,"airtag-4"],[/airtag/,"airtag"],
 [/applepencilpro/,"apple-pencil-pro"],[/applepencil/,"apple-pencil-1"],[/magickeyboard/,"magic-keyboard"],
 [/airpodsmax/,"airpods-max"],[/airpodspro/,"airpods-pro-3"],[/airpods5/,"airpods-5"],[/airpods4/,"airpods-4"],
 [/galaxybuds/,"galaxy-buds3"],
 // iPhone
 [/iphone18pro/,"iphone-18-pro-max"],[/iphone17promax/,"iphone-17-pro-max"],[/iphone17pro/,"iphone-17-pro"],[/iphone17e/,"iphone-17e"],[/iphone17/,"iphone-17"],
 [/iphone16promax/,"iphone-16-pro-max"],[/iphone16pro/,"iphone-16-pro"],[/iphone16/,"iphone-16"],
 [/iphone15promax/,"iphone-15-pro-max"],[/iphone15pro/,"iphone-15-pro"],[/iphone15/,"iphone-15"],
 [/iphone14promax/,"iphone-14-pro-max"],[/iphone14pro/,"iphone-14-pro"],[/iphone14/,"iphone-14"],
 [/iphone13promax/,"iphone-13-pro-max"],[/iphone13pro/,"iphone-13-pro"],[/iphone13/,"iphone-13"],
 // Apple Watch / iPad / Mac
 [/watchultra4/,"watch-ultra-4"],[/watchultra/,"watch-ultra-3"],[/watchseries12|watchs12/,"watch-s12"],[/watchseries11/,"watch-s11"],[/watchse/,"watch-se-3"],[/applewatch/,"watch-s12"],
 [/ipadpro/,"ipad-pro-m5"],[/ipadairm4/,"ipad-air-m4"],[/ipadair/,"ipad-air-m3"],[/ipadmini/,"ipad-mini"],[/ipad/,"ipad-a16"],
 [/macbookneo/,"macbook-neo"],[/macbookair15/,"macbook-air-15"],[/macbookair/,"macbook-air-13"],[/macbookpro16/,"macbook-pro-16"],[/macbookpro/,"macbook-pro-14"],
 [/macmini/,"mac-mini"],[/imac/,"imac-m4"],
 // Consolas
 [/dualsense|joystickps5/,"dualsense"],[/playstation5pro|ps5pro/,"ps5-pro"],[/playstation5digital|ps5digital/,"ps5-digital"],[/playstation|ps5/,"ps5-disc"],
 [/xboxseriesx/,"xbox-series-x"],[/xboxseriess/,"xbox-series-s"],[/switch2/,"switch-2"],
 // Samsung
 [/zfold8ultra/,"galaxy-z-fold8-ultra"],[/zfold/,"galaxy-z-fold8"],[/zflip/,"galaxy-z-flip8"],
 [/s26ultra/,"galaxy-s26-ultra"],[/s26fe/,"galaxy-s26-fe"],[/s26plus/,"galaxy-s26-plus"],[/s26/,"galaxy-s26"],
 [/s25ultra/,"galaxy-s25-ultra"],[/s25fe/,"galaxy-s25-fe"],[/s25/,"galaxy-s25"],
 [/galaxywatch|watch8/,"galaxy-watch8"],
 [/a5[67]/,"galaxy-a57"],[/a37/,"galaxy-a37"],[/a27/,"galaxy-a27"],[/a1[67]/,"galaxy-a17"],
 // Xiaomi
 [/redmi15c/,"redmi-15c"],[/redmi15/,"redmi-15"],
 [/note15proplus/,"redmi-note-15-pro-plus-5g"],[/note15pro5g/,"redmi-note-15-pro-5g"],[/note15pro/,"redmi-note-15-pro"],[/note1[57]/,"redmi-note-15"],
 [/pococ85/,"poco-c85"],[/pocom8/,"poco-m8-pro-5g"],[/pocox8promax/,"poco-x8-pro-max"],[/pocox8pro/,"poco-x8-pro"],[/pocox7pro/,"poco-x7-pro"],
 [/pocof[89]ultra/,"poco-f8-ultra"],[/pocof8pro/,"poco-f8-pro"],[/pocof7/,"poco-f7"],
 [/xiaomi17ultra/,"xiaomi-17-ultra"],[/xiaomi17tpro/,"xiaomi-17t-pro"],[/xiaomi17t/,"xiaomi-17t"],[/xiaomi15tpro/,"xiaomi-15t-pro"],[/xiaomi15t/,"xiaomi-15t"]
];
function norm(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\((seminuevo|usado)\)/g,"").replace(/\+/g,"plus").replace(/[^a-z0-9]/g,"")}
window.photoFor=function(brand,model){
  var k=norm(model);
  for(var i=0;i<RULES.length;i++)if(RULES[i][0].test(k))return D+RULES[i][1]+".webp";
  return "";
};
window.applyPhotos=function(list){(list||[]).forEach(function(p){if(!p.image)p.image=window.photoFor(p.brand,p.name)});return list};
})();
