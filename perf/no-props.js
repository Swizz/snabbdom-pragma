var Benchmark = require('benchmark');
var h = require('snabbdom/h').default;
var baseCreateElement = require('./snnabdom-base').createElement
var newCreateElement = require('./snnabdom-new').createElement

function noPropsHyper () {
  return h('div', {}, [
    h('span', {}, 'Hello'),
    h('span', {}, 'World')
  ])
}

function noProps (createElement) {
  return createElement('div', null, [
    createElement('span', null, 'Hello'),
    createElement('span', null, 'World')
  ])
}

var suite = new Benchmark.Suite('no props');

// add tests
suite.add('hyperscript', function() {
  noPropsHyper()
})
.add('jsx-base', function() {
  noProps(baseCreateElement)
})
.add('jsx-new', function() {
  noProps(newCreateElement)
});

module.exports = suite