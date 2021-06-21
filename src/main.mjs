import Sortable from 'sortablejs';
import initialItems from './initialItems';
import ModalManager from './modalManager';
import './themeManager';

const $$ = document.querySelectorAll.bind(document);

class App {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('boards')) || initialItems;
    this.modalManager = new ModalManager(this.todos);

    this.boards = $$('.board ul');
    this.init();
  }

  init() {
    this.modalManager.form
      .addEventListener('submit', (e) => {
        e.preventDefault();
        this.modalManager.submit(this.todos);
        this.save();
        this.render();
      });

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
          const category = item.querySelector('span').style.backgroundColor;
          this.todos[to.id].items.splice(newIndex, 0,
            { description: item.innerText, category });

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

      this.todos[i].items.forEach((el) => {
        board.innerHTML += this.template(el);
      });
    });
  }

  template = ({ description, category }) => `
    <li>
      <span class="category" style="background-color: ${category}"></span>
      <p class="description">${description}</p>
    </li>`
}

new App();
