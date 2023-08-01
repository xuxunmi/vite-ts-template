import { type RouteRecordRaw, RouteRecordName } from 'vue-router'

/**
 *
 * @param  {Array} routers 后台返回的用户权限json
 * @return {Array} nameArr 过滤后返回的路由name
 */
export const getRouterName = (routers: RouteRecordRaw[], nameArr: RouteRecordName[] = []): RouteRecordName[] => {
    routers.forEach(item => {
        if (item.name) {
            nameArr.push(item.name)
        }
        if (item.children && item.children.length > 0) {
            getRouterName(item.children, nameArr)
        }
    })
    return nameArr
}

/**
 * @param  {Array} rouerNames 过滤后的路由name
 * @param  {Array} allDynamicRouter  前端配置好的所有动态路由的集合
 * @return {Array} arr 过滤后返回的路由
 */
export const filterRouters = (
    allDynamicRouter: RouteRecordRaw[],
    routerNames: RouteRecordName[] = []
): RouteRecordRaw[] => {
    return allDynamicRouter
        .filter(item => {
            return item.name && routerNames.includes(item.name)
        })
        .map(item => {
            item = { ...item }
            if (item.children) {
                item.children = filterRouters(item.children, routerNames)
            }
            return item
        })
}
