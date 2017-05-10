
import h from 'snabbdom/h'

export default () => {
  return h('div', {
    props: { 'data-color': 'red', 'data-hidden': true }
  }, [])
}
