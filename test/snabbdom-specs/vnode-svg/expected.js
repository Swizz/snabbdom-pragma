
export default (h) => {
  return h('svg', { attrs: {} }, [
    h('g', { attrs: {} }, [
      h('circle', {
        attrs: { cx: 43.5, cy: 23, r: 5 }
      }, []),
      h('path', {
        attrs: { 'stroke-dasharray': 'foo' }
      }, [])
    ])
  ])
}
