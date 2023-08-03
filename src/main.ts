import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from '@/router'
// 引入动态路由
import '@/router/permission'

import '@/styles/global.css'
import '@/styles/index.less'
import 'tailwindcss/tailwind.css'

const app = createApp(App)

const pinia = createPinia().use(piniaPluginPersistedstate)

// 自定义指令
import directives from '@/directives/index'
app.use(directives)

// 注册所有elementPlus图标
import { loadElementPlusIcon } from '@/plugins/elementPlus'
loadElementPlusIcon(app)

// 注册全局svg组件
import { loadSvg } from '@/icons'
loadSvg(app)

app.use(pinia)

app.use(router)

app.mount('#app')
