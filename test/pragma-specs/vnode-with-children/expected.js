
import h from 'snabbdom/h'

export default () => {
  return h('div', {}, [
    h('span', {}, 'Hello'),
    h('span', {}, 'World')
  ])
}
