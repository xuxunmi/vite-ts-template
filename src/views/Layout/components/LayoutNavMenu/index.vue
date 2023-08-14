<template>
    <div class="layout-main">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                background-color="#414875"
                text-color="#c0c4cc"
                active-text-color="#c0c4cc"
                :unique-opened="true"
                :collapse-transition="false"
                mode="vertical"
                router
            >
                <MenuNavBar v-for="route in routesMenuList" :key="route.id" :childItems="route" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import MenuNavBar from '../menuNavBar/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { type RouteRecordRaw } from 'vue-router'

defineOptions({
    name: 'LayoutMain'
})

const route = useRoute()
const router = useRouter()

// 默认激活菜单的 index
const activeMenu = computed(() => {
    const { path } = route
    return path
})

const isCollapse = computed(() => {
    return false
})

// 路由菜单列表
const routesMenuList = computed(() => {
    const routersList: RouteRecordRaw[] = router.options.routes[0].children
    console.log('routersList: ', router.options.routes[0].children)
    return routersList
})
</script>

<style lang="less" scoped>
.layout-main {
    .el-scrollbar {
        height: 100%;
        :deep(.scrollbar-wrapper) {
            // 限制水平宽度
            overflow-x: hidden !important;
            .el-scrollbar__view {
                height: 100%;
            }
        }
        // 滚动条
        :deep(.el-scrollbar__bar) {
            &.is-horizontal {
                // 隐藏水平滚动条
                display: none;
            }
        }
    }
    :deep(.el-menu--collapse > .sidebar-page > .el-submenu > .el-submenu__title > .el-submenu__icon-arrow),
    :deep(.el-menu--collapse > .sidebar-page > .el-submenu > .el-submenu__title > span) {
        display: none;
    }
    // 隐藏el-menu超出得边角
    :deep(.el-menu) {
        border-right: none;
        .el-menu-item,
        .el-sub-menu__title,
        .el-sub-menu .el-menu-item {
            &.is-active,
            &:hover {
                background-color: @menu-hover-bg-color;
            }
            display: block;
            * {
                vertical-align: middle;
            }
        }
    }
}
</style>
