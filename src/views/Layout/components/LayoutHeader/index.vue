<template>
    <div class="layout-header-container h-full flex justify-between items-center">
        <div class="layoutheader-left">
            <div class="toggle-button" @click="toggleCollapse">
                <el-icon :size="27">
                    <Expand v-if="isCollapse" />
                    <Fold v-else />
                </el-icon>
            </div>
        </div>
        <div class="layoutheader-right">
            <el-dropdown class="right-menu-item">
                <div class="right-menu-avatar">
                    <el-avatar :size="30" :icon="UserFilled" />
                    <span style="color: #fff">徐寻觅</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts" name="LayoutHeader">
// 此注释用于解决 script 标签内没有内容时，即使给 script 标签添加上 name 属性，其在 vue-devtools 内也不会生效
import { useAppStore } from '@/stores'
import { UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

const router = useRouter()
const useApp = useAppStore()
const useUser = useUserStore()

const isCollapse = computed(() => useApp.isCollapse)

const toggleCollapse = () => {
    useApp.setCollapse()
}

// 处理退出登录
const logout = () => {
    useUser.logout()
}
</script>

<style lang="less" scoped>
.layout-header-container {
    color: #fff;
    .layoutheader-left {
        .el-icon {
            cursor: pointer;
            vertical-align: middle;
        }
    }
    .layoutheader-right {
        .right-menu-item {
            cursor: pointer;
            .right-menu-avatar {
                display: flex;
                align-items: center;
                outline: none;
                .el-avatar {
                    margin-right: 10px;
                }
                span {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
