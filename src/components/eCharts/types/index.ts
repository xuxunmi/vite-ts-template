// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, PieChart, LineChart } from 'echarts/charts'
// 引入组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    DataZoomComponent
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 系列类型的定义后缀都为 SeriesOption
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts'

// 组件类型的定义后缀都为 ComponentOption
import type {
    TitleComponentOption,
    TooltipComponentOption,
    GridComponentOption,
    DatasetComponentOption,
    LegendComponentOption,
    DataZoomComponentOption
} from 'echarts/components'

import type { ComposeOption } from 'echarts/core'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | LegendComponentOption
    | DataZoomComponentOption
>

// 注册必须的组件
echarts.use([
    BarChart,
    PieChart,
    LineChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    DataZoomComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
])

export default echarts
