import path from 'path'
import fs from 'fs'

import test from 'ava'

const fixturesDir = path.join(__dirname, 'jsx-specs')

fs.readdirSync(fixturesDir).forEach((caseName) => {

  test(`Should Bublé transform ${caseName.split('-').join(' ')}`, (t) => {

    const fixtureDir = path.join(fixturesDir, caseName)

    const actual = require('buble').transform(
      fs.readFileSync(
        path.join(fixtureDir, 'actual.js')
      ).toString(), {
        transforms: {
          modules: false,
          arrow: false,
          parameterDestructuring: false
        },
        jsx: 'Snabbdom.createElement'
      }
    ).code

    const transform = fs.readFileSync(
      path.join(fixtureDir, 'transform-buble.js')
    ).toString()

    t.is(actual.trim(), transform.trim())

  })

  test(`Should Babel transform ${caseName.split('-').join(' ')}`, (t) => {

    const fixtureDir = path.join(fixturesDir, caseName)

    const actual = require('babel-core').transform(
      fs.readFileSync(
        path.join(fixtureDir, 'actual.js')
      ).toString(), {
        plugins: [
          ['transform-react-jsx', { pragma: 'Snabbdom.createElement' }]
        ]
      }
    ).code

    const transform = fs.readFileSync(
      path.join(fixtureDir, 'transform-babel.js')
    ).toString()

    t.is(actual.trim(), transform.trim())

  })

  test(`Should Traceur transform ${caseName.split('-').join(' ')}`, (t) => {

    const fixtureDir = path.join(fixturesDir, caseName)

    const actual = require('traceur').compile(
      fs.readFileSync(
        path.join(fixtureDir, 'actual.js')
      ).toString(), {
        jsx: 'Snabbdom.createElement',
        modules: false,
        outputLanguage: 'es6'
      }
    )

    const transform = fs.readFileSync(
      path.join(fixtureDir, 'transform-traceur.js')
    ).toString()

    t.is(actual.trim(), transform.trim())

  })

})
