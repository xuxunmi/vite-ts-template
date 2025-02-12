import type { Directive, DirectiveBinding } from "vue"

/** 拖拽指令 */
// dialogDrag指令拖拽时不可超出视口最高；
// 最低，最左，最右不限制
export const dialogDrag: Directive = {
    mounted(el: any, binding: DirectiveBinding) {
        nextTick(() => initDialogDrag(document.querySelector(`.${binding.value}`)))
    }
}
export const initDialogDrag = (dom: any) => {
    if (!dom) return
    const dragEle = dom
    const dragDom = dom.parentElement
    dragEle.style.cursor = 'move'
    let transX: number = 0, transY: number = 0
    let starX: number, starY: number
    let curX: number, curY: number
    dragEle.onmousedown = (e: any) => {
        e.preventDefault()
        starX = e.clientX
        starY = e.clientY
        document.onmousemove = (e: any) => {
            e.preventDefault()
            const moveX = e.clientX - starX
            const moveY = e.clientY - starY
            curY = dragDom.offsetTop + transY + moveY > 1 ? transY + moveY : -dragDom.offsetTop
            curX = transX + moveX
            dragDom.style.transform = `translate(${curX}px, ${curY}px)`
        }
        document.onmouseup = (e: any) => {
            transX = curX
            transY = curY
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}
