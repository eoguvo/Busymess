import { Sortable } from 'sortablejs';
import { categories } from './modules/initialItems';
import createTemplate from './modules/templates.js';
import ModalManager from './modules/modalManager';
import Util from './modules/util';
import Storage from './modules/storage.mjs';

import './modules/themeManager';
import './modules/material';

const $$ = document.querySelectorAll.bind(document);

class App {
  constructor() {
    this.todos = Storage.getTodos();
    this.createModal = new ModalManager('create');
    this.editModal = new ModalManager('edit');

    this.boards = $$('.board ul');
    this.init();
    this.count = 0;
  }

  init() {
    this.createModal.form
      .addEventListener('submit', (e) => {
        e.preventDefault();

        this.createModal.submit(this.todos);
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
          const description = item.querySelector('p').innerText;
          this.todos[to.id].items.splice(newIndex, 0,
            { description, category });

          this.render();
        }
      });
    });

    this.render();
  }

  remove(element) {
    const [board, todo] = element.id.split(' ');
    if (confirm('Tem certeza que deseja deletar?')) {
      this.todos[board].items.splice(todo, 1);
      this.render();
    }
  }

  render() {
    this.boards.forEach((board, i) => {
      let boardFragment = '';

      this.todos[i].items.forEach(({ description, category }, j) => {
        let hex = category;

        if (!category.startsWith('#')) {
          const parsedRGB = category.replace(/([a-z()])/g, '').split(',');
          hex = Util.RGBToHex(parsedRGB);
        }

        boardFragment += createTemplate({
          description, category, i, j, title: categories[hex], hex
        });
      });

      board.innerHTML = boardFragment;
    });

    Storage.setTodos(this.todos);
  }

  submitEdit(form) {
    const [board, todo] = form.id.split(' ');
    this.todos[board].items.splice(todo, 1);
    this.editModal.submit(this.todos, board, todo);
    this.render();
  }

  editTodo(element, { hex, description }) {
    this.editModal.form.id = element.id;
    this.editModal.form.innerHTML = `<div class="input_group"> <label class="screenOnly" for="description">Descrição</label> <input value='${description}' type="text" name="description" id="description" placeholder="Descrição" /></div><div class="input_group"> <label class="screenOnly" for="category">Category</label> <select name="category" id="category"><option value="" selected disabled hidden>Selecione um rótulo</option><option value="#000000" style="background-color:#000000; color: #fff">Critico</option><option value="#7159c1" style="background-color:#7159c1">Alta prioridade</option><option value="#FFC107" style="background-color:#FFC107">Baixa prioridade</option><option value="#5a92db" style="background-color:#5a92db">Neutro</option> </select></div><div class="submit_buttons input_group"> <button onclick="app.editModal.close()" class="cancel mdc-button mdc-button--outlined" type="button"> <span class="mdc-button__ripple"></span> <span class="mdc-button__label">Cancelar</span> </button> <button onclick="app.submitEdit(this.parentNode.parentElement)" class="submit mdc-button mdc-button--raised"> <span class="mdc-button__ripple"></span> <span class="mdc-button__label">Editar</span> </button></div>`;
    const selectRef = this.editModal.form.querySelector('select');

    selectRef.querySelectorAll('option[style]').forEach(({ value }, i) => {
      if (value.toUpperCase() === hex.toUpperCase()) {
        selectRef.selectedIndex = i + 1;
      }
    });

    this.editModal.show();
  }
}

window.app = new App();
