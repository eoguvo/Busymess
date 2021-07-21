import initialItems from './initialItems';

class Storage {
  static getTodos() {
    return JSON.parse(localStorage.getItem('boards')) || initialItems;
  }

  static setTodos(todos) {
    localStorage.setItem('boards', JSON.stringify(todos));
  }
}

export default Storage;
