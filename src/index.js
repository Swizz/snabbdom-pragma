
import h from 'snabbdom/h'
import extend from 'extend'

const sanitizeProps = (props) => {

  props = props === null ? {} : props

  Object.keys(props).map((prop) => {
    const keysRiver = prop.split('-').reverse()

    if(keysRiver.length > 1) {
      let newObject = keysRiver.reduce(
        (object, key) => ({ [key]: object }),
        props[prop]
      )
      extend(true, props, newObject)

      delete props[prop]
    }
    else if (!(['class', 'props', 'attrs', 'style', 'on', 'hook', 'key'].indexOf(prop) > -1)) {
      extend(true, props, {props: { [prop]: props[prop] } })

      delete props[prop]
    }

  })

  return props

}

const sanitizeChilds = (children) => {

  return children.length === 1 && typeof children[0] === 'string' ?
    children[0] : children

}

export const createElement = (type, props, ...children) => {

  return h(type, sanitizeProps(props), sanitizeChilds(children))

}


export default {
  createElement
}
