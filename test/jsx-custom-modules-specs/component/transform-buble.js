
import Snabbdom from '../../../src/index'

export default () => {
  var Component = ({ name }) => // eslint-disable-line no-unused-vars
    Snabbdom.createElementWithModules({"attrs": "", "props": ""})( 'div', null, "Hello ", name )

  return Snabbdom.createElementWithModules({"attrs": "", "props": ""})( Component, { name: "world" })
}
