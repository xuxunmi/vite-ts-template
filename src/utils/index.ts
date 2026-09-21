import { SelectInterface } from '@/interface/common'

/**
 * 移除el-table树中的指定节点集合,可以用于前端table多行勾选假删除
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
 * 数组去重（支持基础数据类型数组 & 对象数组指定属性去重）
 * @param arr 待去重的数组
 * @param key 可选，如果是对象数组，可指定去重的属性名（如 'id'）
 * @returns 去重后的新数组
 */
export const uniqueArray = <T>(arr: T[], key?: keyof T): T[] => {
    if (!Array.isArray(arr)) return []

    // 1. 如果指定了对象的 key 属性，按对象的该 key 去重
    if (key) {
        const seen = new Set<any>()
        return arr.filter((item) => {
            if (item === null || item === undefined || typeof item !== 'object') {
                if (seen.has(item)) return false
                seen.add(item)
                return true
            }

            const val = (item as Record<keyof T, any>)[key]
            if (seen.has(val)) return false
            seen.add(val)
            return true
        })
    }

    // 2. 基础数据类型去重
    return Array.from(new Set(arr))
}

/**
 * 根据 ID 查找对应的名称
 * @param arr 目标数据数组
 * @param id 待匹配的 ID 或 Value
 * @param options 配置选项（自定义 value、label 字段名以及默认返回值）
 * @returns 对应的名称或默认值
 */
export interface GetNameByIdOptions<T = any> {
    /** 代表 ID/值的属性名，默认为 'id' */
    value?: keyof T | string
    /** 代表名称/文本的属性名，默认为 'name' */
    label?: keyof T | string
    /** 未匹配到时返回的默认值，默认为 '' */
    defaultValue?: string
}

/**
 * 根据 ID 查找对应的名称
 * @param arr 目标数据数组
 * @param id 待匹配的 ID 或 Value
 * @param options 配置选项（自定义 value、label 字段名以及默认返回值）
 * @returns 对应的名称或默认值
 */
export const getNameById = <T extends Record<string, any>>(
    arr: T[] | undefined | null,
    id: string | number | boolean | undefined | null,
    options?: GetNameByIdOptions<T>
): string => {
    if (!Array.isArray(arr) || arr.length === 0 || id === undefined || id === null) {
        return options?.defaultValue ?? ''
    }

    // 1. 解构并赋予默认属性名
    const { value = 'id', label = 'name', defaultValue = '' } = options || {}

    // 转为合法 key 以规避 TS 索引报错
    const valKey = value as keyof T
    const lblKey = label as keyof T

    // 2. 查找目标节点
    const target = arr.find((item) => item && item[valKey] === id)

    // 3. 安全提取 label 属性
    if (target && target[lblKey] !== undefined && target[lblKey] !== null) {
        return String(target[lblKey])
    }

    return defaultValue
}
// 使用示例：
// const statusName = getNameById(statusList, 99, {
//     value: 'oid',
//     label: 'name',
//     defaultValue: '未知状态' // 找不到时返回该值
// })

/**
 * 传入多个 ID 批量查找对应的名称字符串
 * @param arr 目标数据数组
 * @param ids 待匹配的 ID 数组
 * @param options 配置选项
 * @returns 用分隔符拼接后的名称字符串
 */
export interface GetBatchNameOptions<T = any> {
    value?: keyof T | string
    label?: keyof T | string
    /** 子节点数组字段名，默认为 'children' */
    children?: keyof T | string
    /** 多个名称之间的分隔符，默认为 ', ' */
    separator?: string
}

/**
 * 传入多个 ID 批量查找对应的名称（支持普通数组与树形嵌套数组）
 */
export const getBatchNameByIds = <T extends Record<string, any>>(
    arr: T[] | undefined | null,
    ids: (string | number)[] | undefined | null,
    options?: GetBatchNameOptions<T>
): string => {
    if (!Array.isArray(arr) || arr.length === 0 || !Array.isArray(ids) || ids.length === 0) {
        return ''
    }

    const {
        value = 'id',
        label = 'name',
        children = 'children',
        separator = ', '
    } = options || {}

    const valKey = value as keyof T
    const lblKey = label as keyof T
    const chdKey = children as keyof T

    // 1. 清理 ids，只保留有效 ID 并存入 Set（避免 undefined/null/"" 引发的假匹配）
    const validIds = ids.filter((id) => id !== undefined && id !== null && id !== '')
    if (validIds.length === 0) return ''

    const targetIdSet = new Set(validIds.map((id) => String(id)))
    const nameMap = new Map<string, string>()

    // 2. 递归收集节点（加入剪枝逻辑）
    const collectNames = (list: T[]): boolean => {
        for (const item of list) {
            // 如果全部目标已经找齐，返回 true 触发层层剪枝提前退出
            if (nameMap.size === targetIdSet.size) return true

            if (!item) continue
            const itemVal = item[valKey]

            if (itemVal !== undefined && itemVal !== null) {
                const strVal = String(itemVal)
                if (targetIdSet.has(strVal)) {
                    const itemLbl = item[lblKey]
                    if (itemLbl !== undefined && itemLbl !== null) {
                        nameMap.set(strVal, String(itemLbl))
                    }
                }
            }

            // 递归子列表
            const subList = item[chdKey]
            if (Array.isArray(subList) && subList.length > 0) {
                const isAllFound = collectNames(subList)
                if (isAllFound) return true
            }
        }
        return nameMap.size === targetIdSet.size
    }

    collectNames(arr)

    // 3. 保持传入 ids 的原始顺序拼接结果
    const names: string[] = []
    for (const id of validIds) {
        const name = nameMap.get(String(id))
        if (name) {
            names.push(name)
        }
    }

    return names.join(separator)
}
// 使用示例：
// const areaNames = getBatchNameByIds(areaTree, [1001, 1002], {
//     value: 'value',
//     label: 'label',
//     children: 'children', 
//     separator: ' | ' // 自定义分隔符
// })

/**
 * 在树形数组中根据 ID 递归查找对应的名称
 * @param data 树形结构数组
 * @param id 待匹配的 ID
 * @param options 自定义字段名配置
 * @returns 查找到的名称，未找到时返回 null
 */
export interface FindNameOptions<T = any> {
    /** ID 绑定的字段名，默认为 'id' */
    valueKey?: keyof T | string
    /** 名称绑定的字段名，默认为 'name' */
    labelKey?: keyof T | string
    /** 子节点数组字段名，默认为 'children' */
    childrenKey?: keyof T | string
}

/**
 * 在树形数组中根据 ID 递归查找对应的名称
 * @param data 树形结构数组
 * @param id 待匹配的 ID
 * @param options 自定义字段名配置
 * @returns 查找到的名称，未找到时返回 null
 */
export const findNameById = <T extends Record<string, any>>(
    data: T[] | undefined | null,
    id: string | number | undefined | null,
    options?: FindNameOptions<T>
): string | null => {
    if (!Array.isArray(data) || data.length === 0 || id === undefined || id === null || id === '') {
        return null
    }

    const {
        valueKey = 'id',
        labelKey = 'name',
        childrenKey = 'children'
    } = options || {}

    const vKey = valueKey as keyof T
    const lKey = labelKey as keyof T
    const cKey = childrenKey as keyof T

    // 1. 深度优先递归查找
    for (const item of data) {
        if (!item) continue

        const itemVal = item[vKey]

        // 确保节点的 ID 不为 null 或 undefined 后再进行比较
        if (itemVal !== undefined && itemVal !== null && String(itemVal) === String(id)) {
            const labelVal = item[lKey]
            return labelVal !== undefined && labelVal !== null ? String(labelVal) : null
        }

        // 2. 递归子节点
        const children = item[cKey]
        if (Array.isArray(children) && children.length > 0) {
            const name = findNameById(children, id, options)
            if (name !== null) {
                return name
            }
        }
    }

    return null
}

/**
 * 保留指定位数小数（四舍五入，自动补零）
 * @param src - 目标数值
 * @param pos - 保留位数（默认为 2）
 * @returns 格式化后的字符串（如 "1.20"）
 */
export const formatFloat = (src: number | string, pos: number = 2): string => {
    const num = Number(src)
    if (isNaN(num)) return "0." + "0".repeat(pos)

    return num.toFixed(pos)
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
 * 保留两位小数（直接截断，不四舍五入，自动补零）
 * @param num - 传入的数字或数字字符串
 * @returns 格式化后的两位小数文本（如 "12.30", "-5.00"）
 */
export const truncateDecimals = (num: number | string): string => {
    if (num === null || num === undefined || isNaN(Number(num))) {
        return "0.00"
    }
    const str = String(num)
    const [integer, decimal = ""] = str.split(".")
    const paddedDecimal = (decimal + "00").slice(0, 2)

    return `${integer}.${paddedDecimal}`
}

/**
 * 将数字金额转为中文大写金额
 * @param money - 金额（支持 number 或数字字符串，如 1234.56, '100.5'）
 * @returns 中文大写金额（如 "壹仟贰佰叁拾肆元伍角陆分"）
 */
export const convertToChineseNumeral = (money: number | string): string => {
    const num = Number(money)
    if (isNaN(num) || num < 0 || num >= 1e12) {
        return '零元整' // 超出范围或无效数字
    }
    if (num === 0) return '零元整'

    const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    const cnIntRadice = ['', '拾', '佰', '仟']
    const cnIntUnits = ['', '万', '亿', '兆']
    const cnDecUnits = ['角', '分']

    // 格式化为两位小数字符串
    const [intStr, decStr] = num.toFixed(2).split('.')

    let chineseStr = ''

    // 2. 处理整数部分
    if (Number(intStr) > 0) {
        let zeroCount = 0
        const intLen = intStr.length

        for (let i = 0; i < intLen; i++) {
            const n = intStr.charAt(i)
            const p = intLen - i - 1
            const q = p / 4
            const m = p % 4

            if (n === '0') {
                zeroCount++
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0]
                }
                zeroCount = 0
                chineseStr += cnNums[Number(n)] + cnIntRadice[m]
            }

            if (m === 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q]
            }
        }
        chineseStr += '元'
    }

    // 3. 处理小数部分
    let decimalStr = ''
    if (decStr) {
        const jiao = Number(decStr.charAt(0))
        const fen = Number(decStr.charAt(1))

        if (jiao === 0 && fen === 0) {
            decimalStr = '整'
        } else {
            if (jiao > 0) {
                decimalStr += cnNums[jiao] + cnDecUnits[0]
            } else if (chineseStr !== '') {
                // 有整数部分且角位为 0 时补 '零'
                decimalStr += cnNums[0]
            }
            if (fen > 0) {
                decimalStr += cnNums[fen] + cnDecUnits[1]
            }
        }
    } else {
        decimalStr = '整'
    }

    return chineseStr + decimalStr
}

/**
 * 递归遍历树形结构数组
 * @param arr 树形数据数组
 * @param cb 回调函数，若返回 'return' 或 true 则会立即中断全局递归
 * @param child 子节点数组的字段名，默认为 'children'
 * @param parent 内部递归传递的父节点
 * @returns boolean 返回 true 表示触发了提前中断，否则遍历完成
 */
export const recursionArray = <T extends Record<string, any>>(
    arr: T[],
    cb?: (item: T, index: number, parent?: T) => void | 'return' | boolean,
    child: string = 'children',
    parent?: T
): boolean => {
    if (!Array.isArray(arr) || arr.length === 0) return false
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (!item) continue
        const flag = cb?.(item, i, parent)
        if (flag === 'return' || flag === true) {
            return true
        }
        const children = item[child]
        if (Array.isArray(children) && children.length > 0) {
            const isStopped = recursionArray(children, cb, child, item)
            if (isStopped) return true
        }
    }

    return false
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
 * 调整数组元素位置（上移、下移、置顶、置底），并可同步调整排序字段
 * @param type 操作类型："up" | "down" | "top" | "bottom"
 * @param index 待移动元素的下标
 * @param arr 目标数组
 * @param orderKey 可选，排序字段名（如 'seq'、'order'）
 * @param orderChange 可选，当字段值改变时的回调函数
 * @returns boolean 是否成功移动
 */

export type SetArrayEleOrderType = "up" | "down" | "top" | "bottom";

/**
 * 交换两个对象的属性值，并可选触发回调
 */
export const swapProperty = <
    T extends Record<string, any>,
    K extends keyof T = keyof T
>(
    obj1?: T,
    obj2?: T,
    orderKey?: K,
    orderChange?: (obj1: T, obj2: T, orderKey: any) => void
): void => {
    if (obj1 && obj2 && orderKey && orderKey in obj1 && orderKey in obj2) {
        const temp = obj1[orderKey];
        obj1[orderKey] = obj2[orderKey];
        obj2[orderKey] = temp;
        orderChange?.(obj1, obj2, orderKey);
    }
};

/**
 * 调整数组元素位置（上移、下移、置顶、置底），并可同步调整排序字段
 */
export const setArrayEleOrder = <
    T extends Record<string, any>,
    K extends keyof T = keyof T
>(
    type: SetArrayEleOrderType,
    index: number,
    arr: T[],
    orderKey?: K,
    orderChange?: (obj1: T, obj2: T, orderKey: any) => void
): boolean => {
    if (!Array.isArray(arr) || index < 0 || index >= arr.length) {
        return false;
    }

    const lastIndex = arr.length - 1;

    switch (type) {
        // 上移
        case "up": {
            if (index === 0) return false;
            const targetIndex = index - 1;
            swapProperty(arr[index], arr[targetIndex], orderKey, orderChange);
            [arr[index], arr[targetIndex]] = [arr[targetIndex], arr[index]];
            return true;
        }

        // 下移
        case "down": {
            if (index === lastIndex) return false;
            const targetIndex = index + 1;
            swapProperty(arr[index], arr[targetIndex], orderKey, orderChange);
            [arr[index], arr[targetIndex]] = [arr[targetIndex], arr[index]];
            return true;
        }

        // 置顶
        case "top": {
            if (index === 0) return false;

            if (orderKey) {
                const firstOrder = arr[0][orderKey];
                for (let i = index; i > 0; i--) {
                    arr[i][orderKey] = arr[i - 1][orderKey];
                }
                arr[0][orderKey] = firstOrder;
            }

            const [element] = arr.splice(index, 1);
            arr.unshift(element);

            if (orderKey && orderChange) {
                orderChange(arr[0], element, orderKey);
            }
            return true;
        }

        // 置底
        case "bottom": {
            if (index === lastIndex) return false;

            if (orderKey) {
                const lastOrder = arr[lastIndex][orderKey];
                for (let i = index; i < lastIndex; i++) {
                    arr[i][orderKey] = arr[i + 1][orderKey];
                }
                arr[lastIndex][orderKey] = lastOrder;
            }

            const [element] = arr.splice(index, 1);
            arr.push(element);

            if (orderKey && orderChange) {
                orderChange(arr[lastIndex], element, orderKey);
            }
            return true;
        }

        default:
            return false;
    }
};
// 使用示例：
// 设置顺序
// const setOrder = (type: string, index: number, list: any[]) => {
//     setArrayEleOrder(type, index, list, 'configurationSeq')
// }
