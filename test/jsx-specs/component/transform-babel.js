
import Snabbdom from '../../../src/snabbdom-pragma';

export default (() => {
  const Component = ({ name }) => // eslint-disable-line no-unused-vars
  Snabbdom.createElement(
    "div",
    null,
    "Hello ",
    name
  );

  return Snabbdom.createElement(Component, { name: "world" });
});
