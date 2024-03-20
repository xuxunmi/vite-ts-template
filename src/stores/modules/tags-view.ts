import { ref } from 'vue'
import { defineStore, createPinia } from 'pinia'
import { type RouteLocationNormalized } from 'vue-router'

export type TagView = Partial<RouteLocationNormalized>

const store = createPinia()

export const useTagsViewStore = defineStore(
    'tags-view',
    () => {
        // 标签列表
        const tagsList = ref<TagView[]>([])
        const cachedTagsList = ref<string[]>([])

        // 新增标签
        const addTagView = (view: TagView) => {
            if (
                tagsList.value.some((v: TagView, index: number) => {
                    if (v.path === view.path) {
                        if (v.fullPath !== view.fullPath) {
                            // 防止 query 参数丢失
                            tagsList.value[index] = Object.assign({}, view)
                        }
                        return true
                    }
                })
            ) {
                return
            }
            tagsList.value.push(Object.assign({}, view))
        }
        const addCachedView = (view: TagView) => {
            if (typeof view.name !== 'string') return
            if (cachedTagsList.value.includes(view.name)) return
            if (view.meta?.keepAlive) {
                cachedTagsList.value.push(view.name)
            }
        }

        // 删除标签
        const deleteTagView = (view: TagView) => {
            for (const [i, v] of tagsList.value.entries()) {
                if (v.path === view.path) {
                    tagsList.value.splice(i, 1)
                    break
                }
            }
        }
        const deleteCachedView = (view: TagView) => {
            if (typeof view.name !== 'string') return
            const index = cachedTagsList.value.indexOf(view.name)

            index > -1 && cachedTagsList.value.splice(index, 1)
        }

        // 关闭其他标签
        const closeOthersTagViews = (view: TagView) => {
            console.log('tagsList.value:', tagsList.value)
            tagsList.value = tagsList.value.filter((v: TagView) => {
                return v.meta?.affix || v.path === view.path
            })
            console.log('tagsList.value:', tagsList.value)
        }
        const closeOthersCachedViews = (view: TagView) => {
            if (typeof view.name !== 'string') return
            const index = cachedTagsList.value.indexOf(view.name)
            if (index > -1) {
                cachedTagsList.value = cachedTagsList.value.slice(index, index + 1)
            } else {
                // 如果 index = -1, 没有缓存的 tags
                cachedTagsList.value = []
            }
        }

        // 清空标签
        const deleteAllTagViews = () => {
            // keep affix tags
            const affixTags = tagsList.value.filter((tag: TagView) => tag.meta?.affix)
            console.log('affixTags:', affixTags)
            tagsList.value = affixTags
        }
        const deleteAllCachedViews = () => {
            cachedTagsList.value = []
        }

        return {
            tagsList,
            cachedTagsList,
            addTagView,
            addCachedView,
            deleteTagView,
            deleteCachedView,
            closeOthersTagViews,
            closeOthersCachedViews,
            deleteAllTagViews,
            deleteAllCachedViews
        }
    },
    {
        persist: true // 开启持久化
    }
)

export function useTagsViewStoreHook() {
    return useTagsViewStore(store)
}
