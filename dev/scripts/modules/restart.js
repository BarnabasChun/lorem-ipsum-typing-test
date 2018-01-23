import state from './state';
import resetState from './resetState';
import getWords from './getWords';
import timer from './timer';

export default function restart() {
  const restartBtn = document.querySelector('.button--restart');
  const wordsContainer = document.querySelector('.words-container');
  const timerDisplay = document.querySelector('.time-left');
  restartBtn.addEventListener('click', function() {
    document.querySelector('.overlay').classList.remove('show');
    resetState();
    getWords();
    timer(state.seconds);
    document.querySelector('.typing-input').removeAttribute('disabled');
    wordsContainer.style.bottom = '0px';
    timerDisplay.classList.remove('flashing');
  });
}