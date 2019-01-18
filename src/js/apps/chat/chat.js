/**
 * @author Kevin Cederholm
 * @version 1.0
 * TODO: 1. Fix styling
 */
import Window from '../../window.js'

export default class Chat extends Window {
  /**
   *Creates an instance of ChatApplication
   * @param {number} id
   * @param {number} zIndex
   * @param {HTMLElement} deskElement
   * @param {Point2D} position
   * @memberof Chat
   */
  constructor (id, zIndex, deskElement, position) {
    super(id, 'ChatApp', zIndex, deskElement, position, './image/chatappicon_16.png')
    this.wSocket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    this.APIKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'

    this.storageName = 'ChatAppUsername'

    this.saveUsernameHandler = this.saveUsername.bind(this)
    this.openUsernameDialogHandler = this.openUsernameDialog.bind(this)
    this.chatTemplate = document.querySelector('#chatAppTemp').content.cloneNode(true)
    this.contentNode.innerHTML = ''
    this.addMenu()
    this.username = this.getUsername()
    this.chatTemplate.querySelector('.chatusername').innerText = this.username + ':'
    this.contentNode.append(this.chatTemplate)
    this.contentNode.querySelector('.messageText').focus()

    this.sendMsgHandler = this.sendMessage.bind(this)
    this.contentNode.querySelector('.messageSendBtn').addEventListener('click', this.sendMsgHandler)

    // Open and start the chat
    this.openSocket()
  }

  /**
   * Opens the webSocket event handlers
   *
   * @memberof Chat
   */
  openSocket () {
    this.wSocket.onopen = this.onOpen.bind(this)
    this.wSocket.onclose = this.onClose.bind(this)
    this.wSocket.onmessage = this.onMessage.bind(this)
    this.wSocket.onerror = this.onError.bind(this)
  }

  /**
   * Handles the event onOpen on websocket
   *
   * @param {*} evt
   * @memberof Chat
   */
  onOpen (evt) {
    // console.log('WebSocket Opened.')
  }

  /**
   * Handles the closing of the websocket
   *
   * @param {*} evt
   * @memberof Chat
   */
  onClose (evt) {
    // console.log('WebSocket Closed.')
  }

  /**
   * Handles the messages received on the websocket
   *
   * @param {*} evt
   * @memberof Chat
   */
  onMessage (evt) {
    let msg = JSON.parse(evt.data)
    switch (msg.type) {
      case 'notification':
        this.addMessage(msg)
        break
      case 'message':
        this.addMessage(msg)
        break
      case 'heartbeat':
        break
      default:
    }
  }

  /**
   * Handles any errors from the websocket
   *
   * @param {*} evt
   * @memberof Chat
   */
  onError (evt) {
    console.log('WebSocket ERROR.')
  }

  /**
   * Adds a message to the chat window
   *
   * @param {*} msg
   * @memberof Chat
   */
  addMessage (msg) {
    let message = document.createElement('p')
    if (msg.type === 'notification') {
      message.style.backgroundColor = 'lightyellow'
    }
    if (msg.username === this.username) {
      message.style.backgroundColor = 'lightblue'
    }
    if (msg.channel) {
      message.textContent = `${msg.username}@${msg.channel}: ${msg.data}`
    } else {
      message.textContent = `${msg.username}: ${msg.data}`
    }
    this.contentNode.querySelector('.messages').append(message)
  }

  /**
   * Sends message through the websocket
   *
   * @param {*} evt
   * @memberof Chat
   */
  sendMessage (evt) {
    let msgText = this.contentNode.querySelector('.messageText').value
    this.contentNode.querySelector('.messageText').value = ''

    if (msgText !== '') {
      let msg = {
        'username': this.username,
        'type': 'message',
        'data': msgText,
        // 'channel': 'TheSecretChannel#42',
        'key': this.APIKey
      }
      this.wSocket.send(JSON.stringify(msg))
    }
  }

  /**
   * Adds the menu on the window
   *
   * @memberof Chat
   */
  addMenu () {
    let menu = document.createElement('div')
    let button = document.createElement('a')

    menu.classList.add('window-menu')
    button.classList.add('menubtn1')
    button.href = '#'
    button.innerText = 'Set Username'
    button.addEventListener('click', this.openUsernameDialogHandler)

    menu.append(button)
    this.element.insertBefore(menu, this.contentNode)
  }

  /**
   * Gets any saved username else opens the dialog for setting a username
   *
   * @returns
   * @memberof Chat
   */
  getUsername () {
    let name = window.localStorage.getItem(this.storageName)
    if (name === null) {
      this.openUsernameDialog()
      name = 'DefaultUserName'
    }
    return name
  }

  /**
   * Saves the username set
   *
   * @memberof Chat
   */
  saveUsername () {
    let name = this.contentNode.querySelector('#setUsernameTxt').value

    if (name !== '') {
      this.username = name
      window.localStorage.setItem(this.storageName, name)
      this.contentNode.querySelector('.chatusername').innerText = name + ':'

      this.contentNode.querySelector('.saveUsernameBtn').removeEventListener('click', this.saveUsernameHandler)
      this.contentNode.querySelector('.overlay').remove()
      this.contentNode.querySelector('#chatAppSetUsernameDialog').remove()
    }
  }

  /**
   * Opens the username setting dialog
   *
   * @memberof Chat
   */
  openUsernameDialog () {
    let dialog = document.querySelector('#chatAppSetUserNameTemp').content.cloneNode(true)
    dialog.querySelector('.saveUsernameBtn').addEventListener('click', this.saveUsernameHandler)

    this.contentNode.append(dialog)
  }

  /**
   * Handles the destruction of the websocket chat and entire window
   *
   * @memberof Chat
   */
  destroy () {
    super.destroy()
    this.wSocket.close(1000, 'AppClose')
    this.contentNode.querySelector('.messageSendBtn').removeEventListener('click', this.sendMsgHandler)
  }
}
