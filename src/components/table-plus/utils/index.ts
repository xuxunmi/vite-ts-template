/**
 * 根据 class 名称获取当前的层级
 * @param {string} className
 * @return {number}
 */
export function getLevelFromClassName(className: string) {
    return Number((/--level-(\d+)/.exec(className) || [])[1] || 0)
}

/**
 * 生成随机字符串
 * @param {number} length 字符串的长度，默认 10 位
 * @returns 随机字符串
 */
export function randomString(length = 10) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('')

    let str = ''
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str
}
