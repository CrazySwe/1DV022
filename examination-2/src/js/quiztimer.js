/**
 * @author Kevin Cederholm
 * @version 1.0
 */
/**
 *  Creates a simple timer
 *
 * @export
 * @class QuizTimer
 */
export default class QuizTimer {
  /**
   * Creates an instance of QuizTimer.
   * @param {number} time the timer number in seconds
   * @param {element} element the element to update the timer value on
   * @param {function} cb the callback function to call when timer runs out
   * @memberof QuizTimer
   */
  constructor (time, element, cb) {
    this.intervalID = undefined
    this.callback = cb
    this.time = time
    this.rate = 100
    this.element = element
    this.startTime = Date.now()
  }
  /**
   * Starts the timer
   *
   * @param {number} [rate=this.rate] The rate of refresh of the timer
   * @memberof QuizTimer
   */
  start (rate = this.rate) {
    this.startTime = Date.now()
    this.intervalID = setInterval(this.tick.bind(this), rate)
  }
  /**
   * This runs every tick of the timer
   *
   * @memberof QuizTimer
   */
  tick () {
    this.print(this.timeLeft())
    if (this.elapsedTime(true) >= this.time) {
      this.callback()
      this.stop()
    }
  }
  /**
   * Gets the elapsed time of the timer
   *
   * @param {boolean} seconds true returns seconds, false returns milliseconds
   * @returns {number}
   * @memberof QuizTimer
   */
  elapsedTime (seconds) {
    let now = Date.now()
    let diff = (now - this.startTime)
    return seconds ? (diff / 1000).toFixed(0) : diff
  }
  /**
   * Returns the timeleft of the timer in seconds
   *
   * @returns {number} seconds
   * @memberof QuizTimer
   */
  timeLeft () {
    return this.time - this.elapsedTime(true)
  }
  /**
   * Stops the timer and returns milliseconds elapsed sinece start
   *
   * @returns {number} milliseconds
   * @memberof QuizTimer
   */
  stop () {
    clearInterval(this.intervalID)
    return this.elapsedTime(false)
  }
  /**
   * prints the seconds left into element
   *
   * @param {number} timeLeft seconds
   * @memberof QuizTimer
   */
  print (timeLeft) {
    this.element.replaceChild(document.createTextNode(timeLeft), this.element.firstChild)
  }
}
