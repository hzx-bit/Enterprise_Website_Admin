import axios from 'axios'
import {useRouter} from 'vue-router'
import useUserInfoStore from '@/stores/useUserInfoStore'
// 创建axios实例
// axios请求拦截器
axios.interceptors.request.use(config => {
    const userInfoStore = useUserInfoStore();
    const token = userInfoStore.token;
    if (token.length!==0) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
axios.interceptors.response.use(response => {
    const userInfoStore = useUserInfoStore();
    const {authorization} = response.headers;
    authorization&&userInfoStore.setToken(authorization);
    return response;
}, e => {
    const userInfoStore = useUserInfoStore();
    const router = useRouter();
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    //401token失效处理
    if (e.response.status === 401) {
        userInfoStore.clearUserInfo();
        router.push('/login');
    }
    return Promise.reject(e)
})
