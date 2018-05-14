
export default (createElement) => {
  const Component = ({ name }) =>
    createElement('div', null, 'Hello ', name)

  return createElement(Component, null,
    createElement('span', null, 'Done')
  )
}
