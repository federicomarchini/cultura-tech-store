/* Redes, tarjeta de Instagram y formulario de reseñas */
(function(){
  var C=window.SITE_CONFIG||{}, $=function(s){return document.querySelector(s)};
  var ICONS={
    instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3C16.7 2.2 15.7 2 14.6 2 12.2 2 10.6 3.4 10.6 6.1v2.4H8v3.6h2.6V22H14v-9.9h2.7l.4-3.6z"/></svg>',
    tiktok:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .8.1V9a6.3 6.3 0 1 0 5.4 6.2V8.6a7.9 7.9 0 0 0 4.4 1.4V6.7a4.6 4.6 0 0 1-4.4-4.7z"/></svg>'};
  var NAMES={instagram:"Instagram",facebook:"Facebook",tiktok:"TikTok"};
  var live=(C.socials||[]).filter(function(s){return s.url});
  document.querySelectorAll('[data-socials]').forEach(function(box){
    var counts=box.hasAttribute('data-counts');
    box.innerHTML=live.map(function(s){
      return '<a class="soc'+(counts?' soc-big':'')+'" href="'+s.url+'" target="_blank" rel="noopener" aria-label="'+NAMES[s.red]+' de Cultura Tech">'+ICONS[s.red]+
        (counts?'<span><b>'+NAMES[s.red]+'</b><small>'+(s.seguidores?s.seguidores+' seguidores':s.usuario)+'</small></span>':'')+'</a>';
    }).join('');
  });
  // Reseñas
  var place=(window.REVIEWS&&window.REVIEWS.placeUrl)||'#';
  if($('#gwrite')) $('#gwrite').href=C.GOOGLE_REVIEW_URL||place;
  var form=$('#revform'), btn=$('#showform');
  if(!form) return;
  if(!C.APPS_SCRIPT_URL){ btn.textContent='Escribinos tu opinión por WhatsApp'; btn.onclick=function(){
      window.open('https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent('¡Hola Cultura Tech! Quiero dejar mi opinión: '),'_blank','noopener');};
    return; }
  btn.onclick=function(){form.hidden=false;btn.hidden=true;form.querySelector('input').focus()};
  form.addEventListener('submit',function(e){
    e.preventDefault(); var msg=$('#revmsg'), fd=new FormData(form);
    if(fd.get('website')) return;
    if(!form.checkValidity()||!fd.get('estrellas')){msg.textContent='Completá nombre, estrellas y comentario.';return}
    var sb=form.querySelector('[type=submit]'); sb.disabled=true; msg.textContent='Enviando…';
    fetch(C.APPS_SCRIPT_URL,{method:'POST',mode:'no-cors',body:new URLSearchParams({nombre:fd.get('nombre'),estrellas:fd.get('estrellas'),comentario:fd.get('comentario'),website:''})})
      .then(function(){form.reset();msg.textContent='¡Gracias! Tu reseña fue enviada y se publicará luego de ser revisada.'})
      .catch(function(){msg.textContent='No pudimos enviarla. Probá de nuevo o escribinos por WhatsApp.'})
      .finally(function(){sb.disabled=false});
  });
})();
