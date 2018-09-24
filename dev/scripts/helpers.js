export const calcAccuracy = (correct, total) => correct / total;

// words per minute adjusting time in seconds to minutes
export const calcWPM = (words, time) => words / (time / 60);

// takes an element and removes a class and adds a new one
export function changeClass(el, oldClass, newClass) {
  el.classList.remove(oldClass);
  el.classList.add(newClass);
}

export function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

export const getInitialState = () => {
  const initialState = {
    words: [],
    currentIndex: 0,
    correct: 0,
    timerRunning: false,
    seconds: 60,
  };
  return Object.assign({}, initialState);
};
