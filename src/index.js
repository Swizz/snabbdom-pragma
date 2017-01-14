
import h from 'snabbdom/h'

const sanitizeProps = (props) => {

  return props === null ? {} : props

}

const sanitizeChilds = (children) => {

  return children.length === 1 && typeof children[0] === 'string' ?
    children[0] : children

}

export const createElement = (type, props={}, ...children) => {

  return h(type, sanitizeProps(props), sanitizeChilds(children))

}


export default {
  createElement
}
