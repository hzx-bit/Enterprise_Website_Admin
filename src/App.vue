<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
*{
  margin:0;
  padding:0;
}
::-webkit-scrollbar{
  width:3px;
  position:absolute;
}
::-webkit-scrollbar-thumb{
  background: skyblue;
}
::-webkit-scrollbar-track{
  background-color: #ddd;
}
</style>
