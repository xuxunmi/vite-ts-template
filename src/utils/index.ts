import dayjs from 'dayjs'
import { SelectInterface } from '@/interface/common'

/**
 * // 移除el-table树中的指定节点集合,可以用于前端table多行勾选假删除
 * 移除树中的指定节点集合
 * @param {*} tree 树
 * @param {*} items 节点集合
 */
export const removeItemsInTree = <T>(tree: any, items: Array<T>): void => {
    items.forEach(item => removeItemInTree(tree, item))
}

/**
 * 移除树中的指定节点
 * @param {*} tree 树
 * @param {*} node 节点
 */
export const removeItemInTree = (tree: any, node: any): boolean => {
    const index = tree.indexOf(node)
    if (index !== -1) {
        tree.splice(index, 1)
        return true
    }
    for (const childNode of tree) {
        if (childNode.children?.length) {
            if (removeItemInTree(childNode.children, node)) {
                return true
            }
        }
    }
    return false
}

/**
 *
 * @param {array} tree 树数据源
 * @param {string} targetId 目标树节点id
 * @return {string[]}  当前节点id的所有父级ids,按照从根节点到直接父节点的顺序排序
 */
export const findParentIds = (tree: any[], targetId: string): string[] => {
    const parentIds: string[] = []
    function traverse(node: any, targetId: string): boolean {
        if (node.id === targetId) {
            parentIds.push(node.id)
            return true
        }
        if (node.children.length) {
            for (const child of node.children) {
                if (traverse(child, targetId)) {
                    parentIds.push(node.id)
                    return true
                }
            }
        }
        return false
    }
    for (const node of tree) {
        if (traverse(node, targetId)) {
            break
        }
    }
    return parentIds
}

/**
 *
 * @param {array} tree 树数据源
 * @param {string} targetId 目标树节点id
 * @return {string[]}  当前节点id的直接父节点id
 */
export function findParentId(nodes: any[], targetId: string): string | null {
    for (const node of nodes) {
        if (node.id === targetId) {
            return node.id
        }
        const parentId = findParentId(node.children, targetId)
        if (parentId) {
            return parentId
        }
    }
    return null
}

/**
 * @param  tree 树数据源
 * @param targetId 当前树节点id
 * @return {} 当前同层树节点的下一个兄弟元素
 */
export const findNextSiblingNodes = (tree: any[], targetId: string, nextSiblingNodes: any[] = []): any[] => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === targetId) {
            if (i < tree.length - 1) {
                nextSiblingNodes.push(tree[i + 1])
            }
            break
        } else if (tree[i].children && tree[i].children.length > 0) {
            const nextSibling = findNextSiblingNodes(tree[i].children, targetId)
            if (nextSibling.length > 0) {
                nextSiblingNodes = nextSibling
                break
            }
        }
    }
    return nextSiblingNodes
}

/**
 * @param  tree 树数据源
 * @param targetId 当前树节点id
 * @return {} 当前同层树节点的上一个兄弟元素
 */
export const findPreviousSiblingNodes = (tree: any[], targetId: string, previousSiblingNodes: any[] = []): any[] => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === targetId) {
            if (i > 0) {
                previousSiblingNodes.push(tree[i - 1])
            }
            break
        } else if (tree[i].children && tree[i].children.length > 0) {
            const previousSibling = findPreviousSiblingNodes(tree[i].children, targetId)
            if (previousSibling.length > 0) {
                previousSiblingNodes = previousSibling
                break
            }
        }
    }
    return previousSiblingNodes
}

/**
 * 数组去重
 * @param {arr} Array
 */
export const uniqueArray = (arr: any[]) => {
    if (!Array.isArray(arr)) {
        throw new Error('type error!')
    }
    if (arr.length == 1) {
        return arr
    }
    return [...new Set(arr)]
}

/** 格式化时间 */
export const formatDateTime = (time: string | number | Date, format: string | undefined = 'YYYY-MM-DD HH:mm:ss') => {
    if (!time) {
        return 'N/A'
    }
    const date = new Date(time)
    return dayjs(date).format(format)
}

/**
 * 根据id查找name
 * @param arr 数组
 * @param id id
 */
export const getNameById = (arr: SelectInterface[], id: string | number) => {
    const element = arr.find(ele => ele.id === id)
    return element?.name || undefined
}
