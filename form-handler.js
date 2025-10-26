function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
function getLocalStorage(key) {
  return localStorage.getItem(key);
}
function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

const userForm = document.getElementById('userForm');
const userNameInput = document.getElementById('userNameInput');
const userGreeting = document.getElementById('userGreeting');
const clearNameBtn = document.getElementById('clearNameBtn');
const USER_NAME_KEY = 'userName';

function showGreeting(name) {
  userGreeting.textContent = `Hello, ${name}!`;
  userGreeting.style.display = 'inline-block';
}

function hideGreeting() {
  userGreeting.textContent = '';
  clearNameBtn.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const storedName = getLocalStorage(USER_NAME_KEY);
  if (storedName) {
    showGreeting(storedName);
    userNameInput.value = storedName;
    clearNameBtn.style.display = 'inline-block';
  }
});

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = userNameInput.value.trim();
  if (name) {
    setLocalStorage(USER_NAME_KEY, name);
    showGreeting(name);
  }
});

clearNameBtn.addEventListener('click', () => {
  removeLocalStorage(USER_NAME_KEY);
  userNameInput.value = '';
  hideGreeting();
});