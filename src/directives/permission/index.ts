import type { Directive, DirectiveBinding } from 'vue'
import { getPermissionsBtn } from '@/caches/localStorage'

/**
 * 按钮权限,多权限使用
 * 使用：v-permission="['admin','editor']"
 */
export const permission: Directive = {
    mounted(el, binding:DirectiveBinding) {
        const { value } = binding
        const btnList: string[] = getPermissionsBtn()
        if (Array.isArray(value) && value.length > 0) {
            const permissionRoles = value
            const hasPermission = btnList.some((btn: string) => permissionRoles.includes(btn))
            if (!hasPermission) {
                // 隐藏
                // el.style.display = "none"
                // 销毁
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`need roles! Like v-permission="['admin','editor']"`)
        }
    }
}

/**
 * 按钮权限,单权限使用
 * 使用：v-permission="'resCode'"
 */
// export const permission: Directive = {
//     mounted(el, binding) {
//         const { user } = useStore()
//         const { btnPermission } = user
//         let btnPermission = btnPermission?.length > 0 ? btnPermission : getStorage('permissionsBtnList', false)
//         if (binding.value) {
//             if (!btnPermission.includes(binding.value)) {
//                 el.parentNode.removeChild(el)
//             }
//         } else {
//             throw new Error(`need roles! Like v-permission="'resCode'"`)
//         }
//     }
// }
