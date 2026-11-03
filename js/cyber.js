/* Cyber Monday: barra superior, banner en home y pop up de entrada. Se apaga con SITE_CONFIG.cyber.enabled=false */
(function(){
var C=window.SITE_CONFIG||{},K=C.cyber;if(!K||K.enabled===false)return;
if(K.endDate&&Date.now()>=Date.parse(K.endDate+"T23:59:59.999-03:00"))return; // se apaga solo al terminar el día (hora Argentina)
var e=function(s){return String(s||"").replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var wa="https://wa.me/"+(C.whatsapp||"5491124833748")+"?text="+encodeURIComponent(K.waText||"");
var WA='<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>';
var big=e(K.big).replace(/USD/,'<span class="cw">USD</span>');
document.documentElement.classList.add("cyber");
// barra superior
var bar=document.createElement("a");bar.className="cy-bar";bar.href=wa;bar.target="_blank";bar.rel="noopener";
bar.innerHTML='<span class="cy-dot"></span>'+e(K.bar)+(K.untilShort?' · '+e(K.untilShort):'')+'<b>Consultar ›</b>';
document.body.insertBefore(bar,document.body.firstChild);
var fit=function(){document.documentElement.style.setProperty("--cyb",bar.offsetHeight+"px")};fit();addEventListener("resize",fit);
// banner home
var hero=document.querySelector(".hero");
if(hero){var b=document.createElement("section");b.className="cy-band";b.setAttribute("aria-label","Cyber Monday");
b.innerHTML='<div class="cy-tape cy-t1"><span>MEGA SALE · MEGA SALE · MEGA SALE · MEGA SALE · MEGA SALE · MEGA SALE · MEGA SALE · MEGA SALE ·</span></div><div class="wrap cy-bin"><div><div class="cy-eb">'+e(K.eyebrow)+'</div><div class="cy-big">'+big+'</div><div class="cy-sub">'+e(K.sub)+' · '+e(K.text)+'</div>'+(K.until?'<div class="cy-until">'+e(K.until)+'</div>':'')+'</div><a class="cy-btn" href="'+wa+'" target="_blank" rel="noopener">'+WA+'Consultar por WhatsApp</a></div><div class="cy-tape cy-t2"><span>CYBER MONDAY · CYBER MONDAY · CYBER MONDAY · CYBER MONDAY · CYBER MONDAY · CYBER MONDAY ·</span></div>';
hero.parentNode.insertBefore(b,hero.nextSibling)}
// pop up (una vez cada popupHours)
var key="ct-cyber-"+(K.id||"x"),H=K.popupHours||24;
try{var t=+localStorage.getItem(key);if(t&&Date.now()-t<H*36e5)return}catch(x){}
if(/[?&]nocyber/.test(location.search))return;
var m=document.createElement("div");m.className="cy-modal";m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");m.setAttribute("aria-label","Cyber Monday");
var cat=/catalogo\.html/.test(location.pathname);
m.innerHTML='<div class="cy-card"><div class="cy-rib cy-r1"><span>MEGA SALE</span></div><div class="cy-rib cy-r2"><span>CYBER MONDAY</span></div><button class="cy-x" aria-label="Cerrar">×</button><img class="cy-logo" src="assets/logo-header.webp" alt="Cultura Tech Store"><div class="cy-eb">'+e(K.eyebrow)+'</div><div class="cy-big cy-big2"><small>HASTA</small>'+big.replace(/^HASTA\s*/i,'')+'</div><div class="cy-sub2">'+e(K.sub)+'</div><p class="cy-txt">'+e(K.text)+'</p>'+(K.until?'<div class="cy-until cy-u2">'+e(K.until)+'</div>':'')+'<a class="cy-btn" href="'+wa+'" target="_blank" rel="noopener">'+WA+'Consultar por WhatsApp</a><a class="cy-link" href="catalogo.html">Ver catálogo</a></div>';
function close(){m.classList.remove("on");try{localStorage.setItem(key,Date.now())}catch(x){}setTimeout(function(){m.remove()},300);document.removeEventListener("keydown",esc)}
function esc(ev){if(ev.key==="Escape")close()}
m.addEventListener("click",function(ev){if(ev.target===m||ev.target.closest(".cy-x"))close();else if(ev.target.closest(".cy-btn"))close();else if(ev.target.closest(".cy-link")){if(cat){ev.preventDefault()}close()}});
document.addEventListener("keydown",esc);
document.body.appendChild(m);setTimeout(function(){m.classList.add("on")},700);
})();
