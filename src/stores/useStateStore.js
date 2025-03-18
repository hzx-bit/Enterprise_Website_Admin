import {defineStore} from 'pinia'
import {ref} from 'vue'
const useStateStore = defineStore('state',()=>{
    const isCollapsed = ref(false);//侧边栏状态
    const changeCollapsed = ()=>{
        isCollapsed.value = !isCollapsed.value;
    }
    return {
        isCollapsed,
        changeCollapsed,
    };
},{
    persist:true
})

export default useStateStore;
