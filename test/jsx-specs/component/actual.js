
import Snabbdom from '../../../src/index'

export default () => {

  const Component = (name) =>
    <div>Hello { name }</div>

  return <Component name="world"/>

}
