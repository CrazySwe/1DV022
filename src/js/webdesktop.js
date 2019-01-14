/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import Point2D from './point2d.js'
import Memory from './apps/memory/memory.js'
import Chat from './apps/chat/chat.js'
import Webcam from './apps/webcamapp/webcamapp.js'

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
    this.focusedWindow = null
  }

  /**
   * Starts the event listeners on the desktop
   *
   * @memberof WebDesktop
   */
  run () {
    document.addEventListener('mousedown', this.mouseDown.bind(this))
    document.addEventListener('resize', this.onDeskResize.bind(this))
    document.addEventListener('click', this.mouseClick.bind(this))
  }

  /**
   * Handles the mouseclick on the desktop to start the applications
   *
   * @param {MouseEvent} event
   * @memberof WebDesktop
   */
  mouseClick (event) {
    if (event.target.tagName === 'LI') {
      let pos = new Point2D(50 + 15 * this.idCount, 50 + 15 * this.idCount)
      switch (event.target.attributes.value.value) {
        case 'webcamapp':
          this.windows.push(new Webcam(this.idCount++, this.zCount++, this.desktopElement, pos))
          break
        case 'memoryapp':
          this.windows.push(new Memory(this.idCount++, this.zCount++, this.desktopElement, pos))
          break
        case 'chatapp':
          this.windows.push(new Chat(this.idCount++, this.zCount++, this.desktopElement, pos))
          break
      }
    }
  }

  /**
   * Handles any mouse activity on the windows that are open
   *
   * @param {*} event
   * @memberof WebDesktop
   */
  mouseDown (event) {
    // Identify window correctly here
    if (event.target.closest('.window') != null) {
      let winIndex = 0
      for (let i = 0; i < this.windows.length && winIndex != null; i++) {
        if (event.target.closest('#' + this.windows[i].id) != null) {
          this.setfocus(this.windows[i].element)
          winIndex = i
        }
      }

      // Remove if they are closing the window
      if (event.target.classList.contains('closebtn')) {
        this.windows.splice(winIndex, 1)
      }
    }
  }

  /**
   * Handles the resize of the desktop
   *  //TODO!
   * @memberof WebDesktop
   */
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

  /**
   * Puts the window on top to focus on
   *
   * @param {Window} element - Window element
   * @memberof WebDesktop
   */
  setfocus (element) {
    // remove class activewindow on old
    this.focusedWindow = element
    // add class activewindow on new
    if (element.style.zIndex < this.zCount) {
      element.style.zIndex = ++this.zCount
    }
  }
}
