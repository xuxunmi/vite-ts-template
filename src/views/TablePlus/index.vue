<template>
    <div class="app-container bg-white h-screen">
        <div class="app-layout">
            <h1 class="mb-8">TablePlus表格：</h1>
            <div class="app-layout__container h-full">
                <div ref="tableWrapper" class="app-layout__left">
                    <table-plus
                        ref="tablePlus"
                        :loading="loading"
                        :columns="columns"
                        :data-source="dataSource"
                        :custom-btns="customBtns"
                        :initial-row-model="initialRowModel"
                        :summary-method="getSummaries"
                        show-summary
                        row-key="id"
                        row-sort-sequence-field="sequence"
                        :show-search-bar="false"
                        row-sortable
                        row-editable
                        row-local-remove
                        stripe
                        border
                        size="small"
                        :maxHeight="tableMaxHeight"
                        @row-remove="handleRowRemove"
                        @row-edit-value-change="handleRowEditValueChange"
                        @row-select="hanldeRowSelect"
                    >
                        <template v-slot:status="{ row, index }">
                            <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">
                                {{ row.status === 1 ? '启用' : row.status === 0 ? '停用' : '未知' }}---下标：{{ index }}
                            </el-tag>
                        </template>
                    </table-plus>
                </div>
                <div class="app-layout__right">
                    <h2 class="app-layout__title">说明</h2>
                    <p>1. 支持工具栏按钮控制</p>
                    <p>2. 支持设置自定义按钮并绑定选中的数据</p>
                    <p>3. 支持服务端搜索</p>
                    <p>4. 支持筛选列</p>
                    <p>5. 支持行拖拽排序</p>
                    <p>6. 支持分页</p>
                    <p>7. 支持行内编辑（保存、取消）</p>
                    <p>8. 支持选择某项自动带出其他项</p>
                    <p>9. 支持排序</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TablePlus from '@/components/table-plus/index.vue'
import ExportExcel from 'js-export-excel'
import { formatFloat } from '@/utils'
import type { TableColumnCtx } from 'element-plus'
import { ref, reactive } from 'vue'

defineOptions({
    name: 'CustomTable'
})

const loading = ref(false)
const tableMaxHeight = ref(0)
const nameOptions = [
    { id: 100, name: '可选项1', age: 18, sex: '男', city: '无锡' },
    { id: 200, name: '可选项2', age: 20, sex: '女', city: '南通' }
]

// 新增行数据
const initialRowModel = computed(() => {
    return {
        name: undefined,
        sex: '男',
        age: undefined,
        city: undefined,
        deposit: undefined,
        status: 0
    }
})

// 状态列表
const statusList = [
    {
        id: 0,
        name: '停用'
    },
    {
        id: 1,
        name: '启用'
    }
]

// 表格列
const columns = [
    { prop: 'sequence', label: '序号', width: '120', fixed: 'left' },
    {
        prop: 'name',
        label: '姓名',
        width: '180',
        align: 'center',
        showOverflowTooltip: true,
        editable: true,
        editProps: {
            type: 'select',
            options: nameOptions,
            optionLabel: 'name',
            optionValue: 'id'
        }
    },
    {
        prop: 'sex',
        label: '性别',
        align: 'center',
        showOverflowTooltip: true,
        editable: false,
        sortable: true,
        width: '180'
    },
    {
        prop: 'age',
        label: '年龄',
        align: 'center',
        showOverflowTooltip: true,
        editable: true,
        sortable: 'custom',
        width: '180'
    },
    { prop: 'city', label: '城市', align: 'center', showOverflowTooltip: true, editable: true },
    { prop: 'deposit', label: '存款', align: 'center', showOverflowTooltip: true, editable: true },
    {
        // prop: 'status', // 用于 formatter 属性
        label: '状态',
        slotProp: 'status', // 用template具名插槽属性
        align: 'center',
        showOverflowTooltip: true,
        editable: true,
        editProps: {
            type: 'switch',
            activeValue: 1,
            inactiveValue: 0
        },
        formatter: (row: any) => {
            // return this.statusList.find(item => item.id === row.status)?.name;
            return row.status === 1 ? '启用' : row.status === 0 ? '停用' : '未知'
        }
    }
]

// 表格数据
const dataSource = ref([
    {
        id: 1,
        sequence: 1,
        name: '徐某某',
        age: 22,
        sex: '男',
        city: '上海',
        deposit: 99,
        status: 1,
        children: [
            {
                id: 11,
                sequence: '1-1',
                name: '用户1',
                age: 18,
                sex: '女',
                city: '徐汇',
                deposit: 98,
                status: 1,
                children: [
                    {
                        id: 111,
                        sequence: '1-1',
                        name: '用户3',
                        age: 18,
                        sex: '女',
                        city: '徐汇',
                        deposit: 98,
                        status: 1
                    },
                    {
                        id: 112,
                        sequence: '1-2',
                        name: '用户4',
                        age: 28,
                        sex: '女',
                        city: '浦东',
                        deposit: 97,
                        status: 1
                    }
                ]
            },
            {
                id: 12,
                sequence: '1-2',
                name: '用户2',
                age: 28,
                sex: '女',
                city: '浦东',
                deposit: 97,
                status: 1
            }
        ]
    },
    { id: 2, sequence: 2, name: '朱某某', age: 28, sex: '女', city: '苏州', deposit: 99, status: 0 },
    { id: 3, sequence: 3, name: '罗某某', age: 20, sex: '女', city: '杭州', deposit: 88, status: 1 },
    { id: 4, sequence: 4, name: '凡某某', age: 18, sex: '男', city: '南京', deposit: 87, status: 1 },
    { id: 5, sequence: 5, name: '宋某某', age: 18, sex: '男', city: '南京', deposit: 87, status: 1 }
])

/**
 * 处理导出Excel按钮
 */
const handleExportExcel = () => {
    let columnsLsit = columns.filter((item: any) => item.label)
    console.log('columnsLsit: ', columnsLsit)
    // TODO：待处理处理树形结构表格，目无法导出children中的数据的问题
    const sheetData = dataSource.value.map((item: any) =>
        columnsLsit.map((columnItem: any) =>
            columnItem.formatter ? columnItem.formatter(item) : item[columnItem.prop]
        )
    )
    console.log('sheetData: ', sheetData)
    const option = {
        fileName: '导出插件使用',
        datas: [
            {
                sheetHeader: columnsLsit.map((item: any) => item.label),
                sheetData: sheetData,
                columnWidths: new Array(columnsLsit.length).fill(10)
            }
        ]
    }
    const toExcel = new ExportExcel(option)
    toExcel.saveExcel()
}

// 表格自定义按钮
const customBtns = [
    {
        label: '自定义按钮',
        onClick: (selections: any) => {
            const names = selections.filter((item: any) => item.name).map((item: any) => item.name)
            if (names.length) {
                ElMessage({
                    type: 'info',
                    message: `选中了${names.join('、')}`,
                    center: true
                })
                return
            }
        }
    },
    { label: '导出 Excel', onClick: handleExportExcel }
]

/**
 *  行选中
 */
const hanldeRowSelect = (selectedRows: any) => {
    console.log('行选中selectedRows: ', selectedRows)
}

/**
 * 行编辑变化,带出当前行其他值
 */
const handleRowEditValueChange = ({ value, prop, rowModel }: { value: string; prop: string; rowModel: string }) => {
    if (prop === 'name') {
        const option = nameOptions.find((item: any) => item.id === value)
        Object.assign(rowModel, option)
    }
}

/**
 * 行移除(可用于操作接口)
 */
const handleRowRemove = (selectedRows: any) => {
    const names = selectedRows.filter((item: any) => item.name).map((item: any) => item.name)
    if (names.length) {
        ElMessage({
            type: 'success',
            message: `移除了${names.join('、')}`,
            center: true
        })
        return
    }
}

interface TableInterface {
    id: string
    sequence: string
    name: string
    age: string
    sex: number
    city: string
    deposit: number
    status: number
    children: TableInterface[]
}

interface SummaryMethodProps<T = Product> {
    columns: TableColumnCtx<T>[]
    data: T[]
}

/**
 * 表尾总计: 第一种方式
 */
// const getSummaries = ({ columns, data }) => {
//     return columns.reduce((acc, _, index) => {
//         if (index === 0) {
//             acc[index] = ''
//         } else if (index === 1) {
//             acc[index] = ''
//         } else if (index === 2) {
//             acc[index] = ''
//         } else if (index === 3) {
//             acc[index] = '合计'
//         } else if (index === 4) {
//             acc[index] = '/'
//         } else if (index === 5) {
//             acc[index] =
//                 formatFloat(
//                     data.reduce((acc, cur) => {
//                         return acc + (cur.age || 0)
//                     }, 0),
//                     4
//                 ) + ' 岁'
//         } else if (index === 6) {
//             acc[index] = '/'
//         } else if (index === 7) {
//             acc[index] =
//                 formatFloat(
//                     data.reduce((acc, cur) => {
//                         return acc + (cur.deposit || 0)
//                     }, 0),
//                     4
//                 ) + ' 万'
//         }
//         return acc
//     }, {})
// }

/**
 * 表尾总计: 第二种方式
 */
const getSummaries = (param: SummaryMethodProps) => {
    const { columns, data } = param
    const sums: string[] = []
    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = ''
        } else if (index === 1) {
            sums[index] = ''
        } else if (index === 2) {
            sums[index] = ''
        } else if (index === 3) {
            sums[index] = '合计'
        } else if (index === 4) {
            sums[index] = 'N/A'
        } else if (index === 6) {
            sums[index] = 'N/A'
        }
        const values = data.map(item => Number(item[column.property]))
        if (column.property === 'age' || column.property === 'deposit') {
            sums[index] = values
                .reduce((prev, curr) => {
                    const value = Number(curr)
                    if (!isNaN(value)) {
                        return prev + curr
                    } else {
                        return prev
                    }
                }, 0)
                .toString()
            sums[index] = formatFloat(+sums[index], 4) + ' 万'
        }
    })
    return sums
}

// 设置表格最大高度
const setTableMaxHeight = () => {
    nextTick(() => {
        const bodyH = document.body.clientHeight || 0
        const layoutHeader = document.querySelector('.layout-header-container')?.clientHeight || 0
        const tagsViewContainer = document.querySelector('.tags-view-container')?.clientHeight || 0
        tableMaxHeight.value = bodyH - layoutHeader - tagsViewContainer
        console.dir(tableMaxHeight.value)
    })
}

onMounted(() => {
    setTableMaxHeight()
})
</script>

<style lang="less" scoped>
.app-layout {
    &__container {
        display: flex;
    }

    &__title {
        margin-bottom: 24px;
    }

    &__left {
        width: 80%;
        padding-right: 20px;
    }

    &__right {
        width: 30%;
        padding-left: 20px;
    }
}
</style>
