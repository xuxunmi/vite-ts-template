<template>
    <!-- web components 使用 -->
    <!-- 传引用类型得参数时，需要 JSON.stringify 其余不用 -->
    <custom-btn :obj="JSON.stringify(obj)"></custom-btn>
</template>

<script setup lang="ts">
import { defineCustomElement } from 'vue'
import customVueCeVue from './customVue.ce.vue'

const Btn = defineCustomElement(customVueCeVue)
window.customElements.define('custom-btn', Btn)
// 传参
const obj = { name: '徐寻觅' }
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
