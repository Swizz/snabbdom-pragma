
import { createElement } from '../../../src/index'

export default () => {
  return createElement('svg', null, [
    createElement('g', null, [
      createElement('circle', { cx: 43.5, cy: 23, r: 5 })
    ])
  ])
}
