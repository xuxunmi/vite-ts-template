<template>
    <div class="tags-view-container" v-if="showTags">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <ul class="item-list">
                <li
                    class="tags-item"
                    v-for="(tag, index) in tagsList"
                    :class="{ active: isActive(tag.path) }"
                    :key="index"
                >
                    <router-link :to="{ path: tag.path, query: tag.query }" class="tags-item-title">{{
                        tag.title
                    }}</router-link>
                    <el-icon
                        class="tags-item-icon"
                        v-show="tagsList.length !== 1 && tag.title !== '首页'"
                        @click="closeTags(index)"
                        ><Close
                    /></el-icon>
                </li>
            </ul>
        </el-scrollbar>
        <div class="tags-close-box">
            <el-dropdown ref="dropdown" @command="handleTags">
                <el-button size="small" type="primary">
                    标签选项<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts" name="MainTags">
import { useRoute, useRouter } from 'vue-router'
import { useTagsViewStoreHook } from '@/stores/modules/tags-view'

const route = useRoute()
const router = useRouter()
const useTagsViewStore = useTagsViewStoreHook()
const { tagsList, deleteTagView, setTagView, clearTagView, closeOthersTagView } = useTagsViewStore

// 当前标签页
const isActive = (path: string) => {
    return path === route.fullPath
}

const showTags = computed((): boolean => {
    return tagsList.length > 0
})

// 设置标签
const setTags = (route: any) => {
    const isExist = tagsList.some(item => {
        return item.path === route.fullPath
    })
    if (!isExist) {
        if (tagsList.length >= 9) {
            deleteTagView(0)
        }
        setTagView({
            name: route.name,
            title: route.meta.title,
            path: route.fullPath
        })
    }
}

watch(
    () => route,
    to => {
        setTags(to)
    },
    { immediate: true, deep: true }
)

// 关闭单个标签
const closeTags = (index: number) => {
    const delItem = tagsList[index]
    deleteTagView(index)
    const item = tagsList[index] ? tagsList[index] : tagsList[index - 1]
    if (item) {
        delItem.path === route.fullPath && router.push({ path: item.path })
    }
}

// 关闭其他标签
const closeOtherTags = () => {
    const curItem = tagsList.filter(item => {
        return item.path === route.fullPath
    })
    closeOthersTagView(curItem)
}

// 关闭全部标签
const closeAllTags = () => {
    // 判断当前tags是否唯一且为首页
    if (tagsList.length === 1 && route.name === 'home') return
    clearTagView()
    // 设置tagsList
    setTagView({
        name: 'home',
        title: '首页',
        path: '/home'
    })
    router.push({ path: '/home' })
}

const handleTags = (command: string) => {
    switchCommandAction(command)
}

const switchCommandAction = (value: string) => {
    switch (value) {
        case 'other':
            closeOtherTags()
            break
        case 'all':
            closeAllTags()
            break
        default:
            break
    }
}

// f5刷新不触发
onBeforeRouteUpdate(to => {
    setTags(to)
})
</script>

<style lang="less" scoped>
.tags-view-container {
    position: fixed;
    top: var(--v3-header-height);
    z-index: 9;
    width: 100vw;
    height: var(--v3-tagsview-height);
    padding: 0 3px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 2px 2px 2px #cacbcb;
    background-color: #f2f3f5;
    .el-scrollbar {
        height: 40px; // 必须设置el-scrollbar的高度
        :deep(.scrollbar-wrapper) {
            overflow-x: hidden !important;
            overflow-y: hidden !important;
        }
        :deep(.el-scrollbar__bar.is-vertical) {
            display: none !important;
        }
        .item-list {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: 13px;
            color: black;
            font-weight: 600;
            line-height: 40px;
        }
        .tags-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            padding: 0 5px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            -webkit-transition: all 0.3s ease-in;
            -moz-transition: all 0.3s ease-in;
            transition: all 0.3s ease-in;
            cursor: pointer;

            &-title,
            &-icon {
                position: relative;
                top: 3px;
            }
            &-title {
                min-width: 50px;
                color: black;
            }
            &-icon {
                margin-left: 5px;
                font-size: 12px;
            }
        }
        .tags-item:not(.active):hover {
            background-color: #3091ec;
            border-radius: 3px;
        }
        .tags-item.active {
            border-bottom: 2px solid #409eff;
        }
    }
    .tags-close-box {
        position: fixed;
        top: calc(var(--v3-header-height) + 8px);
        right: 5px;
        z-index: 9;
        text-align: center;
        background-color: #f2f3f5;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
        z-index: 9;
    }
}
</style>
