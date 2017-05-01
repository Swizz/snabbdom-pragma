
import * as is from './is'
import * as fn from './fn'

// const fnName = (...params) => guard ? default : ...

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
      { ns: 'http://www.w3.org/2000/svg', attrs: vnode.data.props }
    )) },
    { children: is.undefinedv(vnode.children) ? undefined :
      vnode.children.map((child) => considerSvg(child))
    }
  )

const considerDataAria = (data) => fn.mapObject(data,
  ([mod, data]) => !['data', 'aria'].includes(mod) ? { [mod]: data } :
    fn.flatifyKeys({ [mod]: data })
)

const considerProps = (data) => fn.mapObject(data,
  ([key, val]) => is.object(val) ? { [key]: val } :
    { props: { [key]: val } }
)

const sanitizeData = (data) => !is.object(data) ? {} :
  considerProps(considerDataAria(fn.deepifyKeys(data)))

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
  key: undefined
})

export default {
  createElement
}
