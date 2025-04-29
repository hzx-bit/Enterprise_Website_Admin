<template>
    <div>
        <el-page-header icon="" title="产品管理" content="添加产品"></el-page-header>
        <el-form
            style="margin-top: 30px;"
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
                    添加产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload.vue'
import {useRouter} from 'vue-router'
const productFormRef = ref(null);
const productForm = reactive({
    title:"",
    introduction:"",
    detail:"",
    cover:"",
    file:null
});
const productFormRules = reactive({
    title:[
        { required: true, message: '请输入产品名字', trigger: 'blur' },
    ],
    introduction:[
        { required: true, message: '请输入简要描述', trigger: 'blur' },
    ],
    detail:[
        { required: true, message: '请输入详细描述', trigger: 'blur' },
    ],
    cover:[
        { required: true, message: '请上传产品图片', trigger: 'blur' },
    ],
})
const handleCoverChange = (file) => {
  productForm.cover = URL.createObjectURL(file)
  productForm.file = file
}
const router = useRouter();
const submitForm = async()=>{
    productFormRef.value.validate(async(value)=>{
        if(value){
            try {
                const res =await upload('/adminapi/product/add',productForm);
                if(res.data.ActionType==='ok'){
                    ElMessage.success("添加成功");
                }
                router.push('/product-manage/productlist');
            } catch (error) {
                ElMessage.error(error.message);
            }
        }
    })
}
</script>

<style scoped lang="scss">
</style>