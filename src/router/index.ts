import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     redirect: '/home'
    // },
    // {
    //     path: '/',
    //     name: 'home',
    //     component: HomeView
    // },
    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (About.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import('../views/AboutView.vue')
    // }
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
    routes
})

export default router
