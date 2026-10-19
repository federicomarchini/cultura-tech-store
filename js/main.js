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
 Notebooks:'<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
 Audio:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>'
};
window.CT.icon=function(cat){return'<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[cat]||ICONS.Accesorios)+'</svg>'};
var BAT='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2.5" y="7.5" width="17" height="9" rx="2"/><path d="M22 10.5v3"/><rect x="5" y="10" width="10" height="4" rx=".6" fill="currentColor" stroke="none"/></svg>';
function prodMsg(p){return"¡Hola Cultura Tech! Quería consultar por: "+p.name+(p.variant?" ("+p.variant+")":"")+(p.used?" (usado"+(p.battery?", batería "+p.battery:"")+")":"")+(CT.deal(p)?" — "+CT.deal(p).price+" con el "+CT.deal(p).pct+"% de descuento de hoy (antes "+p.price+")":(p.price?" — "+p.price:""))+". ¿Está disponible?"}
window.CT.isUsed=function(p){return!!p.used};
function nk(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\+/g,"plus").replace(/[^a-z0-9]/g,"")}
window.CT.ribbon=function(p){var L=C.ribbons||[],n=nk(p.name);for(var i=0;i<L.length;i++){var m=[].concat(L[i].match||[]);if(m.length&&m.every(function(w){return n.indexOf(nk(w))>-1}))return L[i].text||"Descuento"}return""};
window.CT.rule=function(p){var L=C.ribbons||[],n=nk(p.name);for(var i=0;i<L.length;i++){var m=[].concat(L[i].match||[]);if(m.length&&m.every(function(w){return n.indexOf(nk(w))>-1}))return L[i]}return null};
window.CT.deal=function(p){var r=CT.rule(p),pct=+(r&&r.pct||C.discountPct||0),n=+p.priceNum||0;if(!r||!r.discount||!pct||!n)return null;var d=Math.round(n*(100-pct)/100),cur=/^\$/.test(p.price||"")?"$ ":"USD ";return{pct:pct,num:d,price:cur+d.toLocaleString("es-AR")}};
window.CT.eff=function(p){var d=CT.deal(p);return d?d.num:(+p.priceNum||0)};
function priceHTML(p,cls,empty){var d=CT.deal(p);return d?'<span class="'+cls+' deal"><s>'+esc(p.price)+'</s><b>'+esc(d.price)+'</b></span>':'<span class="'+cls+'">'+esc(p.price||empty)+'</span>'}
var GIFT='<svg class="gic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9M7.5 8a2.5 2.5 0 1 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 1 1 0 5"/></svg>';window.CT.GIFT=GIFT;
function ribbonHTML(p){var t=CT.ribbon(p);return t?'<div class="ribbon" aria-label="'+esc(t)+'"><span>'+esc(t)+'</span></div>':''}
window.CT.card=function(p){
 var img=p.image?'<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'" loading="lazy">':CT.icon(p.category);
 var b=p.used?'<span class="badge semi">Usado premium</span>':'<span class="badge">'+esc(p.category)+'</span>';
 var sub=p.used?(p.battery?'<div class="pbat">'+BAT+'Batería '+esc(p.battery)+'</div>':''):(p.variant?'<div class="pvars">'+esc(p.variant)+'</div>':'');
 return'<article class="pcard rv'+(p.used?' used':'')+'" data-id="'+esc(p.id)+'" tabindex="0" role="button" aria-label="Ver '+esc(p.name)+'">'+
 '<div class="pimg">'+b+ribbonHTML(p)+img+'</div><div class="pbody"><span class="pbrand">'+esc(p.brand)+'</span><h3>'+esc(p.name)+'</h3>'+sub+
 '<div class="pact">'+priceHTML(p,"pprice","Consultar precio")+''+
 '<a class="mini" href="'+wa(prodMsg(p))+'" target="_blank" rel="noopener" data-stop>'+WA_SVG+'Consultar</a></div></div></article>';
};
/* modal */
function openModal(p){
 var m=$("#modal");if(!m)return;
 $(".mbox",m).innerHTML='<button class="mclose" aria-label="Cerrar">×</button><div class="pimg">'+ribbonHTML(p)+(p.image?'<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'">':CT.icon(p.category))+'</div>'+
 '<div class="mdet"><span class="pbrand">'+esc(p.brand)+' · '+esc(p.used?"Usados premium":p.category)+'</span><h3>'+esc(p.name)+'</h3>'+
 '<dl><dt>Condición</dt><dd>'+esc(p.used?"Usado premium":p.condition)+'</dd>'+(p.variant?'<dt>Variante</dt><dd>'+esc(p.variant)+'</dd>':'')+(p.battery?'<dt>Batería</dt><dd class="mbat">'+BAT+esc(p.battery)+'</dd>':'')+(p.used&&C.usedGift&&C.usedGift.enabled!==false&&C.usedGift.modal?'<dt>Regalo</dt><dd class="mgift">'+GIFT+esc(C.usedGift.modal)+'</dd>':'')+(p.note?'<dt>Detalle</dt><dd>'+esc(p.note)+'</dd>':'')+'<dt>Precio</dt><dd id="mprice">'+priceHTML(p,"mprice","Consultar por WhatsApp")+'</dd></dl>'+
 '<a class="btn wa" id="mwa" target="_blank" rel="noopener" href="'+wa(prodMsg(p))+'" style="margin-top:22px">'+WA_SVG+'Consultar por WhatsApp</a>'+
 '<p class="note">Precios de referencia en USD, sujetos a disponibilidad. Consultá disponibilidad y precio final por WhatsApp. Productos 100% originales.</p></div>';
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
 var bg=$(".burger"),mn=$(".menu");bg.onclick=function(){var o=mn.classList.toggle("open");bg.classList.toggle("open",o);bg.setAttribute("aria-expanded",o);document.body.classList.toggle("menu-open",o)};
 $$(".menu a").forEach(function(a){a.addEventListener("click",function(){mn.classList.remove("open");bg.classList.remove("open");document.body.classList.remove("menu-open");bg.setAttribute("aria-expanded",false)})});
 $$("[data-wa]").forEach(function(a){a.href=wa(a.dataset.wa||"");a.target="_blank";a.rel="noopener"});
 $$("[data-cfg]").forEach(function(el){var k=el.dataset.cfg;if(C[k])el.textContent=C[k];else{var row=el.closest("[data-optional]");if(row)row.remove()}});
 $$("[data-ig]").forEach(function(a){a.href=C.instagram});
 $$("[data-mail]").forEach(function(a){if(C.email)a.href="mailto:"+C.email});
 $$(".year").forEach(function(y){y.textContent=new Date().getFullYear()});
 CT.reveal();
 (function(){var pr=C.promo;if(!pr||pr.enabled===false||!pr.text)return;var k="ct-promo-"+(pr.id||pr.text),DAYS=pr.days||7;try{var t=+localStorage.getItem(k);if(t&&Date.now()-t<DAYS*864e5)return}catch(e){}
  var I="assets/productos/";
  var d=document.createElement("div");d.className="pmodal";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.setAttribute("aria-labelledby","pm-h");
  d.innerHTML='<div class="pm-card" tabindex="-1"><button class="pm-x" type="button" aria-label="Cerrar">×</button>'+
   '<div class="pm-txt"><img class="pm-logo" src="assets/logo-header.webp" alt="Cultura Tech Store"><span class="pm-eye">'+esc(pr.eyebrow||"Promo exclusiva")+'</span>'+
   '<h2 id="pm-h">'+esc(pr.headline||"")+'</h2><p class="pm-big">'+esc(pr.big||"").replace(/^(\S+%\s*OFF)/,"<em>$1</em>")+'</p><p class="pm-copy">'+esc(pr.copy||pr.text)+'</p>'+
   '<a class="pm-cta" href="'+esc(pr.link||"catalogo.html")+'">'+esc(pr.linkText||"Ver más")+'</a><button class="pm-skip" type="button">Seguir mirando</button></div>'+
   '<div class="pm-art" aria-hidden="true"><span class="pm-glow"></span><img class="pa1" src="'+I+'airpods-pro-3.webp" alt=""><img class="pa2" src="'+I+'apple-20w.webp" alt=""><img class="pa3" src="'+I+'cable-usbc.webp" alt=""><img class="pa4" src="'+I+'airtag-4.webp" alt=""><span class="pm-tag">-15%</span></div></div>';
  function close(){d.classList.remove("show");document.removeEventListener("keydown",esc_);try{localStorage.setItem(k,String(Date.now()))}catch(e){}setTimeout(function(){d.remove()},350)}
  function esc_(e){if(e.key==="Escape")close()}
  d.addEventListener("click",function(e){if(e.target===d)close()});$(".pm-x",d).onclick=close;$(".pm-skip",d).onclick=close;$(".pm-cta",d).addEventListener("click",function(){try{localStorage.setItem(k,String(Date.now()))}catch(e){}});
  setTimeout(function(){if(document.querySelector("#modal.open,.modal.open"))return;document.body.appendChild(d);requestAnimationFrame(function(){d.classList.add("show")});document.addEventListener("keydown",esc_);$(".pm-card",d).focus({preventScroll:true})},1000);
 })();
 (window.loadCatalog?window.loadCatalog():Promise.resolve(window.PRODUCTS||[])).then(function(list){
  if(window.applyPhotos)window.applyPhotos(list);
  P=list;window.PRODUCTS=list;
  if(window.renderReviews)window.renderReviews();
  var f=$("#featured");if(f)f.innerHTML=P.filter(function(p){return p.featured}).slice(0,8).map(CT.card).join("");
  var U=P.filter(function(p){return p.used}).length;
  $$("[data-count]").forEach(function(el){el.textContent=P.length});
  $$("[data-ucount]").forEach(function(el){el.textContent=U?"("+U+")":""});
  var uc=$("#usados-premium-cta");if(uc&&!U)uc.hidden=true;
  if(window.initCatalog)window.initCatalog();
  CT.reveal();
  document.dispatchEvent(new Event("catalog:ready"));
 });
});
})();
/* Reseñas de Google (datos reales en js/reviews.js) */
window.renderReviews=function(){
 var R=window.REVIEWS,box=document.getElementById("revs");if(!box||!R)return;
 var e=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
 var st=function(n){return'<span class="stars" aria-label="'+n+' de 5 estrellas">'+"★★★★★".slice(0,n)+'<i>'+"★★★★★".slice(n)+'</i></span>'};
 if(R.placeUrl){var b=document.getElementById("revbtn");if(b)b.href=R.placeUrl}
 var s=document.getElementById("revsum");if(s&&R.rating)s.innerHTML='<span class="gscore">'+e(R.rating)+'</span> '+st(5)+' <span class="gcount">'+e(R.total)+' opiniones en Google</span>';
 if(!R.items||!R.items.length){box.style.display="none";return}
 box.innerHTML=R.items.map(function(r){return'<figure class="rev rv"><div class="rhead"><img src="'+e(r.avatar)+'" alt="" width="44" height="44" loading="lazy" referrerpolicy="no-referrer"><div><b>'+e(r.name)+'</b><small>'+e(r.when||"")+' · Google</small></div><svg class="gicon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M21.8 10.2H12v3.9h5.6c-.5 2.6-2.8 4-5.6 4a6.1 6.1 0 1 1 3.9-10.8l2.9-2.8A10 10 0 1 0 12 22c5.4 0 9.9-3.9 9.9-10 0-.6 0-1.2-.1-1.8z"/></svg></div>'+st(r.rating||5)+'<blockquote>'+e(r.text)+'</blockquote></figure>'}).join("");
 if(window.CT&&CT.reveal)CT.reveal();
};
