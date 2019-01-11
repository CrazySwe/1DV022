/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import Window from '../../window.js'
import Point2D from '../../point2d.js'

export default class Memory extends Window {
  constructor (id, zIndex, deskElement, position) {
    super(id, 'Memory', 'MemoryContent', zIndex, deskElement, position)
    this.setWindowSize(new Point2D(500, 500))
  }

  // What to do? Start from scratch or do memory exercise?
}
