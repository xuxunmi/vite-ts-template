<template>
    <div class="error-page">
        <img class="error-page-img" src="@/assets/images/ic_404.png" />
        <div class="error-page-info">
            <h1>404</h1>
            <p>啊哦，你访问的页面不存在(⋟﹏⋞)</p>
            <div><a class="back-btn" href="#" @click="handleGoMain">返回首页</a></div>
        </div>
    </div>
</template>

<script setup lang="ts" name="Error">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoMain = () => {
    router.push({ path: '/' })
}
</script>

<style lang="less" scoped>
.error-page {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    .error-page-img {
        display: inline-block;
        height: 260px;
        margin: 10px 15px;
        vertical-align: middle;
    }
    .error-page-info {
        vertical-align: middle;
        display: inline-block;
        margin: 10px 15px;
        > h1 {
            color: #434e59;
            font-size: 72px;
            font-weight: 600;
        }
        > p {
            color: #777;
            font-size: 20px;
            margin-top: 5px;
        }
        > div {
            margin-top: 30px;
        }
        .back-btn {
            display: inline-block;
            height: 38px;
            line-height: 38px;
            padding: 0 18px;
            background-color: #009688;
            color: #fff;
            white-space: nowrap;
            text-align: center;
            font-size: 14px;
            border: none;
            border-radius: 2px;
            &:hover {
                opacity: 0.8;
                color: #fff;
            }
        }
    }
}
</style>
