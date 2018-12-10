/**
 * @author Kevin Cederholm
 * @version 1.0
 */
export default class QuizHighScore {
  constructor () {
    this.storageName = 'highscorelist'
    this.highscore = this.getSavedLocal()
  }
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
  isNewHighScore (name, score, time) {
    let isNewHigh = false
    this.name = name
    this.score = score
    this.time = time

    if (this.highscore.length < 5 || this.score > this.highscore[this.highscore.length - 1].score) {
      isNewHigh = true
      this.saveToLocal()
    }
    return isNewHigh
  }
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
  getDocFrag () {
    let docFrag = document.createDocumentFragment()
    // Create highscore and append to doc frag and return
    return docFrag
  }
}
