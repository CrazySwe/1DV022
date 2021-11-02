/**
 * @author Kevin Cederholm
 * @version 1.0
 * @export
 * @class TempleOfDOM
 */
export default class TempleOfDOM {
  /**
   * Creates an instance of TempleOfDOM. Initializes properties
   *
   * @constructor
   * @param {string} resultTemplate - Result template identifier
   * @memberof TempleOfDOM
   */
  constructor (resultTemplate) {
    this.elementNodes = 0
    this.attributeNodes = 0
    this.commentNodes = 0
    this.textNodes = 0
    this.resultTemplate = resultTemplate
  }

  /**
   * Runs the TempleOfDOM program
   *
   * @param {HTMLCollection} node
   * @memberof TempleOfDOM
   */
  run (node) {
    this.node = node || document.children[0]
    this.countNodes(this.node)

    document.body.appendChild(this.printResultTemplate())
  }

  /**
   * Counts the amount of nodes in a HTMLCollection recursively
   *
   * @param {HTMLCollection} node
   * @memberof TempleOfDOM
   */
  countNodes (node) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants
    switch (node.nodeType) {
      case 1:
        this.countAttributes(node)
        this.elementNodes++
        break
      case 3:
        this.textNodes++
        break
      case 8:
        this.commentNodes++
        break
      default:
        break
    }

    if (!node.childNodes) {
      return
    }

    for (let i = 0; i < node.childNodes.length; i++) {
      this.countNodes(node.childNodes[i])
    }
  }

  /**
   * Counts the attributes of a node
   *
   * @param {HTMLCollection} node
   * @memberof TempleOfDOM
   */
  countAttributes (node) {
    if (node.attributes.length > 0) {
      this.attributeNodes += node.attributes.length
    }
  }

  /**
   * Returns the result in a formatted DocumentFragment
   *
   * @returns {DocumentFragment}
   * @memberof TempleOfDOM
   */
  printResultTemplate () {
    let htmlResult = document.createDocumentFragment()
    let templateNode = document.querySelector(this.resultTemplate)
    let resultArr = [
      { text: 'Number of elements', result: this.elementNodes },
      { text: 'Number of attributes', result: this.attributeNodes },
      { text: 'Number of comments', result: this.commentNodes },
      { text: 'Number of text nodes', result: this.textNodes }
    ]

    resultArr.map(valObj => {
      let templateCopy = document.importNode(templateNode.content, true)
      templateCopy.querySelector('.result h3').innerText = valObj.text
      templateCopy.querySelector('p.resultText').innerText = valObj.result
      htmlResult.appendChild(templateCopy)
    })
    return htmlResult
  }
}
