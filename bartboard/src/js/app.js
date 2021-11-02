/**
 * @author Kevin
 * @version 1.0
 */
// import BartBoard from './bart-board.js'
import './bart-board.js'

let bb1 = document.createElement('bart-board')
bb1.setAttribute('text', 'This is working really well! ')
bb1.setAttribute('speed', '2')
document.querySelector('#board').appendChild(bb1)

bb1.addEventListener('filled', () => {
  bb1.wipeBoard()
})
