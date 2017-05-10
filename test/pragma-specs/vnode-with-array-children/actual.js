
export default (createElement) => {
  return createElement('div', null, [
    createElement('span', null, 'Hello'),
    createElement('span', null, 'World')
  ])
}
