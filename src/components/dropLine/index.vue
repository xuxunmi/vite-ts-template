<template>
    <div class="drop-container">
        <div class="drop-left scrollbar" :style="{ width: leftWidth }">
            <div class="drop-left-container" :style="{ 'min-width': minContainerWidth[0] + 'px' }">
                <slot name="left"></slot>
            </div>
        </div>
        <div class="drop-line" v-dropLine="minDropWidth"></div>
        <div class="drop-right scrollbar">
            <div class="drop-right-container" :style="{ 'min-width': minContainerWidth[1] + 'px' }">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type Directive } from 'vue'
//#region 参数和方法
const props = defineProps({
    /**
     * 左侧初始化宽度
     * @default '200px'
     */
    leftWidth: {
        type: String,
        default: '200px'
    },
    /**
     * 左右拖拽最小宽度
     * @default [100, 100]
     */
    minDropWidth: {
        type: Array,
        default: [100, 100]
    },
    /**
     * 左右内容最小宽度
     * @default [100, 100]
     */
    minContainerWidth: {
        type: Array,
        default: [100, 100]
    }
})

//#endregion

// 拖拽指令
const vDropLine: Directive = {
    mounted(el, binding) {
        let starX: number, startWidth: number
        const preDom = el.previousElementSibling
        const [leftMinWidth, rightMinWidth] = binding.value || [300, 400]
        el.onmousedown = (e: any) => {
            starX = e.clientX
            startWidth = preDom.clientWidth
            e.preventDefault()
            document.onmousemove = (e: any) => {
                let parentWidth = el.parentNode.clientWidth
                let preWidth = startWidth + e.clientX - starX
                let nextWidth = parentWidth - preWidth
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
</script>

<style lang="scss" scoped>
.drop-container {
    display: flex;
    width: 100%;
    height: 100%;
    .drop-left {
        .drop-left-container {
            height: 100%;
        }
    }
    .drop-right {
        flex: 1;
        .drop-right-container {
            height: 100%;
        }
    }
    .drop-line {
        width: 1px;
        height: 100%;
        margin: 0 1px;
        background-color: #ddd;
        cursor: col-resize;
        &:hover {
            box-shadow: 0 0 0 1px #409eff;
            background-color: #409eff;
        }
    }
}

.scrollbar {
    overflow: auto;
    &::-webkit-scrollbar {
        height: 6px;
        width: 6px;
        background-color: #fff;
    }
    // 轨道
    &::-webkit-scrollbar-track {
        background-color: #fff;
    }
    // 滑块
    &::-webkit-scrollbar-thumb {
        height: 100%;
        border-radius: 4px;
        background-color: #babac0;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: #909399;
    }
}
</style>
