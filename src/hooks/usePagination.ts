import { reactive } from "vue"

interface DefaultPaginationData {
    total: number
    currentPage: number
    pageSizes: number[]
    pageSize: number
    layout: string
    small?: boolean
    hideOnSinglePage?: boolean // 只有一页时是否隐藏
}

interface PaginationData {
    total?: number
    currentPage?: number
    pageSizes?: number[]
    pageSize?: number
    layout?: string
    small?: boolean
    hideOnSinglePage?: boolean // 只有一页时是否隐藏
    show?: boolean // pt-table(分页显示/隐藏)
}

/** 默认的分页参数 */
const defaultPaginationData: DefaultPaginationData = {
    total: 0,
    currentPage: 1,
    pageSizes: [10, 20, 30, 40, 50],
    pageSize: 10,
    layout: "total, prev, pager, next, sizes",
    small: true,
    hideOnSinglePage: false
}

export const usePagination = (initialPaginationData: PaginationData = {}) => {
    /** 合并分页参数 */
    const pageData = reactive({ ...defaultPaginationData, ...initialPaginationData })
    /** 改变当前页码 */
    const handleCurrentChange = (value: number) => {
        pageData.currentPage = value
    }
    /** 改变页面大小 */
    const handleSizeChange = (value: number) => {
        pageData.pageSize = value
    }

    return { pageData, handleCurrentChange, handleSizeChange }
}

/**
 * 使用示例：
 *    import { usePagination } from "@/hooks/usePagination"
 *    const getList = () => { ... } // 获取表格数据方法
 *    const { pageData, handleCurrentChange, handleSizeChange } = usePagination()
 *    监听分页变化：getList(): 获取表格数据方法
 *    watch([() => pageData.currentPage, () => pageData.pageSize], getList, { immediate: true })
 */
