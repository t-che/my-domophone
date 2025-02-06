const keypad = document.querySelector('.keypad');
const keys = document.querySelectorAll('.key');
const door = document.getElementById('door');
const errorMessage = document.getElementById('errorMessage');
const hint = document.getElementById('hint');
const codeDisplayContainer = document.querySelector('.code-display-container');


let secretCode = '1234';
let currentCode = '';
let doorOpen = false; // Флаг состояния двери


keys.forEach(key => {
  key.addEventListener('click', () => {
    const keyValue = key.getAttribute('data-key');
    if (keyValue === '*') {
      // Сброс
      currentCode = '';
      updateCodeDisplay();
      errorMessage.textContent = '';
       if(doorOpen){
        closeDoor();
       }
    } else if (keyValue === '#') {
      // Проверка кода
      if (currentCode === secretCode && !doorOpen) {
          openDoor();
      } else {
          errorMessage.textContent = "Неверный код. Попробуйте еще раз.";
            if(doorOpen){
                closeDoor();
            }
      }
      currentCode = '';
      updateCodeDisplay();
    } else {
      currentCode += keyValue;
      updateCodeDisplay();
    }
  });
});


function updateCodeDisplay() {
  codeDisplay.textContent = currentCode;
}

// Пример подсказки
const secretCodeForHint = '1234'
if(secretCodeForHint != ""){
    hint.textContent = `Подсказка: код начинается с ${secretCodeForHint.substring(0, 2)}`
}

// Поле для отображения введенного кода
const codeDisplay = document.createElement('div');
codeDisplay.id = 'code-display';
codeDisplay.textContent = currentCode;
codeDisplay.style.fontSize = '1.5em';
codeDisplay.style.fontWeight = 'bold';

// Добавляем элемент для отображения кода в DOM
codeDisplayContainer.appendChild(codeDisplay);


function openDoor() {
  door.textContent = "Дверь открыта!";
  door.style.backgroundColor = 'green';
  hint.textContent = '';
  doorOpen = true;
}

function closeDoor() {
  door.textContent = "Дверь заблокирована";
  door.style.backgroundColor = '#ccc';
  doorOpen = false;
}