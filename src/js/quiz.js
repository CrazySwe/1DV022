/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import QuizProxy from './quizproxy.js'
import Question from './question.js'
export default class Quiz {
  constructor (name) {
    this.name = name
    this.url = 'http://vhost3.lnu.se:20080/question/1'
    this.boxNode = document.querySelector('#quizbox')
    this.question = null
    // this.score = {}
    this.clearNode()
    this.boxNode.innerHTML = '<h1>Loading....</h1>'
    this.nextQuestion()
  }

  nextQuestion () {
    QuizProxy.getQuestion({
      url: this.url,
      conf: { method: 'GET' }
    }, this.handleResponse.bind(this))
  }

  handleResponse (jsondata) {
    let alt = null
    if (jsondata.hasOwnProperty('alternatives')) {
      alt = jsondata.alternatives
    }
    this.url = jsondata.nextURL
    this.question = new Question(
      jsondata.id,
      jsondata.question,
      alt,
      this.sendAnswer.bind(this)
    )
    this.showQuestion()
  }
  showQuestion () {
    this.clearNode()
    this.boxNode.appendChild(this.question.getQuestionBody())
  }
  sendAnswer () {
    console.log('Sent Answer!')
  }
  clearNode () {
    while (this.boxNode.hasChildNodes()) {
      this.boxNode.removeChild(this.boxNode.firstChild)
    }
  }
}
