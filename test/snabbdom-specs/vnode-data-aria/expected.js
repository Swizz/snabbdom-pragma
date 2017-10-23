
export default (h) => {
  return h('div', {
    dataset: { color: 'red' },
    attrs: { 'aria-hidden': true }
  }, [])
}
