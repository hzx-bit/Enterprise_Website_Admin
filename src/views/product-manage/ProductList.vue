<template>
    <div>
        <el-card>
            <el-page-header icon="" title="产品管理" content="产品列表"></el-page-header>
            <el-table :data="productData" style="width: 100%">
                <el-table-column 
                label="产品名称" 
                width="180" 
                prop="title">
                </el-table-column>
                <el-table-column 
                label="简要描述" 
                width="180" 
                prop="introduction">
                </el-table-column>
                <el-table-column label="更新时间">
                    <template #default="scope">
                        {{ dayjs(scope.row.editTime).format('YYYY/MM/DD') }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button 
                        circle
                        :icon="Edit" 
                        @click="handleEdit(scope.row)">
                        </el-button>
                        <el-popconfirm 
                            title="你确定要删除吗?"
                            placement="left"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            @confirm="handleDelete(scope.$index,scope.row)"
                            >
                            <template #reference>
                                <el-button 
                                    circle
                                    :icon="Delete"
                                    type="danger" 
                                    >
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>                
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import { dayjs } from 'element-plus'
import axios from 'axios'
import { onMounted } from 'vue'
import {Edit,Delete} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter();
onMounted(()=>{
    getTableData();
})
const productData = ref([]);
const getTableData = async()=>{
    const res = await axios.get('/adminapi/product/list');
    productData.value = res.data.data
}
const handleDelete = async(index,product)=>{
    try {
        await axios.delete(`/adminapi/product/list/${product._id}`);
        productData.value.splice(index,1);
        ElMessage.success("删除成功!");
    } catch (error) {
        ElMessage.error(error.message);
    }
}
const handleEdit=(product)=>{
    router.push(`/product-manage/editproduct/${product._id}`);
}
</script>

<style lang="scss" scoped>
.el-table{
    margin-top: 30px;
}

</style>