import resetState from './resetState';
import getWords from './getWords';

export default function restart() {
  const restartBtn = document.querySelector('.button--restart');
  restartBtn.addEventListener('click', function() {
    resetState();
    getWords();
  });
}