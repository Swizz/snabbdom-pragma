var Benchmark = require('benchmark');
var noProps = require('./no-props');
var simpleProps = require('./simple-props');
var objectProps = require('./modules-object-props');
var attributeProps = require('./modules-attribute-props');
var realForm = require('./real-world-form');

var suites = []

function runNextSuite() {
  if (suites.length) {  
    suites.shift().run({ 'async': true });
  } else {
    console.log('\nAll benchmarks complete');
  }
}

function addSuite(suite) {
  suites.push(suite);
  suite.on('start', function(event) {
    console.log('\nBenchmarking', event.currentTarget.name);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function(event) {
    const fastest = this.filter('fastest').map('name');
    const fastestJSX = this.filter(bench => bench.name.indexOf('jsx') !== -1).filter('fastest').map('name');
    console.log(event.currentTarget.name, '- fastest is ' + fastest, '  fastest JSX is ', fastestJSX);
    runNextSuite()
  });  
}

addSuite(noProps);
addSuite(simpleProps);
addSuite(objectProps);
addSuite(attributeProps);
addSuite(realForm);


runNextSuite()