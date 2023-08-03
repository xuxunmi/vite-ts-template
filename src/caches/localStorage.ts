import CacheKey from '@/caches'
import { type RouteRecordRaw } from 'vue-router'
import { get as getStorage, set as setStorage, remove as removeStorage } from '@/utils/storage'

//#region token
export const getToken = () => {
    return getStorage(CacheKey.TOKEN, false)
}
export const setToken = (token: string) => {
    setStorage(CacheKey.TOKEN, token, false)
}
export const removeToken = () => {
    removeStorage(CacheKey.TOKEN, false)
}
//#endregion

//#region 动态路由菜单
export const getDynamicsMenu = () => {
    const menuList = getStorage(CacheKey.DYNAMICS_MENU_LIST, false)
    return menuList && menuList.length ? JSON.parse(menuList) : []
}
export const setDynamicsMenu = (menu: RouteRecordRaw[]) => {
    setStorage(CacheKey.DYNAMICS_MENU_LIST, JSON.stringify(menu || []), false)
}
export const removeDynamicsMenu = () => {
    removeStorage(CacheKey.DYNAMICS_MENU_LIST, false)
}
//#endregion

//#region 按钮权限
export const getPermissionsBtn = () => {
    const btnList = getStorage(CacheKey.PERMISSIONS_BTN_LIST, false)
    return btnList && btnList.length ? JSON.parse(btnList) : []
}
export const setPermissionsBtn = (list: string[]) => {
    setStorage(CacheKey.PERMISSIONS_BTN_LIST, JSON.stringify(list || []), false)
}
export const removePermissionsBtn = () => {
    removeStorage(CacheKey.PERMISSIONS_BTN_LIST, false)
}
//#endregion
