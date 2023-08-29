import { LocationQueryRaw } from 'vue-router'

/**
 * description：下拉数据接口
 */
export interface SelectInterface {
    id: string | number
    name: string
}

/**
 * description：标签数据接口
 */
export interface TagsViewInterface {
    name: string
    title: string
    path: string
    query?: LocationQueryRaw
}
