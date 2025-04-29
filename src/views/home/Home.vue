<template>
    <div>
        <el-page-header icon="" title="企业门户管理系统" content="首页">
        </el-page-header>
        <el-card>
            <el-row>
                <el-col :span="4">
                    <el-avatar
                    :size="100"
                    :src="avatarUrl"
                    />
                </el-col>
                <el-col :span="20"><h3 style="line-height: 100px;">欢迎 {{ userInfoStore.userInfo.username }} 回来,{{ welcomeText }}</h3></el-col>
            </el-row>
        </el-card>
        <el-card v-if="loopList.length!==0">
            <template #header>
                <span>公司产品</span>
            </template>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in loopList" :key="item._id">
                    <div :style="{
                        backgroundImage: `url(${item.cover})`,
                        backgroundSize:'cover'
                    }">
                        <h3 text="2xl" justify="center">{{ item.title }}</h3>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script setup>
import axios from 'axios'
import {computed,onMounted,ref} from 'vue'
import useUserInfoStore from '../../stores/useUserInfoStore'
const userInfoStore = useUserInfoStore();
const avatarUrl = computed(()=>userInfoStore.userInfo.avatar? userInfoStore.userInfo.avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
const welcomeText = computed(()=>new Date().getHours()<12? '早上好！':'下午好！');
onMounted(()=>{
    getData();
})
const loopList = ref([]);
const getData = async()=>{
    const res = await axios.get('/adminapi/product/list');
    loopList.value = res.data.data;
}
</script>

<style scoped>
.el-card{
    margin-top: 50px;
}
.el-carousel__item h3 {
  color: skyblue;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>