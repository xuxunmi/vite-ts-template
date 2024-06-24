<template>
    <el-dialog
        :append-to-body="true"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
        v-model="dialogVisible"
        :title="title"
        :width="width"
        :fullscreen="fullscreen"
        center
        align-center
        @close="closeDialog"
    >
        <slot />
        <template v-if="footer" #footer>
            <span class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
/**
 * 父组件使用：
 *    <dialogFrame :title="'对话框标题'" v-model:visible="dialogVisible" :footer="false">
 *        <!-- 子组件使用 -->
 *        <component v-if="dialogVisible.dialog" v-model:visible="dialogVisible.dialog" />
 *    </dialogFrame>
 *    // 显示不同的弹窗
 *    const dialogVisible: { [key: string]: boolean } = reactive({
 *        dialog: false, // 新增/编辑对话框 
 *    })
 
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

import { ref, watch } from 'vue'

defineOptions({
    name: 'dialogFrame'
})

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '标题'
    },
    width: {
        type: String,
        default: '30%'
    },
    footer: {
        type: Boolean,
        default: true
    },
    // 是否显示关闭按钮
    showClose: {
        type: Boolean,
        default: true
    },
    // 是否可拖拽
    draggable: {
        type: Boolean,
        default: true
    },
    // 是否为全屏 Dialog
    fullscreen: {
        type: Boolean,
        default: false
    }
})

const dialogVisible = ref<boolean>(props.visible)

const emits = defineEmits(['update:visible', 'close'])

// 关闭对话框
const closeDialog = () => {
    dialogVisible.value = false
    emits('close')
}

watch(
    () => props.visible,
    (val: boolean) => {
        dialogVisible.value = val
    }
)

watch(
    () => dialogVisible.value,
    (val: boolean) => {
        emits('update:visible', val)
    }
)
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
