'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var h = _interopDefault(require('snabbdom/h'));
var extend = _interopDefault(require('extend'));

var svgTags = [
  'svg', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'rect', 'g', 'path', 'text'
];

var considerDataAria = function (props) {

  Object.keys(props).forEach(function (module) {

    if (['data', 'aria'].indexOf(module) > -1) {

      Object.keys(props[module]).forEach(function (prop) {

        props.attrs = props.attrs || {};

        props.attrs[(module + "-" + prop)] = props[module][prop];
        delete props[module][prop];

      });

      if (Object.keys(props[module]).length === 0) {

        delete props[module];

      }

    }

  });

  return props

};

var sanitizeProps = function (props) {

  props = props === null ? {} : props;

  Object.keys(props).forEach(function (prop) {

    var keysRiver = prop.split('-').reverse();

    if (keysRiver.length > 1) {

      var newObject = keysRiver.reduce(
        function (object, key) { return (( obj = {}, obj[key] = object, obj ))
          var obj; },
        props[prop]
      );
      extend(true, props, newObject);
      delete props[prop];

    } else if (!(['class', 'props', 'attrs', 'style', 'on', 'hook', 'key', 'data', 'aria'].indexOf(prop) > -1)) {

      extend(true, props, { props: ( obj = {}, obj[prop] = props[prop], obj ) });
      var obj;
      delete props[prop];

    }

  });

  return considerDataAria(props)

};

var sanitizeChilds = function (children) {

  if (children.length === 1 && typeof children[0] === 'string') {

    return children[0]

  }
  if (children.reduce(function (acc, curr) { return acc || Array.isArray(curr); }, false)) {

    return children
      .reduce(function (acc, curr) { return Array.isArray(curr) ? acc.concat( curr) : acc.concat( [curr]); }, [])

  }

  return children

};

var considerSVG = function (props, type) {

  if (svgTags.indexOf(type) > -1) {

    var attrs = Object.assign({}, props.props, props.props.className ? { class: props.props.className } : undefined);

    var p = Object.assign({}, props, { attrs: attrs });

    if (p.attrs.className) {

      delete p.attrs.className;

    }

    delete p.props;
    return p

  }
  return props

};

var createElement = function (type, props) {
  var children = [], len = arguments.length - 2;
  while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];


  return (typeof type === 'function') ?
    type(props, children) :
    h(type, considerSVG(sanitizeProps(props), type), sanitizeChilds(children))

};

var index = {
  createElement: createElement
};

exports.createElement = createElement;
exports['default'] = index;
