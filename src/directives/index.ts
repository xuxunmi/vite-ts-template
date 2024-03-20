import { type App } from 'vue'
import { focus } from './focus'
import { dropLine } from './dropLine'
import { permission } from './permission'
import { throttle, reclickDirective } from './throttle'

const directives: any = {
    focus,
    dropLine,
    permission,
    throttle,
    reclickDirective
}

export default {
    install(app: App<Element>) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key])
        })
    }
}
