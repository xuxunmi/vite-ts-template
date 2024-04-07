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

// 注册所有elementPlus图标
import { loadElementPlusIcon } from '@/plugins/elementPlus'
loadElementPlusIcon(app)

// 自定义指令
import directives from '@/directives/index'
app.use(directives)

// 注册全局svg组件
import { loadSvg } from '@/icons'
loadSvg(app)

// 引入i18n语言国际化
import i18n from "@/lang/i18n"

app.use(i18n)

app.use(pinia)

app.use(router)

app.mount('#app')
