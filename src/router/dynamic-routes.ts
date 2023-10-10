import { type RouteRecordRaw } from 'vue-router'
const Index = () => import('@/views/Index/index.vue')

/* 首页路由 */
export const homeRoutes: RouteRecordRaw[] = [
    // {
    //     path: '/',
    //     component: Index,
    //     name: 'home',
    //     redirect: '/dashboard',
    //     children: [
    //         {
    //             path: 'dashboard',
    //             component: () => import('@/views/dashboard/index.vue'),
    //             name: 'dashboard',
    //             meta: {
    //                 title: '首页',
    //                 svgIcon: 'dashboard',
    //                 affix: true
    //             }
    //         }
    //     ]
    // }
]

/* 系统管理路由 */
export const systemManageRoutes: RouteRecordRaw[] = [
    // {
    //     path: '/system',
    //     component: Index,
    //     redirect: '/system/organization',
    //     name: 'systemManage',
    //     meta: {
    //         title: '系统管理',
    //         elIcon: 'Setting'
    //     },
    //     children: [
    //         {
    //             path: 'organization',
    //             component: () => import('@/views/system/organization/index.vue'),
    //             name: 'organization',
    //             meta: {
    //                 title: '组织管理',
    //                 keepAlive: true
    //             }
    //         }
    //     ]
    // }
]

/* 项目监控路由 */
export const projectMonitorRoutes: RouteRecordRaw[] = [
    {
        path: '/monitor',
        name: 'projectMonitor',
        component: Index,
        children: [
            {
                path: 'project',
                component: () => import('@/views/monitor/index.vue'),
                name: 'monitor',
                meta: {
                    title: '项目监控',
                    elIcon: 'Grid',
                    keepAlive: true
                }
            }
        ]
    }
]
