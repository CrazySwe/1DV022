/**
 * @author Kevin Cederholm
 * @version 1.0
 */
export default class Question {
  constructor (id, question, alt = null, callFunc) {
    this.id = id
    this.question = question
    this.alt = alt
    this.callback = callFunc
  }
  getQuestionBody () {
    // REMAKE this , Also implement template ?
    let docFrag = document.createDocumentFragment()
    let h1 = document.createElement('h1')
    h1.textContent = 'Question'
    docFrag.appendChild(h1)
    let timertxt = document.createElement('h4')
    timertxt.setAttribute('id', 'timer')
    timertxt.textContent = '0'
    docFrag.appendChild(timertxt)
    let p = document.createElement('p')
    p.textContent = this.question
    docFrag.appendChild(p)

    if (this.alt !== null && typeof this.alt === 'object') {
      // if alternatives
      // console.log(this.alt)
      Object.keys(this.alt).forEach(key => {
        let btn = document.createElement('input')
        btn.setAttribute('type', 'button')
        btn.setAttribute('value', this.alt[key])
        btn.setAttribute('name', key)
        btn.addEventListener('click', event => {
          this.callback(event.target.name)
        })
        docFrag.appendChild(btn)
      })
    } else {
      let submit = document.createElement('input')
      let txtbox = document.createElement('input')
      txtbox.setAttribute('id', 'answer')
      txtbox.setAttribute('type','text')
      submit.setAttribute('type', 'button')
      submit.setAttribute('value', 'Skicka')
      docFrag.appendChild(txtbox)
      submit.addEventListener('click', event => {
        let ans = document.querySelector('#answer').value
        this.callback(ans)
      })
      docFrag.appendChild(submit)
    }
    return docFrag
  }
}
