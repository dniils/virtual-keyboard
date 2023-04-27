/* eslint linebreak-style: ['error', 'windows'] */
import * as keysJSON from './keys.json' assert { type: 'json' };

function renderKeyboard(state) {
  const keysData = keysJSON.default;

  const body = document.querySelector('.page');
  const keyboardContainer = document.createElement('div');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');

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

  textarea.classList.add('keyboard-textarea');
  textarea.setAttribute('name', 'keyboard-text');
  textarea.setAttribute('cols', '90');
  textarea.setAttribute('rows', '2');

  keyboardContainer.classList.add('keyboard-container');
  keyboard.classList.add('keyboard');

  keyboardContainer.append(textarea);
  appendKeyboardRows();

  keyboardContainer.append(keyboard);
  body.append(keyboardContainer);
}

export { renderKeyboard };
