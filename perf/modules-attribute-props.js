/* eslint import/no-unresolved: 0 */

const Benchmark = require('benchmark')
const h = require('snabbdom/h').default
const baseCreateElement = require('./snnabdom-base').createElement
const newCreateElement = require('./snnabdom-new').createElement

const isVisible = true
const isEnabled = false

function attributePropsHyper() {
  return h('div', { dataset: { color: 'red' }, attrs: { 'aria-hidden': true } }, [
    h('span', { style: { color: 'red', 'background-color': 'blue' } }, 'Hello'),
    h('span', { class: { visible: isVisible, enabled: isEnabled, 'alert-danger': true } }, 'World')
  ])
}

function attributeProps(createElement) {
  return createElement('div', { 'data-color': 'red', 'aria-hidden': true }, [
    createElement('span', { 'style-color': 'red', 'style-background-color': 'blue' }, 'Hello'),
    createElement('span', { 'class-visible': isVisible, 'class-enabled': isEnabled, 'class-alert-danger': true }, 'World')
  ])
}

const suite = new Benchmark.Suite('modules attribute props')

// add tests
suite.add('hyperscript', () => {
  attributePropsHyper()
}).
add('jsx-base', () => {
  attributeProps(baseCreateElement)
}).
add('jsx-new', () => {
  attributeProps(newCreateElement)
})

module.exports = suite
