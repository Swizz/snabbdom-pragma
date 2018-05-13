var Benchmark = require('benchmark');
var h = require('snabbdom/h').default;
var baseCreateElement = require('./snnabdom-base').createElement
var newCreateElement = require('./snnabdom-new').createElement

function objectPropsHyper () {
  return h('div', { style: { color: 'red', fontWeight: 'bold' }, dataset: { color: 'red', hidden: true } }, [
    h('span', {attrs: {href: '/foo'}}, 'Hello'),
    h('span', {dataset: {action: 'reset'}}, 'World')
  ])
}

function objectProps (createElement) {
  return createElement('div', { style: { color: 'red', fontWeight: 'bold' }, data: { color: 'red', hidden: true }}, [
    createElement('span', {attrs: {href: '/foo'}}, 'Hello'),
    createElement('span', {data: {action: 'reset'}}, 'World')
  ])
}

var suite = new Benchmark.Suite('module object props');

// add tests
suite.add('hyperscript', function() {
  objectPropsHyper()
})
.add('jsx-base', function() {
  objectProps(baseCreateElement)
})
.add('jsx-new', function() {
  objectProps(newCreateElement)
});

module.exports = suite