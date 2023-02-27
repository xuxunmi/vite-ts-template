<template>
    <div>徐寻觅是大帅逼</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Props {
    name: string
}
defineProps<{
    obj: Props
}>()
</script>

<style lang="less" scoped>
div {
    font-size: 24px;
    color: #f00;
}
</style>
