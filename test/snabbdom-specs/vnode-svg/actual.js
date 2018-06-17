
export default (createElement) => {
  return createElement('svg', null, [
    createElement('g', null, [
      createElement('circle', { cx: 43.5, cy: 23, r: 5 }),
      createElement('polygon', { points: '60,30 90,90 30,90' }, [
        createElement('animateTransform', { type: 'rotate', from: '0 60 70', to: '360 60 70' })
      ])
    ])
  ])
}
