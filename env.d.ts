/// <reference types="vite/client" />
// 三斜线指令: 用于在 TypeScript 文件中引入 Vite 的类型声明文件

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare interface ImportMetaEnv {
    readonly VITE_PORT: number
    readonly VITE_BASE_API: string
    readonly VITE_PUBLIC_PATH: string
    readonly VITE_PROXY_DOMAIN: string
    readonly VITE_PROXY_DOMAIN_REAL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
