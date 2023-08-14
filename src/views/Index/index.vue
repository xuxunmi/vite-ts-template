<template>
    <section class="app-main">
        <router-view v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
                <component :is="Component" :key="keyPath" />
            </Transition>
        </router-view>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const keyPath = computed(() => {
    return route.path
})
</script>

<style lang="less" scoped>
.app-main {
    min-height: calc(100vh - var(--v3-header-height));
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: var(--v3-body-bg-color);
}
</style>
