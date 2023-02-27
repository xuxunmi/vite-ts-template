<template>
    <div class="layout-container">
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

<script setup lang="ts" name="layoutMain">
const props = defineProps<{
    list: any[]
}>()

const waterfallList = reactive<any[]>([])
const init = () => {
    const heightList: any[] = []
    const width = 130
    const x = document.getElementsByClassName('layout-container')[0].clientWidth
    const column = Math.floor(x / width)

    for (let i = 0; i < props.list.length; i++) {
        if (i < column) {
            props.list[i].top = 10
            props.list[i].left = i * width + 20
            heightList.push(props.list[i].height + 10)
            waterfallList.push(props.list[i])
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
            props.list[i].top = current + 20
            // console.log(props.list[i].top, 'top', i)
            props.list[i].left = index * width + 20
            heightList[index] = heightList[index] + props.list[i].height + 20
            waterfallList.push(props.list[i])
        }
    }
    console.log(props.list)
}

onMounted(() => {
    window.onresize = () => init()
    init()
})
</script>

<style lang="less" scoped>
.layout-container {
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
