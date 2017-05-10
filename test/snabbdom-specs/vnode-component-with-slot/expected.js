
import h from 'snabbdom/h'

export default () => {
  const Component = ({ name }, children) =>
    h('div', {}, ['Hello ', name,
      h('div', {}, children)
    ])

  return Component({ name: 'world' }, [
    h('p', {}, 'It works !')
  ])
}
