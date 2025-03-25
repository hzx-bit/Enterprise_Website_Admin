<template>
    <el-header>
        <div class="left">
            <el-icon @click="handleCollapsed()"><i-ep-Menu /></el-icon>
            <span style="margin-left: 5px;">企业门户管理系统</span>
        </div>
        <div class="right">
            <span style="margin-right: 5px;">欢迎 {{ userInfoStore.userInfo.username }} 回来</span>
            <el-dropdown>
                <el-icon :size="30" color="white"><i-ep-User /></el-icon>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleCenter()">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout()">退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup>
import useStateStore from '@/stores/useStateStore'
import { useRouter } from 'vue-router';
import useUserInfoStore from '@/stores/useUserInfoStore';
const router = useRouter();
const stateStore = useStateStore();
const userInfoStore = useUserInfoStore();
const handleCollapsed = ()=>{
    stateStore.changeCollapsed();
}
const handleCenter = ()=>{
    router.push('/center');
}
const handleLogout = ()=>{
    userInfoStore.clearUserInfo();
    router.push('/login');
}
</script>

<style lang="scss" scoped>
.el-header{
    height: 10vh;
    line-height: 10vh;
    background-color:#2d3a4b;
    color:white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.left,.right{
    display: flex;

}
.left{
    i{
        margin:auto;
        cursor: pointer;
    }
}
.right{
    .el-dropdown{
        margin:auto;
    }
}

</style>