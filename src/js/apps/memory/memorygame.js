
/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import Point2D from '../../point2d.js'

export default class MemoryGame {
  /**
   * Creates an instance of MemoryGame.
   * @param {Point2D} BoardSize
   * @memberof MemoryGame
   */
  constructor (BoardSize) {
    this.boardsize = BoardSize || new Point2D(4, 4)
    this.nrOfCards = this.boardsize.x * this.boardsize.y
    this.board = this.createBoard(this.nrOfCards / 2)
    this.shuffleCards()
  }
  /**
  * Shuffles the card in the memory game
  *
  * @memberof MemoryGame
  */
  shuffleCards () {
    // Shuffle Fisher Yates
    for (let i = this.board.length - 1; i > 0; i--) {
      let index = Math.floor(Math.random() * i)

      let tmp = this.board[i]
      this.board[i] = this.board[index]
      this.board[index] = tmp
    }
  }
  /**
   * Creates an array to represent a memory board
   *
   * @param {number} uniqueCards
   * @returns {Array}
   * @memberof MemoryGame
   */
  createBoard (uniqueCards) {
    let resArr = []
    for (let i = 0; i < uniqueCards; i++) {
      resArr.push(i, i)
    }
    return resArr
  }
}
