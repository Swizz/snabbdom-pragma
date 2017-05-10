
const name = 'world'

export default (createElement) => {
  return createElement('span', null, 'Hello ', name)
}
