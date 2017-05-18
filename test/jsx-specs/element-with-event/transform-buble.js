
import Snabbdom from '../../../src/snabbdom-pragma'

var callback = () => {}

export default () => {
  return Snabbdom.createElement( 'button', { 'on-click': callback })
}
