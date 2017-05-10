
export default (h) => {
  const Component = ({ name }) =>
    h('div', {}, ['Hello ', name])

  return Component({ name: 'toto' }, [
    h('span', {}, 'Done')
  ])
}
