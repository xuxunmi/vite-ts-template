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
 *      <div v-dropLine="[300, 400]" class="drag-line" 
 *          @drag-start="handleDragStart"
 *          @drag-change="handleDragChange"
 *          @drag-end="handleDragEnd" 
 *       />
 *      <div class="next"></div>
 * </div>
 * 
 *  handleDragStart(e) {
 *     console.log("拖拽开始，初始宽度:", e.detail.startWidth);
 *  },
 *  handleDragChange(e) {
 *     console.log("拖拽过程中，宽度变化:", e.detail);
 *     const { leftWidth, rightWidth, delta } = e.detail;
 *     console.log("左侧宽度:", leftWidth, "右侧宽度:", rightWidth, "变化量:", delta);
 *  },
 *  handleDragEnd(e) {
 *     console.log("拖拽结束，宽度变化:", e.detail);
 *     console.log("总变化量:", e.detail.delta);
 *     const {finalWidth, delta } = e.detail;
 *     // 可以在这里保存宽度到Vuex或localStorage
 *     console.log("左侧变化宽度:", this.dropLineLeftWidthChange, "变化量:", delta);
 *  },

 *拖拽线css:
 *        .drag-line {
 *            width: 5px;
 *            height: 100%; 
 *            min-height: 100%;
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

            // 创建自定义事件
            const dragStartEvent = new CustomEvent('drag-start', {
                detail: {
                    startWidth, // 起始宽度
                    leftWidth: preDom.clientWidth, // 左侧宽度
                    rightWidth: 0, // 右侧宽度
                    finalWidth: 0, // 左侧最终宽度
                    delta: 0 // 拖拽距离总变化量
                }
            });
            el.dispatchEvent(dragStartEvent);
            
            document.onmousemove = e => {
                const parentWidth = el.parentNode.clientWidth
                const preWidth = startWidth + e.clientX - starX
                const nextWidth = parentWidth - preWidth
                if (preWidth >= leftMinWidth && nextWidth >= rightMinWidth) {
                    preDom.style.width = preWidth + 'px'

                    // 拖拽过程中触发事件
                    const dragEvent = new CustomEvent('drag-change', {
                        detail: {
                        leftWidth: preWidth,
                        rightWidth: nextWidth,
                        delta: e.clientX - starX
                        }
                    });
                    el.dispatchEvent(dragEvent);
                }
            }
            document.onmouseup = () => {
                // 拖拽结束触发事件
                const finalWidth = preDom.clientWidth;
                const dragEndEvent = new CustomEvent('drag-end', {
                detail: {
                    finalWidth,
                    delta: finalWidth - startWidth
                }
                });
                el.dispatchEvent(dragEndEvent);
                
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}
