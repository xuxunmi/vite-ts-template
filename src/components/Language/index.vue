<template>
    <div class="language-container">
        <el-dropdown @command="handleLanguageSetting">
            <span class="el-dropdown-link"> 语言 </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="item in languageList" :key="item.id" :command="item.id">{{
                        item.name
                    }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
/**
 *   使用示例：
 *   import { useSettingsStoreHook } from '@/stores/modules/settings'
 *   import Language from "@/components/Language/index.vue"
 *
 *   const useSettingsStore = useSettingsStoreHook()
 *
 *   <Language v-if="showLanguage" class="right-menu-item" />
 *   const showLanguage = computed(() => {
 *      return useSettingsStore.showLanguage
 *   })
 */

import { SelectInterface } from '@/interface/common'
import { setLanguage } from '@/caches/localStorage'

defineOptions({
    name: 'Language'
})

// 语言列表
const languageList: SelectInterface[] = [
    {
        id: 'zh_CN',
        name: '中文'
    },
    {
        id: 'en_US',
        name: 'English'
    }
]

const handleLanguageSetting = (command: string) => {
    setLanguage(command)
}
</script>

<style lang="scss" scoped>
.language-container {
    .el-dropdown-link {
        color: #fff;
        font-size: 18px;
    }
    :deep(.el-tooltip__trigger:focus-visible) {
        outline: unset;
    }
}
</style>
