<template>
    <div class="collapse-transition">
        <div class="collapse-transition-head">
            <div class="collapse-transition-head-title">
                <slot name="title">{{ title }}</slot>
            </div>
            <div class="collapse-transition-head-btn">
                <slot name="head-btn"></slot>
                <el-button
                    :icon="isActive ? 'ArrowDown' : 'ArrowRight'"
                    size="small"
                    circle
                    @click="changeActive(!isActive)"
                ></el-button>
            </div>
        </div>
        <el-collapse-transition>
            <div v-show="isActive">
                <el-divider></el-divider>
                <div class="collapse-transition-content">
                    <slot></slot>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script lang="ts" setup>
/**
 *   使用示例：
 *    <div class="component-wrapper" ref="componentRef">
 *        <el-scrollbar>
 *            <div class="point">
 *                <el-button type="success" @click="pointClick('implementPlanList')" link>实施计划</el-button>
 *                <el-divider direction="vertical" />
 *            </div>
 *        </el-scrollbar>
 *        <el-scrollbar height="calc(100vh - 124px)">
 *            <div class="list-wrapper">
 *                <pt-collapse id="implementPlanList" title="实施计划">
 *                    <implementPlanList ref="implementPlanListRef" :tableData="implementPlanTableData" />
 *                </pt-collapse>
 *            </div>
 *        </el-scrollbar>
 *    </div>
 *
 *    // 锚点点击
 *    const pointClick = (name: string) => {
 *        const el = instance.refs.componentRef.querySelector(`#${name}`) as HTMLDivElement
 *        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
 *    }
 *
 *    .plan-wrapper {
 *        .point {
 *            display: flex;
 *            align-items: center;
 *            flex-wrap: nowrap;
 *            padding: 0 12px 6px;
 *            z-index: 10;
 *        }
 *        .list-wrapper {
 *            padding: 6px 12px 12px;
 *        }
 *    }
 *
 */

defineOptions({
    name: 'dialogFrame'
})

//#region 参数和方法
const props = defineProps({
    /**
     * 标题
     * @default ''
     */
    title: {
        type: String,
        default: ''
    },
    /**
     * 展开/隐藏
     * @default true
     */
    active: {
        type: Boolean,
        default: true
    }
})
const emits = defineEmits(['update:active'])
//#endregion

const isActive = ref<boolean>(true)
if (props.active === false) isActive.value = props.active
const changeActive = (val: boolean) => {
    isActive.value = val
}
</script>

<style lang="scss" scoped>
.collapse-transition {
    position: relative;
    padding: 6px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    & + .collapse-transition {
        margin-top: 16px;
    }
    &-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-head-title {
            font-size: 14px;
            font-weight: bold;
        }
        &-head-btn {
            display: flex;
        }
    }
    &-content {
        .descriptions {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            .descriptions-item {
                display: flex;
                gap: 12px;
                align-items: center;
            }
            :deep(.el-button span) {
                font-size: inherit !important;
            }
        }
        .descriptions2 {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .descriptions-item {
                width: 320px;
                height: 28px;
                display: flex;
                gap: 12px;
                align-items: center;
                &.col2 {
                    width: 400px;
                }
                .descriptions-item-text {
                    flex: 1;
                    width: 0;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            :deep(.el-button span) {
                font-size: inherit !important;
            }
        }
    }
    .el-divider--horizontal {
        margin: 10px 0 !important;
    }
}
</style>
