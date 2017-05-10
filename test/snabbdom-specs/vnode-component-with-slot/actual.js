
export default (createElement) => {
  const Component = ({ name }, children) =>
    createElement('div', null, 'Hello ', name,
      createElement('div', null, children)
    )

  return createElement(Component, { name: 'world' },
    createElement('p', null, 'It works !')
  )
}
