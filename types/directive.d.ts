import type { Directive } from "vue"

declare module 'vue' {
    export interface ComponentCustomProperties {
        vPermission: Directive<HTMLElement, string | string[]>
    }
}
