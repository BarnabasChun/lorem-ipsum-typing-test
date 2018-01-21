import axios from 'axios';
import state from './state';
import outputWords from './outputWords';
import highlight from './highlight';
import track from './track';

export default function getWords(num = 2, length = 'long') {
  axios({
    method: 'GET',
    url: 'http://proxy.hackeryou.com',
    dataResponse: 'json',
    params: {
      reqUrl: `https://loripsum.net/api/${num}/${length}/plaintext`,
      proxyHeaders: {
        header_params: 'value',
      },
      xmlToJSON: false,
    },
  }).then(res => {
    const words = res.data
    // split the data into an array of words
    .split(' ')
    // change the words to lowercase
    .map(word => word.toLowerCase())
    // remove all punctuation
    .map(word => word.replace(/\W/g,''))
    // standardize and only get the first 150 words
    .slice(0,150);
    state.words = words;
    // the following methods are interdependent
    // the state of words is not immediately available to be used to output and compare against the user input
    outputWords(words);
    // only after the words have been inserted into the DOM can they be selected and have a class added to them
    highlight();
    track();
  });
}
