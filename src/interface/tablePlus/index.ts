/*
 * description: 编辑下拉接口类型
 */
export interface ControlSelectEditPropsInterface {
    value: string | number
    label: string
}

/*
 * description: 自定义按钮接口类型
 */
export interface ToolbarCustomBtnsInterface {
    label: string
    onClick: () => void
}

/*
 * description: 表格数据列接口类型
 */
export interface TableColumnsInterface {
    prop: string
    label: string
    width: string
    fixed: 'left' | 'right' | undefined
    editable: boolean
    editProps: any
    showOverflowTooltip: boolean
    formatter: Function
}

/*
 * description: Sortable拖拽接口类型
 */
export interface SortableOptionsInterface {
    animation: number
    handle: string
    draggable: string
    filter: string
    onMove: Function
    onEnd: Function
}
