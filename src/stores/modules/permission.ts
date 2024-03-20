import { ref } from 'vue'
import { defineStore, createPinia } from 'pinia'
import { type RouteRecordRaw } from 'vue-router'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { homeRoutes, systemManageRoutes, projectMonitorRoutes } from '@/router/dynamic-routes'
import { setDynamicsMenu, setPermissionsBtn } from '@/caches/localStorage'
import { getRouterName, filterRouters } from '@/utils/dynamic-routes'
import { getDynamicMenuList, getAuthButton } from '@/api/common'

const store = createPinia()

export const usePermissionStore = defineStore('permission', () => {
    const isSetRoutes = ref(false)
    // 动态路由列表
    const dynamicRoutes = ref<RouteRecordRaw[]>([])
    // 按钮权限
    const permissionsBtnList = ref<string[]>([])
    const getDynamicRoutes = async () => {
        try {
            const { data } = (await getDynamicMenuList()) as { data: RouteRecordRaw[] }
            if (!data.length) return
            setDynamicsMenu(data)
            setRoutes(data)
            // 跳转路由列表第一个
            router.push({ path: data[0].path })
            return data
        } catch (error: any) {
            if (error.msg)
                ElMessage({
                    type: 'error',
                    message: error.msg,
                    center: true
                })
            return
        }
    }
    const setRoutes = (data: any) => {
        // 获取动态路由name
        const routerNameArr = getRouterName(data)
        const localDynamicRoutesList = [...homeRoutes, ...systemManageRoutes, ...projectMonitorRoutes]
        // 根据动态路由name匹配本地路由获取动态路由
        const addRoutersList: RouteRecordRaw[] = filterRouters(localDynamicRoutesList, routerNameArr)
        addRoutersList.forEach(route => router.addRoute(route))
        isSetRoutes.value = true
    }
    const getPermissionsBtn = async () => {
        try {
            const { data } = (await getAuthButton()) as { data: string[] }
            permissionsBtnList.value = data
            console.log('permissionsBtnList： ', permissionsBtnList)
            setPermissionsBtn(data)
            return data
        } catch (error: any) {
            if (error.msg)
                ElMessage({
                    type: 'error',
                    message: error.msg,
                    center: true
                })
            return
        }
    }
    return { isSetRoutes, dynamicRoutes, getDynamicRoutes, setRoutes, permissionsBtnList, getPermissionsBtn }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
    return usePermissionStore(store)
}
