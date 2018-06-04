/* eslint import/no-unresolved: 0 */

const Benchmark = require('benchmark')
const h = require('snabbdom/h').default
const baseCreateElement = require('./snnabdom-base').createElement
const newCreateElement = require('./snnabdom-new').createElement

function simplePropsHyper() {
  return h('div', { props: { href: 'xxxxx', target: 'route' } }, [
    h('span', { props: { name: 'x', value: 1 } }, 'Hello'),
    h('span', { props: { name: 'y', value: 2 } }, 'World')
  ])
}

function simpleProps(createElement) {
  return createElement('div', { href: 'xxxxx', target: 'route' }, [
    createElement('span', { name: 'x', value: 1 }, 'Hello'),
    createElement('span', { name: 'y', value: 2 }, 'World')
  ])
}

const suite = new Benchmark.Suite('simple props')

// add tests
suite.add('hyperscript', () => {
  simplePropsHyper()
}).
add('jsx-base', () => {
  simpleProps(baseCreateElement)
}).
add('jsx-new', () => {
  simpleProps(newCreateElement)
})

module.exports = suite
