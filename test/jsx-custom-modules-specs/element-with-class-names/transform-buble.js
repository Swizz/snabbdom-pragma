
import Snabbdom from '../../../src/index'

var isVisible = () => {}

export default () => {
  return Snabbdom.createElementWithModules({"attrs": "", "props": ""})( 'div', { 'class-visible': isVisible })
}
