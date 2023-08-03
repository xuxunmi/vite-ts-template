import request from '@/http/request.js'

/**
 * @description:登录
 */
export function login(params: object) {
    return request.post('/securityUsers/login', params)
}

/**
 * @description:获取动态菜单
 */
export function getDynamicMenuList() {
    return request.get('/sys/menu/dynamicMenu')
}

/**
 * @description:获取权限按钮
 */
export function getAuthButton() {
    return request.get('/sys/menu/getAuthButton')
}
