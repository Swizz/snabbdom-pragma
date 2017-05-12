import { VNode, VNodeData } from 'snabbdom/vnode'

export = SnabbdomPragma

declare namespace SnabbdomPragma {
  type Children = VNode[] | VNode | string | number
  type CircularChildren = Children | Children[]

  type Component = (props: VNodeData, children: CircularChildren[]) => VNode

  export function createElement(sel: string | Component, data: null | VNodeData, ...children: CircularChildren[]): VNode
}

declare global {
  namespace JSX {
    interface Element extends VNode { }
    interface IntrinsicElements {
      [elemName: string]: VNodeData
    }

  }
}
