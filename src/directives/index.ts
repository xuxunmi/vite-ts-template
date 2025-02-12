import { type App } from 'vue'
import { focus } from './focus'
import { dropLine } from './dropLine'
import { permission } from './permission'
import { throttle, reclickDirective } from './throttle'
import { dialogDrag } from './dialogDrag'

const directives: any = {
    focus,
    dropLine,
    permission,
    throttle,
    reclickDirective,
    dialogDrag
}

export default {
    install(app: App<Element>) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key])
        })
    }
}
