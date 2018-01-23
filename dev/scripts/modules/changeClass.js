// takes an element and removes a class and adds a new one
export default function changeClass(el, oldClass, newClass) {
  el.classList.remove(oldClass);
  el.classList.add(newClass);
}