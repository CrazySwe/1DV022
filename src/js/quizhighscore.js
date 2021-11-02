/**
 * @author Kevin Cederholm
 * @version 1.0
 */
export default class QuizHighScore {
  /**
   * Creates a new highscore object
   */
  constructor () {
    this.storageName = 'highscorelist'
    this.highscore = this.getSavedLocal()
  }

  /**
   * Gets the highscore from current localstorage if it exists
   * @returns {array}
   */
  getSavedLocal () {
    let list = []
    let localFile = window.localStorage.getItem(this.storageName)

    if (localFile !== null || localFile !== undefined) {
      let listJson = JSON.parse(localFile)
      for (let name in listJson) {
        list.push(listJson[name])
      }
    }
    return list
  }

  /**
   * Check if its a new highscore, then add it
   *
   * @param {string} name - the name of the player
   * @param {number} score
   * @param {number} time - number in ms
   * @returns {boolean}
   */
  isNewHighScore (name, score, time) {
    let isNewHigh = false
    this.name = name
    this.score = score
    this.time = time
    console.log(this.score)
    if (this.highscore.length < 5 || this.score > this.highscore[this.highscore.length - 1].score) {
      isNewHigh = true
      this.saveToLocal()
    }
    return isNewHigh
  }

  /**
   * Saving the highscore list to localstorage
   */
  saveToLocal () {
    let scoreObj = {
      name: this.name,
      score: this.score,
      time: this.time
    }
    this.highscore.push(scoreObj)
    this.highscore = this.highscore.sort((a, b) => {
      return b.score - a.score || a.time - b.time
    })
    if (this.highscore.length >= 5) {
      this.highscore = this.highscore.slice(0, 5)
    }
    window.localStorage.setItem(this.storageName, JSON.stringify(this.highscore))
  }
}
