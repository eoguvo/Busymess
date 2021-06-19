const $ = document.querySelector.bind(document);
const html = $("html");
const themeToggleButton = $(".toggleTheme");

const toggleTheme = () => {
  const theme = isLight() ? "dark" : "light";
  html.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  themeToggleButton.innerHTML = `<i class="fas fa-${isLight() ? 'moon' : 'sun'}"></i>`
}

const isLight = () => html.dataset.theme === "light"

const theme = localStorage.getItem("theme") || "dark";
html.dataset.theme = theme;

themeToggleButton.addEventListener("click", toggleTheme);