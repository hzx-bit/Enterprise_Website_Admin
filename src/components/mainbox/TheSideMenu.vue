<template>
<el-aside width="auto" class="asider">
    <el-menu
        :default-active="route.fullPath"
        :collapse="stateStore.isCollapsed"
        :collapse-transition="false"
        :router="true"
        >
        <el-menu-item index="/index">
            <el-icon><i-ep-HomeFilled /></el-icon>
            <template #title>
                <span>首页</span>
            </template>
        </el-menu-item>
        <el-menu-item index="/center">
            <el-icon><i-ep-Avatar /></el-icon>
            <template #title>
                <span>个人中心</span>
            </template>
        </el-menu-item>
        
        <el-sub-menu index="/user-manage" v-admin>
        <template #title>
            <el-icon><i-ep-UserFilled /></el-icon>
            <span>用户管理</span>
        </template>
            <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
            <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/product-manage">
        <template #title>
            <el-icon><i-ep-Reading /></el-icon>
            <span>产品管理</span>
        </template>
            <el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>
            <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/news-manage">
        <template #title>
            <el-icon><i-ep-MessageBox /></el-icon>
            <span>新闻管理</span>
        </template>
            <el-menu-item index="/news-manage/newsadd">添加新闻</el-menu-item>
            <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
        </el-sub-menu>
    </el-menu>       
</el-aside>
</template>

<script setup>
import useStateStore from "@/stores/useStateStore"
import { useRoute } from "vue-router";
import useUserInfoStore from "../../stores/useUserInfoStore";
const route = useRoute();
const stateStore = useStateStore();
const userInfoStore = useUserInfoStore();
const vAdmin = {
    mounted(el){
        if(userInfoStore.userInfo.role!==1){
            el.parentNode.removeChild(el);
        }
    }
}
</script>

<style lang="scss" scoped>
.el-aside{
    height: 90vh;
    .el-menu{
        height: 90vh;
    }
}
</style>