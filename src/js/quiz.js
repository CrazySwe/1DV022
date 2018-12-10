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
  init () {
    this.url = 'http://vhost3.lnu.se:20080/question/1'
    this.question = null
    this.qNr = 0
    this.totalTime = 0
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
    this.timer = new QuizTimer(this.qTime, document.querySelector('#qTimer'), this.gameEnd.bind(this))
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

  clearNode () {
    while (this.boxNode.hasChildNodes()) {
      this.boxNode.removeChild(this.boxNode.firstChild)
    }
  }
}
