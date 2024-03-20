/**
 * js加减乘除精度问题
 */
// 加法
export const accAdd = (arg1: number, arg2: number) => {
    let r1, r2
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    const m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}

// 减法
export const subtr = (arg1: number, arg2: number) => {
    let r1, r2
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    const m = Math.pow(10, Math.max(r1, r2))
    //last modify by deeka
    //动态控制精度长度
    const n = r1 >= r2 ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

// 乘法获取准确值
export const accMul = (arg1: number, arg2: number) => {
    let m = 0
    const s1 = arg1.toString()
    const s2 = arg2.toString()
    try {
        m += s1.split('.')[1].length
    } catch (e) {
        console.log(e)
    }
    try {
        m += s2.split('.')[1].length
    } catch (e) {
        console.log(e)
    }
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}

// 除法获取精确值
export const accDiv = (arg1: number, arg2: number) => {
    let t1 = 0,
        t2 = 0
    try {
        t1 = arg1.toString().split('.')[1].length
    } catch (e) {
        console.log(e)
    }
    try {
        t2 = arg2.toString().split('.')[1].length
    } catch (e) {
        console.log(e)
    }
    const r1 = Number(arg1.toString().replace('.', ''))
    const r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
}
