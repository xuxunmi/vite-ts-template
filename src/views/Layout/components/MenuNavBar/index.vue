<template>
    <div class="menu-nav-bar">
        <!-- 一级导航 -->
        <!-- 有子集 -->
        <template v-if="childItems.children && childItems.children.length">
            <el-sub-menu :index="childItems.path" :key="childItems.path">
                <template #title>
                    <el-icon v-if="childItems.meta?.elIcon">
                        <component :is="childItems.meta.elIcon"></component>
                    </el-icon>
                    <span>{{ childItems.meta?.title }}</span>
                </template>
                <!-- 二级导航 -->
                <MenuNavBar v-for="subMenu in childItems.children" :childItems="subMenu" />
            </el-sub-menu>
        </template>
        <!-- 无子集 -->
        <template v-else>
            <el-menu-item :index="childItems.path" :key="childItems.path">
                <el-icon v-if="childItems.meta?.elIcon">
                    <component :is="childItems.meta.elIcon"></component>
                </el-icon>
                <template #title>{{ childItems.meta?.title }}</template>
            </el-menu-item>
        </template>
    </div>
</template>

<script setup lang="ts" name="MenuNavBar">
import { type PropType } from 'vue'
import { type RouteRecordRaw } from 'vue-router'

const props = defineProps({
    childItems: {
        type: Object as PropType<RouteRecordRaw>,
        required: true
    }
})
</script>

<style lang="less" scoped>
.menu-nav-bar {
    .svg-icon {
        margin-right: 12px;
        font-size: 18px;
    }
}
</style>
