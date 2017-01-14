
import test from 'ava'

import path from 'path'
import fs from 'fs'

const fixturesDir = path.join(__dirname, 'pragma-test')

fs.readdirSync(fixturesDir).map( caseName => {

  test(`Should works for ${caseName.split('-').join(' ')}`, t => {

    const fixtureDir = path.join(fixturesDir, caseName)

    const actual = require(
      path.join(fixtureDir, 'actual.js')
    ).default()

    const expected = require(
      path.join(fixtureDir, 'expected.js')
    ).default()

    t.deepEqual(actual, expected)
  })

})
