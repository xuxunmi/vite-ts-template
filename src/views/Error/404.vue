<template>
    <div class="error-page">
        <div class="error-page-svg">
            <Svg404 />
        </div>
        <router-link to="/">
            <el-button type="primary">回到首页</el-button>
        </router-link>
    </div>
</template>

<script lang="ts" setup name="404">
import Svg404 from '@/assets/images/error/404.svg?component' // vite-svg-loader 插件的功能
</script>

<style lang="less" scoped>
.error-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-svg {
        width: 400px;
        margin-bottom: 50px;
    }
}
</style>
