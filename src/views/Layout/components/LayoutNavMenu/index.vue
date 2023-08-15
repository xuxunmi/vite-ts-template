<template>
    <div class="layout-main">
        <div class="logo-container">
            <transition name="sidebar-logo-fade">
                <router-link key="expand" to="/">
                    <div class="logo-text">
                        <img src="@/assets/logo.svg" />
                        <span v-if="!isCollapse">Vite+TS+Admin</span>
                    </div>
                </router-link>
            </transition>
        </div>
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
                <MenuNavBar v-for="route in routesMenuList" :key="route.path" :childItems="route" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import MenuNavBar from '../MenuNavBar/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { type RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores'

defineOptions({
    name: 'LayoutMain'
})

const route = useRoute()
const router = useRouter()
const useApp = useAppStore()

// 默认激活菜单的 index
const activeMenu = computed(() => {
    const { path } = route
    return path
})

const isCollapse = computed(() => useApp.isCollapse)

// 路由菜单列表
const routesMenuList = computed(() => {
    const routersList: RouteRecordRaw[] | undefined = router.options.routes[0].children
    console.log('routersList: ', router.options.routes[0].children)
    return routersList
})
</script>

<style lang="less" scoped>
.layout-main {
    .logo-container {
        height: var(--v3-logo-header-height);
        padding: 5px;
        .logo-text {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 100%;
            img {
                width: 40px;
                height: 40px;
                vertical-align: middle;
            }
            span {
                font-weight: bold;
                font-size: 18px;
                color: @color-danger;
            }
        }
    }
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
            * {
                vertical-align: middle;
            }
        }
    }
}
</style>
