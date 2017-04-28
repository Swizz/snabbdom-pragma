
import { createElement } from '../../../src/index'

import { isVisible, isEnabled } from './neutral'

export default () => {
  return createElement('div', { 'class-visible': isVisible, 'class-enabled': isEnabled })
}
