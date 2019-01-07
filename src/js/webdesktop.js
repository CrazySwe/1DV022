
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
    this.offsetX = null
    this.offsetY = null
    this.dragMouseFunc = this.onDragMouse.bind(this)
    this.mouseUpFunc = this.mouseUp.bind(this)
  }

  run () {
    window.addEventListener('mousedown', this.mouseDown.bind(this))
    window.addEventListener('keydown', this.keyDown.bind(this))
    window.addEventListener('resize', this.onDeskResize.bind(this))

    // Test window
    let wTemp = document.querySelector('#windowtemp').content.cloneNode(true)
    wTemp.querySelector('.window').style.top = '100px'
    wTemp.querySelector('.window').style.left = '100px'
    document.querySelector('#desk-frame').prepend(wTemp)

    // Starting the WebDesktop from here?
    // add eventlisteners on the desktop
  }

  mouseDown (event) {
    event.preventDefault()
    if (event.target.className === 'window-topbar') {
      this.offsetY = (event.clientY - parseInt(event.target.parentElement.style.top, 10))
      this.offsetX = (event.clientX - parseInt(event.target.parentElement.style.left, 10))
      this.focus = event.target

      document.addEventListener('mousemove', this.dragMouseFunc)
      document.addEventListener('mouseup', this.mouseUpFunc)
    }
  }

  mouseUp (event) {
    event.preventDefault()
    document.removeEventListener('mousemove', this.dragMouseFunc)
    document.removeEventListener('mouseup', this.mouseUpFunc)
  }

  keyDown (event) {
    // event.preventDefault()
    console.log(event.key)
  }

  onDragMouse (event) {
    event.preventDefault()
    this.moveWindowTo((event.clientX - this.offsetX), (event.clientY - this.offsetY))
    // console.log('new pos: x ' + event.clientX + ': y ' + event.clientY)
  }

  moveWindowTo (x, y) {
    // Set maximum offscreen
    let halfWidth = this.focus.parentElement.clientWidth / 2
    let halfHeigth = this.focus.parentElement.clientWidth / 2

    if (x >= 0 && x <= (window.innerWidth - halfWidth)) {
      this.focus.parentElement.style.left = x + 'px'
    }
    if (y >= 0 && y <= (window.innerHeight - halfHeigth)) {
      this.focus.parentElement.style.top = y + 'px'
    }
  }

  onDeskResize () {
    /**
     * foreach window
     *  if outside boundaries
     *    moveinsideboundaries
     *  endif
     * endforeach
     */
    console.log('Someone changed the size of the desk!')
  }
}
