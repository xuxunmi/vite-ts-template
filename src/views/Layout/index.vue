<template>
    <div class="layout">
        <layoutMenu
            ref="layoutMenuExpose"
            class="layout-menu"
            title="Vite + Vue + TS"
            @headerClick="handleHeaderClick"
        ></layoutMenu>
        <div class="layout-content">
            <layoutHeader></layoutHeader>
            <layoutMain :list="list"></layoutMain>
        </div>
    </div>
</template>

<script setup lang="ts" name="layout">
import layoutHeader from './components/LayoutHeader/index.vue'
import layoutMenu from './components/LayoutMenu/index.vue'
import layoutMain from './components/LayoutMain/index.vue'

// 父组件通过ref接收子组件实例暴露的属性/方法
const layoutMenuExpose = ref<InstanceType<typeof layoutMenu>>()

const handleHeaderClick = (value: string) => {
    console.log('value : ', value)
    console.log('layoutMenuExpose: ', layoutMenuExpose.value?.name, layoutMenuExpose.value?.open())
}

// 瀑布流数据
const list = reactive<any[]>([
    {
        height: 300,
        background: 'red'
    },
    {
        height: 400,
        background: 'pink'
    },
    {
        height: 500,
        background: 'blue'
    },
    {
        height: 200,
        background: 'green'
    },
    {
        height: 300,
        background: 'gray'
    },
    {
        height: 400,
        background: '#CC00FF'
    },
    {
        height: 200,
        background: 'black'
    },
    {
        height: 100,
        background: '#996666'
    },
    {
        height: 500,
        background: 'skyblue'
    },
    {
        height: 300,
        background: '#993366'
    },
    {
        height: 100,
        background: '#33FF33'
    },
    {
        height: 400,
        background: 'skyblue'
    },
    {
        height: 200,
        background: '#6633CC'
    },
    {
        height: 300,
        background: '#666699'
    },
    {
        height: 300,
        background: '#66CCFF'
    },
    {
        height: 300,
        background: 'skyblue'
    },
    {
        height: 200,
        background: '#CC3366'
    },
    {
        height: 200,
        background: '#CC9966'
    },
    {
        height: 200,
        background: '#FF00FF'
    },
    {
        height: 500,
        background: '#990000'
    },
    {
        height: 400,
        background: 'red'
    },
    {
        height: 100,
        background: '#999966'
    },
    {
        height: 200,
        background: '#CCCC66'
    },
    {
        height: 300,
        background: '#FF33FF'
    },
    {
        height: 400,
        background: '#FFFF66'
    },
    {
        height: 200,
        background: 'red'
    },
    {
        height: 100,
        background: 'skyblue'
    },
    {
        height: 200,
        background: '#33CC00'
    },
    {
        height: 300,
        background: '#330033'
    },
    {
        height: 100,
        background: '#0066CC'
    },
    {
        height: 200,
        background: 'skyblue'
    },
    {
        height: 100,
        background: '#006666'
    },
    {
        height: 200,
        background: 'yellow'
    },
    {
        height: 300,
        background: 'yellow'
    },
    {
        height: 100,
        background: '#33CCFF'
    },
    {
        height: 400,
        background: 'yellow'
    },
    {
        height: 400,
        background: 'yellow'
    },
    {
        height: 200,
        background: '#33FF00'
    },
    {
        height: 300,
        background: 'yellow'
    },
    {
        height: 100,
        background: 'green'
    }
])
</script>

<style lang="less" scoped>
.layout {
    display: flex;
    height: 100vh;
    &-menu {
        width: 200px;
        border-right: 1px solid #ccc;
    }
    &-content {
        display: flex;
        flex: 1;
        flex-direction: column;
    }
}
</style>
