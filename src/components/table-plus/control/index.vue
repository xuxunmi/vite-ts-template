<template>
    <el-select
        v-if="type === 'select'"
        v-bind="$attrs"
        :model-value="modelValue"
        :placeholder="$attrs.placeholder || '请选择'"
        :size="size"
        @input="handleInput"
    >
        <el-option
            v-for="item in options"
            :key="item[optionValue]"
            :label="item[optionLabel]"
            :value="item[optionValue]"
        />
    </el-select>
    <el-switch
        v-else-if="type === 'switch'"
        v-bind="$attrs"
        :model-value="modelValue"
        :size="size"
        @input="handleInput"
    />
    <el-input-number
        v-else-if="type === 'inputNumber'"
        v-bind="$attrs"
        :model-value="modelValue"
        :placeholder="$attrs.placeholder || '请输入'"
        :size="size"
        @input="handleInput"
    />
    <el-date-picker
        v-else-if="type === 'datePicker'"
        v-bind="$attrs"
        :model-value="modelValue"
        :placeholder="$attrs.placeholder || '请选择日期'"
        :value-format="$attrs.valueFormat"
        :type="$attrs.pickerType"
        :size="size"
        @input="handleInput"
    />
    <el-input
        v-else
        v-bind="$attrs"
        :model-value="modelValue"
        :type="type"
        :placeholder="$attrs.placeholder || '请输入'"
        :size="size"
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
    type: {
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
     * v-model语法糖值
     */
    modelValue: {
        required: true,
        default: ''
    }
})

const attrs = useAttrs()

const emits = defineEmits(['update:modelValue'])

const size = computed(() => {
    return attrs.size ?? 'small'
})

/* 处理输入 */
const handleInput = (val: any) => {
    emits('update:modelValue', val)
}
</script>

<style lang="less" scoped>
// :deep(.el-input__inner) {
//     padding: 1px 4px;
// }
// :deep(.el-textarea__inner) {
//     padding: 1px 4px;
// }
</style>
