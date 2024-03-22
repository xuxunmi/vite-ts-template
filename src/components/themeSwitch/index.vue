<template>
    <el-dropdown trigger="click" @command="handleSetTheme">
        <div>
            <el-tooltip effect="dark" content="主题模式" placement="bottom">
                <el-icon :size="20">
                    <MagicStick />
                </el-icon>
            </el-tooltip>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    v-for="(theme, index) in themeList"
                    :key="index"
                    :disabled="activeThemeName === theme.name"
                    :command="theme.name"
                >
                    <span>{{ theme.title }}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
/**
 *   使用示例：
 *   import { useSettingsStoreHook } from '@/stores/modules/settings'
 *   import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
 *
 *   const useSettingsStore = useSettingsStoreHook()
 *
 *   <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
 *   const showThemeSwitch = computed(() => {
 *      return useSettingsStore.showThemeSwitch
 *   })
 */

import { type ThemeName, useThemeHook } from '@/hooks/useTheme'
import { MagicStick } from '@element-plus/icons-vue'

const { themeList, activeThemeName, setTheme } = useThemeHook()

// 处理选择主题
const handleSetTheme = (name: ThemeName) => {
    setTheme(name)
}
</script>

<style lang="less" scoped></style>
