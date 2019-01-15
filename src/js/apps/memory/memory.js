/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import Window from '../../window.js'
import Point2D from '../../point2d.js'
import MemoryGame from './memorygame.js'

export default class Memory extends Window {
  constructor (id, zIndex, deskElement, position) {
    super(id, 'Memory', zIndex, deskElement, position)
    this.minSize = new Point2D(4 * 70, 4 * 70)
    this.clickHandler = this.clickCard.bind(this)
    this.game = new MemoryGame(new Point2D(2, 2))
    this.clickedID = null
    this.cardMatches = 0

    this.contentNode.innerHTML = ''
    this.contentNode.addEventListener('click', this.clickHandler)

    this.run()
  }

  run () {
    let imgSrc = 'js/apps/memory/images/0.png'

    for (let i = 0; i < this.game.nrOfCards; i++) {
      let elm = document.createElement('img')
      elm.id = i
      elm.src = imgSrc
      this.contentNode.append(elm)

      if ((i + 1) % this.game.boardsize.x === 0) {
        this.contentNode.innerHTML += '<br>'
      }
    }
  }

  clickCard (event) {
    if (event.target.id) {
      // Show image
      let card = this.game.board[event.target.id]
      event.target.src = `js/apps/memory/images/${card + 1}.png`
      // Check match
      if (this.clickedID === null) {
        this.clickedID = event.target.id
      } else if (event.target.id !== this.clickedID) {
        if (this.game.board[event.target.id] === this.game.board[this.clickedID]) {
          this.cardMatches++
          console.log('its a match!')
        } else {
          this.resetCard(this.clickedID)
          this.resetCard(event.target.id)
          console.log('its not a match!')
        }
        this.clickedID = null
      }

      if (this.cardMatches >= this.game.nrOfCards / 2) {
        console.log('gameend')
      }
    }
  }

  resetCard (id) {
    setTimeout(() => {
      let elemNode = this.contentNode.querySelector(`[id='${id}']`)
      elemNode.src = 'js/apps/memory/images/0.png'
    }, 500)
  }

  destroy () {
    super.destroy()
    this.contentNode.removeEventListener('click', this.clickHandler)
  }
  // 4x4, 2x2, 2x4
  // You should be able to play the game with and without using the mouse.
  // The game should count how many attempts the
  // user have made and present that when the game is finnished.
  // What to do? Start from scratch or do memory exercise?
}
