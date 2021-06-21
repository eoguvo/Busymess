const $ = document.querySelector.bind(document);
const html = $('html');
const themeToggleButton = $('.toggleTheme');

class ThemeManager {
  constructor() {
    const theme = localStorage.getItem('theme')
      || this.isLight() ? 'light' : 'dark';

    html.dataset.theme = theme;

    this.changeIcon();
    themeToggleButton.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const theme = this.isLight() ? 'dark' : 'light';
    html.dataset.theme = theme;
    localStorage.setItem('theme', theme);

    this.changeIcon();
  }

  changeIcon() {
    const icon = this.isLight() ? 'moon' : 'sun';
    themeToggleButton.innerHTML = `<img width="24" height="24" src="./img/${icon}.svg" alt="${icon}" />`;
  }

  isLight = () => html.dataset.theme === 'light';
}

new ThemeManager();
