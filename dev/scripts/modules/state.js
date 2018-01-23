import app from '../app';

export default (app.state = {
  words: [],
  currentIndex: 0,
  correct: 0,
  messups: [],
  timerRunning: false,
  seconds: 15,
});
