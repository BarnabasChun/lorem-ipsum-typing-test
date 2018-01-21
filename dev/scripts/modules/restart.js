import state from './state';
import resetState from './resetState';
import getWords from './getWords';
import timer from './timer';

export default function restart() {
  const restartBtn = document.querySelector('.button--restart');
  restartBtn.addEventListener('click', function() {
    resetState();
    getWords();
    timer(state.seconds);
    document.querySelector('.typing-input').removeAttribute('disabled');
  });
}