<template>
    <div class="title text-center pt-2" @click="handleClick">{{ title }}</div>
</template>

<script setup lang="ts" name="layoutMenu">
// 子组件接收父组件传值
interface Props {
    title?: string
}
// ts 写法
// const props = defineProps<{
//     title: string
// }>()

// withDefaults： ts特有定义默认值
const props = withDefaults(defineProps<Props>(), {
    // 要使用默认值时，父组件不应传此属性
    title: '我是标题！'
})

// 不是 ts 写法
// const props = defineProps({
//     // 字符串类型是不需要v-bind绑定
//     title: {
//         typeof: String,
//         default: ''
//     }
// })
console.log('在js中使用: ', props.title)

// 子组件向父组件传值
// ts写法, 接收一个泛型，void无返回值
const emits = defineEmits<{
    (e: 'headerClick', value: string): void
}>()
const handleClick = () => {
    emits('headerClick', '我是子组件传参值')
}

// 不是 ts 写法
// const emits = defineEmits(['headerClick'])
// const handleClick = () => {
//     emits('headerClick', '我是子组件传参值')
// }

// 子组件暴露给父组件内部属性
defineExpose({
    name: '徐寻觅',
    open: () => alert('子组件暴露给父组件内部属性!')
})
</script>

<style lang="less" scoped>
.title {
    font-size: 24px;
    font-weight: bold;
}
</style>
