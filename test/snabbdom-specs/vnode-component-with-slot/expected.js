
export default (h) => {
  const Component = ({ name }, children) =>
    h('div', {}, ['Hello ', name,
      h('div', {}, children)
    ])

  return Component({ name: 'world' }, [
    h('p', {}, 'It works !')
  ])
}
