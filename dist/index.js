'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _extend = _interopDefault(require('extend'));

var undefinedv = function (v) { return v === undefined; };

var number = function (v) { return typeof v === 'number'; };

var string = function (v) { return typeof v === 'string'; };

var text = function (v) { return string(v) || number(v); };

var array = function (v) { return Array.isArray(v); };

var object = function (v) { return typeof v === 'object' && v !== null; };

var fun = function (v) { return typeof v === 'function'; };

var vnode = function (v) { return object(v) && 'sel' in v && 'data' in v && 'children' in v && 'text' in v; };

var svgPropsMap = { svg: 1, circle: 1, ellipse: 1, line: 1, polygon: 1,
  polyline: 1, rect: 1, g: 1, path: 1, text: 1 };

var svg = function (v) { return v.sel in svgPropsMap; };

// TODO: stop using extend here
var extend = function () {
  var objs = [], len = arguments.length;
  while ( len-- ) objs[ len ] = arguments[ len ];

  return _extend.apply(void 0, [ true ].concat( objs ));
};

var assign = function () {
  var objs = [], len = arguments.length;
  while ( len-- ) objs[ len ] = arguments[ len ];

  return _extend.apply(void 0, [ false ].concat( objs ));
};

var reduceDeep = function (arr, fn, initial) {
  var result = initial;
  for (var i = 0; i < arr.length; i++) {
    var value = arr[i];
    if (array(value)) {
      result = reduceDeep(value, fn, result);
    } else {
      result = fn(result, value);
    }
  }
  return result
};

var mapObject = function (obj, fn) { return Object.keys(obj).map(
  function (key) { return fn(key, obj[key]); }
).reduce(
  function (acc, curr) { return extend(acc, curr); },
  {}
); };

var deepifyKeys = function (obj, modules) { return mapObject(obj,
  function (key, val) {
    var dashIndex = key.indexOf('-');
    if (dashIndex > -1 && modules[key.slice(0, dashIndex)] !== undefined) {
      var moduleData = {};
      moduleData[key.slice(dashIndex + 1)] = val;
      return ( obj = {}, obj[key.slice(0, dashIndex)] = moduleData, obj )
      var obj;
    }
    return ( obj$1 = {}, obj$1[key] = val, obj$1 )
    var obj$1;
  }
); };



var omit = function (key, obj) { return mapObject(obj,
  function (mod, data) { return mod !== key ? (( obj = {}, obj[mod] = data, obj )) : {}
    var obj; }
); };

// Const fnName = (...params) => guard ? default : ...

var createTextElement = function (text$$1) { return !text(text$$1) ? undefined : {
  text: text$$1,
  sel: undefined,
  data: undefined,
  children: undefined,
  elm: undefined,
  key: undefined
}; };

var considerSvg = function (vnode$$1) { return !svg(vnode$$1) ? vnode$$1 :
  assign(vnode$$1,
    { data: omit('props', extend(vnode$$1.data,
      { ns: 'http://www.w3.org/2000/svg', attrs: omit('className', extend(vnode$$1.data.props,
        { class: vnode$$1.data.props ? vnode$$1.data.props.className : undefined }
      )) }
    )) },
    { children: undefinedv(vnode$$1.children) ? undefined :
      vnode$$1.children.map(function (child) { return considerSvg(child); })
    }
  ); };

var rewrites = {
  for: 'attrs',
  role: 'attrs',
  tabindex: 'attrs',
  'aria-*': 'attrs',
  key: null
};

var rewriteModules = function (data, modules) { return mapObject(data, function (key, val) {
  var inner = {};
  inner[key] = val;
  if (rewrites[key] && modules[rewrites[key]] !== undefined) {
    return ( obj = {}, obj[rewrites[key]] = inner, obj )
    var obj;
  }
  if (rewrites[key] === null) {
    return {}
  }
  var keys = Object.keys(rewrites);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (k.charAt(k.length - 1) === '*' && key.indexOf(k.slice(0, -1)) === 0 && modules[rewrites[k]] !== undefined) {
      return ( obj$1 = {}, obj$1[rewrites[k]] = inner, obj$1 )
      var obj$1;
    }
  }
  if (modules[key] !== undefined) {
    return ( obj$2 = {}, obj$2[modules[key] ? modules[key] : key] = val, obj$2 )
    var obj$2;
  }
  if (modules.props !== undefined) {
    return { props: inner }
  }
  return inner
}); };

var sanitizeData = function (data, modules) { return considerSvg(rewriteModules(deepifyKeys(data, modules), modules)); };

var sanitizeText = function (children) { return children.length > 1 || !text(children[0]) ? undefined : children[0]; };

var sanitizeChildren = function (children) { return reduceDeep(children, function (acc, child) {
  var vnode$$1 = vnode(child) ? child : createTextElement(child);
  acc.push(vnode$$1);
  return acc
}
, []); };

var defaultModules = {
  attrs: '',
  props: '',
  class: '',
  data: 'dataset',
  style: '',
  hook: '',
  on: ''
};

var createElementWithModules = function (modules) {
  return function (sel, data) {
    var children = [], len = arguments.length - 2;
    while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

    if (fun(sel)) {
      return sel(data || {}, children)
    }
    var text$$1 = sanitizeText(children, modules);
    return considerSvg({
      sel: sel,
      data: data ? sanitizeData(data, modules) : {},
      children: !undefinedv(text$$1) ? undefined : sanitizeChildren(children),
      text: text$$1,
      elm: undefined,
      key: data ? data.key : undefined
    })
  }
};

var createElement = createElementWithModules(defaultModules);

var index = {
  createElement: createElement,
  createElementWithModules: createElementWithModules
};

exports.createElementWithModules = createElementWithModules;
exports.createElement = createElement;
exports['default'] = index;
