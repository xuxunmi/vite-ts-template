import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        }
    },
    getters: {},
    actions: {
        setToken(token: string) {
            console.log('传参token: ', token)
            this.token = token
        }
        // 异步需要搭配 async await 语法
        // async getTokenAsync() {
        //     const result = await login()
        //     this.token = result
        // }
    },
    // persist: true // 开启持久化
    persist: {
        key: 'user', // store.$id 作为存储的默认键，即 defineStore 的第一个参数。
        storage: window.localStorage, // 修改为 sessionStorage，默认为 localStorage
        paths: undefined // 持久化属性数组, [] 表示没有状态被持久化， undefined 或 null 表示整个状态被持久化。
    }
})
