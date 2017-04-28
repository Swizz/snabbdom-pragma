
import h from 'snabbdom/h'

import { onInit } from './neutral'

export default () => {
  return h('div', { hook: { init: onInit } }, [])
}
