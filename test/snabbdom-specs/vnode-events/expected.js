
import { clickHandler } from './neutral'

export default (h) => {
  return h('div', { on: { click: clickHandler } }, [])
}
