
import path from 'path'
import fs from 'fs'

import test from 'ava'

import h from 'snabbdom/h'
import { createElement as src } from '../src/index'
import { createElement as dist } from '../dist/index'

const fixturesDir = path.join(__dirname, 'snabbdom-specs')

fs.readdirSync(fixturesDir).forEach((caseName) => {
  test(`src - Should works for ${caseName.split('-').join(' ')}`, (t) => {
    const fixtureDir = path.join(fixturesDir, caseName)

    const actual = require(
      path.join(fixtureDir, 'actual.js')
    ).default(src)

    const expected = require(
      path.join(fixtureDir, 'expected.js')
    ).default(h)

    t.deepEqual(actual, expected)
  })

  test(`dist - Should works for ${caseName.split('-').join(' ')}`, (t) => {
    const fixtureDir = path.join(fixturesDir, caseName)

    const actual = require(
      path.join(fixtureDir, 'actual.js')
    ).default(dist)

    const expected = require(
      path.join(fixtureDir, 'expected.js')
    ).default(h)

    t.deepEqual(actual, expected)
  })
})
