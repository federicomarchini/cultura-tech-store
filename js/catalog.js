window.initCatalog=function(){
 "use strict";
 var P=window.PRODUCTS||[],st={q:"",cat:"Todas",brand:"Todas",sort:"rel",cond:"todos"};
 var $=function(s){return document.querySelector(s)};
 function uniq(k){return["Todas"].concat(P.map(function(p){return p[k]}).filter(function(v,i,a){return a.indexOf(v)===i}).sort())}
 function norm(s){return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
 var qs=new URLSearchParams(location.search);if(qs.get("cat"))st.cat=qs.get("cat");if(qs.get("marca"))st.brand=qs.get("marca");if(qs.get("q"))st.q=qs.get("q");var qc=(qs.get("condicion")||"").toLowerCase();if(/^usad/.test(qc))st.cond="usado";else if(/^nuev/.test(qc))st.cond="nuevo";
 $("#cats").innerHTML=uniq("category").map(function(c){return'<button class="chip'+(c===st.cat?" on":"")+'" data-c="'+c+'">'+c+'</button>'}).join("");
 $("#brand").innerHTML=uniq("brand").map(function(b){return'<option value="'+b+'">'+(b==="Todas"?"Todas las marcas":b)+'</option>'}).join("");
 $("#brand").value=st.brand;$("#q").value=st.q;
 function render(){
  var q=norm(st.q).split(/\s+/).filter(Boolean);
  var r=P.filter(function(p){var t=norm([p.name,p.brand,p.category,p.condition,p.variants.join(" ")].join(" "));
   var u=CT.isUsed(p);return(st.cond==="todos"||(st.cond==="usado")===u)&&(st.cat==="Todas"||p.category===st.cat)&&(st.brand==="Todas"||p.brand===st.brand)&&q.every(function(w){return t.indexOf(w)>-1})});
  if(st.sort==="az")r.sort(function(a,b){return a.name.localeCompare(b.name,"es",{numeric:true})});
  if(st.sort==="za")r.sort(function(a,b){return b.name.localeCompare(a.name,"es",{numeric:true})});
  if(st.sort==="brand")r.sort(function(a,b){return a.brand.localeCompare(b.brand)||a.name.localeCompare(b.name,"es",{numeric:true})});
  $("#grid").innerHTML=r.map(CT.card).join("");
  $("#count").textContent=r.length+(r.length===1?" producto":" productos");
  $("#empty").style.display=r.length?"none":"block";
  CT.reveal();
 }
 function setCond(v){st.cond=v;document.querySelectorAll("#cond button").forEach(function(x){var on=x.dataset.v===v;x.classList.toggle("on",on);x.setAttribute("aria-pressed",on)});
  var u=new URL(location.href);if(v==="todos")u.searchParams.delete("condicion");else u.searchParams.set("condicion",v);history.replaceState(null,"",u)}
 $("#cond").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;setCond(b.dataset.v);render()});
 setCond(st.cond);
 $("#cats").addEventListener("click",function(e){var b=e.target.closest(".chip");if(!b)return;st.cat=b.dataset.c;document.querySelectorAll(".chip").forEach(function(x){x.classList.toggle("on",x===b)});render()});
 $("#brand").onchange=function(){st.brand=this.value;render()};
 $("#sort").onchange=function(){st.sort=this.value;render()};
 var t;$("#q").oninput=function(){var v=this.value;clearTimeout(t);t=setTimeout(function(){st.q=v;render()},120)};
 $("#reset").onclick=function(){st={q:"",cat:"Todas",brand:"Todas",sort:st.sort,cond:"todos"};setCond("todos");$("#q").value="";$("#brand").value="Todas";document.querySelectorAll(".chip").forEach(function(x){x.classList.toggle("on",x.dataset.c==="Todas")});render()};
 render();
};
