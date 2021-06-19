import { mock } from './mock';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const todos = JSON.parse(localStorage.getItem('boards')) || mock || [];
const boards = $$(".board ul")



boards.forEach(el => {
  new Sortable(el, {
    group: 'boards',
    animation: 150,
    onEnd: (ev) =>{
      const { item, target, to, oldIndex, newIndex } = ev;
      console.log(ev, todos[to.id]);
      todos[target.id].items.splice(oldIndex, 1);
      todos[to.id].items.splice(newIndex, 0, { description: item.innerText });
      save();
    }
  });
});

function save() {
  localStorage.setItem('boards', JSON.stringify(todos));
}

function render() {
  boards.forEach((board, i)=>{
    board.innerHTML = ""
    todos[i].items.forEach(({ description })=>{
      board.innerHTML += template(description);
    })
  })
}

const template = (text) => `
<li>
  <span class="category"></span>
  <p class="description">${text}</p>
</li>
`

render();