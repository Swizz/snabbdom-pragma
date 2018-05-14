
import Snabbdom from '../../../src/index';
export default () => {
  const Component = ({name}) => Snabbdom.createElement("div", null, "Hello ", name);
  return Snabbdom.createElement(Component, null);
};
//# sourceURL=<compile-source>
