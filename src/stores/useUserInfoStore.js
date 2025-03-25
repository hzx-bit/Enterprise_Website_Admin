import {defineStore} from 'pinia'
import {ref} from 'vue'
const useUserInfoStore = defineStore('userInfo',()=>{
    const userInfo = ref({});//用户信息
    const token = ref('');
    const changeUserInfo = (value)=>{
        userInfo.value = {
            ...userInfo.value,
            ...value
        };
    }
    const setToken = (value)=>{
        token.value = value;
    }
    const clearUserInfo = ()=>{
        userInfo.value = {};
        token.value = '';
    }
    return {
        token,
        userInfo,
        changeUserInfo,
        clearUserInfo,
        setToken
    };
},{
    persist:true
})

export default useUserInfoStore;
