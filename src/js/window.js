/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import Point2D from './point2d.js'

export default class Window {
  /**
   * Creates an instance of Window.
   * @param {String} id
   * @param {*} name
   * @param {*} zIndex
   * @param {*} deskElement
   * @param {*} position
   * @memberof Window
   */
  constructor (id, name, zIndex, deskElement, position) {
    this.element = document.querySelector('#windowtemp').content.cloneNode(true)
    this.id = 'win' + id
    this.name = name
    this.zIndex = zIndex
    this.offset = new Point2D(0, 0)
    this.minSize = new Point2D(200, 150)
    this.position = position
    this.name = name
    this.contentNode = this.element.querySelector('.window-content')

    // Event Handlers
    this.mouseUpHandler = this.mouseUp.bind(this)
    this.mouseMoveHandler = this.onDragMouse.bind(this)
    this.resizeDragHandle = this.resizeDrag.bind(this)

    this.init()
    deskElement.append(this.element)
    this.element = document.querySelector('#' + this.id)
    this.setWindowSize(new Point2D(300, 400))
  }
  /**
   * init the window and sets eventlisteners
   *
   * @memberof Window
   */
  init () {
    this.element.querySelector('.window').id = this.id
    this.element.querySelector('.window-name').textContent = this.name
    this.element.querySelector('.window').style.top = this.position.y + 'px'
    this.element.querySelector('.window').style.left = this.position.x + 'px'
    this.element.querySelector('.window').style.zIndex = this.zIndex

    // Move window
    this.element.querySelector('.window-topbar').addEventListener('mousedown', this.onMouseDown.bind(this))
    // Close Window
    this.element.querySelector('.closebtn').addEventListener('click', this.destroy.bind(this))
    // Resize Window
    this.element.querySelector('.window-resizebtn').addEventListener('mousedown', this.resize.bind(this))
  }

  /**
   * Starts to move the window around
   *
   * @param {*} event
   * @memberof Window
   */
  onMouseDown (event) {
    this.offset.x = (event.clientX - parseInt(event.target.closest('#' + this.id).style.left, 10))
    this.offset.y = (event.clientY - parseInt(event.target.closest('#' + this.id).style.top, 10))

    document.addEventListener('mousemove', this.mouseMoveHandler)
    document.addEventListener('mouseup', this.mouseUpHandler)
  }

  /**
   * Handle the window dragging
   *
   * @param {*} event
   * @memberof Window
   */
  onDragMouse (event) {
    this.moveWindowTo(new Point2D(event.clientX - this.offset.x, event.clientY - this.offset.y))
  }

  /**
   * Ends the dragging of the window
   *
   * @param {*} event
   * @memberof Window
   */
  mouseUp (event) {
    document.removeEventListener('mousemove', this.mouseMoveHandler)
    document.removeEventListener('mouseup', this.mouseUpHandler)
  }

  /**
   * Moves the window to x,y position on the desktop
   *
   * @param {Point2D} pos
   * @memberof Window
   */
  moveWindowTo (pos) {
    // Set maximum offscreen
    let halfWidth = this.element.clientWidth / 2
    let halfHeigth = this.element.clientWidth / 2

    if (pos.x < 0) { pos.x = 0 }
    if (pos.y < 0) { pos.y = 0 }

    if (pos.x >= 0 && pos.x <= (window.innerWidth - halfWidth)) {
      this.element.style.left = pos.x + 'px'
    }
    if (pos.y >= 0 && pos.y <= (window.innerHeight - halfHeigth)) {
      this.element.style.top = pos.y + 'px'
    }
  }

  /**
   * Changes the size of the window
   *
   * @param {Point2D} size
   * @memberof Window
   */
  setWindowSize (size) {
    if (size.x > this.minSize.x) {
      this.contentNode.style.width = size.x + 'px'
    }
    if (size.y > this.minSize.y) {
      this.contentNode.style.height = size.y + 'px'
    }
  }

  /**
   * Starts the resizing dragging event
   *
   * @param {*} event
   * @memberof Window
   */
  resize (event) {
    this.offset = new Point2D(event.clientX, event.clientY)
    this.origsize = new Point2D(parseInt(this.contentNode.style.width), parseInt(this.contentNode.style.height))

    document.addEventListener('mousemove', this.resizeDragHandle)
    document.addEventListener('mouseup', event => {
      document.removeEventListener('mousemove', this.resizeDragHandle)
    })
  }

  /**
   * Sets the new window size while dragging the size
   *
   * @param {*} event
   * @memberof Window
   */
  resizeDrag (event) {
    let size = new Point2D(event.clientX - this.offset.x + this.origsize.x, event.clientY - this.offset.y + this.origsize.y)
    this.setWindowSize(size)
  }

  /**
   * Handles the destruction of the window
   *
   * @memberof Window
   */
  destroy () {
    this.element.remove()
  }
}
