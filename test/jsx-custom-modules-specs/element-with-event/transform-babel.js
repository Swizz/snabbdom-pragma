
import Snabbdom from '../../../src/index';

const callback = () => {};

export default (() => {
  return Snabbdom.createElementWithModules({"attrs": "", "props": ""})('button', { 'on-click': callback });
});
