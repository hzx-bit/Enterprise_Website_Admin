<template>
    <el-container>
      <el-header><h2>mainBox</h2></el-header>
      <el-container>
        <el-aside width="200px"><el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <span>Navigator One</span>
            </template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>Navigator Two</span>
            </template>
              <el-menu-item index="2-1">item one</el-menu-item>
              <el-menu-item index="2-2">item two</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
        <el-main><RouterView/></el-main>
      </el-container>
    </el-container>
    
  </template>

<script setup>
import {RouterLink,RouterView} from 'vue-router'

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style scoped>

</style>