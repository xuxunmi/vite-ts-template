<template>
    <el-config-provider :locale="locale">
        <router-view v-if="isRefresh" />
    </el-config-provider>
</template>
<script setup lang="ts">
import layout from '@/views/Layout/index.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import { useRoute } from "vue-router"

// const route = useRoute()

// 中文国际化
const locale = zhCn

// 无感刷新页面
const isRefresh = ref(true)
const reload = (): void => {
    isRefresh.value = false
    nextTick(() => {
        isRefresh.value = true
    })
}

// 子组件使用：
// const reload = inject("reload") as () => void
// 调用：reload()

provide('reload', reload)

console.log('VITE_PORT环境变量: ', import.meta.env.VITE_PORT)

// const handleRefresh = async () => {
//     try {
//         // 重新获取路由
//         const data = await permissionStore.getDynamicRoutes(true)
//         await permissionStore.setRoutes(data)
//         // 重新获取按钮权限
//         await permissionStore.getPermissionsBtn()
//         // 无感刷新页面
//         reload()
//     } catch (error) {
//         console.log(error)
//     }
// }

// // 监听浏览器刷新/f5刷新,重新获取路由和按钮权限，防止重新登录
// onMounted(() => {
//     handleRefresh()
// })
</script>

<style lang="less" scoped></style>
