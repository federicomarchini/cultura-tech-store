/* Carga el catálogo desde Google Sheets (CSV publicado). Si falla o la planilla no tiene la columna "seccion", usa data/products.js */
(function(){
"use strict";
function parseCSV(t){
  t=t.replace(/^\uFEFF/,"");var rows=[],row=[],f="",q=false;
  for(var i=0;i<t.length;i++){var c=t[i];
    if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
    else if(c==='"')q=true;
    else if(c===","){row.push(f);f=""}
    else if(c==="\n"||c==="\r"){if(c==="\r"&&t[i+1]==="\n")i++;row.push(f);rows.push(row);row=[];f=""}
    else f+=c}
  if(f!==""||row.length){row.push(f);rows.push(row)}
  return rows.filter(function(r){return r.some(function(x){return x.trim()!==""})});
}
function key(s){return String(s).trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"")}
function num(s){
  s=String(s||"").replace(/usd|u\$s|ars|\$|\s/gi,"");if(!s)return null;
  if(s.indexOf(",")>-1&&s.indexOf(".")>-1){s=s.lastIndexOf(",")>s.lastIndexOf(".")?s.replace(/\./g,"").replace(",","."):s.replace(/,/g,"")}
  else if(/^\d{1,3}(\.\d{3})+$/.test(s))s=s.replace(/\./g,"");
  else if(/^\d{1,3}(,\d{3})+$/.test(s))s=s.replace(/,/g,"");
  else s=s.replace(",",".");
  var n=parseFloat(s);return isFinite(n)&&n>0?n:null;
}
function fmt(n,mon){var r=Math.round(n*100)/100,p=r.toLocaleString("es-AR",{maximumFractionDigits:2});return(String(mon).toUpperCase()==="USD"?"USD ":"$ ")+p}
function slug(s){return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\+/g,"plus").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}
function yes(v){v=key(v);return v==="si"||v==="sí"||v==="s"||v==="x"||v==="true"||v==="1"}
function bat(v){v=String(v||"").trim().replace(/\s/g,"");if(!v)return"";var n=parseFloat(v.replace("%","").replace(",","."));if(!isFinite(n))return"";if(v.indexOf("%")<0&&n>0&&n<=1)n=n*100;return Math.round(n)+"%"}
/* Formato v2.4: una fila = un producto. Requiere la columna "seccion"; si falta (planilla vieja), se usa data/products.js */
function toProducts(rows){
  var h=rows[0].map(key),ix=function(n){return h.indexOf(n)},seen={},list=[];
  if(ix("modelo")<0)throw new Error("Falta columna 'modelo'");
  if(ix("seccion")<0)throw new Error("Planilla en formato anterior (sin columna 'seccion')");
  rows.slice(1).forEach(function(r){
    var g=function(n){var i=ix(n);return i<0?"":String(r[i]||"").trim()};
    if(!g("modelo"))return;
    if(ix("activo")>-1&&!yes(g("activo")))return;
    var cond=g("condicion")||"Nuevo",sec=g("seccion"),used=/^(usado|seminuevo)/.test(key(cond))||key(sec)==="usadospremium";
    if(!sec)sec=used?"Usados premium":"Nuevos";
    var brand=g("marca")||"Otros",b=bat(g("bateria")),v=g("variante"),id=slug([brand,g("modelo"),v,b,used?"usado":""].join(" "));
    if(seen[id]){seen[id]++;id+="-"+seen[id]}else seen[id]=1;
    var n=num(g("precio")),f=g("foto");
    list.push({id:id,name:g("modelo"),brand:brand,category:g("categoria")||"Accesorios",condition:used&&key(cond)==="nuevo"?"Usado":cond,section:sec,used:used,battery:b,variant:v,
      price:n?fmt(n,g("moneda")||"USD"):"",priceNum:n||0,note:g("descripcion"),featured:yes(g("destacado")),
      image:f?(/^https?:\/\//i.test(f)||f.indexOf("/")>-1?f:"assets/productos/"+f):""});
  });
  return list;
}
window.loadCatalog=function(){
  var url=(window.SITE_CONFIG||{}).SHEET_CSV_URL,local=window.PRODUCTS||[];
  if(!url||!window.fetch)return Promise.resolve(local);
  var cb=Math.floor(Date.now()/120000);
  var ctrl=window.AbortController?new AbortController():null;var to=setTimeout(function(){ctrl&&ctrl.abort()},8000);
  return fetch(url+(url.indexOf("?")>-1?"&":"?")+"_cb="+cb,{cache:"no-store",signal:ctrl&&ctrl.signal})
   .then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.text()})
   .then(function(t){clearTimeout(to);var l=toProducts(parseCSV(t));if(!l.length)throw new Error("Planilla vacía");return l})
   .catch(function(e){clearTimeout(to);console.info("Catálogo: usando copia local (",e.message,")");return local});
};
window.__sheet={parseCSV:parseCSV,num:num,toProducts:toProducts,fmt:fmt};
})();
