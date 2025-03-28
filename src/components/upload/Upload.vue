<template>
    <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-change="handleChange"
        :auto-upload="false"
    >
        <img v-if="props.avatar" :src="props.avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><i-ep-Plus /></el-icon>
    </el-upload>
</template>

<script setup>

const emit = defineEmits(['handleAvatarChange'])
const props = defineProps({
    avatar:String,
    uploadAvatar:String
})
const handleChange = (uploadFile)=>{
    emit('handleAvatarChange',uploadFile.raw);
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>