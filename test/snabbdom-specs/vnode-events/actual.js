
import Snabbdom from '../../../src/index'

import { clickHandler } from './neutral'

export default () => {
  return Snabbdom.createElement('div', { 'on-click': clickHandler })
}
