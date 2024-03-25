<template>
    <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script setup lang="ts">
import { onMounted, nextTick, onBeforeUnmount } from 'vue'
import eCharts from './types'
import type { EChartsOption } from 'echarts'

defineOptions({
    name: 'BarChart'
})

const emits = defineEmits(['barChartClickEvent', 'barChartTitleClickEvent'])

//#region 参数和方法
interface Props {
    className?: string
    id: string
    width?: string
    height?: string
    option: EChartsOption
}

const props = withDefaults(defineProps<Props>(), {
    className: 'bar-chart',
    id: 'barChartsComponents',
    width: '200px',
    height: '200px',
    option: (): EChartsOption => ({})
})
//#endregion

//#region 柱状图表
let barChart: any = null
const initChart = () => {
    const chartContainer = document.getElementById(props.id) as HTMLDivElement
    if (chartContainer) {
        barChart = eCharts.init(chartContainer)
        barChart.setOption(props.option)
        barChart.on('click', (params: any) => {
            // console.log("params: ", params)
            if (params.componentType === 'title') {
                emits('barChartTitleClickEvent')
                return
            }
            emits('barChartClickEvent', params)
        })
        const resizeObserver = new ResizeObserver(() => barChart?.resize())
        resizeObserver.observe(chartContainer)
    }
}

// 重新刷新渲染柱状图
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
    barChart?.resize()
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
