/**
 * @author Kevin Cederholm
 * @version 1.0
 */
export default class QuizTimer {
  constructor (time, element, owner) {
    this.intervalID = undefined
    this.owner = owner
    this.time = time
    this.rate = 100
    this.element = element
    this.startTime = Date.now()
  }

  start () {
    this.startTime = Date.now()
    this.intervalID = setInterval(this.tick.bind(this), this.rate)
  }

  tick () {
    this.print(this.timeLeft())
    if (this.elapsedSeconds() > 10) {
      console.log(this.stop())
    }
  }

  elapsedTime (seconds) {
    let now = Date.now()
    let diff = (now - this.startTime)
    return seconds ? (diff / 1000).toFixed(0) : diff
  }

  timeLeft () {
    return this.time - this.elapsedTime(false)
  }

  stop () {
    clearInterval(this.intervalID)
    return this.elapsedTime(true)
  }

  print (timeLeft) {
    this.element.replaceChild(document.createTextNode(timeLeft), this.element.firstChild)
  }
}
