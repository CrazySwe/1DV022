/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import QuizProxy from './quizproxy.js'
export default class Quiz {
  constructor (name) {
    this.name = name
    this.url = 'http://vhost3.lnu.se:20080/question/1'
    this.run()
  }
  run () {
    this.nextQuestion()
    //print data with template
    //start timer
  }
  nextQuestion () {
    QuizProxy.getQuestion({
      url: this.url,
      conf: { method: 'GET' }
    }, this.handleResponse.bind(this))
  }

  handleResponse (jsondata) {
    console.log(jsondata)
  }
  sendAnswer () {
  }
}
