
import Snabbdom from '../../../src/index'

export default () => {
  const Component = ({ name }) => // eslint-disable-line no-unused-vars
    <div>Hello { name }</div>

  return <Component/>
}
