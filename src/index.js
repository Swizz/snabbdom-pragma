
import h from 'snabbdom/h'
import extend from 'extend'

const svgTags = [
  'svg', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'rect', 'g', 'path', 'text'
]

const sanitizeProps = (props) => {

  props = props === null ? {} : props

  Object.keys(props).map((prop) => {

    const keysRiver = prop.split('-').reverse()

    if (keysRiver.length > 1) {

      let newObject = keysRiver.reduce(
        (object, key) => ({ [key]: object }),
        props[prop]
      )
      extend(true, props, newObject)
      delete props[prop]

    } else if (!(['class', 'props', 'attrs', 'style', 'on', 'hook', 'key'].indexOf(prop) > -1)) {

      extend(true, props, { props: { [prop]: props[prop] } })
      delete props[prop]

    }

    return { toto: true }

  })

  return props

}

const sanitizeChilds = (children) => {

  if (children.length === 1 && typeof children[0] === 'string') {

    return children[0]

  }
  if (children.reduce((acc, curr) => acc || Array.isArray(curr), false)) {

    return children
      .reduce((acc, curr) => Array.isArray(curr) ? [...acc, ...curr] : [...acc, curr], [])

  }

  return children

}

const considerSVG = (props, type) => {

  if (svgTags.indexOf(type) > -1) {

    const attrs = Object.assign({}, props.props, props.props.className ? { class: props.props.className } : undefined)

    let p = Object.assign({}, props, { attrs: attrs })

    if (p.attrs.className) {

      delete p.attrs.className

    }

    delete p.props
    return p

  }
  return props

}

export const createElement = (type, props, ...children) => {

  return (typeof type === 'function') ?
    type(props, children) :
    h(type, considerSVG(sanitizeProps(props), type), sanitizeChilds(children))

}

export default {
  createElement
}
