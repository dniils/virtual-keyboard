/* eslint linebreak-style: ['error', 'windows'] */
// import { innerTextToShift, enableCapsLock } from './shiftModeHandler.js';
import * as keysJSON from './keys.json' assert { type: 'json' };

let currentMode = 'en';
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

function toggleShiftMode(m) {
  if (m === 'en') {
    currentMode = 'en-shift';
    return 'en-shift';
  }
  if (m === 'en-shift') {
    currentMode = 'en';
    return 'en';
  }
  if (m === 'ru') {
    currentMode = 'ru-shift';
    return 'ru-shift';
  }
  if (m === 'ru-shift') {
    currentMode = 'ru';
    return 'ru';
  }
  return '';
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
  if (currentMode === 'en') {
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

function listenToKeysUpsAndDowns() {
  const page = document.querySelector('.page');
  const keysNodeList = document.querySelectorAll('.keyboard__key');
  const keys = Array.from(keysNodeList);

  function activateKeyByPress(e, down) {
    console.log(e.code);
    for (let i = 0; i < keys.length; i += 1) {
      if (e.code === keys[i].classList[1] && e.code !== 'CapsLock') {
        if (down) keysNodeList[i].classList.add('keyboard__key_active');
        else keysNodeList[i].classList.remove('keyboard__key_active');
        // keysNodeList[i].classList.toggle('keyboard__key_active');
      }
    }
  }

  page.addEventListener('keydown', (e) => {
    e.preventDefault();
    activateKeyByPress(e, true);
    if (e.code === 'CapsLock') activateCaps(e);
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') activateShift();
  });
  page.addEventListener('keyup', (e) => {
    e.preventDefault();
    activateKeyByPress(e, false);
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') activateShift();
  });
}

export { listenToKeysUpsAndDowns, activateShift, activateCaps };
