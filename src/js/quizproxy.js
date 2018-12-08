/**
 * @author Kevin Cederholm
 * @version 1.0
 */

export default class QuizProxy {
  static getQuestion (obj, callFunc) {
    window.fetch(obj.url, obj.conf)
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        callFunc(myJson)
      })
  }
}
