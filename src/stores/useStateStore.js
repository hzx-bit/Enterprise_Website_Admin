import {defineStore} from 'pinia'
import {ref} from 'vue'
const useStateStore = defineStore('state',()=>{
    const isGetterRouter = ref(false);//是否配置路由
    const isCollapsed = ref(false);//侧边栏状态
    const changeCollapsed = ()=>{
        isCollapsed.value = !isCollapsed.value;
    }
    const changeRouter = (value)=>{
        isGetterRouter.value = value;
    }
    return {
        isCollapsed,
        changeCollapsed,
        isGetterRouter,
        changeRouter
    };
},{
    persist:{
        pick:['isCollapsed']
    }
})

export default useStateStore;
