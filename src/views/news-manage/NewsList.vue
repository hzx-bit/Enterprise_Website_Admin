<template>
    <div>
        <el-card>
            <el-page-header icon="" title="新闻管理" content="新闻列表"></el-page-header>
            <el-table :data="newsData" style="width: 100%">
                <el-table-column 
                label="标题" 
                width="180" 
                prop="title">
                </el-table-column>
                <el-table-column label="分类">
                    <template #default="scope">
                        {{ categoryFormat[scope.row.category] }}
                    </template>
                </el-table-column>
                <el-table-column label="更新时间">
                    <template #default="scope">
                        {{ dayjs(scope.row.editTime).format('YYYY/MM/DD') }}
                    </template>
                </el-table-column>
                <el-table-column label="是否发布">
                    <template #default="scope">
                        <el-switch 
                        v-model="scope.row.isPublish" 
                        :active-value="1"
                        :inactive-value="0"
                        @change="handleSwitchChange(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button 
                        circle
                        :icon="Star"
                        type="success" 
                        @click="handlePreview(scope.row)">
                        </el-button>
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
        <el-dialog
        v-model="dialogVisiable"
        title="预览新闻"
        width="60%"
        >
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size:12px; color:gray;margin-top:10px">{{ dayjs(previewData.editTime).format('YYYY/MM/DD') }}</div>
                <el-divider>
                    <el-icon><i-ep-star-filled /></el-icon>
                </el-divider>
                <div v-html="previewData.content" class="htmlcontent"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { dayjs } from 'element-plus'
import axios from 'axios'
import { onMounted } from 'vue'
import {Star,Edit,Delete} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter();
onMounted(()=>{
    getTableData();
})
const newsData = ref([]);
const previewData = ref({});
const dialogVisiable = ref(false);
const categoryFormat = ['最新动态','典型案例','通知公告'];
const getTableData = async()=>{
    const res = await axios.get('/adminapi/news/list');
    newsData.value = res.data.data
}
const handleSwitchChange = async(news)=>{
    const res = await axios.put(`/adminapi/news/publish`,{
        _id:news._id,
        isPublish:news.isPublish
    })
    await getTableData();
}
const handlePreview = (news)=>{
    previewData.value = news;
    dialogVisiable.value=true;
}

const handleDelete = async(index,news)=>{
    try {
        await axios.delete(`/adminapi/news/list/${news._id}`);
        newsData.value.splice(index,1);
        ElMessage.success("删除成功!");
    } catch (error) {
        ElMessage.error(error.message);
    }
}
const handleEdit=(news)=>{
    router.push(`/news-manage/editnews/${news._id}`);
}
</script>

<style lang="scss" scoped>
.el-table{
    margin-top: 30px;
}
:deep(.htmlcontent) img{
        max-width: 100%;
    }

</style>