<template>
    <div class="flex justify-between mb-4">
        <el-input
            v-if="showSearchBar"
            class="w-60"
            v-model="searchText"
            placeholder="请输入搜索条件"
            size="small"
            clearable
            @change="handleSearchTextChange"
        />
        <div class="flex flex-1 ml-4">
            <el-button v-if="showAddBtn" class="mr-3" type="primary" size="small" plain @click="emits('row-add')"
                >新增</el-button
            >
            <el-button v-if="showAddChildBtn" class="mr-3" size="small" plain @click="emits('row-add-child')">
                新增子项
            </el-button>
            <el-button v-if="showDisableBtn" class="mr-3" size="small" plain @click="emits('row-disable')"
                >停用</el-button
            >
            <el-button v-if="showRemoveBtn" class="mr-3" type="danger" size="small" plain @click="emits('row-remove')"
                >删除</el-button
            >
            <el-button
                v-for="(item, index) in customBtns"
                class="mr-3"
                :key="index"
                :type="item.type"
                size="small"
                @click="emits('custom-btn-click', item.onClick)"
            >
                {{ item.label }}
            </el-button>
            <el-popover v-if="showFilterBar" trigger="click">
                <template #reference>
                    <el-button size="small">
                        筛选列
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                </template>
                <el-checkbox-group v-model="filteredColumns" @change="handleFilteredColumnsChange">
                    <el-checkbox v-for="column in columns" class="" :label="column.prop" :key="column.prop" checked>
                        {{ column.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-popover>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ToolbarCustomBtnsInterface } from '@/interface/tablePlus'
import type { CheckboxValueType } from 'element-plus'

defineOptions({
    inheritAttrs: false,
    name: 'TablePlusToolbar'
})

const props = defineProps({
    /**
     * 是否显示新增按钮，默认显示
     */
    showAddBtn: {
        type: Boolean,
        default: true
    },
    /**
     * 是否显示新增子项按钮，默认显示
     */
    showAddChildBtn: {
        type: Boolean,
        default: true
    },
    /**
     * 是否显示删除按钮，默认显示
     */
    showRemoveBtn: {
        type: Boolean,
        default: true
    },
    /**
     * 是否显示禁用按钮，默认显示
     */
    showDisableBtn: {
        type: Boolean,
        default: true
    },
    /**
     * 自定义按钮组
     */
    customBtns: {
        type: Array as () => any[],
        default: () => []
    },
    /**
     * 是否显示搜索框，默认显示
     */
    showSearchBar: {
        type: Boolean,
        default: true
    },
    /**
     * 是否显示表格筛选列，默认显示
     */
    showFilterBar: {
        type: Boolean,
        default: true
    },
    /**
     * 筛选列数据列
     */
    columns: {
        type: Array,
        default: () => [] as any[]
    }
})

const emits = defineEmits([
    'row-add',
    'row-add-child',
    'row-disable',
    'row-remove',
    'custom-btn-click',
    'search',
    'filtered-columns-change'
])

// 当前搜索文字
const searchText = ref<string>('')
// 当前选中的列
const filteredColumns = ref<string[]>([])

/* 搜索文字变化 */
const handleSearchTextChange = (val: string) => {
    emits('search', val.trim())
}

/* 筛选列变化 */
const handleFilteredColumnsChange = (value: CheckboxValueType[]) => {
    emits('filtered-columns-change', value)
}
</script>

<style lang="less" scoped>
:deep(.el-button + .el-button) {
    margin-left: initial;
}
</style>
