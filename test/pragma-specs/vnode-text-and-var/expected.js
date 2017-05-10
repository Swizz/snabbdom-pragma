
import h from 'snabbdom/h'

const name = 'world'

export default () => {
  return h('span', {}, ['Hello ', name])
}
