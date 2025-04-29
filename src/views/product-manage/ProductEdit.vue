<template>
    <div>
        <el-page-header icon="" title="产品管理" content="编辑产品"></el-page-header>
        <el-card>
            <el-form
                ref="productFormRef"
                :model="productForm"
                :rules="productFormRules"
                label-width="auto"
                status-icon
            >
                <el-form-item label="产品名称" prop="title">
                    <el-input v-model="productForm.title" />
                </el-form-item>
                <el-form-item label="产品简要描述" prop="introduction">
                    <el-input v-model="productForm.introduction" type="textarea" />
                </el-form-item>
                <el-form-item label="产品详细描述" prop="detail">
                    <el-input v-model="productForm.detail" type="textarea" />
                </el-form-item>
                <el-form-item label="产品图片" prop="cover">
                    <Upload 
                    :avatar="productForm.cover" 
                    @handleAvatarChange="handleCoverChange"
                    />
                </el-form-item>           
                <el-form-item>
                    <el-button
                        @click="submitForm()"
                        type="primary"
                        style="margin: auto;">
                        修改产品</el-button>
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
    const res =await axios.get(`/adminapi/product/list/${route.params.id}`);
    productForm.value = res.data.data[0];
})
const router = useRouter();
const productFormRef = ref(null);
const productForm = ref({});
const productFormRules = reactive({
    title:[
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    introduction:[
        { required: true, message: '请输入简要描述', trigger: 'blur' },
    ],
    detail:[
        { required: true, message: '请选择详细描述', trigger: 'blur' },
    ],
    cover:[
        { required: true, message: '请上传产品图片', trigger: 'blur' },
    ],
})

const handleBack = ()=>{
    router.back();
}
const submitForm = async()=>{
    productFormRef.value.validate(async(value)=>{
        if(value){
            try {
                const res = await upload(`/adminapi/product/list`,productForm.value);
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

const handleCoverChange= (file) => {
  productForm.value.cover = URL.createObjectURL(file)
  productForm.value.file = file
}

</script>

<style scoped>
.el-card{
    margin-top:50px;
}
</style>