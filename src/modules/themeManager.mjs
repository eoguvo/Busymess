const $ = document.querySelector.bind(document);
const html = $('html');
const themeToggleButton = $('.toggleTheme');

class ThemeManager {
  constructor() {
    const theme = localStorage.getItem('theme') || this.isLight();

    html.dataset.theme = theme;

    this.changeIcon();
    themeToggleButton.addEventListener('click', () => this.toggleTheme());
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

  isLight = () => (html.dataset.theme === 'light' ? 'dark' : 'light');
}

new ThemeManager();
