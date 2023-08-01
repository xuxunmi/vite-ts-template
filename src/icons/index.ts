import { type App } from 'vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import 'virtual:svg-icons-register'

export function loadSvg(app: App) {
    app.component('SvgIcon', SvgIcon)
}
