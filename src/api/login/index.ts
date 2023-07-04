import request from '@/http/request.js'

/**
 * @description:登录
 */
export function login(param: object) {
    return request.post('/securityUsers/login', param)
}
