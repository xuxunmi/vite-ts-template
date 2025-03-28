<template>
    <div class="loading">
        <svg t="1742975979529" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="6633" width="200" height="200">
            <path
                d="M512 170.666667C323.477333 170.666667 170.666667 323.477333 170.666667 512s152.810667 341.333333 341.333333 341.333333 341.333333-152.810667 341.333333-341.333333h85.333334c0 235.648-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333v85.333334z"
                p-id="6634" fill="#409EFF"></path>
        </svg>
        <span>拼命加载中...</span>
    </div>
</template>

<style scoped>
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333;
    z-index: 2000;
}

.icon {
    width: 30px;
    height: 30px;
    animation: rotate 1s linear infinite;
}
</style>