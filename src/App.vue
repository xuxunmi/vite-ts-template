<template>
    <layout></layout>
</template>
<script setup lang="ts">
import layout from '@/views/Layout/index.vue'

console.log('VITE_PORT环境变量: ', import.meta.env.VITE_PORT)
</script>

<style lang="less" scoped>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
</style>
