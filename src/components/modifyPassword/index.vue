<template>
    <div class="modify-password-page" v-loading="loading">
        <el-form
            ref="passwordFormRef"
            :model="passwordForm"
            :rules="rules"
            :hide-required-asterisk="true"
            label-width="82px"
            label-position="left"
            autocomplete="off"
            size="small"
        >
            <el-form-item label="原密码：" prop="oldPassword">
                <el-input
                    style="width: 100%"
                    type="password"
                    autocomplete="new-password"
                    v-model.trim="passwordForm.oldPassword"
                    placeholder="请输入原密码"
                />
            </el-form-item>
            <el-form-item label="新密码：" prop="newPassword">
                <el-input
                    style="width: 100%"
                    type="password"
                    v-model.trim="passwordForm.newPassword"
                    autocomplete="new-password"
                    show-password
                    placeholder="请输入新密码"
                />
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPassword">
                <el-input
                    style="width: 100%"
                    type="password"
                    v-model.trim="passwordForm.checkPassword"
                    autocomplete="new-password"
                    show-password
                    placeholder="请再次输入新密码"
                />
            </el-form-item>
        </el-form>
        <div class="mt-6 text-center">
            <el-button size="small" @click="emits('update:visible')">取消</el-button>
            <el-button size="small" type="primary" @click="handleConfirm(passwordFormRef)">确认</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

defineOptions({
    name: 'ModifyPassword'
})

interface Props {
    visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
    visible: false
})

// 定义路由
const router = useRouter()
const emits = defineEmits(['update:visible', 'confirmSuccess'])

const loading = ref(false)

interface passwordFromInterface {
    oldPassword: string
    newPassword: string
    checkPassword: string
}
const passwordFormRef = ref<FormInstance>()
const passwordForm: { [key: string]: any } = reactive<passwordFromInterface>({
    oldPassword: '', // 原密码
    newPassword: '', // 新密码
    checkPassword: '' // 确认密码
})

const oldPassword = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('原密码不能为空'))
    } else {
        callback()
    }
}
const validateNewPassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入新密码'))
    } else {
        if (passwordForm.checkPassword !== '') {
            if (!passwordFormRef.value) return
            passwordFormRef.value.validateField('checkPassword', () => null)
        }
        callback()
    }
}
const validateCheckPassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入新密码'))
    } else if (value !== passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    oldPassword: [{ validator: oldPassword, required: true, trigger: 'blur' }],
    newPassword: [
        { validator: validateNewPassword, required: true, trigger: 'blur' },
        {
            pattern:
                /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/,
            message: '新密码必须为英文大小写、数字、特殊字符至少3种组合而成且长度不低于8位',
            trigger: 'blur'
        }
    ],
    checkPassword: [{ validator: validateCheckPassword, required: true, trigger: 'blur' }]
})

const handleConfirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async valid => {
        if (valid) {
            loading.value = true
            try {
                // const params = {
                //     parentId: props.parentId,
                //     pid: props.pid,
                //     name: basedTemplateCreateScheduleForm.name,
                //     description: basedTemplateCreateScheduleForm.description,
                //     templateId: basedTemplateCreateScheduleForm.template,
                //     planStartTime: basedTemplateCreateScheduleForm.startTime
                // }
                // const { data } = (await basedTemplateCreateScheduleSave(params)) as { data: any }
                // ElMessage({
                //     type: "success",
                //     message: data,
                //     center: true
                // })
                // router.push({ path: "/login" })
            } catch (error: any) {
                loading.value = false
                ElMessage({
                    type: 'error',
                    message: error.msg,
                    center: true
                })
            }
        }
    })
}
</script>

<style lang="scss" scoped></style>
