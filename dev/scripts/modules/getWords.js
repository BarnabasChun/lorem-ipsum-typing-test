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
    const words = res.data.split(' ');
    state.words = words;
    outputWords(words);
    highlight();
    track();
  });
}
