
import h from 'snabbdom/h'

export default () => {

  const Component = ({ name }) =>
    h('div', {}, ["Hello ", name])

  return Component({ name: "toto" }, [
    h('span', {}, "Done")
  ])

}
