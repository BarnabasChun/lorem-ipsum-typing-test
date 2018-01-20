import getWords from './getWords';
import restart from './restart';

export default function init() {
  getWords(2, 'short');
  restart();
}