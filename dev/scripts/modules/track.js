import state from './state';
import highlight from './highlight'

export default function track() {
  const input = document.querySelector('[type="text"]');
  input.addEventListener('keyup', function(e) {
    let currentWord = document.querySelector(`[data-index='${state.currentIndex}']`);
    let slicedWord = state.words[state.currentIndex].slice(0, e.target.value.length);
    if (e.target.value === slicedWord && e.target.value !== '') {
      currentWord.classList.add('correct');
      currentWord.classList.remove('incorrect');
    } else if (e.target.value === slicedWord && e.target.value == '') {
      currentWord.classList.remove('correct');
      currentWord.classList.remove('incorrect');
    } else if (e.target.value !== slicedWord ) {
      currentWord.classList.add('incorrect');
      currentWord.classList.remove('correct');
    }
    
    if (e.target.value.includes(' ')) {
      if (e.target.value.trim() === state.words[state.currentIndex]) {
        currentWord.classList.add('correct');
        currentWord.classList.remove('incorrect');
      } else {
        currentWord.classList.add('incorrect');
        currentWord.classList.remove('correct');
      }
      currentWord.classList.remove('current-word');
      state.currentIndex++;
      highlight();
      e.target.value = '';
    }
  });
}