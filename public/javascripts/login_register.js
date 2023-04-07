const registerLink = document.getElementById('register');
const loginLink = document.getElementById('login');
const container = document.getElementById('container');
registerLink.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});
loginLink.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});
