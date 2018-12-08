/**
 * @author Kevin Cederholm
 * @version 1.0
 */
export default class Question {
  constructor (id, question, alt = false, callFunc) {
    this.id = id
    this.question = question
    this.alt = alt
    this.callback = callFunc
  }
  getQuestionBody () {
    // remake this , Also implement template ?
    let docFrag = document.createDocumentFragment()
    let h1 = document.createElement('h1')
    h1.textContent = 'Question ' + this.id
    docFrag.appendChild(h1)
    let p = document.createElement('p')
    p.textContent = this.question
    docFrag.appendChild(p)
    let submit = document.createElement('input')
    submit.setAttribute('type', 'button')
    submit.setAttribute('value', 'skickatest')
    submit.addEventListener('click', this.callback)
    docFrag.appendChild(submit)

    return docFrag
  }
}
