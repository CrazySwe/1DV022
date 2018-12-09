/**
 * @author Kevin Cederholm
 * @version 1.0
 */

export default class QuizProxy {
  static getQuestion (obj, callFunc) {
    window.fetch(obj.url, obj.conf)
      .then(function (response) {
        if (response.status === 200) {
          return response.json()
        } else {
          console.log('Error: ' + response.status + obj.url)
        }
      })
      .then(function (myJson) {
        callFunc(myJson)
      })
  }
  static sendAnswer (obj, callFail, callCorrect) {
    window.fetch(obj.url, obj.conf)
      .then(response => {
        return response.json()
      })
      .then(data => {
        // maybe not handling this in here?
        if (data.message === 'Correct answer!' && data.hasOwnProperty('nextURL')) {
          callCorrect(data.nextURL)
        } else if (data.message === 'Correct answer!') {
          callCorrect(null)
        } else {
          callFail()
        }
      })
  }
}
