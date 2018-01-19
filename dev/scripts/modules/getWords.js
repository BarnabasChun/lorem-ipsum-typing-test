import axios from 'axios';
import state from './state';
import outputWords from './outputWords';
import highlight from './highlight';
import track from './track';

export default function getWords(num, length) {
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
    // split the data into an array of words and set the state
    const words = res.data.split(' ');
    state.words = words;
    // the following methods are interdependent
    // the state of words is not immediately available to be used to output and compare against the user input
    outputWords(words);
    // only after the words have been inserted into the DOM can they be selected and have a class added to them
    highlight();
    track();
  });
}
