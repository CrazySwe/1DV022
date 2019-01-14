/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import Window from '../../window.js'
import Point2D from '../../point2d.js'

export default class Memory extends Window {
  constructor (id, zIndex, deskElement, position) {
    super(id, 'Memory', zIndex, deskElement, position)
    this.setWindowSize(new Point2D(500, 500))
  }
  // 4x4, 2x2, 2x4
  // You should be able to play the game with and without using the mouse.
  // The game should count how many attempts the
  // user have made and present that when the game is finnished.
  // What to do? Start from scratch or do memory exercise?
}
