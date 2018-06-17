const buble = require('rollup-plugin-buble')

const bubleOptions = {
  transforms: {
    modules: false
  },
  objectAssign: 'fn.assign'
}

module.exports = {
  input: 'src/index.js',
  plugins: [buble(bubleOptions)],
  external: ['extend'],
  output: [
    {
      file: 'dist/index.es6.js',
      format: 'es',
      exports: 'named'
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named'
    }
  ]
}
