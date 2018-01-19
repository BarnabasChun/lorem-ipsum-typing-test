import state from './state';

export default function highlight() {
  const currentWord = document.querySelector(`[data-index='${state.currentIndex}']`);
  currentWord.classList.add('current-word');
}