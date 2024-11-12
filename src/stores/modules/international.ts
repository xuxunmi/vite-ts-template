import { ref } from "vue"
import { defineStore, createPinia } from 'pinia'
// import { getInternationalFieldsData } from "@/api/system/systemLanguage"
// import { setInternationalFields } from "@/caches/localStorage"

const store = createPinia()

export const useInternationalStore = defineStore("international", () => {
    // 中英文国际化语言
    const internationalFields = ref({})
    const getInternationalFields = async (payload: boolean) => {
        try {
            // const { data } = await getInternationalFieldsData({})
            // 缓存中英文国际化
            // setInternationalFields(data)
            // internationalFields.value = data
            // if (payload) window.location.reload()
            // setPermissionsBtn(data)
            // console.log("中英文internationalFields.value： ", internationalFields.value)
            // return data
        } catch (err: any) {
            if (err.msg)
                ElMessage({
                    type: "error",
                    message: err.msg,
                    center: true
                })
            return
        }
    }
    return { internationalFields, getInternationalFields }
})

/** 在 setup 外使用 */
export function useInternationalStoreHook() {
    return useInternationalStore(store)
}
