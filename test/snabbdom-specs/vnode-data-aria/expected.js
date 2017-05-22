
export default (h) => {
  return h('div', {
    dataset: { color: 'red' },
    props: { 'aria-hidden': true }
  }, [])
}
