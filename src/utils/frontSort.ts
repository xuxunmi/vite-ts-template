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
        if (data.sorted === "ascending") {
            const stringAValue: any = String(aValue)
            const stringBValue: any = String(bValue)
            const n = !isNaN(Number(stringAValue)), n2 = !isNaN(Number(stringBValue));
            if (n && n2) return stringAValue - stringBValue;
            if (n) return -1;
            if (n2) return 1;
            const e = escape(stringAValue).indexOf("%u") > -1, e2 = escape(stringBValue).indexOf("%u") > -1
            if (e && e2) return stringAValue.localeCompare(stringBValue);
            if (e) return 1;
            if (e2) return -1;
            return stringAValue.localeCompare(stringBValue);
        } else if (data.sorted === "descending") {
            const stringAValue = String(aValue)
            const stringBValue = String(bValue)
            const n = !isNaN(Number(stringAValue)), n2 = !isNaN(Number(stringBValue));
            if (n && n2) return stringBValue as any - (stringAValue as any);
            if (n) return 1;
            if (n2) return -1;
            const e = escape(stringAValue).indexOf("%u") > -1, e2 = escape(stringBValue).indexOf("%u") > -1
            if (e && e2) return stringBValue.localeCompare(stringAValue);
            if (e) return -1;
            if (e2) return 1;
            return stringBValue.localeCompare(stringAValue);
        }
    }
    return 0
}