import test from 'ava'
import { reduceDeep } from '../src/fn'

test('utils - reduceDeep with flat array', (t) => {
  const arr = ['a', 'b', 'c', 'd', 'e']
  const actual = reduceDeep(arr, (acc, item) => {
    acc.push(item)
    return acc
  }, [])
  const expected = ['a', 'b', 'c', 'd', 'e']
  t.deepEqual(actual, expected)
})

test('utils - reduceDeep with nested array', (t) => {
  const arr = ['a', ['b', 'c'], [['d']], 'e']
  const actual = reduceDeep(arr, (acc, item) => {
    acc.push(item)
    return acc
  }, [])
  const expected = ['a', 'b', 'c', 'd', 'e']
  t.deepEqual(actual, expected)
})
