<template>
    <div>
        <el-page-header icon="" title="用户管理" content="添加用户"></el-page-header>
        <el-form
            style="margin-top: 30px;"
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="auto"
            status-icon
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" type="password"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input
                    v-model="userForm.checkPass"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select
                v-model="userForm.role"
                placeholder="角色"
                style="max-width: 200px;"
                >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
                </el-select>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
                <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <Upload 
                :avatar="userForm.avatar" 
                @handleAvatarChange="handleAvatarChange"
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    @click="submitForm()"
                    type="primary"
                    style="margin: auto;">
                    添加用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload.vue'
import {useRouter} from 'vue-router'
const userFormRef = ref(null);
const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请确认密码'))
    } else if (value !== userForm.password) {
        callback(new Error('两次密码输入不同!'))
    } else {
        callback()
    }
}
const userForm = reactive({
    username:"",
    password:"",
    checkPass:"",
    role:2,
    introduction:"",
    avatar:"",
    gender:0,
    file:null
});
const userFormRules = reactive({
    username:[
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    password:[
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    checkPass:[
        { required: true,validator: validatePass, trigger: 'blur' },
    ],
    role:[
        { required: true, message:'请选择权限', trigger: 'blur' },
    ],
    introduction:[
        { required: true, message: '请完善简介', trigger: 'blur' },
    ],
    avatar:[
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
})
const options = [
  {
    value: 1,
    label: '管理员',
  },
  {
    value: 2,
    label: '编辑',
  },
]
const handleAvatarChange= (file) => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}
const router = useRouter();
const submitForm = async()=>{
    userFormRef.value.validate(async(value)=>{
        if(value){
            try {
                const res =await upload('/adminapi/user/add',userForm);
                if(res.data.ActionType==='ok'){
                    ElMessage.success("添加成功");
                }
                router.push('/user-manage/userlist');
            } catch (error) {
                ElMessage.error(error.message);
            }
        }
    })
}
</script>

<style scoped lang="scss">
</style>