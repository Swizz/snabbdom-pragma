
import Snabbdom from '../../../src/index'

export default function () {

  var Component = function (name) { return Snabbdom.createElement( 'div', null, "Hello ", name ); }

  return Snabbdom.createElement( Component, { name: "world" })

}
