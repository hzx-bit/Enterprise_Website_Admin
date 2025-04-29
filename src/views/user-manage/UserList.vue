<template>
    <div>
        <el-card>
            <el-page-header icon="" title="用户管理" content="用户列表"></el-page-header>
            <el-table :data="userData" style="width: 100%">
                <el-table-column label="用户名">
                    <template #default="scope">
                        <el-popover effect="light" trigger="hover" placement="top" width="auto">
                        <template #default>
                            <div>name: {{ scope.row.username }}</div>
                            <div>introduction: {{ scope.row.introduction }}</div>
                        </template>
                        <template #reference>
                            <el-tag>{{ scope.row.username }}</el-tag>
                        </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="头像">
                    <template #default="scope">
                        <div>
                        <el-avatar 
                            v-if="scope.row.avatar"
                            :size="50"
                            :src="scope.row.avatar"
                        >
                        </el-avatar>
                        <el-avatar
                            v-else
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="角色">
                    <template #default="scope">
                        <div>
                        <el-tag v-if="scope.row.role===1" type="danger">管理员</el-tag>
                        <el-tag v-else type="success">编辑</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                        编辑
                        </el-button>
                        <el-popconfirm 
                        title="你确定要删除该用户?"
                        placement="left"
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        @confirm="handleDelete(scope.$index,scope.row)"
                        >
                            <template #reference>
                                <el-button
                                size="small"
                                type="danger"
                                >
                                删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>                
            </el-table>
        </el-card>
        <el-dialog 
            v-model="dialogFormVisible" 
            title="编辑用户" 
            width="500">
            <el-form
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
            </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm()">
                确认
                </el-button>
            </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
onMounted(()=>{
    getTableData();
})
const userData = ref([])
const dialogFormVisible = ref(false);
const getTableData = async()=>{
    const res = await axios.get('/adminapi/user/list');
    userData.value = res.data.data
}


const userFormRef = ref(null);
const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请确认密码'))
    } else if (value !== userForm.value.password) {
        callback(new Error('两次密码输入不同!'))
    } else {
        callback()
    }
}
const userForm = ref({
    username:"",
    password:"",
    checkPass:"",
    role:2,
    introduction:"",
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
const submitForm = async()=>{
    userFormRef.value.validate(async(value)=>{
        if(value){
            try {
               const res =  await axios.put('/adminapi/user/list',userForm.value);
                if(res.data.ActionType==='ok'){
                    ElMessage.success('更新成功！');
                    getTableData();
                }
            } catch (error) {
                ElMessage.error(error.message);
            }
            dialogFormVisible.value = false;
        }
    })
}
const handleEdit = async(user)=>{
    const res =await axios.get(`/adminapi/user/list/${user._id}`);
    userForm.value = res.data.data[0];
    userForm.value.checkPass = userForm.value.password;
    dialogFormVisible.value=true;
}
const handleDelete = async(index,user)=>{
    try {
        await axios.delete(`/adminapi/user/list/${user._id}`);
        userData.value.splice(index,1);
        ElMessage.success("删除成功!");
    } catch (error) {
        ElMessage.error(error.message);
    }
}
</script>

<style scoped lang="scss">
.el-table{
    margin-top: 30px;
}
</style>