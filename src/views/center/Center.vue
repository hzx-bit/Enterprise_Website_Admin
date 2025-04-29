<template>
    <div>
        <el-page-header icon="" title="企业门户管理系统" content="个人中心"></el-page-header>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card>
                    <el-avatar
                    :size="100"
                    :src="avatarUrl"
                    />
                    <h3>{{ userInfoStore.userInfo.username }}</h3>
                    <h3>{{ userInfoStore.userInfo.role===1? '管理员':'编辑' }}</h3>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card header="个人信息">
                    <el-form
                        ref="userFormRef"
                        style="max-width: 600px"
                        :model="userForm"
                        :rules="userFormRules"
                        label-width="auto"
                        status-icon
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select
                            v-model="userForm.gender"
                            placeholder="性别"
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
                                更新</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>  
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import useUserInfoStore from "@/stores/useUserInfoStore";
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload.vue'
const userInfoStore = useUserInfoStore();
const avatarUrl = computed(()=>
userInfoStore.userInfo.avatar? 
userInfoStore.userInfo.avatar:
'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
const userFormRef = ref(null);
const {username,gender,introduction,avatar} = userInfoStore.userInfo;

const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file:null
});
const userFormRules = reactive({
    username:[
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    gender:[
        { required: true, message: '请选择性别', trigger: 'blur' },
    ],
    introduction:[
        { required: true, message: '请完善简介', trigger: 'blur' },
    ],
    avatar:[
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
})
const handleAvatarChange= (file) => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}
const options = [
  {
    value: 0,
    label: '未知',
  },
  {
    value: 1,
    label: '男',
  },
  {
    value: 2,
    label: '女',
  },
]
const submitForm = async()=>{
    userFormRef.value.validate(async(value)=>{
        if(value){
            try {
                const res =await upload('/adminapi/user/upload',userForm);
                if(res.data.ActionType==='ok'){
                    userInfoStore.changeUserInfo(res.data.data);
                    ElMessage.success("更新成功");
                }
            } catch (error) {
                ElMessage.error(error.message);
            }
        }
    })
}
</script>

<style scoped lang="scss">
.el-row{
    margin:20px;
    .el-card{
        text-align: center;
    }
}
</style>