/* eslint import/no-unresolved: 0 */

const Benchmark = require('benchmark')
const h = require('snabbdom/h').default
const baseCreateElement = require('./snnabdom-base').createElement
const newCreateElement = require('./snnabdom-new').createElement

function objectPropsHyper() {
  return h('div', { style: { color: 'red', fontWeight: 'bold' }, dataset: { color: 'red', hidden: true } }, [
    h('span', { attrs: { href: '/foo' } }, 'Hello'),
    h('span', { dataset: { action: 'reset' } }, 'World')
  ])
}

function objectProps(createElement) {
  return createElement('div', { style: { color: 'red', fontWeight: 'bold' }, data: { color: 'red', hidden: true } }, [
    createElement('span', { attrs: { href: '/foo' } }, 'Hello'),
    createElement('span', { data: { action: 'reset' } }, 'World')
  ])
}

const suite = new Benchmark.Suite('module object props')

// add tests
suite.add('hyperscript', () => {
  objectPropsHyper()
}).
add('jsx-base', () => {
  objectProps(baseCreateElement)
}).
add('jsx-new', () => {
  objectProps(newCreateElement)
})

module.exports = suite
