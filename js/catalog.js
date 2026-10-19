window.initCatalog=function(){
 "use strict";
 var ALL=window.PRODUCTS||[],UP="usados-premium",st={q:"",cat:"Todas",brand:"Todas",sort:"rel",tab:"todo"};
 var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
 function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
 function norm(s){return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
 function base(){return st.tab===UP?ALL.filter(function(p){return p.used}):ALL}
 function uniq(L,k){return["Todas"].concat(L.map(function(p){return p[k]}).filter(function(v,i,a){return a.indexOf(v)===i}).sort())}
 var qs=new URLSearchParams(location.search);
 if(qs.get("cat"))st.cat=qs.get("cat");if(qs.get("marca"))st.brand=qs.get("marca");if(qs.get("q"))st.q=qs.get("q");
 if(qs.get("seccion")===UP||location.hash==="#"+UP)st.tab=UP;
 function filters(){
  var L=base(),cats=uniq(L,"category"),brands=uniq(L,"brand");
  if(cats.indexOf(st.cat)<0)st.cat="Todas";if(brands.indexOf(st.brand)<0)st.brand="Todas";
  $("#cats").innerHTML=cats.map(function(c){return'<button class="chip'+(c===st.cat?" on":"")+'" data-c="'+esc(c)+'">'+esc(c)+'</button>'}).join("");
  $("#cats").style.display=cats.length>2?"":"none";
  $("#brand").innerHTML=brands.map(function(b){return'<option value="'+esc(b)+'">'+(b==="Todas"?"Todas las marcas":esc(b))+'</option>'}).join("");
  $("#brand").value=st.brand;
 }
 function tabs(){
  $$("#tabs [data-s]").forEach(function(b){var on=b.dataset.s===st.tab;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
  var h=$("#"+UP);if(h)h.hidden=st.tab!==UP;
  $("#q").placeholder=st.tab===UP?"Buscar: 13 Pro, 256GB, Natural…":"Buscar: iPhone 17, S26 Ultra, 512GB…";
 }
 function render(){
  var q=norm(st.q).split(/\s+/).filter(Boolean);
  var r=base().filter(function(p){var t=norm([p.name,p.brand,p.category,p.condition,p.section,p.variant,p.battery].join(" "));
   return(st.cat==="Todas"||p.category===st.cat)&&(st.brand==="Todas"||p.brand===st.brand)&&q.every(function(w){return t.indexOf(w)>-1})});
  var cmp=function(a,b){return a.name.localeCompare(b.name,"es",{numeric:true})};
  if(st.sort==="az")r.sort(cmp);
  if(st.sort==="za")r.sort(function(a,b){return cmp(b,a)});
  if(st.sort==="brand")r.sort(function(a,b){return a.brand.localeCompare(b.brand)||cmp(a,b)});
  if(st.sort==="pasc"||st.sort==="pdesc"){var s=st.sort==="pasc"?1:-1;r.sort(function(a,b){var x=CT.eff(a),y=CT.eff(b);if(!x!==!y)return x?-1:1;return s*(x-y)||cmp(a,b)})}
  $("#grid").innerHTML=r.map(CT.card).join("");
  $("#count").textContent=r.length+(r.length===1?" producto":" productos")+(st.tab===UP?" · Usados premium":"");
  $("#empty").style.display=r.length?"none":"block";
  CT.reveal();
 }
 function setTab(t,push){
  st.tab=t;filters();tabs();render();
  if(push&&history.replaceState){var u=new URLSearchParams(location.search);u.delete("cat");u.delete("marca");if(t===UP)u.set("seccion",UP);else u.delete("seccion");
   var s=u.toString();history.replaceState(null,"",location.pathname+(s?"?"+s:"")+(t===UP?"#"+UP:""))}
 }
 $("#tabs").addEventListener("click",function(e){var b=e.target.closest("[data-s]");if(b&&b.dataset.s!==st.tab){st.cat="Todas";st.brand="Todas";setTab(b.dataset.s,true)}});
 $("#cats").addEventListener("click",function(e){var b=e.target.closest(".chip");if(!b)return;st.cat=b.dataset.c;$$("#cats .chip").forEach(function(x){x.classList.toggle("on",x===b)});render()});
 $("#brand").onchange=function(){st.brand=this.value;render()};
 $("#sort").onchange=function(){st.sort=this.value;render()};
 var t;$("#q").value=st.q;$("#q").oninput=function(){var v=this.value;clearTimeout(t);t=setTimeout(function(){st.q=v;render()},120)};
 $("#reset").onclick=function(){st.q="";st.cat="Todas";st.brand="Todas";$("#q").value="";filters();render()};
 setTab(st.tab,false);
 if(st.tab===UP){var go=function(){var el=$("#"+UP),tb=document.querySelector(".toolbar");if(el){var y=el.getBoundingClientRect().top+scrollY-(tb?tb.offsetHeight:0)-90;scrollTo(0,Math.max(0,y))}};requestAnimationFrame(go);setTimeout(go,350)}
 addEventListener("hashchange",function(){if(location.hash==="#"+UP&&st.tab!==UP)setTab(UP,false)});
};
