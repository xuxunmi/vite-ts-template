<template>
    <div class="tableWrapper" v-loading="loading">
        <el-table
            :data="tableData"
            border
            :max-height="tableMaxHeight"
            header-align="center"
            highlight-current-row
            style="width: 100%"
        >
            <el-table-column label="序号" type="index" width="60" align="center" />
            <el-table-column prop="projectNumber" label="项目编号" align="center" show-overflow-tooltip />
            <el-table-column prop="projectName" label="项目名称" align="center" show-overflow-tooltip />
            <el-table-column prop="projectType" label="项目类型" align="center" show-overflow-tooltip>
                <template #default="scope">
                    <div>{{ getProjectTypeName(scope.row.projectType) }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="timeNumber" label="时间表编号" align="center" show-overflow-tooltip />
            <el-table-column prop="timeName" label="时间表名称" align="center" show-overflow-tooltip />
            <el-table-column prop="timeStatus" label="时间表状态" align="center" show-overflow-tooltip>
                <template #default="scope">
                    <div>{{ getTimeStatusName(scope.row.timeStatus) }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="taskName" label="任务名称" align="center" show-overflow-tooltip />
            <el-table-column prop="taskLeader" label="任务负责人" align="center" show-overflow-tooltip />
        </el-table>
    </div>
    <div class="export-wrapper text-center mt-4 p-4" v-if="tableData.length">
        <el-button size="small" type="primary" @click="handleExportStatementBtn">导出报表</el-button>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

defineOptions({
    name: 'ProjectList'
})

const props = defineProps<{
    projectTypeList: []
    scheduleStatusList: []
}>()

const currentDateTime = computed(() => {
    return dayjs(new Date()).format('YYYY-MM-DD')
})

const loading = ref(false)

// 获取项目类型name
const getProjectTypeName = (value: string): string => {
    return props.projectTypeList.find(item => item.id === value)?.name
}

// 获取时间表状态name
const getTimeStatusName = (value: string): string => {
    return props.scheduleStatusList.find(item => item.id === value)?.name
}

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los AngelesNo. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    }
]

// 处理导出报表按钮
const handleExportStatementBtn = async () => {
    try {
        loading.value = true
        // const params = {}
        // const res = await downloadReportProject(params)
        // const link = document.createElement('a')
        // link.href = URL.createObjectURL(res as Blob)
        // link.download = `项目报表_${currentDateTime.value}`
        // document.body.appendChild(link)
        // link.click()
        // window.setTimeout(function () {
        //     document.body.removeChild(link)
        //     URL.revokeObjectURL(link.href)
        // }, 0)
        loading.value = false
    } catch (error: any) {
        loading.value = false
        console.error(error)
    }
}

const tableMaxHeight = ref(0)
// 设置表格最大高度
const setTableMaxHeight = () => {
    const bodyH = document.body.clientHeight || 0
    const fixedHeader = document.querySelector('.fixed-header')?.clientHeight || 0
    const searchContainer = document.querySelector('.search-container')?.clientHeight || 0
    const exportWrapper = 70
    const otherHeight = 90
    tableMaxHeight.value = bodyH - fixedHeader - searchContainer - exportWrapper - otherHeight
}

onMounted(() => {
    setTableMaxHeight()
})
</script>

<style lang="scss" scoped></style>
