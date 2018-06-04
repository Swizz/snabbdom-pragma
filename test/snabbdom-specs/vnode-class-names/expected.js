
import { isVisible, isEnabled } from './neutral'

export default (h) => {
  return h('div', {
    class: { visible: isVisible, enabled: isEnabled, 'alert-danger': true }
  }, [])
}
