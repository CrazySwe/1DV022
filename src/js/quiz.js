/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import QuizTimer from './quiztimer.js'
import Question from './question.js'
import QuizHighScore from './quizhighscore.js'

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
  constructor (name = 'player') {
    this.name = name
    this.url = 'http://vhost3.lnu.se:20080/question/1'
    this.boxNode = document.querySelector('#quizbox')
    this.question = null
    this.highScore = new QuizHighScore()
    this.qNr = 0
    this.totalTime = 0
    this.timer = undefined
    this.qTime = 20

    document.querySelector('#name').focus()
    document.querySelector('#startbtn').addEventListener('click', event => {
      let name = document.querySelector('#name')
      if (name.value.length >= 1) {
        this.name = name.value
        this.nextQuestion()
      }
    })
    document.querySelector('#highscorebtn').addEventListener('click', event => this.showHighscore())
  }

  async nextQuestion () {
    this.clearNode()
    this.boxNode.innerHTML = '<h1>Loading...</h1>'

    let response = await window.fetch(this.url, { method: 'GET' })
    let myjson = await response.json()
    // let myjson = await window.fetch(this.url, { method: 'GET' })
    //   .then(function (response) {
    //     console.log(response.status)
    //     // if (response.status === 200) {
    //     //   return response.json()
    //     // } else {
    //     //   console.log('Error: ' + response.status + this.url)
    //     // }
    //     return response.json()
    //   })
    this.handleQuestion(myjson)
    // .then(myJson => {
    //   this.handleQuestion(myJson)
    // })
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
    if (nexturl !== null) {
      this.url = nexturl
      this.nextQuestion()
    } else {
      this.gameEnd()
    }
  }
  gameEnd () {
    this.clearNode()
    // final score is (questions * maxtime per question) - time spent
    let finalScore = ((this.qNr * this.qTime) - (this.totalTime / 1000).toFixed(0))

    this.boxNode.innerHTML = '<h1>END</h1><p>This was the end..<br>Questions: ' +
      this.qNr + '<br>Total time: ' + (this.totalTime / 1000) + ' seconds<br>Score: ' + finalScore + '</p>'
    if (this.highScore.isNewHighScore(this.name, finalScore, this.totalTime)) {
      this.boxNode.innerHTML += '<p>A NEW HIGHSCORE!</p>'
    }
  }

  showStart () {
    // this.clearNode()
    // implement later
    // let docFrag = document.createDocumentFragment()
    // this.boxNode.appendChild(docFrag)
  }
  showHighscore () {
    // implement more later
    let listJson = this.highScore.getSavedLocal()
    console.log(listJson)
  }

  clearNode () {
    while (this.boxNode.hasChildNodes()) {
      this.boxNode.removeChild(this.boxNode.firstChild)
    }
  }
}
