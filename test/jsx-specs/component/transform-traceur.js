
export default () => {
  const Component = ({name}) => Snabbdom.createElement("div", null, "Hello ", name);
  return Snabbdom.createElement(Component, {name: "world"});
};
//# sourceURL=<compile-source>
