import type { Directive, DirectiveBinding } from "vue"

/** 拖拽指令 */
export const dialogDrag2: Directive = {
  updated(el: any, binding: DirectiveBinding) {
    const { headerClass, visible } = binding.value
    nextTick(() => {
        addDialogDrag(document.querySelector(`.${headerClass}`))
        if (!visible) setTimeout(() => resetDialogPosition(document.querySelector(`.${headerClass}`)), 250)
    })
  },
  beforeUnmount(el: any, binding: DirectiveBinding) {
    const { headerClass } = binding.value
    removeDialogDrag(document.querySelector(`.${headerClass}`))
  }
}
const addDialogDrag = (dom: any) => {
  if (!dom || dom.isDrag) return
  const dragEle = dom
  const dragDom = dom.parentElement
  dragEle.transX = 0
  dragEle.transY = 0
  let starX: number, starY: number
  let curX: number = 0, curY: number = 0
  dragEle.onmousedown = (e: any) => {
    e.preventDefault()
    starX = e.clientX
    starY = e.clientY
    document.onmousemove = (e: any) => {
      e.preventDefault()
      const moveX = e.clientX - starX
      const moveY = e.clientY - starY
      curY = dragDom.offsetTop + dragEle.transY + moveY > 1 ? dragEle.transY + moveY : -dragDom.offsetTop
      curX = dragEle.transX + moveX
      dragDom.style.transform = `translate(${curX}px, ${curY}px)`
    }
    document.onmouseup = (e: any) => {
      dragEle.transX = curX
      dragEle.transY = curY
      document.onmousemove = null
      document.onmouseup = null
    }
  }
  dragEle.style.cursor = 'move'
  dragEle.isDrag = true
}
const removeDialogDrag = (dom: any) => {
    if (!dom) return
    dom.onmousedown = null
}
const resetDialogPosition = (dom: any) => {
    if (!dom) return
    const dragDom = dom.parentElement
    dom.transX = 0
    dom.transY = 0
    dragDom.style.transform = `translate(0px, 00px)`
}
