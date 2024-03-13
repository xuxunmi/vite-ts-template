<template>
    <el-form-item
        v-for="(item, index) in formItems"
        :key="index"
        :label="item.label + '：'"
        :prop="item.field"
        :rules="item.rules"
    >
        <template v-if="item.type === 'select'">
            <el-select v-model="formData[item.field]" :placeholder="item.placeholder || '请选择'" clearable filterable>
                <el-option v-for="option in item.options" :key="option.id" :label="option.name" :value="option.id" />
            </el-select>
        </template>
        <template v-else-if="item.type === 'input' || item.type === 'password'">
            <el-input
                v-model="formData[item.field]"
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder || '请输入'"
            />
        </template>
        <template v-else-if="item.type === 'textarea'">
            <el-input
                v-model="formData[item.field]"
                :type="item.type"
                :autosize="{ minRows: 2 }"
                :placeholder="item.placeholder || '请输入'"
            />
        </template>
        <template v-else-if="item.type === 'daterange'">
            <el-date-picker
                v-model="formData[item.field]"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :placeholder="item.placeholder"
                value-format="YYYY-MM-DD"
            />
        </template>
    </el-form-item>
</template>

<script setup lang="ts">
/**
 * 父组件使用：
 *      <el-form
 *            ref="partFormRef"
 *            :model="partForm"
 *            :rules="rules"
 *            size="small"
 *            label-width="106px"
 *            label-position="right"
 *        >
 *            <el-form-item label="类型：" prop="partType">
 *                <el-select
 *                    style="width: 100%"
 *                    v-model="partForm.partType"
 *                    placeholder="请选择"
 *                    clearable
 *                    :disabled="dialogType === 'edit'"
 *                >
 *                    <el-option v-for="item in partTypeList" :key="item.id" :label="item.name" :value="item.id" />
 *                </el-select>
 *            </el-form-item>
 *            <pt-collapse id="explainList" title="部件属性">
 *                <dynamicFormItem v-model:modelValue="partForm" :formItems="dynamicsFormItemConfig" />
 *            </pt-collapse>
 *        </el-form>
 *
 *        // 表单对象
 *        const partForm = reactive({}) 
 *      // 动态表单配置项
 *      const dynamicsFormItemConfig: any[] = [
 *        {
 *            type: "input",
 *            field: "code",
 *            label: "编号",
 *            rules: [{ required: true, message: "必填项不能为空！", trigger: "blur" }]
 *        },
 *        {
 *            type: "input",
 *            field: "name",
 *            label: "名称",
 *            rules: [{ required: true, message: "必填项不能为空！", trigger: "blur" }]
 *        },
 *        {
 *            type: "select",
 *            field: "assembleType",
 *            label: "装配模式",
 *            options: assembleTypeList.value,
 *            rules: [{ required: true, message: "必填项不能为空！", trigger: "change" }]
 *        },
 *        {
 *            type: "select",
 *            field: "source",
 *            label: "源",
 *            options: sourceList.value,
 *            rules: [{ required: true, message: "必填项不能为空！", trigger: "change" }]
 *        },
 *        {
 *            type: "select",
 *            field: "view",
 *            label: "视图",
 *            options: viewList.value
 *        },
 *        {
 *            type: "select",
 *            field: "defaultTrackCode",
 *            label: "默认追踪代码",
 *            options: defaultTrackCodeList.value,
 *            rules: [{ required: true, message: "必填项不能为空！", trigger: "change" }]
 *        },
 *        {
 *            type: "select",
 *            field: "defaultUom",
 *            label: "默认单位",
 *            options: defaultUomList.value,
 *            rules: [{ required: true, message: "必填项不能为空！", trigger: "change" }]
 *        }
 *      ]
 *
 * 子组件使用：
 *    <div class="mt-6 text-center">
          <el-button size="small" @click="emits('update:visible')">取消</el-button>
 *        <el-button size="small" type="primary" @click="handleConfirm">确认</el-button>
      </div>
 *    
 *    const props = withDefaults(defineProps<Props>(), {
 *        visible: false
 *    })
 *    const emits = defineEmits(["update:visible"])
 */

import { FormItem } from './types'

defineOptions({
    name: 'dynamicFormItem'
})

const props = defineProps({
    // 双向绑定
    modelValue: {
        type: Object,
        required: true
    },
    // form-item配置项
    formItems: {
        type: Array as PropType<FormItem[]>,
        default: () => []
    }
})

const emits = defineEmits(['update:modelValue'])

const formData = ref({ ...props.modelValue })

watch(
    () => props.modelValue,
    value => {
        formData.value = value
    },
    {
        immediate: true,
        deep: true
    }
)

watch(
    () => formData.value,
    newValue => {
        emits('update:modelValue', newValue)
    },
    {
        immediate: true,
        deep: true
    }
)
</script>

<style lang="less" scoped></style>
