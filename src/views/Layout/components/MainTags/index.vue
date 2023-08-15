<template>
    <div class="tags-view-container" v-if="showTags">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <ul class="item-list">
                <li
                    class="tags-item"
                    v-for="(item, index) in tagsList"
                    :class="{ active: isActive(item.path) }"
                    :key="index"
                >
                    <router-link :to="item.path" class="tags-item-title">{{ item.title }}</router-link>
                    <span class="tags-item-icon" @click="closeTags(index)">
                        <i v-show="tagsList.lenght !== 1 && item.title !== '首页'" class="el-icon-close"></i>
                    </span>
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts" name="MainTags">
import { ref, reactive } from 'vue'
import { useRoute, useRouter, type RouteLocationNormalized } from 'vue-router'
import { useTagsViewStoreHook } from '@/stores/modules/tags-view'
import { TagsViewInterface } from '@/interface/common'

const route = useRoute()
const router = useRouter()
const useTagsViewStore = useTagsViewStoreHook()
const { tagsList, deleteTagView, setTagView, clearTagView, closeOthersTagView } = useTagsViewStore

const isCollapse = computed((): boolean => {
    return false
})

const isActive = (path: string) => {
    return path === route.fullPath
}

const showTags = computed((): boolean => {
    return true
})

// 设置标签
const setTags = (route: RouteLocationNormalized) => {
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

onMounted(() => {
    setTags(route)
})
</script>

<style lang="less" scoped>
.w-calc-64 {
    width: calc(100vh - 64px) !important;
}
.w-calc-210 {
    width: calc(100vh - 210px) !important;
}

.tags-view-container {
    position: fixed;
    top: var(--v3-header-height);
    z-index: 9;
    width: 100vw;
    height: var(--v3-tagsview-height);
    padding: 0 3px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 7px 0 #00000010, 0 0 3px 0 #00000010;
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
            height: 40px;
            margin-right: 6px;
            padding: 0 10px 0 5px;
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
                top: 1px;
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
}
</style>
