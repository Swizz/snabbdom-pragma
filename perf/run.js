const noProps = require('./no-props')
const simpleProps = require('./simple-props')
const objectProps = require('./modules-object-props')
const attributeProps = require('./modules-attribute-props')
const realForm = require('./real-world-form')

const suites = []

function runNextSuite() {
  if (suites.length !== 0) {
    suites.shift().run({ async: true })
  } else {
    console.log('\nAll benchmarks complete')
  }
}

function addSuite(suite) {
  suites.push(suite)
  suite.on('start', (event) => {
    console.log('\nBenchmarking', event.currentTarget.name)
  }).
  on('cycle', (event) => {
    console.log(String(event.target))
  }).
  on('complete', function (event) {
    const fastest = this.filter('fastest').map('name')
    const fastestJSX = this.filter((bench) => bench.name.indexOf('jsx') !== -1).filter('fastest').map('name')
    console.log(event.currentTarget.name, '- fastest is ' + fastest, '  fastest JSX is ', fastestJSX)
    runNextSuite()
  })
}

addSuite(noProps)
addSuite(simpleProps)
addSuite(objectProps)
addSuite(attributeProps)
addSuite(realForm)

runNextSuite()
