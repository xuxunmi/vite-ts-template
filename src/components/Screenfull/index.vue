<template>
    <div @click="click">
        <el-tooltip effect="dark" :content="tips" placement="bottom">
            <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

defineOptions({
    name: 'Screenfull'
})

const props = defineProps({
    /** 全屏的元素，默认是 html */
    element: {
        type: String,
        default: 'html'
    },
    /** 打开全屏提示语 */
    openTips: {
        type: String,
        default: '全屏'
    },
    /** 关闭全屏提示语 */
    exitTips: {
        type: String,
        default: '退出全屏'
    }
})

const tips = ref<string>(props.openTips)
const isFullscreen = ref<boolean>(false)

const click = () => {
    const dom = document.querySelector(props.element) || undefined
    if (!screenfull.isEnabled) {
        ElMessage.warning('您的浏览器无法工作')
        return
    }
    screenfull.toggle(dom)
}

const change = () => {
    isFullscreen.value = screenfull.isFullscreen
    tips.value = screenfull.isFullscreen ? props.exitTips : props.openTips
}

screenfull.on('change', change)

onUnmounted(() => {
    if (screenfull.isEnabled) {
        screenfull.off('change', change)
    }
})
</script>

<style lang="less" scoped>
.svg-icon {
    font-size: 20px;
    &:focus {
        outline: none;
    }
}
</style>
