var i=[{title:"todo",items:[{description:"fazer funcionar e pa"}]},{title:"doing",items:[{description:"estudando e pa"},{description:"treininho e pa"}]},{title:"done",items:[{description:"os estilos e pa"},{description:"os side project e pa"},{description:"lorem ipsum dolor sit amet e pa"}]}];var a=document.querySelector.bind(document),s=a("html"),c=a(".toggleTheme"),h=()=>{let e=r()?"dark":"light";s.dataset.theme=e,localStorage.setItem("theme",e),c.innerHTML=`<i class="fas fa-${r()?"moon":"sun"}"></i>`},r=()=>s.dataset.theme==="light",u=localStorage.getItem("theme")||"dark";s.dataset.theme=u;c.addEventListener("click",h);var f=document.querySelectorAll.bind(document),t=JSON.parse(localStorage.getItem("boards"))||i||[],d=f(".board ul");d.forEach(e=>{new Sortable(e,{group:"boards",animation:150,onEnd:o=>{let{item:n,target:m,to:l,oldIndex:p,newIndex:g}=o;t[m.id].items.splice(p,1),t[l.id].items.splice(g,0,{description:n.innerText}),S()}})});function S(){localStorage.setItem("boards",JSON.stringify(t))}function T(){d.forEach((e,o)=>{e.innerHTML="",t[o].items.forEach(({description:n})=>{e.innerHTML+=b(n)})})}var b=e=>`
<li>
  <span class="category"></span>
  <p class="description">${e}</p>
</li>
`;T();
//# sourceMappingURL=main.js.map
