/**
 * 获取localStorage or sessionStorage指定key
 * @param {String} value 要获取的key值
 * @param {Boolean} isSession 为true，获取sessionStorage；否则获取localStorage
 */
export const get = (key: string, isSession: boolean): any => {
    try {
        const string = isSession ? window.sessionStorage.getItem(`${key}`) : window.localStorage.getItem(`${key}`)
        const value = string ? JSON.parse(string) : null
        return value
    } catch (error) {
        return null
    }
}

/**
 * 设置localStorage or sessionStorage
 * @param {String} key 要设置的key值
 * @param {String} value 对应的value值
 * @param {Boolean} isSession 为true，获取sessionStorage；否则获取localStorage
 */
export const set = (key: string, value: any, isSession: boolean): boolean => {
    try {
        const storage = isSession ? window.sessionStorage : window.localStorage
        storage.setItem(`${key}`, JSON.stringify(value))
        return true
    } catch (error) {
        return false
    }
}

/**
 * 删除localStorage or sessionStorage指定key
 * @param {String} value 要获取的key值
 * @param {Boolean} isSession 为true，删除sessionStorage；否则删除localStorage
 */
export const remove = (key: string, isSession: boolean): boolean => {
    try {
        isSession ? window.sessionStorage.removeItem(`${key}`) : window.localStorage.removeItem(`${key}`)
        return true
    } catch (error) {
        return false
    }
}

/**
 * 遍历所有localStorage or sessionStorage
 * @param {Function} callback 回调函数
 * @param {Boolean} isSession 为true，获取sessionStorage；否则获取localStorage
 */
export const forEach = (callback: (key: string, value: any, index: number) => void, isSession: boolean): boolean => {
    try {
        const storage = isSession ? window.sessionStorage : window.localStorage
        Object.keys(storage).forEach((key: string, index: number) => {
            const value = get(key, isSession)
            callback(key, value, index)
        })
        return true
    } catch (error) {
        return false
    }
}

/**
 * 获取localStorage or sessionStorage中所有key的数组
 * @param {Boolean} isSession 为true，获取sessionStorage；否则获取localStorage
 * @returns {Array}
 */
export const keys = (isSession: boolean): string[] => {
    try {
        const storage = isSession ? window.sessionStorage : window.localStorage
        return Object.keys(storage).map(function (key) {
            return key
        })
    } catch (error) {
        return []
    }
}
