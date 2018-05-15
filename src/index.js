
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

const considerData = (data) => {
  return !data.data ? data : fn.mapObject(data, (mod, data) => {
    const key = mod === 'data' ? 'dataset' : mod
    return ({ [key]: data })
  })
}

const considerAria = (data) => data.attrs || data.aria ? fn.omit('aria',
  fn.assign(data, {
    attrs: fn.extend(data.attrs, data.aria ? fn.flatifyKeys({ aria: data.aria }) : {})
  })
) : data

const considerProps = (data) => fn.mapObject(data,
  (key, val) => is.object(val) ? { [key]: val } :
    { props: { [key]: val } }
)

const rewrites = ['for', 'role', 'tabindex']

const considerAttrs = (data) => fn.mapObject(data,
    (key, data) => !rewrites.includes(key) ? { [key]: data } : {
      attrs: fn.extend(data.attrs, { [key]: data })
    }
)

const considerKey = (data) => {
  return 'key' in data ? fn.omit('key', data) : data
}

const sanitizeData = (data) => considerProps(considerAria(considerData(considerAttrs(considerKey(fn.deepifyKeys(data))))))

const sanitizeText = (children) => children.length > 1 || !is.text(children[0]) ? undefined : children[0]

const sanitizeChildren = (children) => fn.flatten(children).map(
    (child) => is.vnode(child) ? child :
      createTextElement(child)
  )

export const createElement = (sel, data, ...children) => {  
  if (is.fun(sel)) {
    return sel(data || {}, children)
  } else {
    const text = sanitizeText(children) 
    return considerSvg({
      sel,
      data: data ? sanitizeData(data) : {},
      children: text ? undefined : sanitizeChildren(children),
      text: text,
      elm: undefined,
      key: data ? data.key : undefined
    })
  }  
}

export default {
  createElement
}
