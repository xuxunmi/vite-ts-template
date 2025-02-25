import { recursionArray } from '@/utils';

type sortParamsType = {
    sortBy: string
    sorted: any
    sortType?: any
}

export const goSort = (data: sortParamsType, tableData: any[]) => {
    if (data.sorted) {
        tableData.sort((a: any, b: any) => handleSort(a, b, data))
        recursionArray(tableData, (item: any) => {
            if (item.children && item.children) {
                item.children.sort((a: any, b: any) => {
                    return handleSort(a, b, data)
                })
            }
        })
    } else {
        tableData.sort((a: any, b: any) => a.frontEndID - b.frontEndID)
        recursionArray(tableData, (item: any) => {
            if (item.children && item.children) {
                item.children.sort((a: any, b: any) => a.frontEndID - b.frontEndID)
            }
        })
    }
}
const handleSort = (a: any, b: any, data: sortParamsType) => {
    const aValue = a[data.sortBy] || ""
    const bValue = b[data.sortBy] || ""
    if (data.sortType === "number") {
        // 数字
        if (data.sorted === "ascending") {
            return aValue - bValue
        } else if (data.sorted === "descending") {
            return bValue - aValue
        }
    } else if (data.sortType === "time") {
        // 时间
        if (data.sorted === "ascending") {
            return new Date(aValue).getTime() - new Date(bValue).getTime()
        } else if (data.sorted === "descending") {
            return new Date(bValue).getTime() - new Date(aValue).getTime()
        }
    } else {
        // 字符串
        const stringAValue: any = String(aValue)
        const stringBValue: any = String(bValue)
        if (data.sorted === "ascending") {
            return customSort(stringAValue, stringBValue)
        } else if (data.sorted === "descending") {
            return customSort(stringBValue, stringAValue)
        }
    }
    return 0
}

const customSort = (a: string, b: string) => {
    const aIsNumber = typeof a === 'number'
    const bIsNumber = typeof b === 'number'
    if (aIsNumber && bIsNumber) return a - b
    if (aIsNumber) return -1
    if (bIsNumber) return 1

    const strA = String(a)
    const strB = String(b)

    let i = 0
    while (i < strA.length && i < strB.length) {
        const charA = strA[i]
        const charB = strB[i]
        const typeA = getCharType(charA)
        const typeB = getCharType(charB)

        if (typeA !== typeB) {
            return typeA - typeB // 按类型优先级排序
        } else {
            let compareResult = 0
            switch (typeA) {
                case 0: // 数字
                    compareResult = parseInt(charA) - parseInt(charB)
                    break
                case 1: // 字母
                    compareResult = charA.localeCompare(charB)
                    break
                case 2: // 中文
                    compareResult = charA.localeCompare(charB, 'zh')
                    break
                case 3: // 特殊字符
                    compareResult = charA.localeCompare(charB)
                    break
                default:
                    compareResult = charA.localeCompare(charB)
            }
            if (compareResult !== 0) return compareResult
        }
        i++
    }
    return strA.length - strB.length
}

const getCharType = (char: string) => {
    if (/[0-9]/.test(char)) return 0
    if (/[a-zA-Z]/.test(char)) return 1
    if (/[\u4e00-\u9fa5]/.test(char)) return 2
    if (/[^\w\s]/.test(char)) return 3
    return 4
}