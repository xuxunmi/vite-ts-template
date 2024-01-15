import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { SelectInterface } from '@/interface/common'

dayjs.extend(weekday)
dayjs.extend(weekOfYear)

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
 * 获取一年的所有周总数
 * @param year 年份
 */
export const getWeeksInYear = (year: number) => {
    // 当前年份的第一个月
    const currentFirstMonth = dayjs().startOf('year').format('M')
    // console.log("currentFirstMonth: ", currentFirstMonth)
    // 当前年份的最后一个月
    const currentLastMonth = dayjs().endOf('year').format('MM')
    // console.log("currentLastMonth: ", currentLastMonth)
    // 当前年份的第一天
    const currentFirstDay = dayjs().startOf('year').format('D')
    // console.log("currentFirstDay: ", currentFirstDay)
    // 当前年份的最后一天
    const currentLastDay = dayjs().endOf('year').format('DD')
    // console.log("currentLastDay: ", currentLastDay)
    const firstDayOfYear = new Date(year, +currentFirstMonth, +currentFirstDay) // 获取指定年份的第一个月第一天
    const lastDayOfYear = new Date(year, +currentLastMonth, +currentLastDay) // 获取指定年份的最后一个月最后一天

    const firstWeekDay = firstDayOfYear.getDay() // 第一天是星期几
    const timeDiff = lastDayOfYear.getTime() - firstDayOfYear.getTime() // 日期之间的时间差（毫秒）
    const daysInYear = Math.floor(timeDiff / (24 * 60 * 60 * 1000)) + 1 // 一年中的总天数

    let weeks = Math.ceil((daysInYear + firstWeekDay) / 7) // 计算周数
    if (firstWeekDay === 0) {
        // 如果第一天是周日，则减少一周
        weeks--
    }

    return weeks
}

/**
 * 生成一年的所有周数组
 * @param year 年份
 */
export const createWeekInYear = (year?: number) => {
    type weekType = {
        from: string
        to: string
        name: string
        id: string
    }
    const y = year || dayjs().year()
    const currentYearWeeks: weekType[] = []
    const prevYearWeeks: weekType[] = []
    const prevWeeksNum = getWeeksInYear(y - 1)
    const currentWeeksNum = getWeeksInYear(y)

    // 上一年
    for (let i = 0; i < prevWeeksNum; i++) {
        const from = dayjs()
            .year(y - 1)
            .week(i)
            .weekday(1)
            .format('YYYY-MM-DD')
        const to = dayjs()
            .year(y - 1)
            .week(i)
            .weekday(7)
            .format('YYYY-MM-DD')
        const week: weekType = {
            from,
            to,
            name:
                dayjs()
                    .year(y - 1)
                    .format('YYYY') +
                '-' +
                `W${i + 1}(${from}—${to})`,
            id:
                dayjs()
                    .year(y - 1)
                    .format('YYYY') +
                '-' +
                (i + 1)
        }
        prevYearWeeks.push(week)
    }

    // 今年
    for (let i = 1; i <= currentWeeksNum; i++) {
        const from = dayjs().year(y).week(i).weekday(1).format('YYYY-MM-DD')
        const to = dayjs().year(y).week(i).weekday(7).format('YYYY-MM-DD')
        const week: weekType = {
            from,
            to,
            name: dayjs().year(y).format('YYYY') + '-' + `W${i}(${from}—${to})`,
            id: dayjs().year(y).format('YYYY') + '-' + i
        }
        if (from > dayjs().format('YYYY-MM-DD')) {
            break
        }
        currentYearWeeks.push(week)
    }
    // console.log("currentYearWeeks:", currentYearWeeks)
    // 取上一年后半年的周数据
    const prevHalfYearWeeks = prevYearWeeks.slice(Math.ceil(prevYearWeeks.length / 2))
    // 上一年和今年合并起来
    const weeksTotal: weekType[] = prevHalfYearWeeks.concat(currentYearWeeks)
    // console.log(" weeksTotal:", weeksTotal)
    return weeksTotal
}

/**
 * 保留指定位小数：不四舍五入
 * @param {*} src
 * @param {*} pos
 * @returns
 */
export const truncateDecimals = (num: number, pos = 2): string => {
    const factor = Math.pow(10, pos)
    const truncatedNum = Math.floor(num * factor) / factor
    const numString = truncatedNum.toString()
    const [integerPart, decimalPart = ''] = numString.split('.')
    const decimalPartWithZero = decimalPart.padEnd(pos, '0')
    return `${integerPart}.${decimalPartWithZero}`
}

/**
 * 将数字金额转为中文大写金额
 * @param {*} num：金额
 * @returns 大写金额
 */
export const convertToChineseNumeral = (num: string): string => {
    let unit = '千百拾亿千百拾万千百拾圆角分'
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
        .replace(/零(千|百|拾|角)/g, '零')
        .replace(/(零)+/g, '零')
        .replace(/零(万|亿|圆)/g, '$1')
        .replace(/(亿)万|壹(十)/g, '$1$2')
        .replace(/^圆零?|零分/g, '')
        .replace(/圆$/g, '圆整')
}
