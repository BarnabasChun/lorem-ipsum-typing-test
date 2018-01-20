import displayTimeLeft from './displayTimeLeft';
import state from './state';

export default function timer(seconds) {
  const input = document.querySelector('.typing-input');
  // clear existing countdown
  clearInterval(countdown);
  // when the timer started - in ms
  const now = Date.now();
  // the time (in ms) after the desired seconds elapses
  const later = now + seconds * 1000;
  // display the initial time left
  displayTimeLeft(seconds);

  // after every second update the displayed time
  let countdown = setInterval(() => {
    // the remaining time is the diff between the time now and the end time 
    // divide by 1000 to convert from ms to s
    const secondsLeft = Math.round((later - Date.now()) / 1000);
    // after the interval has elapsed clear it
    if (secondsLeft < 0 || !state.timerRunning) {
      clearInterval(countdown);
      input.value = '';
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}