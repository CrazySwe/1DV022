/**
 * @author Kevin Cederholm
 * @version 1.0
 */

export default class Window {
  constructor (id, name, content, zIndex) {
    this.element = document.querySelector('#windowtemp').content.cloneNode(true)
    this.element.querySelector('.window').id = 'window' + id
    this.name = name
    this.id = 'win' + id
    this.zIndex = zIndex
    this.name = name
    this.content = content
    this.element.querySelector('.window-name').textContent = this.name
    // this.element.querySelector('.window-topbar').textContent = this.name + ' Drag ' + ' ExitButton '
    this.element.querySelector('.window').style.top = '100px'
    this.element.querySelector('.window').style.left = '100px'
    this.element.querySelector('.window').style.zIndex = zIndex
  }
}
