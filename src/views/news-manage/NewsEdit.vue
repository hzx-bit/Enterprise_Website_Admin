<template>
    <div>
        <el-page-header
        @back="handleBack()" 
        title="新闻管理" 
        content="编辑新闻"></el-page-header>
        <el-card>
            <el-form
                ref="newsFormRef"
                :model="newsForm"
                :rules="newsFormRules"
                label-width="auto"
                status-icon
            >
                <el-form-item label="标题" prop="title">
                    <el-input v-model="newsForm.title" />
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <Editor v-if="newsForm.content" @editNews="editNews" :content="newsForm.content"></Editor>
                </el-form-item>
                <el-form-item label="类别" prop="category">
                    <el-select
                    v-model="newsForm.category"
                    placeholder="请选择类别"
                    style="max-width: 200px;"
                    >
                    <el-option
                        v-for="item in categoryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                </el-form-item>  
                <el-form-item label="封面" prop="cover">
                    <Upload 
                    :avatar="newsForm.cover" 
                    @handleAvatarChange="handleAvatarChange"
                    />
                </el-form-item>              
                <el-form-item>
                    <el-button
                        @click="submitForm()"
                        type="primary"
                        style="margin: auto;">
                        更新新闻</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute,useRouter} from "vue-router";
import Editor from '@/components/editor/Editor.vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload';
import axios from "axios";
import { ElMessage } from "element-plus";
const route = useRoute();
onMounted(async()=>{
    const res =await axios.get(`/adminapi/news/list/${route.params.id}`);
    newsForm.value = res.data.data[0];
})
const router = useRouter();
const newsFormRef = ref(null);
const newsForm = ref({});
const newsFormRules = reactive({
    title:[
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    content:[
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
    category:[
        { required: true, message: '请选择类别', trigger: 'blur' },
    ],
    cover:[
        { required: true, message: '请上传封面', trigger: 'blur' },
    ],
})
const categoryOptions = [
{
    value: 0,
    label: '最新动态',
  },
  {
    value: 1,
    label: '典型案例',
  },
  {
    value: 2,
    label: '通知公告',
  },
]

const handleBack = ()=>{
    router.back();
}
const submitForm = async()=>{
    newsFormRef.value.validate(async(value)=>{
        if(value){
            try {
                const res = await upload(`/adminapi/news/list`,newsForm.value);
                if(res.data.ActionType==='ok'){
                    ElMessage.success('更新成功！');
                    router.back();
                }
            } catch (error) {
                ElMessage.error(error.message);
            }
        }
    })
}
const editNews = (value)=>{
    newsForm.value.content = value;
}

const handleAvatarChange= (file) => {
  newsForm.value.cover = URL.createObjectURL(file)
  newsForm.value.file = file
}

</script>

<style scoped>
.el-card{
    margin-top:50px;
}
</style>