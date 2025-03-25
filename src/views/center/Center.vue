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
                            <el-upload
                                class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false"
                                :on-change="handleAvatarChange"
                                :auto-upload="false"
                            >
                                <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon"><i-ep-Plus /></el-icon>
                            </el-upload>
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
import { reactive, ref } from "vue";
import useUserInfoStore from "../../stores/useUserInfoStore";
import axios from "axios";
const userInfoStore = useUserInfoStore();
const avatarUrl = computed(()=>userInfoStore.userInfo.avatar? userInfoStore.userInfo.avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
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

const handleAvatarChange= (uploadFile) => {
  userForm.avatar = URL.createObjectURL(uploadFile.raw)
  userForm.file = uploadFile.raw
}

const beforeAvatarUpload= (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const submitForm = async()=>{
    userFormRef.value.validate(async(value)=>{
        if(value){
            const params = new FormData();
            for(let i in userForm){
                params.append(i,userForm[i]);
            }
            console.log(params)
            const res =await axios.post('/adminapi/user/upload',params,{
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                });
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>