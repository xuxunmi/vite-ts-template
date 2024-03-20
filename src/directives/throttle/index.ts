/*
  需求：防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。

  思路：
    1、第一次点击，立即调用方法并禁用按钮，等延迟结束再次激活按钮
    2、将需要触发的方法绑定在指令上
  
  使用：给 Dom 加上 v-throttle 及回调函数即可
  <button v-throttle="debounceClick">节流提交</button>
*/
import type { Directive, DirectiveBinding } from 'vue'
interface ElType extends HTMLElement {
    __handleClick__: () => any
    disabled: boolean
}
export const throttle: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        if (typeof binding.value !== 'function') {
            throw 'callback must be a function'
        }
        let timer: NodeJS.Timeout | null = null
        el.__handleClick__ = function () {
            if (timer) {
                clearTimeout(timer)
            }
            if (!el.disabled) {
                el.disabled = true
                binding.value()
                timer = setTimeout(() => {
                    el.disabled = false
                }, 1000)
            }
        }
        el.addEventListener('click', el.__handleClick__)
    },
    beforeUnmount(el: ElType) {
        el.removeEventListener('click', el.__handleClick__)
    }
}

/**
 * 防止重复点击提交按钮
 * @directive 默认方式：v-reclickDirective，如 `<el-button v-reclickDirective></el-button>`
 * @directive 参数方式：v-reclickDirective="number"，如 `<el-button v-reclickDirective="500"></el-button>`
 */
export const reclickDirective: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        const { time } = binding.value
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true
                setTimeout(
                    () => {
                        el.disabled = false
                    },
                    time === undefined ? 500 : time
                )
            }
        })
    },
    unmounted(el) {
        el.disabled = false
    }
}
