
export default (createElement) => {
  const Component = createElement('div', null, 'Hello ', 'World')

  return createElement(Component, {},
    createElement('span', null, 'Done')
  )
}
