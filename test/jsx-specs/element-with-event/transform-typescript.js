
import Snabbdom from '../../../src/snabbdom-pragma';
const callback = () => { };
export default () => {
    return Snabbdom.createElement("button", { "on-click": callback });
};
