'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var h = _interopDefault(require('snabbdom/h'));
var extend = _interopDefault(require('extend'));

var sanitizeProps = function (props) {

  props = props === null ? {} : props;

  Object.keys(props).map(function (prop) {
    var keysRiver = prop.split('-').reverse();

    if(keysRiver.length > 1) {
      var newObject = keysRiver.reduce(
        function (object, key) { return (( obj = {}, obj[key] = object, obj ))
          var obj; },
        props[prop]
      );
      extend(true, props, newObject);

      delete props[prop];
    }
    else if (!(['class', 'props', 'attrs', 'style', 'on', 'hook', 'key'].indexOf(prop) > -1)) {
      extend(true, props, {props: ( obj = {}, obj[prop] = props[prop], obj ) });
      var obj;

      delete props[prop];
    }

  });

  return props

};

var sanitizeChilds = function (children) {

  return children.length === 1 && typeof children[0] === 'string' ?
    children[0] : children

};

var createElement = function (type, props) {
  var children = [], len = arguments.length - 2;
  while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];



  return (typeof type === 'function') ?
    type(props, children) :
    h(type, sanitizeProps(props), sanitizeChilds(children))

};


var index = {
  createElement: createElement
};

exports.createElement = createElement;
exports['default'] = index;
