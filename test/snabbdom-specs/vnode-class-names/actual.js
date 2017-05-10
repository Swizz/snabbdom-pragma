
import { isVisible, isEnabled } from './neutral'

export default (createElement) => {
  return createElement('div', { 'class-visible': isVisible, 'class-enabled': isEnabled })
}
