
export default (createElement) => {
  return createElement('svg', null, [
    createElement('g', null, [
      createElement('circle', { cx: 43.5, cy: 23, r: 5 }),
      createElement('path', { 'stroke-dasharray': 'foo' })
    ])
  ])
}
