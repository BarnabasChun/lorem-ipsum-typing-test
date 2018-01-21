export default function calcWPM(words, time) {
  // words per minute adjusting time in seconds to minutes
  return words/(time/60);
}