
import h from 'snabbdom/h'

export default () => {
  return h('svg', {}, [
    h('g', {}, [
      h('circle', {
        attrs: { cx: 43.5, cy: 23, r: 5 }
      }, [])
    ])
  ])
}
