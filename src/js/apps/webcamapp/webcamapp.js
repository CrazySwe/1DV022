/**
 * @author Kevin Cederholm
 * @version 1.0
 */
import Window from '../../window.js'
import Point2D from '../../point2d.js'

export default class Webcam extends Window {
  /**
   *Creates an instance of Webcam.
   * @param {number} id
   * @param {number} zIndex
   * @param {HTMLElement} deskElement
   * @param {Point2D} position
   * @memberof Webcam
   */
  constructor (id, zIndex, deskElement, position) {
    super(id, 'Webcamapp', zIndex, deskElement, position)
    this.setWindowSize(new Point2D(500, 400))

    this.videoTemp = document.querySelector('#videoTemplate').content.cloneNode(true)
    this.videoNode = this.videoTemp.querySelector('.video')

    this.contentNode.innerHTML = ''
    this.contentNode.append(this.videoTemp)

    this.startCam()
  }
  /**
   * Start to ask for rights to get webcamstream
   *
   * @memberof Webcam
   */
  startCam () {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(this.handleCamStream.bind(this))
        .catch(function (error) {
          console.log(error)
          console.log('Something went wrong!')
        })
    }
  }

  /**
   * Handles MediaStream of webcam
   *
   * @param {*} mediaStream
   * @memberof Webcam
   */
  handleCamStream (mediaStream) {
    this.mediaStream = mediaStream
    this.videoNode.srcObject = this.mediaStream

    this.contentNode.style.overflow = 'hidden'

    let height = this.mediaStream.getVideoTracks()[0].getSettings().height
    let width = this.mediaStream.getVideoTracks()[0].getSettings().width

    this.setWindowSize(new Point2D(width, height))
  }

  /**
   * Destroys the window and stops cam stream
   *
   * @memberof Webcam
   */
  destroy () {
    this.mediaStream.getVideoTracks()[0].stop()
    super.destroy()
  }
}
