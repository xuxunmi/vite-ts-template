import { reactive } from 'vue'

interface DefaultPaginationData {
    total: number
    currentPage: number
    pageSizes: number[]
    pageSize: number
    layout: string
}

interface PaginationData {
    total?: number
    currentPage?: number
    pageSizes?: number[]
    pageSize?: number
    layout?: string
}

/** 默认的分页参数 */
const defaultPaginationData: DefaultPaginationData = {
    total: 0,
    currentPage: 1,
    pageSizes: [10, 20, 50],
    pageSize: 10,
    layout: 'total, prev, pager, next, sizes'
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
 *    const { pageData, handleCurrentChange, handleSizeChange } = usePagination()
 *    监听分页变化：getList(): 获取表格数据方法
 *    watch([() => pageData.currentPage, () => pageData.pageSize], getList, { immediate: true })
 */
