import state from './state';
import calcAccuracy from './calcAccuracy';
import calcWPM from './calcWPM';

export default function displayMetrics() {
  // if the user has not even typed a single word
  if (state.currentIndex === 0) return;
  // number of correct words / words typed 
  const accuracy = calcAccuracy(state.correct, state.currentIndex);
  // number of words typed / min
  const wpm = calcWPM(state.currentIndex, state.seconds);
  document.querySelector('.wpm').innerText = wpm;
  document.querySelector('.accuracy').innerText = `${accuracy*100}%`;
}