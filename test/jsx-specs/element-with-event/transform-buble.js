
import Snabbdom from '../../../src/index'

var callback = () => {}

export default () => {
  return Snabbdom.createElement( 'button', { 'on-click': callback })
}
