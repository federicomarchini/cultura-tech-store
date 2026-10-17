window.initCatalog=function(){
 "use strict";
 var P=window.PRODUCTS||[],st={q:"",cat:"Todas",brand:"Todas",sort:"rel"};
 var $=function(s){return document.querySelector(s)};
 function uniq(k){return["Todas"].concat(P.map(function(p){return p[k]}).filter(function(v,i,a){return a.indexOf(v)===i}).sort())}
 function norm(s){return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
 var qs=new URLSearchParams(location.search);if(qs.get("cat"))st.cat=qs.get("cat");if(qs.get("marca"))st.brand=qs.get("marca");if(qs.get("q"))st.q=qs.get("q");
 $("#cats").innerHTML=uniq("category").map(function(c){return'<button class="chip'+(c===st.cat?" on":"")+'" data-c="'+c+'">'+c+'</button>'}).join("");
 $("#brand").innerHTML=uniq("brand").map(function(b){return'<option value="'+b+'">'+(b==="Todas"?"Todas las marcas":b)+'</option>'}).join("");
 $("#brand").value=st.brand;$("#q").value=st.q;
 function render(){
  var q=norm(st.q).split(/\s+/).filter(Boolean);
  var r=P.filter(function(p){var t=norm([p.name,p.brand,p.category,p.condition,p.variants.join(" ")].join(" "));
   return(st.cat==="Todas"||p.category===st.cat)&&(st.brand==="Todas"||p.brand===st.brand)&&q.every(function(w){return t.indexOf(w)>-1})});
  if(st.sort==="az")r.sort(function(a,b){return a.name.localeCompare(b.name,"es",{numeric:true})});
  if(st.sort==="za")r.sort(function(a,b){return b.name.localeCompare(a.name,"es",{numeric:true})});
  if(st.sort==="brand")r.sort(function(a,b){return a.brand.localeCompare(b.brand)||a.name.localeCompare(b.name,"es",{numeric:true})});
  $("#grid").innerHTML=r.map(CT.card).join("");
  $("#count").textContent=r.length+(r.length===1?" producto":" productos");
  $("#empty").style.display=r.length?"none":"block";
  CT.reveal();
 }
 $("#cats").addEventListener("click",function(e){var b=e.target.closest(".chip");if(!b)return;st.cat=b.dataset.c;document.querySelectorAll(".chip").forEach(function(x){x.classList.toggle("on",x===b)});render()});
 $("#brand").onchange=function(){st.brand=this.value;render()};
 $("#sort").onchange=function(){st.sort=this.value;render()};
 var t;$("#q").oninput=function(){var v=this.value;clearTimeout(t);t=setTimeout(function(){st.q=v;render()},120)};
 $("#reset").onclick=function(){st={q:"",cat:"Todas",brand:"Todas",sort:st.sort};$("#q").value="";$("#brand").value="Todas";document.querySelectorAll(".chip").forEach(function(x){x.classList.toggle("on",x.dataset.c==="Todas")});render()};
 render();
};
