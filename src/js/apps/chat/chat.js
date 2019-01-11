/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import Window from '../../window.js'
export default class Chat extends Window {
  constructor (id, zIndex, deskElement, position) {
    super(id, 'ChatApp', 'ChatAppContent', zIndex, deskElement, position)
    this.wSocket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    this.openSocket()
    this.content.innerHTML = '<p>ChatRoom #1 of Internet</p>'

    // Test Data
    for (let i = 0; i < 25; i++) {
      this.content.innerHTML += '<p>This is a test</p>'
    }
    // console.log(this.webSocket)
  }
  openSocket () {
    this.wSocket.onopen = this.onOpen.bind(this)
    this.wSocket.onclose = this.onClose.bind(this)
    this.wSocket.onmessage = this.onMessage.bind(this)
    this.wSocket.onerror = this.onError.bind(this)
  }

  onOpen (evt) {
    console.log('WebSocket Opened.')
  }
  onClose (evt) {
    console.log('WebSocket Closed.')
  }
  onMessage (evt) {
    console.log(evt.data)
    let msg = JSON.parse(evt.data)
    switch (msg.type) {
      case 'notification':
        break
      case 'message':
        if (!msg.channel) {
          this.content.innerHTML += '<p>' + msg.username + ':' + msg.data + '</p>'
        } else {
          this.content.innerHTML += '<p>' + msg.username + '@' + msg.channel + ':' + msg.data + '</p>'
        }
        break
      case 'heartbeat':
        break
      default:
    }
  }
  onError (evt) {
    console.log('WebSocket ERROR.')
  }

  destroy () {
    super.destroy()
    this.wSocket.close()
  }
}
