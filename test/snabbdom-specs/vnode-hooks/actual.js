
import Snabbdom from '../../../src/index'

import { onInit } from './neutral'

export default () => {
  return Snabbdom.createElement('div', { 'hook-init': onInit })
}
