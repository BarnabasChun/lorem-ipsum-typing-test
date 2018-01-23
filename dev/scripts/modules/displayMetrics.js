import state from './state';
import calcAccuracy from './calcAccuracy';
import calcWPM from './calcWPM';

export default function displayMetrics() {
  let accuracy;
  /* if no words have been typed current index = 0; and you can't divide by 0 so return 0 if nothing valid returns from calcAccuracy*/
  accuracy = calcAccuracy(state.correct, state.currentIndex) || 0;
  // number of words typed / min
  const wpm = calcWPM(state.correct, state.seconds);
  document.querySelector('.wpm').innerText = `WPM: ${wpm}`;
  document.querySelector('.accuracy').innerText = `Accuracy: ${Math.round(accuracy * 100)}%`;
}