<template>
    <div class="layout-container">
        <el-container>
            <!-- 左侧边导航栏 -->
            <el-aside :width="isCollapse ? '64px' : '210px'">
                <LayoutNavMenu></LayoutNavMenu>
            </el-aside>
            <el-container>
                <!-- 头部区域 -->
                <el-header>
                    <LayoutHeader></LayoutHeader>
                </el-header>
                <el-main>
                    <!-- 标签页 -->
                    <MainTags></MainTags>
                    <!-- main主体内容 -->
                    <LayoutMain></LayoutMain>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts" name="Layout">
import LayoutHeader from './components/LayoutHeader/index.vue'
import LayoutNavMenu from './components/LayoutNavMenu/index.vue'
import LayoutMain from './components/LayoutMain/index.vue'
import MainTags from './components/MainTags/index.vue'
import { useAppStore } from '@/stores'

const useApp = useAppStore()

const isCollapse = computed(() => useApp.isCollapse)
</script>

<style lang="less" scoped>
@import '@/styles/scrollbar.less';

.layout-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: var(--v3-body-bg-color);
    .el-container {
        height: 100%;
        .el-aside {
            background-color: @aside-bg-color;
        }
        .el-header {
            position: relative;
            background-color: @header-bg-color;
        }
        .el-container {
            .el-main {
                padding: 0 !important;
            }
        }
    }
}
</style>
