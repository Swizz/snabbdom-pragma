
import * as is from './is'
import * as fn from './fn'

// Const fnName = (...params) => guard ? default : ...

const createTextElement = (text) => !is.text(text) ? undefined : {
  text,
  sel: undefined,
  data: undefined,
  children: undefined,
  elm: undefined,
  key: undefined
}

const considerSvg = (vnode) => !is.svg(vnode) ? vnode :
  fn.assign(vnode,
    { data: fn.omit('props', fn.extend(vnode.data,
      { ns: 'http://www.w3.org/2000/svg', attrs: fn.omit('className', fn.extend(vnode.data.props,
        { class: vnode.data.props ? vnode.data.props.className : undefined }
      )) }
    )) },
    { children: is.undefinedv(vnode.children) ? undefined :
      vnode.children.map((child) => considerSvg(child))
    }
  )

const rewrites = {
  for: 'attrs',
  role: 'attrs',
  tabindex: 'attrs',
  'aria-*': 'attrs',
  key: null
}

const rewriteModules = (data, modules) => fn.mapObject(data, (key, val) => {
  const inner = { [key]: val }
  if (rewrites[key] && modules[rewrites[key]] !== undefined) {
    return { [rewrites[key]]: inner }
  }
  if (rewrites[key] === null) {
    return {}
  }
  const keys = Object.keys(rewrites)
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]
    if (k.charAt(k.length - 1) === '*' && key.indexOf(k.slice(0, -1)) === 0 && modules[rewrites[k]] !== undefined) {
      return { [rewrites[k]]: inner }
    }
  }
  if (modules[key] !== undefined) {
    return { [modules[key] ? modules[key] : key]: val }
  }
  if (modules.props !== undefined) {
    return { props: inner }
  }
  return inner
})

const sanitizeData = (data, modules) => considerSvg(rewriteModules(fn.deepifyKeys(data, modules), modules))

const sanitizeText = (children) => children.length > 1 || !is.text(children[0]) ? undefined : children[0]

const sanitizeChildren = (children) => fn.reduceDeep(children, (acc, child) => {
  const vnode = is.vnode(child) ? child : createTextElement(child)
  acc.push(vnode)
  return acc
}
, [])

const defaultModules = {
  attrs: '',
  props: '',
  class: '',
  data: 'dataset',
  style: '',
  hook: '',
  on: ''
}

export const createElementWithModules = (modules) => {
  return (sel, data, ...children) => {
    if (is.fun(sel)) {
      return sel(data || {}, children)
    }
    const text = sanitizeText(children, modules)
    return considerSvg({
      sel,
      data: data ? sanitizeData(data, modules) : {},
      children: !is.undefinedv(text) ? undefined : sanitizeChildren(children),
      text,
      elm: undefined,
      key: data ? data.key : undefined
    })
  }
}

export const createElement = createElementWithModules(defaultModules)

export default {
  createElement,
  createElementWithModules
}
