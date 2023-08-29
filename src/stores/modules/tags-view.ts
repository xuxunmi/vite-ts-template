import { ref } from 'vue'
import { defineStore, createPinia } from 'pinia'
import { TagsViewInterface } from '@/interface/common'

const store = createPinia()

export const useTagsViewStore = defineStore(
    'tags-view',
    () => {
        // 标签列表
        const tagsList = ref<TagsViewInterface[]>([])

        // 删除标签
        const deleteTagView = (index: number) => {
            tagsList.value.splice(index, 1)
        }

        // 添加标签
        const setTagView = (tag: TagsViewInterface) => {
            tagsList.value.push(tag)
        }

        // 清空标签
        const clearTagView = () => {
            tagsList.value = []
        }

        // 关闭其他标签
        const closeOthersTagView = (tag: TagsViewInterface[]) => {
            tagsList.value = tag
        }

        return { tagsList, deleteTagView, setTagView, clearTagView, closeOthersTagView }
    },
    {
        persist: true // 开启持久化
    }
)

export function useTagsViewStoreHook() {
    return useTagsViewStore(store)
}
