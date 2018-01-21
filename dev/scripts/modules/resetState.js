import state from './state';

export default function resetState() {
  state.words = [];
  state.currentIndex = 0;
  state.correct = 0;
  state.messups = [];
  state.timerRunning = false;
  state.seconds = 60;
}
