import getWords from './getWords';
import displayTimeLeft from './displayTimeLeft';
import restart from './restart';

export default function init() {
  getWords(2, 'short');
  displayTimeLeft(60);
  restart();
}