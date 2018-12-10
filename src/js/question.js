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
    let qTemplate = document.querySelector('#questionTemplate').content.cloneNode(true)
    let docFrag = document.createDocumentFragment()
    docFrag.appendChild(qTemplate)

    docFrag.querySelector('#qHeader').textContent = 'Question ' + this.id
    docFrag.querySelector('#question').textContent = this.question

    if (this.alt !== null && typeof this.alt === 'object') {
      docFrag.removeChild(docFrag.querySelector('#qBtn'))
      Object.keys(this.alt).forEach(key => {
        // Create custom answer button
        let btn = document.createElement('input')
        btn.setAttribute('type', 'button')
        btn.setAttribute('value', this.alt[key])
        btn.setAttribute('name', key)
        btn.addEventListener('click', event => {
          this.callback(event.target.name)
        })

        docFrag.insertBefore(btn, docFrag.querySelector('#qBtn'))
      })
    } else {
      let txtbox = document.createElement('input')
      txtbox.setAttribute('id', 'answer')
      txtbox.setAttribute('type', 'text')
      docFrag.insertBefore(txtbox, docFrag.querySelector('#qBtn'))

      docFrag.querySelector('#qBtn').addEventListener('click', event => {
        let ans = document.querySelector('#answer').value
        this.callback(ans)
      })
    }
    return docFrag
  }
}
