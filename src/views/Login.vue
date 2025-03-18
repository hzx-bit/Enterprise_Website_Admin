<template>
  <div id="bg">
    <div id="login_box">
    <h2>企业门户网站管理系统</h2>
    <div id="input_box">
      <input type="text" placeholder="请输入用户名" v-model.trim="userName">
    </div>
    <div class="input_box">
      <input type="password" placeholder="请输入密码" v-model.trim="password">
    </div>
    <button @click="login()">登录</button><br>
  </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
const userName = ref('');
const password = ref('');
const router = useRouter();
const login = ()=>{
    if(userName.value===''||password.value===''){
        ElMessage.error('请输入正确的账号密码');
        return;
    } 
    localStorage.setItem('token','dsafaewf');
    router.push("/index");
}
</script>

<style scoped>
#bg {
    position: fixed;
    height: 100%;
    width: 100%;
    background: url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg') no-repeat;
    background-size: 100% 130%;
}

#login_box {
    width: 28%;
    height: 400px;
    background-color: #00000060;
    margin: auto;
    margin-top: 10%;
    text-align: center;
    border-radius: 10px;
    padding: 50px 50px;
}

h2 {
    color: #ffffff90;
    margin-top: 5%;
    margin-bottom: 20%;
}

#input-box {
    margin-top: 5%;
}

span {
    color: #fff;
}

input {
    border: 0;
    width: 60%;
    font-size: 15px;
    color: #fff;
    background: transparent;
    border-bottom: 2px solid #fff;
    padding: 5px 10px;
    outline: none;
    margin-top: 10px;
}

button {
    margin-top: 50px;
    width: 60%;
    height: 30px;
    border-radius: 10px;
    border: 0;
    color: #fff;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    background-image: linear-gradient(to right, #30cfd0, #330867);
}

#sign_up {
    margin-top: 45%;
    margin-left: 60%;
}

a {
    color: #b94648;
}
</style>