
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

const considerData = (data) => fn.mapObject(
  fn.mapObject(data, (mod, data) => {
    const key = fn.renameMod(mod)
    return ({ [key]: data })
  }),
  (mod, data) => mod !== 'data' ? { [mod]: data } :
    fn.flatifyKeys({ [mod]: data })
)

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

const considerKey = (data) => fn.omit('key', data)

const sanitizeData = (data) => !is.object(data) ? {} :
  considerProps(considerAria(considerData(considerAttrs(considerKey(fn.deepifyKeys(data))))))

const sanitizeText = (children) => !is.array(children) || children.length > 1 || !is.text(children[0]) ? undefined :
  children[0]

const sanitizeChildren = (children) => !is.array(children) || is.text(sanitizeText(children)) ? undefined :
  fn.flatten(children).map(
    (child) => is.vnode(child) ? child :
      createTextElement(child)
  )

export const createElement = (sel, data = {}, ...children) => is.fun(sel) ? sel(data, children) : considerSvg({
  sel,
  data: sanitizeData(data),
  children: sanitizeChildren(children),
  text: sanitizeText(children),
  elm: undefined,
  key: data ? data.key : undefined
})

export default {
  createElement
}
