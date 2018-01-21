import displayTimeLeft from './displayTimeLeft';
import state from './state';
import displayMetrics from './displayMetrics';

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
    displayTimeLeft(secondsLeft);
  }, 1000);
}