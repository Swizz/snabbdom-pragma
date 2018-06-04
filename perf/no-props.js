/* eslint import/no-unresolved: 0 */

const Benchmark = require('benchmark')
const h = require('snabbdom/h').default
const baseCreateElement = require('./snnabdom-base').createElement
const newCreateElement = require('./snnabdom-new').createElement

function noPropsHyper() {
  return h('div', {}, [
    h('span', {}, 'Hello'),
    h('span', {}, 'World')
  ])
}

function noProps(createElement) {
  return createElement('div', null, [
    createElement('span', null, 'Hello'),
    createElement('span', null, 'World')
  ])
}

const suite = new Benchmark.Suite('no props')

// add tests
suite.add('hyperscript', () => {
  noPropsHyper()
}).
add('jsx-base', () => {
  noProps(baseCreateElement)
}).
add('jsx-new', () => {
  noProps(newCreateElement)
})

module.exports = suite
