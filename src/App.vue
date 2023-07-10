<template>
    <layout></layout>
</template>
<script setup lang="ts">
import layout from '@/views/Layout/index.vue'

console.log('VITE_PORT环境变量: ', import.meta.env.VITE_PORT)
</script>

<style lang="less" scoped>
#app {
    height: 100vh;
}
</style>
