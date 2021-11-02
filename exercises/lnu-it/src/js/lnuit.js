/**
 * @author Kevin Cederholm
 * @version 1.0
 */
export default class LNUit {
  static addStyleSheet (file, node) {
    let nodeHead = document.querySelector(node) || document.head
    let linkNode = document.createElement('link')

    linkNode.setAttribute('href', file)
    linkNode.setAttribute('rel', 'stylesheet')
    linkNode.setAttribute('media', 'screen')

    nodeHead.appendChild(linkNode)
    console.log('addStyleSheet called.')
  }
}
