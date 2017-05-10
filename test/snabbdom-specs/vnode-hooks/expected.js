
import { onInit } from './neutral'

export default (h) => {
  return h('div', { hook: { init: onInit } }, [])
}
