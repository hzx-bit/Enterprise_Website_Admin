import {defineStore} from 'pinia'
import {ref} from 'vue'
const useUserStore = defineStore('user',()=>{
    const isGetterRouter = ref(false);
    const getterRouter = ()=>{
        isGetterRouter.value = true;
    }
    return {
        isGetterRouter,
        getterRouter
    };
})

export default useUserStore;
