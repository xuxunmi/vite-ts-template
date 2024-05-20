import CacheKey from '@/caches'
import { type RouteRecordRaw } from 'vue-router'
import { type ThemeName } from "@/hooks/useTheme"
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

//#region 系统语言
export const getLanguage = () => {
    return getStorage(CacheKey.LANGUAGE,false)
}
export const setLanguage = (language: string) => {
    setStorage(CacheKey.LANGUAGE, language,false)
}
export const removeLanguage = () => {
    removeStorage(CacheKey.LANGUAGE,false)
}
//#endregion

//#region 中英文国际化
export const getInternationalFields = () => {
    return JSON.parse(getStorage(CacheKey.INTERNATIONAL_FIELDS, false) || "{}")
}
export const setInternationalFields = (Fields: Object) => {
    setStorage(CacheKey.INTERNATIONAL_FIELDS, JSON.stringify(Fields || "{}"),false)
}
export const removeInternationalFields = () => {
    removeStorage(CacheKey.INTERNATIONAL_FIELDS,false)
}
//#endregion

//#region 主题
export const getActiveThemeName = () => {
    return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName
}
export const setActiveThemeName = (themeName: ThemeName) => {
    localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
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
