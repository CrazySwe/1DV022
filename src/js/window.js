import Point2D from './point2d.js'

/**
 * @author Kevin Cederholm
 * @version 1.0
 */

export default class Window {
  constructor (id, name, content, zIndex, deskElement) {
    this.element = document.querySelector('#windowtemp').content.cloneNode(true)
    this.id = 'win' + id
    this.name = name
    this.zIndex = zIndex
    this.offset = new Point2D(0, 0)
    this.name = name
    this.content = content
    this.mouseUpRef = this.mouseUp.bind(this)
    this.mouseMoveRef = this.onDragMouse.bind(this)
    this.init()
    deskElement.append(this.element)
  }

  init () {
    this.element.querySelector('.window').id = this.id
    this.element.querySelector('.window-content').innerHTML = this.content
    this.element.querySelector('.window-name').textContent = this.name
    this.element.querySelector('.window').style.top = '100px'
    this.element.querySelector('.window').style.left = '100px'
    this.element.querySelector('.window').style.zIndex = this.zIndex
    this.element = this.element.querySelector('#' + this.id)

    // test stuff
    this.element.querySelector('.window-menu').addEventListener('click', event => {
      // this.moveWindowTo(300, 300)
    })

    // Move window
    this.element.querySelector('.window-topbar').addEventListener('mousedown', this.onMouseDown.bind(this))
    // Close Window
    this.element.querySelector('.closebtn').addEventListener('click', this.destroy.bind(this))
  }

  onMouseDown (event) {
    this.offset.x = (event.clientX - parseInt(event.target.closest('#' + this.id).style.left, 10))
    this.offset.y = (event.clientY - parseInt(event.target.closest('#' + this.id).style.top, 10))

    document.addEventListener('mousemove', this.mouseMoveRef)
    document.addEventListener('mouseup', this.mouseUpRef)
  }

  onDragMouse (event) {
    this.moveWindowTo((event.clientX - this.offset.x), (event.clientY - this.offset.y))
  }

  mouseUp (event) {
    document.removeEventListener('mousemove', this.mouseMoveRef)
    document.removeEventListener('mouseup', this.mouseUpRef)
  }

  moveWindowTo (x, y) {
    // Set maximum offscreen
    let halfWidth = this.element.clientWidth / 2
    let halfHeigth = this.element.clientWidth / 2

    if (x >= 0 && x <= (window.innerWidth - halfWidth)) {
      this.element.style.left = x + 'px'
    }
    if (y >= 0 && y <= (window.innerHeight - halfHeigth)) {
      this.element.style.top = y + 'px'
    }
  }

  destroy () {
    this.element.remove()
  }
}
