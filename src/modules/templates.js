export default ({
  description, category, i, j, title, hex
}) => `<li id="${i} ${j}"><span title="${title}" class="category" style="background-color: ${category}"></span>
<p class="description"> ${description} </p>
<button class="mdc-button" onclick="app.editTodo(this.parentNode, {hex: '${hex}',description: '${description}'})">
  <span class="mdc-button__ripple"></span>
  <span class="mdc-button__label">Editar</span>
</button>
<button class="close" onclick="app.remove(this.parentNode)">
  <img src="./img/trash.svg">
</button>`;
