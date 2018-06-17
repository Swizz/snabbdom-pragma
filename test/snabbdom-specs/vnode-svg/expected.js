
export default (h) => {
  return h('svg', { attrs: {} }, [
    h('g', { attrs: {} }, [
      h('circle', {
        attrs: { cx: 43.5, cy: 23, r: 5 }
      }, []),
      h('polygon', {
        attrs: { points: '60,30 90,90 30,90' }
      }, [
        h('animateTransform', {
          attrs: { type: 'rotate', from: '0 60 70', to: '360 60 70' }
        }, [])
      ])
    ])
  ])
}
