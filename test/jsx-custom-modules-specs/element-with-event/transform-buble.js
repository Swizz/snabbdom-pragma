
import Snabbdom from '../../../src/index'

var callback = () => {}

export default () => {
  return Snabbdom.createElementWithModules({"attrs": "", "props": ""})( 'button', { 'on-click': callback })
}
