<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :href="symbolId" />
    </svg>
</template>

<script setup lang="ts">
/**
 * 组件使用：此组件为全局组件，使用时无需引入
 *
 *     <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
 *
 *     fullscreen-exit，fullscreen为svg名称
 */
import { computed } from 'vue'

defineOptions({
    name: 'svgIcon'
})

const props = defineProps({
    prefix: {
        type: String,
        default: 'icon'
    },
    // 图标名称
    name: {
        type: String,
        required: true
    }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="less" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>
