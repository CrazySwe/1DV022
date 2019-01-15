/**
 * @author Kevin Cederholm
 * @version 1.0
 * TODO: 1. Reset button 2.Select grid size setting (2x2, 2x4, 4x4)
 */
import Window from '../../window.js'
import Point2D from '../../point2d.js'
import MemoryGame from './memorygame.js'

export default class Memory extends Window {
  /**
   *Creates an instance and window of Memory
   * @param {number} id
   * @param {number} zIndex
   * @param {HTMLElement} deskElement
   * @param {Point2D} position
   * @memberof Memory
   */
  constructor (id, zIndex, deskElement, position) {
    super(id, 'Memory', zIndex, deskElement, position, './image/memoryappicon_16.png')
    this.minSize = new Point2D(4 * 70, 4 * 70)
    this.clickHandler = this.clickCard.bind(this)
    this.game = new MemoryGame(new Point2D(4, 4))
    this.clickedID = null
    this.cardMatches = 0
    this.attempts = 0

    this.contentNode.innerHTML = ''
    this.contentNode.addEventListener('click', this.clickHandler)

    this.run()
  }
  /**
   * Runs the Memory app and draws the memory board
   *
   * @memberof Memory
   */
  run () {
    let imgSrc = 'js/apps/memory/images/0.png'

    for (let i = 0; i < this.game.nrOfCards; i++) {
      let elm = document.createElement('img')
      elm.id = i
      elm.src = imgSrc
      elm.dataset.flipped = 0
      this.contentNode.append(elm)

      if ((i + 1) % this.game.boardsize.x === 0) {
        this.contentNode.innerHTML += '<br>'
      }
    }
  }

  /**
   * Handles when clicked a card
   *
   * @param {*} event
   * @memberof Memory
   */
  clickCard (event) {
    if (event.target.id && parseInt(event.target.dataset.flipped) === 0) {
      // Show image
      let card = this.game.board[event.target.id]
      event.target.src = `js/apps/memory/images/${card + 1}.png`
      event.target.dataset.flipped = 1
      // Check match
      if (this.clickedID === null) {
        this.clickedID = event.target.id
      } else if (event.target.id !== this.clickedID) {
        if (this.game.board[event.target.id] === this.game.board[this.clickedID]) {
          this.cardMatches++
        } else {
          this.resetCard(this.clickedID)
          this.resetCard(event.target.id)
        }
        this.attempts++
        this.clickedID = null
      }

      if (this.cardMatches >= this.game.nrOfCards / 2) {
        let messageElement = document.createElement('h2')
        messageElement.innerText = `Finished at ${this.attempts} match attempts.`
        this.contentNode.append(messageElement)
      }
    }
  }

  /**
   * Resets the card and flips it back
   *
   * @param {*} id
   * @memberof Memory
   */
  resetCard (id) {
    setTimeout(() => {
      let elemNode = this.contentNode.querySelector(`[id='${id}']`)
      elemNode.src = 'js/apps/memory/images/0.png'
      elemNode.dataset.flipped = 0
    }, 500)
  }

  /**
   * Destroys the window and the eventlisteners involved
   *
   * @memberof Memory
   */
  destroy () {
    super.destroy()
    this.contentNode.removeEventListener('click', this.clickHandler)
  }
}
