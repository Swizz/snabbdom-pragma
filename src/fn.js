// TODO: stop using extend here
import _extend from 'extend'

import * as is from './is'

export const extend = (...objs) => _extend(true, ...objs)

export const assign = (...objs) => _extend(false, ...objs)

export const reduceDeep = (arr, fn, initial) => {
  let result = initial
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]
    if (is.array(value)) {
      result = reduceDeep(value, fn, result)
    } else {
      result = fn(result, value)
    }
  }
  return result
}

export const mapObject = (obj, fn) => Object.keys(obj).map(
  (key) => fn(key, obj[key])
).reduce(
  (acc, curr) => extend(acc, curr),
  {}
)

export const deepifyKeys = (obj, modules) => mapObject(obj,
  (key, val) => {
    const dashIndex = key.indexOf('-')
    if (dashIndex > -1 && modules[key.slice(0, dashIndex)] !== undefined) {
      const moduleData = {
        [key.slice(dashIndex + 1)]: val
      }
      return {
        [key.slice(0, dashIndex)]: moduleData
      }
    }
    return { [key]: val }
  }
)

export const flatifyKeys = (obj) => mapObject(obj,
  (mod, data) => !is.object(data) ? ({ [mod]: data }) : mapObject(
    flatifyKeys(data),
    (key, val) => ({ [`${mod}-${key}`]: val })
  )
)

export const omit = (key, obj) => mapObject(obj,
  (mod, data) => mod !== key ? ({ [mod]: data }) : {}
)
