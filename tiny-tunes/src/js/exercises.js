// 01
export function exercise1 () {
  let myTxt = document.createTextNode('Hello World!')
  document.querySelector('#step01_hello').appendChild(myTxt)
}
// 02
export function exercise2 () {
  let myH2 = document.createElement('h2')
  let myElmement = document.querySelector('#step02')
  myH2.innerHTML = 'This is a sub headline'
  myElmement.appendChild(myH2)
}
// 03
export function exercise3 () {
  let myH2 = document.createElement('h2')
  myH2.innerHTML = 'This is a sub headline'
  let elements = document.querySelectorAll('h2')
  let parent = elements[4].parentElement
  parent.insertBefore(myH2, parent.lastElementChild)
}
// 04
export function exercise4 () {
  let myElement = document.querySelector('#step04 h2')
  myElement.classList.add('red')
}
// 05
export function exercise5 () {}
// 06
export function exercise6 () {}
// 07
export function exercise7 () {}
// 08
export function exercise8 () {}
// 09
export function exercise9 () {}
