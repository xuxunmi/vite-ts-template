// import router from '@/router'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import { usePermissionStoreHook } from '@/stores/modules/permission'
// import { getToken, getDynamicsMenu } from '@/caches/localStorage'

// NProgress.configure({ showSpinner: false }) // 进度环隐藏

// let isRefresh = false //判断是否是刷新页面进入的守卫

// /** 免登录白名单 */
// const whiteList = ['/login']

// router.beforeEach(async (to, _from, next) => {
//     NProgress.start() // 进度条开始
//     let isToken = getToken()
//     let dynamicRoutesMenu = getDynamicsMenu()
//     const permissionStore = usePermissionStoreHook()
//     if (isToken) {
//         if (to.path === '/login') {
//             // 如果已经登录，并准备进入 Login 页面，则重定向到主页
//             next()
//             NProgress.done()
//         } else {
//             if (permissionStore.isSetRoutes) {
//                 next()
//             } else {
//                 await permissionStore.setRoutes(dynamicRoutesMenu)
//                 next({ ...to, replace: true })
//             }
//         }
//     } else {
//         if (whiteList.indexOf(to.path) !== -1) {
//             next()
//         } else {
//             next({
//                 path: '/login',
//                 // 将跳转的路由path作为参数，登录成功后跳转到该路由
//                 query: { redirect: to.fullPath }
//             })
//             NProgress.done()
//         }
//     }
// })

// router.afterEach(() => {
//     NProgress.done() // 结束Progress
// })
