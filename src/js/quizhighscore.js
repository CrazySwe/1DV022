/**
 * @author Kevin Cederholm
 * @version 1.0
 */
export default class QuizHighScore {
  constructor (name, score) {
    this.name = name
    this.score = score
    this.highscore = {}
  }
  isNewHighScore () {
    // is it new high score?
  }
  saveToLocal () {
    // Add to local highscore?
    // window.localStorage.setItem('highscore', 'value')
  }
}
