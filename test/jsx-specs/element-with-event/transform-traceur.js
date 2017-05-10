
import Snabbdom from '../../../src/index';
const callback = () => {};
export default () => {
  return Snabbdom.createElement("button", {"on-click": callback});
};
//# sourceURL=<compile-source>
