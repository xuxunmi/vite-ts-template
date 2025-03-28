import type { Directive, DirectiveBinding } from 'vue'

/**
 * 拖拽线指令
 * 接收左右容器的最小宽度
 * 使用：v-dropLine="[400,400]"
 *
 * html结构：
 * prev元素定宽
 * next元素宽度自适应，flex:1
 *
 * <div class="flex">
 *      <div class="prev"></div>
 *      <div v-dropLine="[300, 400]" class="drag-line" />
 *      <div class="next"></div>
 * </div>
 *
 *拖拽线css:
 *        .drag-line {
 *            width: 1px;
 *            height: 100%;
 *            background-color: #ddd;
 *            cursor: col-resize;
 *            &:hover {
 *                box-shadow: 0 0 0 1px #409EFF;
 *                background-color: #409EFF;
 *            }
 *        }
 *
 */
export const dropLine: Directive = {
    mounted(el: any, binding: DirectiveBinding) {
        let starX: number, startWidth: number
        // 返回当前元素在其父元素的子元素节点中的前一个元素节点
        let preDom = el.previousElementSibling
        const [leftMinWidth, rightMinWidth] = binding.value || [300, 400]
        el.onmousedown = (e: any) => {
            starX = e.clientX
            startWidth = preDom.clientWidth
            e.preventDefault()
            document.onmousemove = e => {
                const parentWidth = el.parentNode.clientWidth
                const preWidth = startWidth + e.clientX - starX
                const nextWidth = parentWidth - preWidth
                if (preWidth >= leftMinWidth && nextWidth >= rightMinWidth) {
                    preDom.style.width = preWidth + 'px'
                }
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}
