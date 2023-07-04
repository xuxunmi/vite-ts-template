export const statusCodeErrorMessage = (status: number): string => {
    const statusMap: { [key: number]: string } = {
        400: '错误请求',
        401: '登录信息过期，请重新登录',
        403: '禁止访问',
        404: '请求错误,未找到该资源',
        405: '请求方法未允许',
        408: '请求超时',
        500: '服务器端出错',
        501: '网络未实现',
        502: '网络错误',
        503: '服务不可用',
        504: '网络超时',
        505: 'http版本不支持该请求'
    }
    if (statusMap[status]) {
        return statusMap[status]
    } else {
        return '连接到服务器失败'
    }
}
