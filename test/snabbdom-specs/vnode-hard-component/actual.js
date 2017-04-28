
import { createElement } from '../../../src/index'

export default () => {
  const Component = ({ name }) =>
    createElement('div', null, 'Hello ', name)

  return createElement(Component, { name: 'world' })
}
