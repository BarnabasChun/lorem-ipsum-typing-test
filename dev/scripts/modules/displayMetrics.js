import state from './state';
import calcAccuracy from './calcAccuracy';
import calcWPM from './calcWPM';

export default function displayMetrics() {
  let accuracy;

  if (state.currentIndex === 0) {
    // if no words have been typed current index = 0
    // cannot divide by 0 so
    accuracy = 0;
  } else {
    // number of correct words / words typed 
    accuracy = calcAccuracy(state.correct, state.currentIndex);
  }
  // number of words typed / min
  const wpm = calcWPM(state.correct, state.seconds);
  document.querySelector('.wpm').innerText = `WPM: ${wpm}`;
  document.querySelector('.accuracy').innerText = `Accuracy: ${Math.round(accuracy * 100)}%`;
}