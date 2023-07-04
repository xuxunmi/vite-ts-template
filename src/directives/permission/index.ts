import { type Directive } from 'vue'
import { useStore } from '@/stores/index'
// import { get as getStorage } from '@/utils/storage.js';

/**
 * 按钮权限,多权限使用
 * 使用：v-permission="['admin','editor']"
 */
export const permission: Directive = {
    mounted(el, binding) {
        const { value } = binding
        const { user } = useStore()
        const { roles } = user
        if (Array.isArray(value) && value.length > 0) {
            const permissionRoles = value
            const hasPermission = roles.some(role => permissionRoles.includes(role))
            if (!hasPermission) {
                // 隐藏
                // el.style.display = "none"
                // 销毁
                el.parentNode?.removeChild(el)
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
