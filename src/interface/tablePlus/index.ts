/*
 * description: 编辑下拉接口类型
 */
export interface ControlSelectEditPropsInterface {
    optionValue: string | number
    optionLabel: string
    [key: string]: any
}

/*
 * description: 自定义按钮接口类型
 */
export interface ToolbarCustomBtnsInterface {
    label: string
    type: string
    onClick: () => void
}

/*
 * description: 表格数据列接口类型
 */
export interface TableColumnsInterface {
    slotProp?: string
    prop: string
    label: string
    width?: string | number
    type?: string
    fixed?: 'left' | 'right' | undefined
    editable?: boolean
    editProps?: any
    showOverflowTooltip?: boolean
    formatter?: Function
    visible?: boolean
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
    destroy: Function
}
