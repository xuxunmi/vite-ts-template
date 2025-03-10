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

/**
 * 根据id查找name
 * @param arr 数组
 * @param id id
 */
export const getNameById = (arr: SelectInterface[] | Array<any>, id: string | number, options = {
    value: "id",
    label: "name"
}) => {
    const { value, label } = options
    const element = arr.find((ele) => ele[value] === id)
    return element ? element[label] : ""
}

/**
 * 传入id查找名称
 * @param arr 树数组
 * @param id id
 */
export const findNameById = (data: any[], id: string): string | null => {
    for (const item of data) {
        if (item.id === id) {
            return item.name
        } else if (item.children && item.children.length > 0) {
            const name = findNameById(item.children, id)
            if (name) {
                return name
            }
        }
    }
    return null
}

/**
 * 保留指定位小数
 * @param {*} src
 * @param {*} pos
 * @returns
 */
export const formatFloat = (src: number, pos = 2) => {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos)
}

/**
 * 检查对象是否为空
 * @param {*} obj
 * @returns
 */
export const isEmptyObject = (obj: object): boolean => {
    return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
}

/**
 * 保留两位小数：不四舍五入
 * @param {*} src
 * @param {*} pos
 * @returns
 */
export const truncateDecimals = (num: number): string => {
    const result = Number(num.toString().match(/^\d+(?:\.\d{0,2})?/))
    let s = result.toString()
    let rs = s.indexOf('.')
    if (rs < 0) {
        rs = s.length
        s += '.'
    }
    while (s.length <= rs + 2) {
        s += '0'
    }
    return s
}

/**
 * 将数字金额转为中文大写金额
 * @param {*} num：金额
 * @returns 大写金额
 */
export const convertToChineseNumeral = (num: string): string => {
    let unit = '仟佰拾亿仟佰拾万仟佰拾圆角分'
    let str = ''
    num += '00'
    const dotIndex = num.indexOf('.')
    if (dotIndex >= 0) {
        num = num.substring(0, dotIndex) + num.substring(dotIndex + 1, dotIndex + 3)
    }
    unit = unit.substring(unit.length - num.length)
    for (let i = 0; i < num.length; i++) {
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(parseInt(num.charAt(i))) + unit.charAt(i)
    }
    return str
        .replace(/零(仟|佰|拾|角)/g, '零')
        .replace(/(零)+/g, '零')
        .replace(/零(万|亿|圆)/g, '$1')
        .replace(/(亿)万|壹(十)/g, '$1$2')
        .replace(/^圆零?|零分/g, '')
        .replace(/圆$/g, '圆整')
}

/**
 * 递归数组
 * @param arr 数组
 * @param cb 回调事件
 * @param child 子元素字段名
 */
export const recursionArray = (arr: any[], cb?: (item: any, i: number, parent: any) => void | 'return' | boolean, child = "children", parent?: any) => {
    for (let i = 0; i < arr.length; i++) {
        const flag = cb && cb(arr[i], i, parent)
        if (flag === "return") return true
        if (arr[i][child] && arr[i][child].length) {
            recursionArray(arr[i][child], cb, child, arr[i])
        }
    }
}
// 使用示例： recursionArray(tableData.value, (item: any, index: number, parent: any) => {
//         // 新增/更改属性
//         item.children = data
//         item.hasChildren = false
// })

/**
 * 打开一个新窗口: 无浏览器刷新按钮，无浏览器标签栏：参考地址: https://blog.csdn.net/muguli2008/article/details/104899094
 * @param {*} src
 */
export const windowOpenTab = (src: string) => {
    window.open(src || '', '_blank', 'scrollbars=yes,resizable=1')
}

/**
 * 设置数组元素位置
 * @param type 操作类型
 * @param index 元素下标
 * @param arr 数组
 * @param order 排序字段
 */
export const setObjectOrder = (obj1?: any, obj2?: any, order?: string) => {
    if (obj1 && obj2 && order) {
        const temp = obj1[order]
        obj1[order] = obj2[order]
        obj2[order] = temp
    }
}
export const setArrayEleOrder = (type: string, index: number, arr: any[], order?: string) => {
    // console.log("setArrayEleOrder", type, index, arr)
    if (type === "up") {
        // 上移
        if (index > 0 && index < arr.length) {
            setObjectOrder(arr[index], arr[index - 1], order)
            const temp = arr[index]
            arr[index] = arr[index - 1]
            arr[index - 1] = temp
        }
    } else if (type === "down") {
        // 下移
        if (index >= 0 && index < arr.length - 1) {
            setObjectOrder(arr[index], arr[index - 1], order)
            const temp = arr[index]
            arr[index] = arr[index + 1]
            arr[index + 1] = temp
        }
    } else if (type === "top") {
        // 置顶
        if (index > 0 && index < arr.length) {
            if (order) {
                const firstOrder = arr[0][order]
                for (let i = 0; i < index; i++) arr[i][order] = arr[i + 1][order]
                arr[index][order] = firstOrder
            }
            const element = arr.splice(index, 1)[0]
            arr.unshift(element)
        }
    } else if (type === "bottom") {
        // 置底
        if (index >= 0 && index < arr.length - 1) {
            if (order) {
                const lastOrder = arr[arr.length - 1][order]
                for (let i = index + 1; i < arr.length; i++) arr[i][order] = arr[i - 1][order]
                arr[index][order] = lastOrder
            }
            const element = arr.splice(index, 1)[0]
            arr.push(element)
        }
    }
}
// 使用示例： 
// 设置顺序
// const setOrder = (type: string, index: number, list: any[]) => {
//     setArrayEleOrder(type, index, list, 'configurationSeq')
// }
