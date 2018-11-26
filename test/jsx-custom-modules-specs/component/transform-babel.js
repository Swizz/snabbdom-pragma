
import Snabbdom from '../../../src/index';

export default (() => {
  const Component = ({ name }) => // eslint-disable-line no-unused-vars
  Snabbdom.createElementWithModules({"attrs": "", "props": ""})(
    "div",
    null,
    "Hello ",
    name
  );

  return Snabbdom.createElementWithModules({"attrs": "", "props": ""})(Component, { name: "world" });
});
