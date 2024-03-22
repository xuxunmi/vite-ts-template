<template>
    <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script setup lang="ts">
import { onMounted, nextTick, onBeforeUnmount } from 'vue'
import eCharts from './types'
import type { EChartsOption } from 'echarts'

//#region 参数和方法
interface Props {
    className?: string
    id: string
    width?: string
    height?: string
    option: EChartsOption
}

const props = withDefaults(defineProps<Props>(), {
    className: 'line-chart',
    id: 'lineChartsComponents',
    width: '200px',
    height: '200px',
    option: (): EChartsOption => ({})
})
//#endregion

//#region 柱状图表
let lineChart: any = null
const initChart = () => {
    const chartContainer = document.getElementById(props.id) as HTMLDivElement
    if (chartContainer) {
        lineChart = eCharts.init(chartContainer)
        lineChart.setOption(props.option)
        const resizeObserver = new ResizeObserver(() => lineChart?.resize())
        resizeObserver.observe(chartContainer)
    }
}

const resizeChart = () => {
    lineChart?.resize()
}

onMounted(() => {
    nextTick(() => {
        initChart()
    })
    window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart)
})

defineExpose({
    initChart: () => initChart()
})
//#endregion
</script>

<style lang="scss" scoped></style>
