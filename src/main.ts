import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import '@/styles/global.css'
import 'tailwindcss/tailwind.css'

const app = createApp(App)

const pinia = createPinia().use(piniaPluginPersistedstate)

// 自定义指令
import directives from '@/directives/index'
app.use(directives)

app.use(pinia)

app.use(router)

app.mount('#app')
