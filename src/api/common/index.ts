import request from '@/http/request'
import type * as Common from './types'

/**
 * @description:登录
 */
export function login(params: Common.CommonRequestParamsData) {
    return request.post<Common.CommonResponseData>('/securityUsers/login', params)
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
