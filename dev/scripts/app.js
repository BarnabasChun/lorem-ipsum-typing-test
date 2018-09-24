import axios from 'axios';
import {
  calcAccuracy,
  calcWPM,
  changeClass,
  ready,
} from './helpers';
import { outputWords, displayTimeLeft } from './display';

const initialState = {
  words: [],
  currentIndex: 0,
  correct: 0,
  messups: [],
  timerRunning: false,
  seconds: 60,
};

// copy not a reference
// will be re-assigned when new game occurs
let state = Object.assign({}, initialState);

function highlight() {
  const currentWord = document.querySelector(`[data-index='${state.currentIndex}']`);
  currentWord.classList.add('current-word');
}

function displayMetrics() {
  /* if no words have been typed current index = 0; and you can't divide by 0 so return 0 if nothing valid returns from calcAccuracy */
  const accuracy = calcAccuracy(state.correct, state.currentIndex) || 0;
  // number of words typed / min
  const wpm = calcWPM(state.correct, state.seconds);
  document.querySelector('.wpm').innerText = `WPM: ${wpm}`;
  document.querySelector('.accuracy').innerText = `Accuracy: ${Math.round(accuracy * 100)}%`;
}

function runTimer(seconds) {
  const input = document.querySelector('.typing-input');
  const timerDisplay = document.querySelector('.time-left');
  let countdown;

  // clear existing countdown
  clearInterval(countdown);
  // when the timer started - in ms
  const now = Date.now();
  // the time (in ms) after the desired seconds elapses
  const later = now + seconds * 1000;
  // display the initial time left
  displayTimeLeft(seconds);

  // after every second update the displayed time
  countdown = setInterval(() => {
    // the remaining time is the diff between the time now and the end time
    // divide by 1000 to convert from ms to s
    const secondsLeft = Math.round((later - Date.now()) / 1000);
    // if the time has ran out then disable the input
    if (secondsLeft < 0) {
      input.setAttribute('disabled', '');
      document.querySelector('.overlay').classList.add('show');
    }
    // after the interval has elapsed or the user has restarted then clear the interval and the input
    // timer running will be set to true when the user starts typing in the input
    // otherwise it is initialized as false and upon restart is set back to false
    if (secondsLeft < 0 || !state.timerRunning) {
      clearInterval(countdown);
      input.value = '';
      displayMetrics();
      return;
    }
    if (secondsLeft <= 10) {
      if (secondsLeft % 2 === 0) {
        timerDisplay.classList.add('flashing');
      } else {
        timerDisplay.classList.remove('flashing');
      }
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function track() {
  const input = document.querySelector('.typing-input');
  let lastPosition;
  input.addEventListener('keyup', (e) => {
    // if the timer has not started yet then start it
    if (!state.timerRunning) {
      state.timerRunning = true;
      runTimer(state.seconds);
    }
    const wordsContainer = document.querySelector('.words-container');

    // the current word aligns with the current index
    const currentWord = document.querySelector(`[data-index='${state.currentIndex}']`);
    const currentWordValue = state.words[state.currentIndex];

    // the part of the word equivalent in length to the value being typed in the input
    // the rest of the current word will be the index from how much was typed to the word's entire length
    const remainderWord = currentWordValue.slice(e.target.value.length, currentWordValue.length);

    const slicedInputValue = e.target.value.slice(0, e.target.value.length);
    /* each type the user inputs a letter wrap a span around the corresponding letter in the words container */
    /* if the letter typed matches the actual word at the same position then add a class of correct letter otherwise incorrect letter */
    // the inner text of the span will remain the value of the actual word
    const slicedWordDisplay = slicedInputValue
      .split('')
      .map((letter, i) => `<span class=${letter === currentWordValue.slice(i, i + 1) ? 'correct-letter' : 'incorrect-letter'}>${currentWordValue.slice(i, i + 1)}</span>`)
      .join('');
    /* the first portion will be each letter typed wrapped in a span and a class the remainder will just be tacked on */
    currentWord.innerHTML = `${slicedWordDisplay}${remainderWord}`;

    // how far the current word is from the top of the words container
    /* will be updated each time on keydown and compared against the last position which was stored when the user submitted the last word */
    const currentPosition = currentWord.offsetTop;
    /* if the current position is greater than the last that means the current word is on a new line */
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
        state.correct += 1;
      } else {
        changeClass(currentWord, 'correct', 'incorrect');
      }
      // remove the current-word class and update the current index
      currentWord.classList.remove('current-word');
      state.currentIndex += 1;
      // then add current-word to the word that matches the current index
      highlight();
      // then clear the input value
      e.target.value = '';
      // set the last position to be the most recent at the end of each input
      lastPosition = currentPosition;
    }
  });
}

function getWords(num = 2, length = 'long') {
  axios({
    method: 'GET',
    url: 'http://proxy.hackeryou.com',
    dataResponse: 'json',
    params: {
      reqUrl: `https://loripsum.net/api/${num}/${length}/plaintext`,
      proxyHeaders: {
        header_params: 'value',
      },
      xmlToJSON: false,
    },
  }).then((res) => {
    const words = res.data
      // split the data into an array of words
      .split(' ')
      // change the words to lowercase
      .map(word => word.toLowerCase())
      // remove all punctuation
      .map(word => word.replace(/\W/g, ''))
      // standardize and only get the first 150 words
      .slice(0, 150);
    state.words = words;
    // the following methods are interdependent
    // the state of words is not immediately available to be used to output and compare against the user input
    outputWords(words);
    // only after the words have been inserted into the DOM can they be selected and have a class added to them
    highlight();
    track();
  });
}

function restart() {
  const restartBtn = document.querySelector('.button--restart');
  const wordsContainer = document.querySelector('.words-container');
  const timerDisplay = document.querySelector('.time-left');
  restartBtn.addEventListener('click', () => {
    document.querySelector('.overlay').classList.remove('show');
    state = Object.assign({}, initialState);
    getWords();
    runTimer(state.seconds);
    document.querySelector('.typing-input').removeAttribute('disabled');
    wordsContainer.style.bottom = '0px';
    timerDisplay.classList.remove('flashing');
  });
}

function init() {
  getWords();
  displayTimeLeft(state.seconds);
  restart();
}

ready(init);
