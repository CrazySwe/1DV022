/**
 * @author Kevin
 * @version 1.0
 */
const template = document.createElement('template')
template.innerHTML = `
<style>
  :host {
    background:#002418;
    font-size: 1.2em;
    color:white;
    width:500px;
    height:200px;
    padding:10px;
    border:6px solid #9b3b00;
    border-bottom:12px solid #9b3b00;
    overflow:hidden;
    margin:10px;
    float:left;
    border-radius: 3px;
  }
</style>

<p id='text'>I love JS</p>

`

export default class BartBoard extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  static get observedAttributes () {
    return ['text']
  }
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'text') {
      this.shadowRoot.querySelector('#text').innerText = newValue
    }
  }
  connectedCallback () {
    if (this.hasAttribute('text')) {
      this.shadowRoot.querySelector('#text').innerText = this.getAttribute('text')
    }
  }
}
window.customElements.define('bart-board', BartBoard)
