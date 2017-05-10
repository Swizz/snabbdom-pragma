
import path from 'path'
import fs from 'fs'

import test from 'ava'

const fixturesDir = path.join(__dirname, 'build-specs')

fs.readdirSync(fixturesDir).forEach((caseName) => {
  test(`Should works for ${caseName.split('-').join(' ')}`, (t) => {
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
