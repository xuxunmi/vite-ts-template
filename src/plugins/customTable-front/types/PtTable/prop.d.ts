import {
  type ObjectEmitsOptions,
  type MethodOptions,
  type PropType,
  type ExtractPropTypes
} from 'vue';
import { ElTable, ElTableColumn, ElPagination, type ElTooltipProps } from 'element-plus'
import { GetMerge } from "../utils/index";

//#region 属性类型
/**
 * 多语言
 * @default 'zh_cn'
 */
export declare type PtLocaleType = '' | 'zh_cn' | 'en'
/**
 * 表格编辑
 * @default {}
 */
export declare type PtTableEditConfigType = {
  /**
   * 显示/隐藏
   * @default true
   */
  show?: boolean
  /**
   * 尺寸
   * @default ''
   */
  size?: "" | "default" | "small" | "large"
  /**
   * 列设置功能显示/隐藏
   * @default false
   */
  colSetShow?: boolean
  /**
   * 全屏编辑功能显示/隐藏
   * @default false
   */
  fullScreen?: boolean
  /**
   * 是否全屏
   * @default false
   */
  isFullscreen?: boolean
  /**
   * 导出功能显示/隐藏
   * @default { show: false, fileName: '列表' }
   */
  exportExcel?: {
    show: boolean
    fileName?: string
  }
}

/**
 * 分页
 * @default {}
 */
export declare type PtPaginationType = GetMerge<[InstanceType<typeof ElPagination>,{
  /**
   * 是否显示
   * @default true
   */
  show: boolean
}]>

/**
 * 表格列
 * @default {}
 */
export declare type PtTableColumnType = GetMerge<[InstanceType<typeof ElTableColumn>,{
  /**
   * 是否禁用
   * @default false
   */
  disabled: boolean
  /**
   * 插槽
   * @default ''
   */
  slot?: string
  /**
   * 是否显示
   * @default false
   */
  show: boolean
  /**
   * 行内编辑
   * @default {}
   */
  colEdit?: {
    /**
     * 是否启用行内编辑
     * @default false
     */
    show?: boolean
    /**
     * 数据类型
     * @default ''
     */
    type?: "" | "select" | "text" | "number"
    /**
     * 当类型为“select”时的下拉列表
     */
    options?: any
    /**
     * 编辑字段
     */
    editProp?: string
    /**
     * 监听打开行内编辑
     */
    showEditInline?: (options: any) => void
    /**
     * 控件配置
     */
    controlPropConfig?: any
    /**
     * 监听行内编辑完成后执行事件
     */
    afterEditInline?: (options: any) => void
  }
  /**
   * 列的类型（drag：拖拽改变行顺序列）
   * @default ''
   */
  colType?: string
  /**
   * 导出时忽略列
   * @default false
   */
  ignoreExport?: boolean
  /**
   * 导出时添加缩进
   * @default false
   */
  showIndent?: boolean
}]>
export declare type PtTableColumnsType = PtTableColumnType[]

/**
 * 右键菜单
 * @default {}
 */
export declare type PtMenuConfigType = {
  /**
   * 是否显示
   * @default false
   */
  showMenu: boolean
}

/**
 * 单元格选择
 * @default {}
 */
export declare type PtAreaConfigType = {
  /**
   * 是否显示
   * @default false
   */
  show: boolean
  /**
   * 单元格选择复制事件回调
   * @default null
   */
  areaCopy: (text: string) => void
}
//#endregion

//#region 组件类型
export declare const props: {
  /**
   * 多语言
   * @default 'zh_cn'
   */
  locale: PropType<PtLocaleType>,
  /**
   * 自定义表格列
   * @default []
   */
  tableColumns: PropType<PtTableColumnsType>
  /**
   * 表格编辑配置
   * @default []
   */
  tableEditConfig: PropType<PtTableEditConfigType>
  /**
   * 分页配置
   * @default {}
   */
  paginationConfig: PropType<PtPaginationType>
  /**
   * 菜单配置
   * @default {}
   */
  menuConfig: PropType<PtMenuConfigType>
  /**
   * 是否禁用单元格行内编辑
   * @default false
   */
  cellDisabledEdit?: (data: { row: any, column: any, rowIndex: number, columnIndex: number }) => boolean
  /**
   * 同el-table的row-class-name属性
   */
  rowClassName?: (data: { row: any,rowIndex: number }) => string | string
  /**
   * 同el-table的row-class-name属性
   */
  headerCellClassName?: (data: { row: any,rowIndex: number }) => string | string
  /**
   * 同el-table的tooltip-options属性
   */
  tooltipOptions?: Pick<ElTooltipProps, 'effect' | 'enterable' | 'hideAfter' | 'offset' | 'placement' | 'popperClass' | 'popperOptions' | 'showAfter' | 'showArrow'>
  /**
   * 同el-table的stripe属性
   */
  stripe?: boolean
}

export type PtTableProps = ExtractPropTypes<typeof props & InstanceType<typeof ElTable>>;

export declare interface PtTableMethods extends MethodOptions {
  /**
   * 设置一个选择项。如果当前数据中找不到，返回 null
   */
  // setSelected: (data: any) => null | undefined;
}

export declare interface PtTableEmits extends ObjectEmitsOptions {
  setCurrentRow: (row: any) => void;
  getSelectionRows: () => any;
  toggleRowSelection: (row: any, selected: boolean) => void;
  clearSelection: () => void;
  clearFilter: (columnKeys?: string[] | undefined) => void;
  toggleAllSelection: () => void;
  toggleRowExpansion: (row: any, expanded?: boolean | undefined) => void;
  clearSort: () => void;
  doLayout: () => void;
  sort: (prop: string, order: string) => void;
  scrollTo: (options: number | ScrollToOptions, yCoord?: number | undefined) => void;
  setScrollLeft: (left?: number | undefined) => void;
  setScrollTop: (top?: number | undefined) => void;
}
//#endregion
