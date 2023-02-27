import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        }
    },
    getters: {},
    actions: {
        setToken(token: string) {
            console.log('传参token: ', token);
            this.token = token
        }
        // 异步需要搭配 async await 语法
        // async getTokenAsync() { 
        //     const result = await login()
        //     this.token = result
        // }
    }
})
