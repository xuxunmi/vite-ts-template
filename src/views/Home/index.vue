<template>
    <div class="app-container">
        <div
            :style="{
                height: item.height + 'px',
                background: item.background,
                top: item.top + 'px',
                left: item.left + 'px'
            }"
            v-for="item in waterfallList"
            class="items"
        ></div>
    </div>
</template>

<script setup lang="ts" name="Home">
interface List {
    height: number
    background: string
    top?: number
    left?: number
}
// 瀑布流数据
const list = ref<List[]>([
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
const waterfallList = reactive<any[]>([])
const init = () => {
    const heightList: any[] = []
    const width = 130
    const x = document.getElementsByClassName('app-container')[0].clientWidth
    const column = Math.floor(x / width)

    for (let i = 0; i < list.value.length; i++) {
        if (i < column) {
            list.value[i].top = 10
            list.value[i].left = i * width + 20
            heightList.push(list.value[i].height + 10)
            waterfallList.push(list.value[i])
        } else {
            let current = heightList[0]
            let index = 0
            heightList.forEach((h, inx) => {
                if (current > h) {
                    current = h
                    index = inx
                }
            })
            // console.log(current, 'c')
            list.value[i].top = current + 20
            // console.log(list.value[i].top, 'top', i)
            list.value[i].left = index * width + 20
            heightList[index] = heightList[index] + list.value[i].height + 20
            waterfallList.push(list.value[i])
        }
    }
}

onMounted(() => {
    window.onresize = () => init()
    init()
})
</script>

<style lang="less" scoped>
.app-container {
    flex: 1;
    height: 100%;
    position: relative;
    overflow-y: scroll;
    .items {
        position: absolute;
        width: 120px;
    }
}
// 隐藏滚动条
::-webkit-scrollbar {
    display: none;
}
</style>
