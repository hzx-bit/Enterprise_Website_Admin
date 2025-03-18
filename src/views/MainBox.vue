<template>
    <el-container direction="vertical">
      <TheHeader></TheHeader>
      <el-container direction="horizontal">
        <TheSideMenu></TheSideMenu>
        <el-main><RouterView/></el-main>
      </el-container>
    </el-container>
    
  </template>

<script setup>
import {RouterLink,RouterView} from 'vue-router';
import TheHeader from '@/components/mainbox/TheHeader.vue';
import TheSideMenu from '@/components/mainbox/TheSideMenu.vue'
</script>

<style scoped>
.el-container{
  height: 90vh;
}
</style>