
import { createElement } from '../../../src/index'

export default () => {

  return createElement('div', null, [
    createElement('span', null, 'Hello'),
    createElement('span', null, 'World')
  ])

}
