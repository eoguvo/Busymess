const $ = (className, root = document) => root.querySelector(className);

class ModalManager {
  constructor(className) {
    this.modal = $(`.modal.${className}`);
    this.form = $('.modal__content form', this.modal);

    const activeBtn = $(`.activeModal.${className}`);
    activeBtn?.addEventListener('click', () => {
      this.modal.classList.remove('hidden');
    });

    const closeBtn = $('.cancel', this.modal);
    closeBtn?.addEventListener('click', this.close.bind(this));
  }

  submit(todos, board = 0, todo = 0) {
    this.categoryRef = $('#category', this.modal);
    this.descriptionRef = $('#description', this.modal);
    const category = this.categoryRef.value;
    const description = this.descriptionRef.value;

    if (!category || !description) {
      const message = 'Por favor, preencha todos os campos';
      return alert(message);
    }

    this.close();
    return todos[board].items.splice(todo, 0, { description, category });
  }

  show() {
    this.modal.classList.remove('hidden');
  }

  close() {
    this.modal.classList.add('hidden');
    this.clear();
  }

  clear() {
    this.form
      .querySelectorAll('.input_group input, select')
      .forEach((element) => {
        if (element.type === 'select-one') {
          element.selectedIndex = 0;
          return;
        }

        element.value = '';
      });
  }
}

export default ModalManager;
