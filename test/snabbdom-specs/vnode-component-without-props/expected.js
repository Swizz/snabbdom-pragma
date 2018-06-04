
export default (h) => {
  const Component = ({ name }) =>
    h('div', {}, ['Hello ', name])

  return Component({}, [
    h('span', {}, 'Done')
  ])
}
