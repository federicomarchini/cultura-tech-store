/* Fotos automáticas por modelo. La columna "foto" de la planilla tiene prioridad;
   si está vacía, se busca acá por modelo (sin importar mayúsculas, acentos ni espacios).
   Para agregar: subí la imagen a assets/productos/ y sumá una regla. */
(function(){
"use strict";
var D="assets/productos/";
// [patrón sobre el modelo normalizado, archivo]  — se evalúan en orden
var RULES=[
 [/templado.*s25ultra|s25ultra.*templado/,"funda-s25-ultra"],
 [/(funda|case).*s26ultra/,"funda-s26-ultra"],[/(funda|case).*s25ultra/,"funda-s25-ultra"],
 [/(funda|case).*s25fe/,"funda-s25-fe"],[/(funda|case).*a57/,"funda-a57"],[/(funda|case).*a17/,"funda-a17"],
 [/(funda|case).*iphone17promax/,"funda-iphone-17-pro-max"],
 [/^(vidrio)?templado.*s25ultra/,"templado-s25-ultra"],
 [/45w/,"samsung-45w"],[/25w/,"samsung-25w"],[/20w/,"apple-20w"],
 [/iphone18promax|iphone18pro/,"iphone-18-pro-max"],[/iphone17pro/,"iphone-17-pro"],[/iphone17/,"iphone-17"],
 [/iphone16pro/,"iphone-16-pro"],[/iphone16/,"iphone-16"],[/iphone15/,"iphone-15"],[/iphone14pro/,"iphone-14-pro"],
 [/applewatch|watchserie|watchseries/,"apple-watch-s12"],[/galaxywatch|watch8/,"galaxy-watch8"],
 [/s26ultra/,"galaxy-s26-ultra"],[/s25ultra/,"galaxy-s25-ultra"],[/s25fe/,"galaxy-s25-fe"],
 [/a57/,"galaxy-a57"],[/a37/,"galaxy-a37"],[/a17/,"galaxy-a17"],
 [/playstation|ps5/,"ps5-slim"]
];
function norm(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\(seminuevo\)/,"").replace(/[^a-z0-9]/g,"")}
window.photoFor=function(brand,model){
  var k=norm(model);
  // "Vidrio templado ..." sin funda → foto de templado
  if(/^vidriotemplado/.test(k)&&/s25ultra/.test(k))return D+"templado-s25-ultra.webp";
  for(var i=0;i<RULES.length;i++)if(RULES[i][0].test(k))return D+RULES[i][1]+".webp";
  return "";
};
window.applyPhotos=function(list){(list||[]).forEach(function(p){if(!p.image)p.image=window.photoFor(p.brand,p.name)});return list};
})();
