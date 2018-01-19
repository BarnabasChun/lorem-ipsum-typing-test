export default function outputWords(arr) {
  const html = arr.map((word, i) => `<span class='word' data-index=${i}>${word}</span>`).join('');
  const wordsContainer = document.querySelector('.words-container');
  wordsContainer.innerHTML = html;
}