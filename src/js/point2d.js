/**
 * @author Kevin Cederholm
 * @version 1.0
 */
export default class Point2D {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  toString () {
    return 'X = ' + this.x + ' Y = ' + this.y
  }
}
