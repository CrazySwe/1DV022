/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import QuizTimer from './quiztimer.js'
import Question from './question.js'

/**
 *  Implementation of a quiz
 *
 * @export
 * @class Quiz
 */
export default class Quiz {
  /**
   *Creates an instance of Quiz.
   * @param {string} name - Name of the quizplayer
   * @memberof Quiz
   */
  constructor (name) {
    this.name = name
    this.url = 'http://vhost3.lnu.se:20080/question/1'
    this.boxNode = document.querySelector('#quizbox')
    this.question = null
    this.qNr = 0
    this.totalTime = 0
    this.timer = undefined
    this.qTime = 30
  }

  nextQuestion () {
    this.clearNode()
    this.boxNode.innerHTML = '<h1>Loading...</h1>'

    window.fetch(this.url, { method: 'GET' })
      .then(function (response) {
        console.log(response.status)
        // if (response.status === 200) {
        //   return response.json()
        // } else {
        //   console.log('Error: ' + response.status + this.url)
        // }
        return response.json()
      })
      .then(myJson => {
        this.handleQuestion(myJson)
      })
  }

  handleQuestion (jsondata) {
    this.qNr++
    let alternatives = null
    if (jsondata.hasOwnProperty('alternatives')) {
      alternatives = jsondata.alternatives
    }
    this.url = jsondata.nextURL

    this.question = new Question(
      this.qNr,
      jsondata.question,
      alternatives,
      this.sendAnswer.bind(this)
    )
    this.showQuestion()
  }

  showQuestion () {
    this.clearNode()
    this.boxNode.appendChild(this.question.getQuestionBody())
    // Start timer
    this.timer = new QuizTimer(this.qTime, document.querySelector('#timer'), this.gameEnd.bind(this))
    this.timer.start()
  }

  sendAnswer (ans) {
    // stop timer
    // We also add the score if answer is wrong
    let nr = this.timer.stop()
    this.totalTime += nr
    let conf = {
      method: 'POST',
      body: JSON.stringify({ 'answer': ans }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }

    window.fetch(this.url, conf)
      .then(response => {
        return response.json()
        // check response first === 200, 400 is wrong answer
        // then send to function to handle it.
      })
      .then(data => {
        // maybe not handling this in here?
        if (data.message === 'Correct answer!' && data.hasOwnProperty('nextURL')) {
          this.correctAnswer(data.nextURL)
        } else if (data.message === 'Correct answer!') {
          this.correctAnswer(null)
        } else {
          this.gameEnd()
        }
      })
  }
  correctAnswer (nexturl) {
    // add 1?
    // this.totalTime++
    if (nexturl !== null) {
      this.url = nexturl
      this.nextQuestion()
    } else {
      this.gameEnd()
    }
  }
  gameEnd () {
    this.clearNode()
    this.boxNode.innerHTML = '<h1>END</h1><p>This was the end.. nr of questions: ' +
      this.qNr + ' Score: ' + this.totalTime + '</p>'
  }

  showStart () {
    // implement later
  }
  showHighscore () {
    // implement later
  }

  clearNode () {
    while (this.boxNode.hasChildNodes()) {
      this.boxNode.removeChild(this.boxNode.firstChild)
    }
  }
}
