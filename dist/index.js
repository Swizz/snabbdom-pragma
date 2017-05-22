'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _extend = _interopDefault(require('extend'));

var undefinedv = function (v) { return v === undefined; };

var number = function (v) { return typeof v === 'number'; };

var string = function (v) { return typeof v === 'string'; };

var text = function (v) { return string(v) || number(v); };

var array = function (v) { return Array.isArray(v); };

var object = function (v) { return v === Object(v); };

var fun = function (v) { return typeof v === 'function'; };

var vnode = function (v) { return object(v) &&
  ['sel', 'data', 'children', 'text', 'elm', 'key'].every(
    function (k) { return k in v; }
  ); };

var svg = function (v) { return [
  'svg', 'circle', 'ellipse', 'line', 'polygon',
  'polyline', 'rect', 'g', 'path', 'text'
].includes(v.sel); };

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

var entries = function (obj) { return Object.keys(obj).map(
  function (key) { return [key, obj[key]]; }
); };



var flatten = function (arr) { return arr.reduce(
  function (acc, curr) { return !array(curr) ? acc.concat( [curr]) :
    acc.concat( flatten(curr)); },
  []
); };

var mapObject = function (obj, fn) { return entries(obj).map(
  function (ref) {
    var key = ref[0];
    var val = ref[1];

    return fn([key, val]);
  }
).reduce(
  function (acc, curr) { return extend(acc, curr); },
  {}
); };

var deepifyKeys = function (obj) { return mapObject(obj,
  function (ref) {
    var key = ref[0];
    var val = ref[1];

    return key.split('-').reverse().reduce(
    function (object$$1, key) { return (( obj = {}, obj[key] = object$$1, obj ))
      var obj; },
    val
  );
  }
); };

var renameMod = function (name) {
  switch (name) {
    case 'data': return 'dataset'
    default: return name
  }
};

var flatifyKeys = function (obj) { return mapObject(obj,
  function (ref) {
    var mod = ref[0];
    var data = ref[1];

    return !object(data) ? (( obj = {}, obj[mod] = data, obj )) : mapObject(
    flatifyKeys(data),
    function (ref) {
      var key = ref[0];
      var val = ref[1];

      return (( obj = {}, obj[(mod + "-" + key)] = val, obj ))
      var obj;
    }
  )
    var obj;
  }
); };

var omit = function (key, obj) { return mapObject(obj,
  function (ref) {
    var mod = ref[0];
    var data = ref[1];

    return mod !== key ? (( obj = {}, obj[mod] = data, obj )) : {}
    var obj;
  }
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
      { ns: 'http://www.w3.org/2000/svg', attrs: vnode$$1.data.props }
    )) },
    { children: undefinedv(vnode$$1.children) ? undefined :
      vnode$$1.children.map(function (child) { return considerSvg(child); })
    }
  ); };

var considerDataAria = function (data) { return mapObject(
  mapObject(data, function (ref) {
    var mod = ref[0];
    var data = ref[1];

    var key = renameMod(mod);
    return (( obj = {}, obj[key] = data, obj ))
    var obj;
  }),
  function (ref) {
    var mod = ref[0];
    var data = ref[1];

    return !['data', 'aria'].includes(mod) ? ( obj = {}, obj[mod] = data, obj ) :
    flatifyKeys(( obj$1 = {}, obj$1[mod] = data, obj$1 ))
    var obj;
    var obj$1;
  }
); };

var considerProps = function (data) { return mapObject(data,
  function (ref) {
    var key = ref[0];
    var val = ref[1];

    return object(val) ? ( obj = {}, obj[key] = val, obj ) :
    { props: ( obj$1 = {}, obj$1[key] = val, obj$1 ) }
    var obj;
    var obj$1;
  }
); };

var sanitizeData = function (data) { return !object(data) ? {} :
  considerProps(considerDataAria(deepifyKeys(data))); };

var sanitizeText = function (children) { return !array(children) || children.length > 1 || !text(children[0]) ? undefined :
  children[0]; };

var sanitizeChildren = function (children) { return !array(children) || text(sanitizeText(children)) ? undefined :
  flatten(children).map(
    function (child) { return vnode(child) ? child :
      createTextElement(child); }
  ); };

var createElement = function (sel, data) {
  var children = [], len = arguments.length - 2;
  while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

  if ( data === void 0 ) data = {};
  return fun(sel) ? sel(data, children) : considerSvg({
  sel: sel,
  data: sanitizeData(data),
  children: sanitizeChildren(children),
  text: sanitizeText(children),
  elm: undefined,
  key: undefined
});
};

var index = {
  createElement: createElement
};

exports.createElement = createElement;
exports['default'] = index;
