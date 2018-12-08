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
    this.score = 0
  }

  nextQuestion () {
    this.clearNode()
    this.boxNode.innerHTML = '<h1>Loading....</h1>'

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
    // Start timer
    this.timer = setInterval(this.gameEnd.bind(this), 20000)
  }

  sendAnswer (ans) {
    // stop timer
    clearInterval(this.timer)
    QuizProxy.sendAnswer({
      url: this.url,
      conf: { method: 'POST',
        body: JSON.stringify({ 'answer': ans }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        } }
    }, this.gameEnd.bind(this), this.correctAnswer.bind(this))
  }
  correctAnswer (nexturl) {
    this.score++
    if (nexturl !== null) {
      this.url = nexturl
      this.nextQuestion()
    } else {
      this.gameEnd()
    }
  }
  gameEnd () {
    clearInterval(this.timer)
    this.clearNode()
    this.boxNode.innerHTML = '<h1>END</h1><p>This was the end..</p>'
    console.log('Here it ENDED')
    console.log('Score: ' + this.score)

    // stop the game
  }

  clearNode () {
    while (this.boxNode.hasChildNodes()) {
      this.boxNode.removeChild(this.boxNode.firstChild)
    }
  }
}
