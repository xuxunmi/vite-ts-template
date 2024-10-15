<template>
    <div ref="DropRef" class="drop-container">
        <div v-show="showLeft" class="drop-left scrollbar">
            <div class="drop-left-container" :style="{ 'min-width': minContainerWidth[0] + 'px' }">
                <slot name="left" />
            </div>
        </div>
        <div v-show="showLeft" class="drop-line" v-dropLine="minDropWidth" />
        <div class="drop-right scrollbar">
            <div class="drop-right-container" :style="{ 'min-width': minContainerWidth[1] + 'px' }">
                <slot name="right" />
            </div>
            <el-icon class="drop-fold-left" @click="handleDropFoldLeft">
                <DArrowLeft v-if="showLeft" />
                <DArrowRight v-else />
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type Directive, onMounted, ref } from 'vue'

// 使用示例：
//     <div class="app-container">
//         <div class="sf-container">
//             <div class="sf-container-main">
//                 <drop-line left-width="300px" :minDropWidth="[150, 150]">
//                     <template #left>
//                         <productList class="product-list" />
//                     </template>
//                     <template #right>
//                         <div class="sf-container-main-content">
//                             <div class="sf-table-wrapper">
//                                 <drop-line left-width="40%" :minDropWidth="[250, 400]">
//                                     <template #left>
//                                         <productFolder class="product-folder" />
//                                     </template>
//                                     <template #right>
//                                         <folderContent class="folder-content" />
//                                     </template>
//                                 </drop-line>
//                             </div>
//                         </div>
//                     </template>
//                 </drop-line>
//             </div>
//         </div>
//     </div>

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
        default: () => [100, 100]
    },
    /**
     * 左右内容最小宽度
     * @default [100, 100]
     */
    minContainerWidth: {
        type: Array,
        default: () => [100, 100]
    }
})
//#endregion

const emits = defineEmits(["dropWidthChange"])

// 拖拽指令
const vDropLine: Directive = {
    mounted(el, binding) {
        let starX: number, startWidth: number
        const preDom = el.previousElementSibling
        const [leftMinWidth, rightMinWidth] = binding.value || [300, 400]
        el.onmousedown = (e: any) => {
            e.preventDefault()
            starX = e.clientX
            startWidth = preDom.clientWidth
            document.onmousemove = (e: any) => {
                document.body.style.cursor = 'col-resize'
                const parentWidth = el.parentNode.clientWidth
                const preWidth = startWidth + e.clientX - starX
                const nextWidth = parentWidth - preWidth
                if (preWidth >= leftMinWidth && nextWidth >= rightMinWidth) {
                    preDom.style.width = preWidth + 'px'
                }
                emits("dropWidthChange")
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
                document.body.style.cursor = 'initial'
            }
        }
    }
}

const DropRef = ref<HTMLDivElement>()
const setLeftWidth = (width: string) => {
    const leftDom = DropRef.value?.querySelector('.drop-left') as HTMLDivElement
    if (leftDom) leftDom.style.width = width
}

// 左侧折叠
const showLeft = ref(true)
const handleDropFoldLeft = () => {
    showLeft.value = !showLeft.value
    // 延迟一秒触发
    if (timer.value) clearTimeout(timer.value)
    timer.value = setTimeout(() => {
        emits("dropWidthChange")
    }, 50)
}

onMounted(() => {
    setLeftWidth(props.leftWidth)
})
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
        position: relative;
        flex: 1;
        .drop-right-container {
            height: 100%;
        }
        .drop-fold-left {
            position: absolute;
            top: 0;
            left: -2px;
            cursor: pointer;
            z-index: 999;
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
