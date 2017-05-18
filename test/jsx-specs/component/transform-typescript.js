
import Snabbdom from '../../../src/snabbdom-pragma';
export default () => {
    const Component = ({ name }) => Snabbdom.createElement("div", null,
        "Hello ",
        name);
    return Snabbdom.createElement(Component, { name: "world" });
};
