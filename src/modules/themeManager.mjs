const $ = (className, root = document) => root.querySelector(className);
const html = $('html');
const themeToggleButton = $('.toggleTheme');

class ThemeManager {
  constructor() {
    html.dataset.theme = localStorage.getItem('theme') || this.isLight();

    this.changeIcon();
    themeToggleButton.addEventListener('click', this.toggleTheme.bind(this));
  }

  toggleTheme() {
    const theme = this.isLight();
    html.dataset.theme = theme;
    localStorage.setItem('theme', theme);

    this.changeIcon();
  }

  changeIcon() {
    const icon = this.isLight() === 'dark' ? 'moon' : 'sun';
    themeToggleButton.innerHTML = `<img width="24" height="24" src="./img/${icon}.svg" alt="${icon}" />`;
  }

  isLight() { return html.dataset.theme === 'light' ? 'dark' : 'light'; }
}

new ThemeManager();
