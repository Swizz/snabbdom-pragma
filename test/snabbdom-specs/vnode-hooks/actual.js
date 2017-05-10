
import { onInit } from './neutral'

export default (createElement) => {
  return createElement('div', { 'hook-init': onInit })
}
