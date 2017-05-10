
import Snabbdom from '../../../src/index'

var isVisible = () => {}

export default () => {
  return Snabbdom.createElement( 'div', { 'class-visible': isVisible })
}
