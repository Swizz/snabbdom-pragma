
import h from 'snabbdom/h'

import { isVisible, isEnabled } from './neutral'

export default () => {
  return h('div', {
    class: { visible: isVisible, enabled: isEnabled }
  }, [])
}
