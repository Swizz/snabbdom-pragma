
import Snabbdom from '../../../src/snabbdom-pragma'

export default () => {
  const Component = ({ name }) => // eslint-disable-line no-unused-vars
    <div>Hello { name }</div>

  return <Component name="world"/>
}
