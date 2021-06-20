import Sortable from 'sortablejs';
import mock from './mock';
import './themeManager';

const $$ = document.querySelectorAll.bind(document);

class App {
  constructor() {
    this.init();
  }

  init() {
    this.todos = JSON.parse(localStorage.getItem('boards')) || mock || [];
    this.boards = $$('.board ul');

    this.boards.forEach((el) => {
      new Sortable(el, {
        group: 'boards',
        animation: 150,
        onEnd: (
          {
            item, target, to, oldIndex, newIndex
          }
        ) => {
          this.todos[target.id].items.splice(oldIndex, 1);
          this.todos[to.id].items.splice(newIndex, 0, { description: item.innerText });
          this.save();
        }
      });
    });

    this.render();
  }

  save() { localStorage.setItem('boards', JSON.stringify(this.todos)); }

  render() {
    this.boards.forEach((board, i) => {
      board.innerHTML = '';

      this.todos[i].items.forEach(({ description }) => {
        board.innerHTML += this.template(description);
      });
    });
  }

  template = (text) => `
    <li>
      <span class="category"></span>
      <p class="description">${text}</p>
    </li>`
}

new App();
