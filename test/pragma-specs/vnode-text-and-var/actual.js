
import Snabbdom from '../../../src/index'

const name = 'world'

export default () => {
  return Snabbdom.createElement('span', null, 'Hello ', name)
}
