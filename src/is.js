
export const nullv = (v) => v === null

export const undefinedv = (v) => v === undefined

export const number = (v) => typeof v === 'number'

export const string = (v) => typeof v === 'string'

export const text = (v) => string(v) || number(v)

export const array = (v) => Array.isArray(v)

export const object = (v) => typeof v === 'object' && v !== null

export const fun = (v) => typeof v === 'function'

export const vnode = (v) => object(v) && 'sel' in v && 'data' in v && 'children' in v && 'text' in v
