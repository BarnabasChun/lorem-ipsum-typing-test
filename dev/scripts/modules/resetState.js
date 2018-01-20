import state from './state';

export default function resetState() {
  state.words = [];
  state.currentIndex = 0;
  state.errors = 0;
  state.messups = [];
}
