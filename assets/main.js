var s=[{title:"todo",items:[{description:"fazer funcionar e pa"}]},{title:"doing",items:[{description:"estudando e pa"},{description:"treininho e pa"}]},{title:"done",items:[{description:"os estilos e pa"},{description:"os side project e pa"},{description:"lorem ipsum dolor sit amet e pa"}]}];var b=document.querySelector.bind(document),p=document.querySelectorAll.bind(document),o=JSON.parse(localStorage.getItem("boards"))||s||[],r=p(".board ul");r.forEach(e=>{new Sortable(e,{group:"boards",animation:150,onEnd:t=>{let{item:i,target:c,to:n,oldIndex:d,newIndex:a}=t;console.log(t,o[n.id]),o[c.id].items.splice(d,1),o[n.id].items.splice(a,0,{description:i.innerText}),l()}})});function l(){localStorage.setItem("boards",JSON.stringify(o))}function u(){r.forEach((e,t)=>{e.innerHTML="",o[t].items.forEach(({description:i})=>{e.innerHTML+=m(i)})})}var m=e=>`
<li>
  <span class="category"></span>
  <p class="description">${e}</p>
</li>
`;u();
//# sourceMappingURL=main.js.map
