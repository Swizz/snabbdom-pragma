
import Snabbdom from '../../../src/snabbdom-pragma'

var isVisible = () => {}

export default () => {
  return Snabbdom.createElement( 'div', { 'class-visible': isVisible })
}
