<template>
    <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script setup lang="ts">
/**
 *   使用示例：
 *   <PieChart
 *       v-if="pieData.length"
 *       id="pieOptionChart"
 *       class="chart"
 *       width="calc((100vw - 320px) / 2)"
 *       height="400px"
 *       :option="pieOption"
 *   />
 */

import { onMounted, nextTick, onBeforeUnmount } from 'vue'
import eCharts from './types'
import type { EChartsOption } from 'echarts'

defineOptions({
    name: 'PieChart'
})

const emits = defineEmits(['pieChartClickEvent', 'pieChartTitleClickEvent'])

interface Props {
    className?: string
    id: string
    width?: string
    height?: string
    option: EChartsOption
}

const props = withDefaults(defineProps<Props>(), {
    className: 'pie-chart',
    id: 'pieChartsComponents',
    width: '200px',
    height: '200px',
    option: (): EChartsOption => ({})
})
//#endregion

//#region 饼图表
let pieChart: any = null
const initChart = () => {
    const chartContainer = document.getElementById(props.id) as HTMLDivElement
    // 解决控制台警告：There is a chart instance already initialized on the dom.
    if (pieChart != null && pieChart != '' && pieChart != undefined) {
        pieChart.dispose()
    }
    if (chartContainer) {
        pieChart = eCharts.init(chartContainer)
        pieChart.setOption(props.option)
        pieChart.on('click', (params: any) => {
            // console.log("params: ", params)
            if (params.componentType === 'title') {
                emits('pieChartTitleClickEvent')
                return
            }
            emits('pieChartClickEvent', params.data)
        })
        const resizeObserver = new ResizeObserver(() => pieChart?.resize())
        resizeObserver.observe(chartContainer)
    }
}

// 重新刷新渲染饼图
watch(
    () => props.option,
    () => {
        initChart()
    },
    {
        immediate: true,
        deep: true
    }
)

const resizeChart = () => {
    pieChart?.resize()
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
