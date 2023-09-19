<template>
    <el-select
        v-if="type === 'select'"
        v-bind="$attrs"
        :value="value"
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
    <el-switch v-else-if="type === 'switch'" v-bind="$attrs" :value="value" :size="size" @input="handleInput" />
    <el-input-number
        v-else-if="type === 'inputNumber'"
        v-bind="$attrs"
        :value="value"
        :placeholder="$attrs.placeholder || '请输入'"
        :size="size"
        @input="handleInput"
    />
    <el-date-picker
        v-else-if="type === 'datePicker'"
        v-bind="$attrs"
        :value="value"
        :placeholder="$attrs.placeholder || '请选择日期'"
        :value-format="$attrs.valueFormat"
        :type="$attrs.pickerType"
        :size="size"
        @input="handleInput"
    />
    <el-input
        v-else
        v-bind="$attrs"
        :value="value"
        :type="type"
        :placeholder="$attrs.placeholder || '请输入'"
        :size="size"
        @input="handleInput"
    />
</template>

<script lang="ts">
export default {
    inheritAttrs: false,
    name: 'TablePlusControl'
}
</script>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
import { ControlSelectEditPropsInterface } from '@/interface/tablePlus'

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
    value: {
        required: true
    },
    onChange: {
        type: Function
    }
})

const attrs = useAttrs()
console.log('attrs:', attrs)

const emits = defineEmits(['input'])

const size = computed(() => {
    return attrs.size ?? 'small'
})

// 当前搜索文字
const searchText = ref<string>('')
// 当前选中的列
const filteredColumns = ref<string[]>([])

/* 处理输入 */
const handleInput = val => {
    emits('input', val)
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
