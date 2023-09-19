import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/views/Layout/index.vue')
const Index = () => import('@/views/Index/index.vue')
const Login = () => import('@/views/Login/index.vue')
const Error = () => import('@/views/Error/404.vue')

/* 静态路由 */
const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/Home/index.vue'),
                meta: {
                    title: '首页',
                    elIcon: 'HomeFilled'
                }
            },
            {
                path: '/tablePlus',
                name: 'TablePlus',
                component: () => import('@/views/TablePlus/index.vue'),
                meta: {
                    title: '自定义表格',
                    elIcon: 'Grid'
                }
            },
            {
                path: '/user',
                name: 'UserManage',
                component: Index,
                meta: {
                    title: '用户管理',
                    elIcon: 'Management'
                },
                children: [
                    {
                        path: '/user/codeRain',
                        name: 'CodeRain',
                        component: () => import('@/views/UserManage/CodeRain/index.vue'),
                        meta: {
                            title: '代码雨'
                        }
                    }
                ]
            },
            {
                path: '/tools',
                name: 'ToolsManage',
                component: Index,
                meta: {
                    title: '工具管理',
                    elIcon: 'Tools'
                },
                children: [
                    // {
                    //     path: '/user/codeRain',
                    //     name: 'CodeRain',
                    //     component: () => import('@/views/UserManage/CodeRain/index.vue'),
                    //     meta: {
                    //         title: '代码雨'
                    //     }
                    // }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录',
            hidden: true
        }
    },
    // vue3对404配置进行了修改，必须要用正则匹配
    {
        path: '/404',
        component: Error,
        meta: {
            title: '404',
            hidden: true
        },
        alias: '/:pathMatch(.*)*'
    }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL), // hash模型
    // 滚动行为
    scrollBehavior: (to, from, savePosition) => {
        if (savePosition) {
            return savePosition
        } else {
            return { left: 0, top: 0 }
        }
    },
    routes: constantRoutes
})

/** 重置路由 */
export const resetRouter = () => {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    try {
        router.getRoutes().forEach(route => {
            const { name } = route
            if (name) {
                router.hasRoute(name) && router.removeRoute(name)
            }
        })
    } catch (error) {
        // 强制刷新浏览器也行，只是交互体验不是很好
        window.location.reload()
    }
}

export default router
