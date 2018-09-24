export function outputWords(arr) {
  const html = arr.map((word, i) => `<span class='word' data-index=${i}>${word}</span>`).join('');
  const wordsContainer = document.querySelector('.words-container');
  wordsContainer.innerHTML = html;
}

export function displayTimeLeft(seconds) {
  const timerDisplay = document.querySelector('.time-left');
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
}
