<template>
    <layout></layout>
    <!-- <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider> -->
</template>
<script setup lang="ts">
import layout from '@/views/Layout/index.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 中文国际化
const locale = zhCn

console.log('VITE_PORT环境变量: ', import.meta.env.VITE_PORT)
</script>

<style lang="less" scoped>
#app {
    height: 100vh;
}
</style>
