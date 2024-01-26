<template>
    <div class="tags-view-container">
        <ScrollPane class="tags-view-wrapper" :tag-refs="tagRefs">
            <router-link
                ref="tagRefs"
                class="tags-view-item"
                v-for="tag in tagsViewStore.tagsList"
                :key="tag.path"
                :class="isActive(tag) ? 'active' : ''"
                :to="{ path: tag.path, query: tag.query }"
                @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
                @contextmenu.prevent="openMenu(tag, $event)"
            >
                {{ tag.meta?.title }}
                <el-icon v-if="!isAffix(tag)" :size="12" @click.prevent.stop="closeSelectedTag(tag)">
                    <Close />
                </el-icon>
            </router-link>
        </ScrollPane>
        <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)">刷新</li>
            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
            <li @click="closeOthersTags">关闭其它</li>
            <li @click="closeAllTags(selectedTag)">关闭所有</li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="MainTags">
import ScrollPane from './ScrollPane.vue'
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import { type RouteRecordRaw, RouterLink, useRoute, useRouter } from 'vue-router'
import { type TagView, useTagsViewStoreHook } from '@/stores/modules/tags-view'
import path from 'path-browserify'
// import { getRouterName, filterRouters } from '@/utils/dynamic-routes'
// import { getDynamicsMenu } from '@/caches/localStorage'
// import { systemManageRoutes, projectMonitorRoutes } from '@/router/dynamic-routes'

const instance = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStoreHook()
const {
    addTagView,
    addCachedView,
    deleteTagView,
    deleteCachedView,
    closeOthersTagViews,
    closeOthersCachedViews,
    deleteAllTagViews,
    deleteAllCachedViews
} = tagsViewStore
const tagRefs = ref<InstanceType<typeof RouterLink>[]>([])

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref<TagView>({})
let affixTags: TagView[] = []

// 当前标签页
const isActive = (tag: TagView) => {
    return tag.path === route.path
}

const isAffix = (tag: TagView) => {
    return tag.meta?.affix
}

const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
    let tags: TagView[] = []
    routes.forEach(route => {
        if (route.meta?.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
                fullPath: tagPath,
                path: tagPath,
                name: route.name,
                meta: { ...route.meta }
            })
        }
        if (route.children) {
            const childTags = filterAffixTags(route.children, route.path)
            if (childTags.length >= 1) {
                tags = tags.concat(childTags)
            }
        }
    })
    return tags
}

const toLastView = (tagsList: TagView[], view: TagView) => {
    const latestView = tagsList.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
        router.push(latestView.fullPath)
    } else {
        // 如果 TagsView 全部被关闭了，则默认重定向到主页
        if (view.name === 'Home') {
            // 重新加载主页
            router.push({ path: '/redirect' + view.path, query: view.query })
        } else {
            router.push('/')
        }
    }
}

const openMenu = (tag: TagView, e: MouseEvent) => {
    const menuMinWidth = 210
    const offsetLeft = instance!.proxy!.$el.getBoundingClientRect().left
    const offsetWidth = instance!.proxy!.$el.offsetWidth
    const maxLeft = offsetWidth - menuMinWidth
    const left15 = e.clientX - offsetLeft + 215
    if (left15 > maxLeft) {
        left.value = maxLeft
    } else {
        left.value = left15
    }
    top.value = e.clientY + 5
    visible.value = true
    selectedTag.value = tag
}

const closeMenu = () => {
    visible.value = false
}

// 初始化标签
const initTags = () => {
    // const dynamicRoutes = getDynamicsMenu()
    // const routerNameArr = getRouterName(dynamicRoutes)
    // const asyncRoutes = [...systemManageRoutes, ...projectMonitorRoutes]
    // const addRoutersList: RouteRecordRaw[] = filterRouters(asyncRoutes, routerNameArr)
    const routersList: RouteRecordRaw[] | undefined = router.options.routes[0].children
    console.log('routersList:', routersList)
    if (routersList) {
        affixTags = filterAffixTags(routersList)
        for (const tag of affixTags) {
            // 必须含有 name 属性
            if (tag.name) {
                addTagView(tag)
            }
        }
    }
}

// 新增标签
const addTags = () => {
    if (route.name) {
        addTagView(route)
        addCachedView(route)
    }
}

// 刷新标签
const refreshSelectedTag = (view: TagView) => {
    deleteCachedView(view)
    router.replace({ path: '/redirect' + view.path, query: view.query })
}

// 关闭当前标签
const closeSelectedTag = (view: TagView) => {
    deleteTagView(view)
    deleteCachedView(view)
    if (isActive(view)) {
        toLastView(tagsViewStore.tagsList, view)
    }
}

// 关闭其他标签
const closeOthersTags = () => {
    if (selectedTag.value.fullPath !== route.path && selectedTag.value.fullPath !== undefined) {
        router.push(selectedTag.value.fullPath)
    }
    closeOthersTagViews(selectedTag.value)
    closeOthersCachedViews(selectedTag.value)
}

// 关闭全部标签
const closeAllTags = (view: TagView) => {
    deleteAllTagViews()
    deleteAllCachedViews()
    if (affixTags.some(tag => tag.path === route.path)) {
        return
    }
    toLastView(tagsViewStore.tagsList, view)
}

watch(
    () => route,
    () => {
        addTags()
    },
    { deep: true }
)

watch(visible, value => {
    if (value) {
        document.body.addEventListener('click', closeMenu)
    } else {
        document.body.removeEventListener('click', closeMenu)
    }
})

// f5刷新不触发
onBeforeRouteUpdate(to => {
    addTagView(route)
    addCachedView(route)
})

onMounted(() => {
    initTags()
})
</script>

<style lang="less" scoped>
.tags-view-container {
    height: var(--v3-tagsview-height);
    width: 100%;
    background-color: #f2f3f5 !important;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 #00000010, 0 0 3px 0 #00000010;
    .tags-view-wrapper {
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid var(--v3-tagsview-tag-border-color);
            border-radius: var(--v3-tagsview-tag-border-radius);
            color: var(--v3-tagsview-tag-text-color);
            background-color: var(--v3-tagsview-tag-bg-color);
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            &:first-of-type {
                margin-left: 5px;
            }
            &:last-of-type {
                margin-right: 5px;
            }
            &.active {
                background-color: var(--v3-tagsview-tag-active-bg-color);
                color: var(--v3-tagsview-tag-active-text-color);
                border-color: var(--v3-tagsview-tag-active-border-color);
                &::before {
                    content: '';
                    background-color: var(--v3-tagsview-tag-active-before-color);
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
            .el-icon {
                position: relative;
                top: -1px;
                margin: 0 2px;
                vertical-align: middle;
                border-radius: 50%;
                &:hover {
                    background-color: var(--v3-tagsview-tag-icon-hover-bg-color);
                    color: var(--v3-tagsview-tag-icon-hover-color);
                }
            }
        }
    }
    .contextmenu {
        margin: 0;
        background-color: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 #00000030;
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background-color: #eee;
            }
        }
    }
}
</style>
