
import Snabbdom from '../../../src/index';
const callback = () => { };
export default () => {
  return Snabbdom.createElementWithModules({"attrs": "", "props": ""})('button', { props: { 'on-click': callback }});
};
