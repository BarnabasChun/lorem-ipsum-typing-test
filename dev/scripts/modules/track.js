import state from './state';
import highlight from './highlight'
import timer from './timer';

export default function track() {
  const input = document.querySelector('.typing-input');
  input.addEventListener('keyup', function(e) {
    // if the timer has not started yet then start it
    if (!state.timerRunning) {
      state.timerRunning = true;
      timer(60);
    }
    // the current word aligns with the current index
    let currentWord = document.querySelector(`[data-index='${state.currentIndex}']`);
    // the part of the word equivalent in length to the value being typed in the input
    let slicedWord = state.words[state.currentIndex].slice(0, e.target.value.length);
    // if the value being typed matches the current portion of the word and is not blank
    if (e.target.value === slicedWord && e.target.value !== '') {
      currentWord.classList.add('correct');
      currentWord.classList.remove('incorrect');
    // if the input is blank
    } else if (e.target.value === slicedWord && e.target.value == '') {
      currentWord.classList.remove('correct');
      currentWord.classList.remove('incorrect');
    // if the value being typed does not match the current portion of the word
    } else if (e.target.value !== slicedWord ) {
      currentWord.classList.add('incorrect');
      currentWord.classList.remove('correct');
    }
    // if the user has pressed the spacebar
    if (e.target.value.includes(' ')) {
      // compare if the entered word matches the current word
      if (e.target.value.trim() === state.words[state.currentIndex]) {
        currentWord.classList.add('correct');
        currentWord.classList.remove('incorrect');
      } else {
        currentWord.classList.add('incorrect');
        currentWord.classList.remove('correct');
      }
      // remove the current-word class and update the current index
      currentWord.classList.remove('current-word');
      state.currentIndex++;
      // then add current-word to the word that matches the current index
      highlight();
      // then clear the input value
      e.target.value = '';
    }
  });
}