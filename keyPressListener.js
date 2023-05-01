import * as keysJSON from './keys.json' assert { type: 'json' };

let currentMode;
if (!localStorage.lang) currentMode = 'en';
else currentMode = localStorage.getItem('lang');
let str;
const keysData = keysJSON.default;
let keysDataArr = [];

for (let i = 0; i < Object.keys(keysData).length; i++) {
  keysDataArr.push(Object.entries(keysData[i]));
}
keysDataArr = keysDataArr.flat();

const keysToCaps = [
  'KeyQ',
  'KeyW',
  'KeyE',
  'KeyR',
  'KeyT',
  'KeyY',
  'KeyU',
  'KeyI',
  'KeyO',
  'KeyP',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyJ',
  'KeyK',
  'KeyL',
  'KeyZ',
  'KeyX',
  'KeyC',
  'KeyV',
  'KeyB',
  'KeyN',
  'KeyM',
];

const ruKeysToCaps = [
  ...keysToCaps,
  'Backquote',
  'BracketLeft',
  'BracketRight',
  'Semicolon',
  'Quote',
  'Comma',
  'Period',
];

function toggleShiftMode(mode) {
  switch (mode) {
    case 'en':
      currentMode = 'en-shift';
      return 'en-shift';
    case 'en-shift':
      currentMode = 'en';
      return 'en';
    case 'ru':
      currentMode = 'ru-shift';
      return 'ru-shift';
    case 'ru-shift':
      currentMode = 'ru';
      return 'ru';
    default:
      return '';
  }
}

function toggleLanguage(mode) {
  switch (mode) {
    case 'en':
      currentMode = 'ru';
      localStorage.setItem('lang', 'ru');
      return 'ru';
    case 'en-shift':
      currentMode = 'ru-shift';
      localStorage.setItem('lang', 'ru');
      return 'ru-shift';
    case 'ru':
      currentMode = 'en';
      localStorage.setItem('lang', 'en');
      return 'en';
    case 'ru-shift':
      currentMode = 'en-shift';
      localStorage.setItem('lang', 'en');
      return 'en-shift';
    default:
      return '';
  }
}

function activateShift() {
  const keyboardKeys = document.querySelectorAll('.keyboard__key');

  toggleShiftMode(currentMode);

  keyboardKeys.forEach((key) => {
    key.innerText = keysDataArr.filter(
      (arr) => arr[0] === key.classList[1]
    )[0][1][currentMode];
  });
}

function activateCaps() {
  const capsKey = document.querySelector('.keyboard__key.CapsLock');

  let keyboardKeys;
  if (currentMode === 'en' || currentMode === 'en-shift') {
    keyboardKeys = Array.from(
      document.querySelectorAll('.keyboard__key')
    ).filter((key) => keysToCaps.includes(key.classList[1]));
  } else {
    keyboardKeys = Array.from(
      document.querySelectorAll('.keyboard__key')
    ).filter((key) => ruKeysToCaps.includes(key.classList[1]));
  }

  let keysDataArr = [];
  for (let i = 0; i < Object.keys(keysData).length; i++) {
    keysDataArr.push(Object.entries(keysData[i]));
  }
  keysDataArr = keysDataArr.flat();

  toggleShiftMode(currentMode);

  keyboardKeys.forEach((key) => {
    key.innerText = keysDataArr.filter(
      (arr) => arr[0] === key.classList[1]
    )[0][1][currentMode];
  });

  capsKey.classList.toggle('keyboard__key_active');
}

function switchLanguage() {
  const keyboardKeys = document.querySelectorAll('.keyboard__key');

  toggleLanguage(currentMode);

  keyboardKeys.forEach((key) => {
    key.innerText = keysDataArr.filter(
      (arr) => arr[0] === key.classList[1]
    )[0][1][currentMode];
  });

  console.log(`mode switched to: ${currentMode}`);
}

function listenToKeysUpsAndDowns() {
  const textArea = document.getElementById('text');
  const page = document.querySelector('.page');
  const keysNodeList = document.querySelectorAll('.keyboard__key');
  const keys = Array.from(keysNodeList);
  const controlLeft = document.querySelector('.keyboard__key.ControlLeft');
  const controlRight = document.querySelector('.keyboard__key.ControlRight');
  const altLeft = document.querySelector('.keyboard__key.AltLeft');
  const altRight = document.querySelector('.keyboard__key.AltRight');

  function activateKeyByPress(e, down) {
    for (let i = 0; i < keys.length; i += 1) {
      if (e.code === keys[i].classList[1] && e.code !== 'CapsLock') {
        if (down) keysNodeList[i].classList.add('keyboard__key_active');
        else keysNodeList[i].classList.remove('keyboard__key_active');
      }
    }
  }

  function textIputHandler(str) {
    switch (str) {
      case 'Space':
        textArea.value += ' ';
        break;
      case 'Tab':
        textArea.value += '    ';
        break;
      case 'Backspace':
        textArea.value = textArea.value.slice(0, textArea.value.length - 1);
        break;
      case 'Enter':
        textArea.value += '\n';
        break;
      case 'ArrowLeft':
        textArea.value += '◄';
        break;
      case 'ArrowRight':
        textArea.value += '►';
        break;
      case 'ArrowUp':
        textArea.value += '▲';
        break;
      case 'ArrowDown':
        textArea.value += '▼';
        break;
      case 'Shift':
      case 'CapsLock':
      case 'Caps':
      case 'Alt':
      case 'Control':
      case 'Meta':
      case 'Win':
      case 'Del':
      case 'Delete':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
      case 'Escape':
      case 'Esc':
      case 'Ctrl':
        textArea.value = textArea.value;
        break;
      default:
        textArea.value += str;
    }
  }

  function checkChangeLangCondition() {
    if (
      (controlLeft.classList.contains('keyboard__key_active') &&
        altLeft.classList.contains('keyboard__key_active')) ||
      (controlLeft.classList.contains('keyboard__key_active') &&
        altRight.classList.contains('keyboard__key_active')) ||
      (controlRight.classList.contains('keyboard__key_active') &&
        altLeft.classList.contains('keyboard__key_active')) ||
      (controlRight.classList.contains('keyboard__key_active') &&
        altRight.classList.contains('keyboard__key_active'))
    ) {
      return true;
    } else return false;
  }

  page.addEventListener('keydown', (e) => {
    e.preventDefault();
    activateKeyByPress(e, true);
    if (e.code === 'CapsLock') activateCaps(e);
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') activateShift();
    if (checkChangeLangCondition()) {
      switchLanguage();
    }

    textIputHandler(
      keysDataArr.filter((arr) => arr[0] === e.code)[0][1][currentMode]
    );
  });

  page.addEventListener('keyup', (e) => {
    e.preventDefault();
    activateKeyByPress(e, false);
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') activateShift();
  });

  for (let i = 0; i < keysNodeList.length; i += 1) {
    keysNodeList[i].addEventListener('click', (e) => {
      switch (e.target.innerText) {
        case 'Space':
          str = ' ';
          break;
        case 'Caps':
          str = 'CapsLock';
          break;
        case 'Ctrl':
          str = 'Control';
          break;
        case 'Esc':
          str = 'Escape';
          break;
        case 'Del':
          str = 'Delete';
          break;
        default:
          str = e.target.innerText;
      }
      textIputHandler(str);
    });
  }
}

export { listenToKeysUpsAndDowns, activateShift, activateCaps };
