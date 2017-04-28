
import h from 'snabbdom/h'

import { clickHandler } from './neutral'

export default () => {
  return h('div', { on: { click: clickHandler } }, [])
}
