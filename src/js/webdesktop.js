
/**
 * @author Kevin Cederholm
 * @version 1.0
 */
export default class WebDesktop {
  /**
   * Creates an instance of WebDesktop.
   * @memberof WebDesktop
   */
  constructor () {
    this.windows = []
    this.focus = null
    this.x = null
    this.y = null
    this.dragMouseFunc = this.onDragMouse.bind(this)
    this.mouseUpFunc = this.mouseUp.bind(this)
  }

  run () {
    document.addEventListener('mousedown', this.mouseDown.bind(this))
    document.addEventListener('keydown', this.keyDown.bind(this))
    // Starting the WebDesktop from here?
    // add eventlisteners on the desktop
  }

  mouseDown (event) {
    event.preventDefault()
    if (event.target.className === 'window-topbar') {
      this.focus = event.target

      document.addEventListener('mousemove', this.dragMouseFunc)
      document.addEventListener('mouseup', this.mouseUpFunc)
      // console.log('x ' + event.clientX + ': y ' + event.clientY)
    }
  }

  mouseUp (event) {
    event.preventDefault()
    document.removeEventListener('mousemove', this.dragMouseFunc)
    document.removeEventListener('mouseup', this.mouseUpFunc)
  }

  keyDown (event) {
    // event.preventDefault()
    // console.log('Key pressed down - ' + event.keyCode)
  }

  onDragMouse (event) {
    event.preventDefault()
    this.focus.parentElement.style.top = event.clientY + 'px'
    this.focus.parentElement.style.left = event.clientX + 'px'
    // console.log('x ' + event.clientX + ': y ' + event.clientY)
  }
}
