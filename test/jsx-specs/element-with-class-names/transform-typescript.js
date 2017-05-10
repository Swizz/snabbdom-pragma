
import Snabbdom from '../../../src/index';
const isVisible = () => { };
export default () => {
    return Snabbdom.createElement("div", { "class-visible": isVisible });
};
