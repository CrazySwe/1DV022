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
    this.boxNode = document.querySelector('#quizbox')
    this.highScore = new QuizHighScore()
    this.timer = undefined
    this.qTime = 20
    this.init()
  }
  /**
   * initalizing variables for new round
   */
  init () {
    this.url = 'http://vhost3.lnu.se:20080/question/1'
    this.question = null
    this.qNr = 0
    this.totalTime = 0
  }
  /**
   * Sends request for new question from server
   */
  async nextQuestion () {
    this.clearNode()
    this.boxNode.innerHTML = '<h1>Loading...</h1>'

    let response = await window.fetch(this.url, { method: 'GET' })
    let myjson = await response.json()
    this.handleQuestion(myjson)
  }

  /**
   * handles the response from server and creates new question object
   *
   * @param {Object} jsondata
   */
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

  /**
   * Shows the question and starts the timer
   */
  showQuestion () {
    this.clearNode()
    this.boxNode.appendChild(this.question.getQuestionBody())
    // Start timer
    this.timer = new QuizTimer(this.qTime, document.querySelector('#qTimer'), this.gameEnd.bind(this))
    this.timer.start()
  }

  /**
   * Stops the timer and sends the answer to server
   * @param {string|number} ans
   */
  sendAnswer (ans) {
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
        // this is bad practice
        if (data.message === 'Correct answer!' && data.hasOwnProperty('nextURL')) {
          this.correctAnswer(data.nextURL)
        } else if (data.message === 'Correct answer!') {
          this.correctAnswer(null)
        } else {
          this.gameEnd()
        }
      })
  }

  /**
   * Handles the answer from server after quizanswer sent
   *
   * @param {string} nexturl
   */
  correctAnswer (nexturl) {
    if (nexturl !== null) {
      this.url = nexturl
      this.nextQuestion()
    } else {
      this.gameEnd()
    }
  }

  /**
   * Shows the game over screen with info
   */
  gameEnd () {
    this.clearNode()
    // final score is (questions * maxtime per question) - time spent
    let finalScore = ((this.qNr * this.qTime) - (this.totalTime / 1000).toFixed(0))

    let geTemp = document.querySelector('#gameEndTemplate').content.cloneNode(true)
    geTemp.querySelector('#highscorebtn').addEventListener('click', event => this.showHighscore())
    geTemp.querySelector('#backbtn').addEventListener('click', event => this.showStart())

    if (this.highScore.isNewHighScore(this.name, finalScore, this.totalTime)) {
      geTemp.prepend(document.createTextNode('A NEW HIGHSCORE!'))
    }
    let ddElem = geTemp.querySelectorAll('#resultList dd')
    ddElem[0].textContent = finalScore
    ddElem[1].textContent = (this.totalTime / 1000).toFixed(1) + 's'

    this.boxNode.appendChild(geTemp)
  }

  /**
   * Shows the start screen
   */
  showStart () {
    this.init()
    this.clearNode()
    let startTemplate = document.querySelector('#startTemplate').content.cloneNode(true)
    this.boxNode.appendChild(startTemplate)
    this.boxNode.querySelector('#name').focus()
    this.boxNode.querySelector('#startbtn').addEventListener('click', event => {
      let name = document.querySelector('#name')
      if (name.value.length >= 1) {
        this.name = name.value
        this.nextQuestion()
      }
    })
    document.querySelector('#highscorebtn').addEventListener('click', event => this.showHighscore())
  }
  /**
   * Shows the highscore screen
   */
  showHighscore () {
    this.clearNode()
    let listJson = this.highScore.getSavedLocal()
    let hstemp = document.querySelector('#highscoreTemplate').content.cloneNode(true)
    let hstable = hstemp.querySelector('#highscoretbl')

    for (let i = 0; i < listJson.length; i++) {
      let rowTemp = document.querySelector('#playerRowTemplate').content.cloneNode(true)

      rowTemp.querySelector('.hsname').textContent = listJson[i].name
      rowTemp.querySelector('.hsscore').textContent = listJson[i].score
      rowTemp.querySelector('.hstime').textContent = (listJson[i].time / 1000).toFixed(1) + 's'

      hstable.appendChild(rowTemp)
    }
    hstemp.querySelector('#backbtn').addEventListener('click', event => this.showStart())
    this.boxNode.appendChild(hstemp)
  }
  /**
 * Clears the screen of current nodes
 */
  clearNode () {
    while (this.boxNode.hasChildNodes()) {
      this.boxNode.removeChild(this.boxNode.firstChild)
    }
  }
}
