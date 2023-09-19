<template>
    <div class="table-plus">
        <table-plus-toolbar
            v-bind="$attrs"
            :columns="columns"
            @row-add="handleRowAdd"
            @row-add-child="handleRowAddChild"
            @row-remove="handleRowRemove"
            @row-modify="handleRowModify"
            @row-enable="handleRowEnable"
            @row-disable="handleRowDisable"
            @row-be-invalid="handleRowBeInvalid"
            @custom-btn-click="handleCustomBtnClick"
            @search="handleSearch"
            @filtered-columns-change="handleFilteredColumnsChange"
        />
        <el-table
            ref="tableRef"
            class="drag"
            v-loading="loading"
            v-bind="$attrs"
            :data="filteredDataSource"
            :row-key="getRowKey"
            :row-class-name="generateRowClassName"
            :cell-class-name="generateCellClassName"
            :max-height="maxHeight"
            highlight-current-row
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange"
            @current-change="handleCurrentChange"
            @sort-change="handleSortChange"
        >
            <el-table-column v-if="rowSortable" width="60">
                <el-icon class="cursor-move table-plus__drag-handler"><Rank /></el-icon>
            </el-table-column>
            <el-table-column v-if="showSelection" type="selection" reserve-selection width="40" />
            <template v-for="(columnItem, columnIndex) in columns">
                <template v-if="columnItem.type">
                    <el-table-column v-bind="columnItem" :key="columnItem.prop" />
                </template>
                <el-table-column
                    v-else-if="filteredColumnProps.includes(columnItem.prop) && columnItem.visible !== false"
                    v-bind="columnItem"
                    :key="columnItem.prop"
                >
                    <template #default="scope">
                        <template v-if="isSameRow(scope.row, currentEditRow)">
                            <table-plus-control
                                v-if="columnItem.editable"
                                v-model="currentEditRowModel[columnItem.prop]"
                                v-bind="columnItem.editProps || {}"
                                @change="
                                    (val: string) =>
                                        handleEditValueChange({
                                            value: val,
                                            prop: columnItem.prop,
                                            rowModel: currentEditRowModel
                                        })
                                "
                            />

                            <template v-else-if="columnItem.slotProp">
                                <slot :name="columnItem.slotProp" :row="scope.row" />
                            </template>

                            <span v-else>
                                {{
                                    renderColumnText({
                                        column: columnItem,
                                        text: currentEditRowModel[columnItem.prop],
                                        row: scope.row,
                                        index: columnIndex
                                    })
                                }}
                            </span>

                            <!-- <el-popover
                                v-if="columnIndex === columns.length - 1"
                                v-model="editToolbarVisible"
                                popper-class="popper__table-edit-toolbar"
                                placement="bottom"
                                trigger="contextmenu"
                                :show-arrow="false"
                            >
                                <template #reference> </template>
                                <el-button type="primary" size="small" @click="confirmEdit">确认</el-button>
                                <el-button size="small" @click="cancelEdit">取消</el-button>
                            </el-popover> -->
                        </template>

                        <template v-else-if="columnItem.slotProp">
                            <slot :name="columnItem.slotProp" :row="scope.row" />
                        </template>

                        <span v-else>
                            {{
                                renderColumnText({
                                    column: columnItem,
                                    text: scope.row[columnItem.prop],
                                    row: scope.row,
                                    index: columnIndex
                                })
                            }}
                        </span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script lang="ts">
export default {
    inheritAttrs: false,
    name: 'TablePlus'
}
</script>

<script setup lang="ts">
import TablePlusToolbar from './toolbar/index.vue'
import TablePlusControl from './control/index.vue'
import Sortable from 'sortablejs'
import { removeItemsInTree } from '@/utils'
import { getLevelFromClassName, randomString } from './utils'
import { ElMessage } from 'element-plus'
import type { ElTable, CheckboxValueType } from 'element-plus'
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount, useAttrs } from 'vue'

const attrs = useAttrs()
console.log('attrs:', attrs)
// sortable 实例
let sortable: Sortable | null = null
// 表格实例
const tableRef = ref<InstanceType<typeof ElTable>>()

const props = defineProps({
    /**
     * 数据唯一标识，必填，必须为有效值
     */
    rowKey: {
        type: String,
        default: 'oid'
    },
    /**
     * 是否加载loading
     */
    loading: {
        type: Boolean,
        default: false
    },
    /**
     * 列配置
     */
    columns: {
        type: Array as () => any[],
        default: () => []
    },
    /**
     * 数据源
     */
    dataSource: {
        type: Array,
        default: () => []
    },
    /**
     * 表行类名
     */
    rowClassName: {
        type: Function,
        default: () => ''
    },
    /**
     * 单元格行类名
     */
    cellClassName: {
        type: Function,
        default: () => ''
    },
    /**
     * 是否启用双击编辑
     */
    rowEditable: {
        type: Boolean,
        default: false
    },
    /**
     * 是否启用行排序
     */
    rowSortable: {
        type: Boolean,
        default: false
    },
    /**
     * 行排序序号字段
     */
    rowSortSequenceField: {
        type: String,
        default: undefined
    },
    /**
     * 是否显示搜索框，默认显示
     */
    showSearchBar: {
        type: Boolean,
        default: true
    },
    /**
     * 是否启用本地移除
     */
    rowLocalRemove: {
        type: Boolean,
        default: false
    },
    /**
     * 表格新增一行时的默认值
     */
    initialRowModel: {
        type: Object,
        default: () => ({})
    },
    /**
     * 是否启用前端搜索
     */
    localSearch: {
        type: Boolean,
        default: true
    },
    /**
     * 是否展示多选
     */
    showSelection: {
        type: Boolean,
        default: true
    },
    /**
     * 是否设置表格高度,达到固定表头
     */
    maxHeight: {
        type: Number
    }
})

const emits = defineEmits([
    'row-add',
    'row-remove',
    'row-modify',
    'row-enable',
    'row-disable',
    'row-be-invalid',
    'row-edit-confirm',
    'search',
    'row-click',
    'row-select',
    'row-edit-value-change',
    'row-sort',
    'custom-sortable'
])

// 当前搜索文字
const searchText = ref<string>('')
// 当前选中的列
const filteredColumnProps = ref<CheckboxValueType[]>([])
// 选择的行
const selectedRows = ref([])
// 当前高亮行
const currentHighlightRow = ref(null)
// 当前编辑的行
const currentEditRow = ref(null)
// 当前编辑的行模型
const currentEditRowModel = ref<any>(null)
// 是否显示编辑工具栏
const editToolbarVisible = ref(false)

/**
 * 筛选行
 */
const filteredDataSource = computed(() => {
    if (!searchText.value) {
        return props.dataSource
    }
    return filterList(props.dataSource, searchText.value.toUpperCase())
})

/**
 * 监听赋值过滤列
 */
watch(
    () => props.columns,
    val => {
        filteredColumnProps.value = val.map(item => item.prop)
    },
    { immediate: true }
)

/**
 * 监听编辑时浅复制当前行数据
 */
watch(
    () => currentEditRow.value,
    (val: any) => {
        editToolbarVisible.value = false
        if (!val) {
            currentEditRowModel.value = null
            return
        }
        nextTick(() => (editToolbarVisible.value = true))
        currentEditRowModel.value = { ...val }
    }
)

/**
 * 初始化表格拖拽
 */
const initTableSortable = () => {
    const selector = tableRef.value!.$el.querySelector('.el-table__body-wrapper tbody')
    sortable = Sortable.create(selector, {
        animation: 300,
        handle: '.table-plus__drag-handler',
        draggable: '.el-table__row',
        filter: '.row-draggable--disabled',
        onMove: event => {
            const draggedLevel = getLevelFromClassName(event.dragged.className)
            const relatedLevel = getLevelFromClassName(event.related.className)
            return draggedLevel === relatedLevel
        },
        onEnd: ({ oldIndex, newIndex }) => {
            if (oldIndex && newIndex) {
                const currentRow = props.dataSource.splice(oldIndex, 1)[0]
                props.dataSource.splice(newIndex, 0, currentRow)
                nextTick(() => {
                    if (props.rowSortSequenceField) {
                        props.dataSource.forEach((item: any, index) => {
                            if (props.rowSortSequenceField) {
                                item[props.rowSortSequenceField] = index + 1
                            }
                        })
                    }
                })
                emits('row-sort', { oldIndex, newIndex })
                // 重置当前正在编辑的行的工具栏，防止位置错乱
                if (currentEditRow.value) {
                    editToolbarVisible.value = false
                    nextTick(() => (editToolbarVisible.value = true))
                }
            }
        }
    })
}

/**
 * 获取 rowKey 值
 */
const getRowKey = (row: any) => {
    return row[props.rowKey] ?? row['_newRowId']
}

/**
 * 生成表格行类名
 */
const generateRowClassName = ({ row, rowIndex }: { row: any; rowIndex: number }) => {
    let classes = props.rowClassName ? props.rowClassName({ row, rowIndex }) : ''
    if (row.children?.length) {
        classes += ' row-draggable--disabled'
    }
    return classes
}

/**
 * 生成表格单元格类名
 */
const generateCellClassName = ({
    row,
    column,
    rowIndex,
    columnIndex
}: {
    row: any
    column: any
    rowIndex: number
    columnIndex: number
}) => {
    let classes = props.cellClassName ? props.cellClassName({ row, column, rowIndex, columnIndex }) : ''
    return `${classes} table-plus__cell`
}

/**
 * 处理表格当前行点击事件
 */
const handleCurrentChange = (row: any) => {
    currentHighlightRow.value = row
}

/**
 * 处理表格排序远程搜索
 */
const handleSortChange = ({ column, prop, order }: { column: any; prop: string; order: any }) => {
    console.log(' order:', column, prop, order)
    emits('custom-sortable', { column, prop, order })
}

/**
 * 处理单击时行编辑事件
 */
const handleRowClick = (row: any) => {
    emits('row-click')
    if (!props.rowEditable) {
        return
    }
    editRow(row)
}

/**
 * 处理选择行事件
 */
const handleSelectionChange = (selection: any) => {
    selectedRows.value = selection
    emits('row-select', selection)
}

/**
 * 渲染 Column 文本
 */
const renderColumnText = ({ column, text, row, index }: { column: any; text: string; row: any; index: number }) => {
    if (column.formatter) {
        return column.formatter(row, column, text, index)
    }
    return text
}

/**
 * 处理添加行事件
 */
const handleRowAdd = () => {
    emits('row-add')
    if (!props.rowEditable) {
        return
    }
    const newRow = initNewRow()
    props.dataSource.push(newRow)
    editRow(newRow)
}

/**
 * 处理树形表格增加子行事件
 */
const handleRowAddChild = () => {
    const parentRow = currentHighlightRow.value || selectedRows[0].value
    if (!parentRow) {
        ElMessage({
            type: 'warning',
            message: '请先选中一行!',
            center: true
        })
        return
    }
    const newRow = initNewRow()
    if (Array.isArray(parentRow.children)) {
        parentRow.children.push(newRow)
    } else {
        parentRow.children = ref([newRow])
    }
    editRow(newRow)
}

/**
 * 处理行移除事件
 */
const handleRowRemove = () => {
    if (!selectedRows.value.length) {
        ElMessage({
            type: 'warning',
            message: '请先选中一条记录!',
            center: true
        })
        return
    }
    if (props.rowLocalRemove) {
        removeItemsInTree(props.dataSource, selectedRows.value)
    }
    emits('row-remove', selectedRows.value)
}

/**
 * 处理点击修改按钮事件
 */
const handleRowModify = () => {
    if (!checkSelectedRows()) {
        return
    }
    emits('row-modify', selectedRows.value)
}

/**
 * 点击启用
 */
const handleRowEnable = () => {
    if (!checkSelectedRows()) {
        return
    }
    emits('row-enable', selectedRows.value)
}

/**
 * 处理点击停用按钮事件
 */
const handleRowDisable = () => {
    if (!checkSelectedRows()) {
        return
    }
    emits('row-disable', selectedRows.value)
}

/**
 * 处理点击作废按钮事件
 */
const handleRowBeInvalid = () => {
    if (!checkSelectedRows()) {
        return
    }
    emits('row-be-invalid', selectedRows.value)
}

/**
 * 处理点击自定义按钮事件
 */
const handleCustomBtnClick = (onClick: Function) => {
    if (!onClick) {
        return
    }
    onClick(selectedRows.value)
}

/**
 * 处理前端搜索事件
 */
const handleSearch = (val: string) => {
    if (props.localSearch) {
        searchText.value = val
        return
    }
    emits('search', val)
}

/**
 * 处理列过滤事件
 */
const handleFilteredColumnsChange = (value: CheckboxValueType[]) => {
    filteredColumnProps.value = value
    nextTick(() => tableRef.value!.doLayout())
}

/**
 * 过滤列表，支持树形
 */
const filterList = (list: any[], text: string) => {
    return list.reduce((acc, cur) => {
        const exist = Object.values(cur).some(
            value => (value === 0 || value) && String(value).toUpperCase().includes(text)
        )
        if (exist) {
            acc.push(cur)
            return acc
        }
        if (Array.isArray(cur.children)) {
            const children = filterList(cur.children, text)
            if (children.length) {
                acc.push({ ...cur, children })
            }
        }
        return acc
    }, [])
}

/**
 * 编辑值 change
 * value: 当前值
 * prop: 当前编辑的属性
 * rowModel: 当前编辑的行实体
 */

const handleEditValueChange = ({ value, prop, rowModel }: { value: string; prop: string; rowModel: any }) => {
    emits('row-edit-value-change', { value, prop, rowModel })
}

/**
 * 初始化新行
 */
const initNewRow = () => {
    return { _isNewRow: true, _newRowId: randomString(), ...props.initialRowModel }
}

/**
 * 检测是否选中一行
 */
const checkSelectedRows = () => {
    if (!selectedRows.value.length) {
        ElMessage({
            type: 'warning',
            message: '请先选中一条记录!',
            center: true
        })
        return false
    }
    return true
}

/**
 * 编辑指定行
 */
const editRow = row => {
    if (currentEditRow.value) {
        confirmEdit()
    }
    currentEditRow.value = row
    tableRef.value!.clearSelection()
    nextTick(() => {
        tableRef.value!.toggleRowSelection(row, true)
        tableRef.value!.setCurrentRow(row)
    })
}

/**
 * 确认编辑
 */
const confirmEdit = () => {
    const newRow = { ...currentEditRowModel.value }
    emits('row-edit-confirm', newRow)
    replaceItemInList(props.dataSource, currentEditRow.value, newRow)
    currentEditRow.value = null
}

/**
 * 取消编辑
 */
const cancelEdit = () => {
    currentEditRow.value = null
}

/**
 * 替换列表中指定项，支持树形结构
 */
const replaceItemInList = (list, oldItem, newItem) => {
    const index = list.findIndex(item => isSameRow(item, oldItem))
    if (index !== -1) {
        Object.assign(list[index], newItem)
        return true
    }
    for (const item of list) {
        if (item.children?.length) {
            if (replaceItemInList(item.children, oldItem, newItem)) {
                break
            }
        }
    }
}

/**
 * 是否是同一行
 */
const isSameRow = (row1, row2) => {
    if (!row1 || !row2) {
        return false
    }
    if (row1 === row2) {
        return true
    }
    const row1Key = getRowKey(row1)
    const row2Key = getRowKey(row2)
    if (!(row1Key || row1Key === 0) || !(row2Key || row2Key === 0)) {
        return false
    }
    return row1Key === row2Key
}

onMounted(() => {
    if (props.rowSortable) {
        initTableSortable()
    }
})

onBeforeUnmount(() => {
    // 销毁 sortable
    if (sortable) {
        sortable.destroy()
    }
})
</script>

<style lang="less" scoped>
@import '@/styles/scrollbar.less';

:deep(.table-plus) {
    height: 100%;
    &__cell .cell {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.popper__table-edit-toolbar {
    min-width: 120px;
}
</style>
