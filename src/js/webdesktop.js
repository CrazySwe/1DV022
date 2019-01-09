import Window from './window.js'
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
    this.desktopElement = document.querySelector('#desk-frame')
    this.zCount = 0
    this.idCount = 0
    this.windows = []
    this.focusedWindowedWindow = null
    this.offsetX = 0
    this.offsetY = 0
    this.dragMouseFunc = this.onDragMouse.bind(this)
    this.mouseUpFunc = this.mouseUp.bind(this)
  }

  run () {
    window.addEventListener('mousedown', this.mouseDown.bind(this))
    window.addEventListener('keydown', this.keyDown.bind(this))
    window.addEventListener('resize', this.onDeskResize.bind(this))

    // Test window
    let newWindow = new Window(this.idCount++, 'TestWindow', 'test', this.zCount++)
    this.windows.push(newWindow)

    // console.log(this.windows)
    // Starting the WebDesktop from here?
    // add eventlisteners on the desktop
  }

  mouseDown (event) {
    event.preventDefault()

    // window.element.contains(event.target)
    // Identify window correctly here
    if (event.target.className === 'window-topbar') {
      this.offsetY = (event.clientY - parseInt(event.target.parentElement.style.top, 10))
      this.offsetX = (event.clientX - parseInt(event.target.parentElement.style.left, 10))

      this.setfocus(event.target)

      document.addEventListener('mousemove', this.dragMouseFunc)
      document.addEventListener('mouseup', this.mouseUpFunc)
    } else if (event.target.tagName === 'LI') {
      switch (event.target.attributes.value.value) {
        case 'quizapp':
          this.createWindow('quizappen', 'content')
          break
        case 'memoryapp':
          this.createWindow('memoryappen', 'putcontenthere')
          break
      }
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
    let halfWidth = this.focusedWindow.parentElement.clientWidth / 2
    let halfHeigth = this.focusedWindow.parentElement.clientWidth / 2

    if (x >= 0 && x <= (window.innerWidth - halfWidth)) {
      this.focusedWindow.parentElement.style.left = x + 'px'
    }
    if (y >= 0 && y <= (window.innerHeight - halfHeigth)) {
      this.focusedWindow.parentElement.style.top = y + 'px'
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

  setfocus (element) {
    this.focusedWindow = element
    element.style.zIndex = this.zCount++
  }

  createWindow (name, content) {
    let newWindow = new Window(this.idCount++, name, content, this.zCount++)
    this.windows.push(newWindow)
    this.desktopElement.append(newWindow.element)
  }

  openApplication () {
  }
}
