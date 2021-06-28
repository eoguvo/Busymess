const $ = document.querySelector.bind(document);

class ModalManager {
  constructor() {
    this.modal = $('.modal');
    this.form = $('.modal__content form');
    this.categoryRef = $('#category');
    this.descriptionRef = $('#description');

    const activeBtn = $('.activeModal');
    activeBtn.addEventListener('click', () => {
      this.modal.classList.remove('hidden');
    });

    const closeBtn = $('.cancel');
    closeBtn.addEventListener('click', () => this.close());
  }

  submit(todos) {
    const category = this.categoryRef.value;
    const description = this.descriptionRef.value;

    if (!category || !description) {
      const message = 'Por favor, preencha todos os campos';
      return alert(message);
    }

    this.close();
    return todos[0].items.push({ description, category });
  }

  close() {
    this.modal.classList.add('hidden');
    this.clear();
  }

  clear() {
    this.descriptionRef.value = '';
    this.categoryRef.selectedIndex = 0;
  }
}

export default ModalManager;
