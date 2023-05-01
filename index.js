/* eslint linebreak-style: ['error', 'windows'] */
import { renderKeyboard, renderKeyboardKeys } from './renderKeyboard.js';

renderKeyboard();
if (!localStorage.lang) renderKeyboardKeys('en');
else renderKeyboardKeys(localStorage.getItem('lang'));
