import type { Directive, DirectiveBinding } from 'vue'

const changeFullScreen = (el: any, ifFullScreen: boolean) => {
    if (ifFullScreen) {
        el.classList.add('custom-fullScreen')
    } else {
        el.classList.remove('custom-fullScreen')
    }
}

/** 全屏指令 */
export const customFullScreen: Directive = {
    mounted(el: any, binding: DirectiveBinding) {
        changeFullScreen(el, binding.value)
    },
    updated(el: any, binding: DirectiveBinding) {
        changeFullScreen(el, binding.value)
    }
}
