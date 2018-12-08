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
          console.log('Error: ' + response.status)
        }
      })
      .then(function (myJson) {
        callFunc(myJson)
      })
  }
}
