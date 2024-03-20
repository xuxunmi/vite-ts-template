import type { Directive, DirectiveBinding } from 'vue'

/**
 * 自动获取焦点指令
 */
export const focus: Directive = {
    mounted(el: any, binding: DirectiveBinding) {
        el.querySelector('input').focus()
    }
}
