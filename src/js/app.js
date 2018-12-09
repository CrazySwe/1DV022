/**
 * @author Kevin Cederholm
 * @version 1.0
 */

import Quiz from './quiz.js'

document.querySelector('#start').addEventListener('click', event => {
  let name = document.querySelector('#name')
  if (name.value.length >= 1) {
    let q = new Quiz(name.value)
    q.nextQuestion()
  }
})

document.querySelector('#name').focus()
