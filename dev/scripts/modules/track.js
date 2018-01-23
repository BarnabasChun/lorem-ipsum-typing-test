import state from './state';
import highlight from './highlight'
import timer from './timer';
import changeClass from './changeClass';

export default function track() {
  const input = document.querySelector('.typing-input');
  let lastPosition;
  input.addEventListener('keyup', function(e) {
    // if the timer has not started yet then start it
    if (!state.timerRunning) {
      state.timerRunning = true;
      timer(state.seconds);
    }
    const wordsContainer = document.querySelector('.words-container');
    const word = document.querySelector('.word');
    
    // the current word aligns with the current index
    let currentWord = document.querySelector(`[data-index='${state.currentIndex}']`);
    let currentWordValue = state.words[state.currentIndex];
    
    // the part of the word equivalent in length to the value being typed in the input
    let slicedWord = currentWordValue.slice(0, e.target.value.length);
    // the rest of the current word will be the index from how much was typed to the word's entire length
    let remainderWord = currentWordValue.slice(e.target.value.length, currentWordValue.length);

    let slicedInputValue = e.target.value.slice(0, e.target.value.length);
    /*each type the user inputs a letter wrap a span around the corresponding letter in the words container*/
    /*if the letter typed matches the actual word at the same position then add a class of correct letter otherwise incorrect letter*/
    //the inner text of the span will remain the value of the actual word
    let slicedWordDisplay = slicedInputValue
      .split('')
      .map((letter, i) => `<span class=${letter === currentWordValue.slice(i, i + 1) ? 'correct-letter' : 'incorrect-letter'}>${currentWordValue.slice(i, i + 1)}</span>`)
      .join('');
    /* the first portion will be each letter typed wrapped in a span and a class
    the remainder will just be tacked on*/
    currentWord.innerHTML = `${slicedWordDisplay}${remainderWord}`;
    
    // how far the current word is from the top of the words container
    /* will be updated each time on keydown and compared against the last position 
    which was stored when the user submitted the last word*/
    let currentPosition = currentWord.offsetTop;
    /* if the current position is greater than the last that means the current word is 
    on a new line*/
    if (currentPosition > lastPosition) {
      // move the previous typed row up
      wordsContainer.style.bottom = `${currentPosition}px`;
    }

    // if the user has pressed the spacebar
    if (e.target.value.includes(' ')) {
      currentWord.innerHTML = currentWordValue;
      // compare if the entered word matches the current word
      if (e.target.value.trim() === state.words[state.currentIndex]) {
        changeClass(currentWord, 'incorrect', 'correct');
        state.correct++;
      } else {
        changeClass(currentWord, 'correct', 'incorrect');
      }
      // remove the current-word class and update the current index
      currentWord.classList.remove('current-word');
      state.currentIndex++;
      // then add current-word to the word that matches the current index
      highlight();
      // then clear the input value
      e.target.value = '';
      // set the last position to be the most recent at the end of each input
      lastPosition = currentPosition;
  }

  });
}