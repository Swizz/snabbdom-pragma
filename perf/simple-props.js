var Benchmark = require('benchmark');
var h = require('snabbdom/h').default;
var baseCreateElement = require('./snnabdom-base').createElement
var newCreateElement = require('./snnabdom-new').createElement

function simplePropsHyper () {
  return h('div', {props: {href: 'xxxxx', target: 'route'}}, [
    h('span', {props: {name: 'x', value: 1}}, 'Hello'),
    h('span', {props: {name: 'y', value: 2}}, 'World')
  ])
}

function simpleProps (createElement) {
  return createElement('div', {href: 'xxxxx', target: 'route'}, [
    createElement('span', {name: 'x', value: 1}, 'Hello'),
    createElement('span', {name: 'y', value: 2}, 'World')
  ])
}

var suite = new Benchmark.Suite('simple props');

// add tests
suite.add('hyperscript', function() {
  simplePropsHyper()
})
.add('jsx-base', function() {
  simpleProps(baseCreateElement)
})
.add('jsx-new', function() {
  simpleProps(newCreateElement)
});

module.exports = suite