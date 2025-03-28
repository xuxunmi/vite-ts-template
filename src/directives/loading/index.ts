import { type Directive, type DirectiveBinding, createApp } from "vue"
import Loading from "@/components/loading/index.vue";

const loadingClassName = 'loading-wrapper'

/**
 * 添加loading组件
 *
 * @param el
 */
const addLoading = (el: any) => {
    if (el.loading) return false
    el.loading = true
    const app = createApp(Loading)
    el.loadingDom = app.mount(document.createElement('div'))
    el.classList.add(loadingClassName)
    el.appendChild(el.loadingDom.$el)
}

/**
 * 删除loading组件
 *
 * @param el
 */
const removeLoading = (el: any) => {
    el.loading = false
    el.classList.remove(loadingClassName)
    if (el.loadingDom) {
        el.loadingDom.$el.remove()
        delete el.loadingDom
        delete el.elPosition
    }
}

export const customLoading: Directive = {
    mounted(el: any, binding: DirectiveBinding) {
        // console.log('loading-mounted', el, binding.value);
        if (binding.value === true) {
            addLoading(el)
        } else {
            removeLoading(el)
        }
    },
    updated: function (el:any, binding:DirectiveBinding) {
        // console.log('loading-updated', el, binding.value);
        if (binding.value === true) {
            addLoading(el)
        } else {
            removeLoading(el)
        }
    },
    beforeUnmount(el:any, binding:DirectiveBinding) {
        // console.log('loading-beforeUnmount', el, binding.value);
        removeLoading(el)
    }
}