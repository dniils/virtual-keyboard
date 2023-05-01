/* eslint linebreak-style: ['error', 'windows'] */
import * as keysJSON from './keys.json' assert { type: 'json' };
import {
  listenToKeysUpsAndDowns,
  activateShift,
  activateCaps,
} from './keyPressListener.js';

function renderKeyboard() {
  const body = document.querySelector('.page');
  const keyboardContainer = document.createElement('div');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const keyboardInfo = document.createElement('div');
  const keyboardInfoSystem = document.createElement('span');
  const keyboardInfoLang = document.createElement('span');

  keyboardInfo.classList.add('keyboard-info');
  keyboardInfoSystem.classList.add('keyboard-info__system');
  keyboardInfoLang.classList.add('keyboard-info__language');
  keyboardInfoSystem.innerHTML = 'Developed in Windows OS | ';
  keyboardInfoLang.innerHTML = 'Switch language: Control + Alt';
  keyboardInfo.append(keyboardInfoSystem, keyboardInfoLang);

  textarea.classList.add('keyboard-textarea');
  textarea.setAttribute('id', 'text');
  textarea.setAttribute('name', 'keyboard-text');
  textarea.setAttribute('cols', '90');
  textarea.setAttribute('rows', '3');

  keyboardContainer.classList.add('keyboard-container');
  keyboard.classList.add('keyboard');

  keyboardContainer.append(textarea);
  keyboardContainer.append(keyboard);
  setTimeout(() => {
    keyboardContainer.append(keyboardInfo);
  }, 0);

  body.append(keyboardContainer);
}

function renderKeyboardKeys(state) {
  if (!localStorage.lang) localStorage.setItem('lang', state);
  else state = localStorage.getItem('lang');

  const keysData = keysJSON.default;
  const keyboardContainer = document.querySelector('.keyboard-container');
  const keyboard = document.querySelector('.keyboard');

  function getKeysFromRow(num) {
    return Object.keys(keysData[num]);
  }

  function createKeyboardRows() {
    const arrOfKeyboardRows = [];
    for (let i = 0; i < Object.keys(keysData).length; i++) {
      if (getKeysFromRow(i).length > 0) {
        arrOfKeyboardRows.push(getKeysFromRow(i));
      }
    }
    return arrOfKeyboardRows;
  }

  function createKeyElement(keyName) {
    for (let i = 0; i < Object.keys(keysData).length; i++) {
      if (
        Object.keys(keysData[Object.keys(keysData)[i]]).includes(`${keyName}`)
      ) {
        const keyboardKey = document.createElement('div');
        keyboardKey.classList.add('keyboard__key');
        keyboardKey.classList.add(`${keyName}`);
        keyboardKey.innerText = `${keysData[i][`${keyName}`][state]}`;
        return keyboardKey;
      }
    }
  }

  function createKeyboardRow(rowKeys) {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row');

    for (let i = 0; i < rowKeys.length; i++) {
      keyboardRow.append(createKeyElement(rowKeys[i]));
    }

    return keyboardRow;
  }

  function appendKeyboardRows() {
    for (let i = 0; i < keyboardRows.length; i++) {
      keyboard.append(createKeyboardRow(keyboardRows[i]));
    }
  }

  const keyboardRows = createKeyboardRows();
  appendKeyboardRows();
  keyboardContainer.append(keyboard);

  const shiftKey = document.querySelector('.keyboard__key.ShiftLeft');
  const capsKey = document.querySelector('.keyboard__key.CapsLock');

  shiftKey.addEventListener('mousedown', () => {
    activateShift();
  });

  shiftKey.addEventListener('mouseup', () => {
    activateShift();
  });

  capsKey.addEventListener('click', () => {
    activateCaps();
  });

  listenToKeysUpsAndDowns();
}

export { renderKeyboard, renderKeyboardKeys };
