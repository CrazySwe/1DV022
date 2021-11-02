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
export function exercise5 () {
  let box = document.querySelector('#step05 .greybox a')
  box.addEventListener('click', function (event) {
    event.preventDefault()
    let clickedMsg = document.createElement('p')
    clickedMsg.innerHTML = 'You clicked!'
    document.querySelector('#step05').appendChild(clickedMsg)
  })
}
// 06
export function exercise6 () {
  let myDocFrag = document.createDocumentFragment()

  for (let i = 0; i < 10; i++) {
    let li = document.createElement('li')
    li.innerText = `List element number ${i + 1}`
    myDocFrag.appendChild(li)
  }
  document.querySelector('#list06').appendChild(myDocFrag)
}
// 07
export function exercise7 () {
  let templateNode = document.querySelector('#step07-template')
  let liTemplate
  let list07 = document.querySelector('#list07')

  for (let i = 0; i < 5; i++) {
    liTemplate = document.importNode(templateNode.content, true)
    let thisTemplate = liTemplate.querySelector('a')
    thisTemplate.setAttribute('href', 'http://google.se')
    thisTemplate.innerText = `This is link number ${i + 1}`
    list07.appendChild(liTemplate)
  }
}
// 08
export function exercise8 () {
  let button = document.querySelector('#todolistform button')
  button.addEventListener('click', event => {
    let textValue = button.previousElementSibling.value
    if (textValue.length === 0) return

    let li = document.createElement('li')
    let ul = document.querySelector('#todolist ul')

    li.innerText = textValue
    ul.appendChild(li)
    textValue = ''
  })
}
// 09
export function exercise9 () {
  let username1 = document.querySelectorAll('#textboxes09 input')[0]
  let username2 = document.querySelectorAll('#textboxes09 input')[1]
  let validation = document.querySelector('#step09 .validation')

  document.querySelector('#textboxes09').addEventListener('blur', event => {
    if (username1.value.length > 0 && username2.value.length > 0) {
      if (username1.value === username2.value) {
        validation.innerText = 'The usernames are OK!'
      } else {
        validation.innerText = 'The usernames does not match!'
      }
    } else {
      validation.innerText = ''
    }
  }, true)
}
