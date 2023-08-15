import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            isCollapse: false
        }
    },
    getters: {},
    actions: {
        setCollapse() {
            this.isCollapse = !this.isCollapse
        }
    },
    persist: true // 开启持久化
})
