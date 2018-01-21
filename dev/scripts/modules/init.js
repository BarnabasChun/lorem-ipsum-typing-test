import state from './state';
import getWords from './getWords';
import displayTimeLeft from './displayTimeLeft';
import restart from './restart';

export default function init() {
  getWords();
  displayTimeLeft(state.seconds);
  restart();
}