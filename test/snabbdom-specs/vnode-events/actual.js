
import { clickHandler } from './neutral'

export default (createElement) => {
  return createElement('div', { 'on-click': clickHandler })
}
