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
    this.count = 0;
  }

  init() {
    this.modalManager.form
      .addEventListener('submit', (e) => {
        e.preventDefault();
        this.modalManager.submit(this.todos);
        this.render();
        this.save();
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

          this.render();
          this.save();
        }
      });
    });

    this.render();
  }

  save() { localStorage.setItem('boards', JSON.stringify(this.todos)); }

  render() {
    this.boards.forEach((board, i) => {
      let boardFragment = '';

      this.todos[i].items.forEach(({ description, category }, j) => {
        boardFragment += this.template({
          description, category, i, j
        });
      });

      board.innerHTML = boardFragment;
    });
  }

  template = ({
    description, category, i, j
  }) => `<li id="${i} ${j}"><span class="category" style="background-color: ${category}"></span><p class="description">${description}</p></li>`
}

new App();
