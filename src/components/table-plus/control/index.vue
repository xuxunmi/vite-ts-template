<template>
    <el-select
        v-if="editType === 'select'"
        v-bind="$attrs"
        v-model="value"
        :placeholder="placeholder || '请选择'"
        @input="handleInput"
    >
        <el-option
            v-for="item in options"
            :key="item[optionValue]"
            :label="item[optionLabel]"
            :value="item[optionValue]"
        />
    </el-select>
    <el-switch v-else-if="editType === 'switch'" v-bind="$attrs" v-model="value" @input="handleInput" />
    <el-input-number
        v-else-if="editType === 'inputNumber'"
        v-bind="$attrs"
        v-model="value"
        :placeholder="placeholder || '请输入'"
        @input="handleInput"
    />
    <el-date-picker
        v-else-if="editType === 'datePicker'"
        v-bind="$attrs"
        v-model="value"
        :placeholder="placeholder || '请选择日期'"
        @input="handleInput"
    />
    <el-input
        v-else
        :type="editType"
        v-bind="$attrs"
        v-model="value"
        :placeholder="placeholder || '请输入'"
        @input="handleInput"
    />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ControlSelectEditPropsInterface } from '@/interface/tablePlus'

defineOptions({
    inheritAttrs: false,
    name: 'TablePlusControl'
})

const props = defineProps({
    /**
     * editable类型, select | switch | inputNumber | datePicker  | input
     */
    editType: {
        type: String,
        default: 'input'
    },
    /**
     * 下拉框可选项
     */
    options: {
        type: Array as () => ControlSelectEditPropsInterface[],
        default: () => []
    },
    /**
     * 可选项 label 属性名
     */
    optionLabel: {
        type: String,
        default: 'label'
    },
    /**
     * 可选项 value 属性名
     */
    optionValue: {
        type: String,
        default: 'value'
    },
    /**
     * 输入框占位文本
     */
    placeholder: {
        default: ''
    },
    /**
     * 父组件传过来的值
     */
    modelValue: {
        required: true
    }
})

const attrs = useAttrs()
// console.log('attrs:', attrs)

const emits = defineEmits(['update:modelValue'])

const value: any = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emits('update:modelValue', value)
    }
})

/* 处理输入 */
const handleInput = (val: any) => {
    // console.log('val更新值: ', val)
    emits('update:modelValue', val)
}
</script>

<style lang="less" scoped></style>
