// 第一种解决方式：vue3组件导入报错解决：找不到模块或其相应的类型声明
// 第二种解决方式：关闭ts严格模式 "strict": false

// 声明一个模块，用于匹配所有以 ".vue" 结尾的文件
declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component
}
