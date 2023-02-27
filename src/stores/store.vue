<template>
    counter: {{ counter.count }}
    <br />
    token: {{ user.token }}
    <br />
    <button @click="change">改变</button>
</template>

<script setup lang="ts">
// pinia使用
import { useStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
const { user, counter } = useStore()

// 此解构不具有响应式
// const { count, doubleCount, increment } = counter
// console.log('pinia-counter无响应式: ', count, doubleCount)
const { count, doubleCount } = storeToRefs(counter)
console.log('pinia-counter响应式: ', count, doubleCount)

console.log('pinia-user: ', user.token)

const change = () => {
    // 第一种方式：
    // counter.count++
    // 第二种方式：批量修改
    // counter.$patch({
    //     count: 6666
    // })
    // 第三种方式：函数形式
    counter.$patch(state => {
        state.count = 6666
    })
    // 第四种方式：修改整个store示例(不推荐)
    // 第五种方式：
    user.setToken('ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz234567800000')
}
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
