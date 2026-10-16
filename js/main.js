(function(){
"use strict";
var C=window.SITE_CONFIG||{},P=[];
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function wa(msg){return"https://wa.me/"+C.whatsapp+"?text="+encodeURIComponent(msg||C.defaultMessage)}
window.CT={wa:wa};
var WA_SVG='<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.6.1a8.2 8.2 0 0 1-4.1-3.6c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.9L.1 24l6.3-1.6a11.8 11.8 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.4 3.6z"/></svg>';
var ICONS={
 Smartphones:'<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M10.5 4.5h3"/><circle cx="12" cy="18.5" r=".6"/>',
 Wearables:'<rect x="6.5" y="6" width="11" height="12" rx="3"/><path d="M9 6l.7-4h4.6L15 6M9 18l.7 4h4.6L15 18M17.5 10.5h1"/>',
 Gaming:'<path d="M6.5 8h11a4.5 4.5 0 0 1 4.3 5.9l-1 3.1a2.6 2.6 0 0 1-4.4 1L14.6 16H9.4l-1.8 2a2.6 2.6 0 0 1-4.4-1l-1-3.1A4.5 4.5 0 0 1 6.5 8z"/><path d="M7.5 10.5v3M6 12h3M15.5 11.5h.01M17.5 13h.01"/>',
 Accesorios:'<rect x="6" y="9" width="12" height="12" rx="2.5"/><path d="M9.5 9V4M14.5 9V4M10 15h4"/>',
 Notebooks:'<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>'
};
window.CT.icon=function(cat){return'<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[cat]||ICONS.Accesorios)+'</svg>'};
function priceOf(p,v){return(p.prices||{})[v]||""}
function cardPrice(p){var ks=Object.keys(p.prices||{});if(!ks.length)return"Consultar precio";if(p.variants.length===1)return p.prices[ks[0]];var vals=ks.map(function(k){return p.prices[k]});return"Ver precios"}
function prodMsg(p,v){return"¡Hola Cultura Tech! Quería consultar por: "+p.name+(v?" ("+v+")":"")+". ¿Tienen stock y cuál es el precio?"}
window.CT.card=function(p){
 var img=p.image?'<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'" loading="lazy">':CT.icon(p.category);
 var b=p.condition&&p.condition!=="Nuevo"?'<span class="badge semi">'+esc(p.condition)+'</span>':'<span class="badge">'+esc(p.category)+'</span>';
 return'<article class="pcard rv" data-id="'+esc(p.id)+'" tabindex="0" role="button" aria-label="Ver '+esc(p.name)+'">'+
 '<div class="pimg">'+b+img+'</div><div class="pbody"><span class="pbrand">'+esc(p.brand)+'</span><h3>'+esc(p.name)+'</h3>'+
 '<div class="pvars">'+esc(p.variants.join(" · "))+'</div><div class="pact"><span class="pprice">'+esc(cardPrice(p))+'</span>'+
 '<a class="mini" href="'+wa(prodMsg(p))+'" target="_blank" rel="noopener" data-stop>'+WA_SVG+'Consultar</a></div></div></article>';
};
/* modal */
function openModal(p){
 var m=$("#modal");if(!m)return;var sel=p.variants.length===1?p.variants[0]:"";
 $(".mbox",m).innerHTML='<button class="mclose" aria-label="Cerrar">×</button><div class="pimg">'+(p.image?'<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'">':CT.icon(p.category))+'</div>'+
 '<div class="mdet"><span class="pbrand">'+esc(p.brand)+' · '+esc(p.category)+'</span><h3>'+esc(p.name)+'</h3>'+
 '<dl><dt>Condición</dt><dd>'+esc(p.condition)+'</dd>'+(p.note?'<dt>Detalle</dt><dd>'+esc(p.note)+'</dd>':'')+'<dt>Precio</dt><dd id="mprice" class="mprice">'+esc(sel?(priceOf(p,sel)||"Consultar por WhatsApp"):(Object.keys(p.prices||{}).length?"Elegí una variante":"Consultar por WhatsApp"))+'</dd></dl>'+
 '<span class="pbrand">'+(p.variants.length>1?"Elegí la variante":"Variante")+'</span><div class="vopts" style="margin:10px 0 28px">'+
 p.variants.map(function(v){return'<button class="vopt'+(v===sel?" on":"")+'" data-v="'+esc(v)+'">'+esc(v)+(priceOf(p,v)?'<small>'+esc(priceOf(p,v))+'</small>':'')+'</button>'}).join("")+'</div>'+
 '<a class="btn wa" id="mwa" target="_blank" rel="noopener" href="'+wa(prodMsg(p,sel))+'">'+WA_SVG+'Consultar por WhatsApp</a>'+
 '<p class="note">Precios de referencia, sujetos a stock y cotización. Confirmá el precio final por WhatsApp. Productos 100% originales.</p></div>';
 $$(".vopt",m).forEach(function(b){b.onclick=function(){$$(".vopt",m).forEach(function(x){x.classList.remove("on")});b.classList.add("on");$("#mwa").href=wa(prodMsg(p,b.dataset.v));$("#mprice").textContent=priceOf(p,b.dataset.v)||"Consultar por WhatsApp"}});
 $(".mclose",m).onclick=closeModal;m.classList.add("open");document.body.style.overflow="hidden";$(".mclose",m).focus();
}
function closeModal(){var m=$("#modal");if(m){m.classList.remove("open");document.body.style.overflow=""}}
document.addEventListener("click",function(e){
 if(e.target.closest("[data-stop]"))return;
 var c=e.target.closest(".pcard");if(c){var p=P.filter(function(x){return x.id===c.dataset.id})[0];if(p)openModal(p)}
 if(e.target.id==="modal")closeModal();
});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeModal();if(e.key==="Enter"&&e.target.classList&&e.target.classList.contains("pcard"))e.target.click()});
/* reveal */
var io="IntersectionObserver"in window?new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}})},{rootMargin:"0px 0px -40px"}):null;
window.CT.reveal=function(){$$(".rv:not(.in)").forEach(function(el){io?io.observe(el):el.classList.add("in")})};
/* init */
document.addEventListener("DOMContentLoaded",function(){
 var h=$("header");function sc(){h.classList.toggle("scrolled",scrollY>20||!$(".hero"))}sc();addEventListener("scroll",sc,{passive:true});
 var bg=$(".burger"),mn=$(".menu");bg.onclick=function(){var o=mn.classList.toggle("open");bg.classList.toggle("open",o);bg.setAttribute("aria-expanded",o)};
 $$(".menu a").forEach(function(a){a.addEventListener("click",function(){mn.classList.remove("open");bg.classList.remove("open")})});
 $$("[data-wa]").forEach(function(a){a.href=wa(a.dataset.wa||"");a.target="_blank";a.rel="noopener"});
 $$("[data-cfg]").forEach(function(el){var k=el.dataset.cfg;if(C[k])el.textContent=C[k];else{var row=el.closest("[data-optional]");if(row)row.remove()}});
 $$("[data-ig]").forEach(function(a){a.href=C.instagram});
 $$("[data-mail]").forEach(function(a){if(C.email)a.href="mailto:"+C.email});
 $$(".year").forEach(function(y){y.textContent=new Date().getFullYear()});
 CT.reveal();
 (window.loadCatalog?window.loadCatalog():Promise.resolve(window.PRODUCTS||[])).then(function(list){
  P=list;window.PRODUCTS=list;
  var f=$("#featured");if(f)f.innerHTML=P.filter(function(p){return p.featured}).map(CT.card).join("");
  $$("[data-count]").forEach(function(el){el.textContent=P.length});
  if(window.initCatalog)window.initCatalog();
  CT.reveal();
 });
});
})();
