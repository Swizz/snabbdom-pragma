// TODO: stop using extend here
import _extend from 'extend'

import * as is from './is'

export const extend = (...objs) => _extend(true, ...objs)

export const assign = (...objs) => _extend(false, ...objs)

export const flatten = (arr) => arr.reduce(
  (acc, curr) => !is.array(curr) ? [...acc, curr] :
    [...acc, ...flatten(curr)],
  []
)

export const mapObject = (obj, fn) => Object.entries(obj).map(
  ([key, val]) => fn([key, val])
).reduce(
  (acc, curr) => extend(acc, curr),
  {}
)

export const deepifyKeys = (obj) => mapObject(obj,
  ([key, val]) => key.split('-').reverse().reduce(
    (object, key) => ({ [key]: object }),
    val
  )
)

export const flatifyKeys = (obj) => mapObject(obj,
  ([mod, data]) => !is.object(data) ? ({ [mod]: data }) : mapObject(
    flatifyKeys(data),
    ([key, val]) => ({ [`${mod}-${key}`]: val })
  )
)

export const omit = (key, obj) => mapObject(obj,
  ([mod, data]) => mod !== key ? ({ [mod]: data }) : {}
)
