// 表单中的组件类型
export type ItemFormType = "input" | "password" | "textarea" | "select" | "cascader" | "daterange" | "date"

// 下拉选项配置
export type ItemOptions = {
    id: string | number
    name: string
}

// 表单所需要的数据类型
// type：表单中组件的类型（通过type进行匹配：比如：input 是一个输入框，password则是密码框）
// field：双向绑定关键字
// label  标签名称
// rules 验证规则
// placeholder 提醒文字
// options  数据（比如select ）
// 表单的配置
export interface FormItem {
    type: ItemFormType
    field: string
    label: string
    rules?: any[]
    placeholder: string
    options?: ItemOptions[]
}
