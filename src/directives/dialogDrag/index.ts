import type { Directive, DirectiveBinding } from "vue"

/** 拖拽指令
 * dialogDrag指令拖拽时不可超出视口最高；
 * 最低，最左，最右不限制
 */
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

/** 拖拽指令
 * initElMessageBoxDrag消息框拖拽时不可超出视口最高；
 * 最低，最左，最右不限制
 */
export const initElMessageBoxDrag = (className: string) => {
    if (!className) return
    const dragDom: any = document.querySelector(`.${className}`)
    if (!dragDom) return
    const dragEle: any = dragDom.querySelector('.el-message-box__header')
    if (!dragEle) return
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

/**
 * 使用示例：
 * import { initElMessageBoxDrag } from "@/directives/dialogDrag"
 * 
 * const handleBatchRemoveBtn = () => {
 *    const customClass = `ElMessageBox-${new Date().getTime()}`
 *    setTimeout(() => initElMessageBoxDrag(customClass), 1)
 *    ElMessageBox.confirm("确认移除所选数据？", "提示", {
 *        customClass,
 *        confirmButtonText: "确定",
 *        cancelButtonText: "取消",
 *        confirmButtonClass: "confirmButton",
 *        cancelButtonClass: "cancelButton",
 *        type: "warning",
 *        center: true
 *    })
 *        .then(async () => {
 *            const parentPartOids = multipleSelection.value.map((item) => item.partOid).join()
 *            removeBatchHandler(parentPartOids)
 *        })
 *        .catch((err) => {
 *            console.log(err)
 *        })
 *}
 * /
