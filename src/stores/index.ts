import { defineStore } from 'pinia'

import { useUserStore } from './modules/user'
import { useCounterStore } from './modules/counter'

export const useStore = () => {
    return {
        user: useUserStore(),
        counter: useCounterStore()
    }
}
