/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import Window from './window.js'
import Point2D from './point2d.js'

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

  run () {
    window.addEventListener('mousedown', this.mouseDown.bind(this))
    window.addEventListener('resize', this.onDeskResize.bind(this))
  }

  mouseDown (event) {
    // Identify window correctly here
    if (event.target.closest('.window') != null) {
      let found = false
      for (let i = 0; i < this.windows.length && !found; i++) {
        if (event.target.closest('#' + this.windows[i].id) != null) {
          this.setfocus(this.windows[i].element)
          found = true
        }
      }
    }
    if (event.target.tagName === 'LI') {
      switch (event.target.attributes.value.value) {
        case 'valfri':
          this.createWindow('valfri', 'valfricontent')
          break
        case 'memoryapp':
          this.createWindow('memoryappen', 'putcontenthere')
          break
        case 'chatapp':
          this.createWindow('ChatApp', 'Content for chat here')
          break
      }
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
    // remove class activewindow on old
    this.focusedWindow = element
    // add class activewindow on new
    if (element.style.zIndex < this.zCount) {
      element.style.zIndex = ++this.zCount
    }
  }

  createWindow (name, content) {
    let pos = new Point2D(50 + 15 * this.idCount, 50 + 15 * this.idCount)
    this.windows.push(new Window(this.idCount++, name, content, this.zCount++, this.desktopElement, pos))
  }
}
