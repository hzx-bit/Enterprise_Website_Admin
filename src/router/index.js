import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import NotFound from '@/views/notfound/NotFound.vue'
import useUserInfoStore from '@/stores/useUserInfoStore'
import useStateStore from '@/stores/useStateStore'
import routesConfig from './config'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      redirect: '/index'
    },

    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],
});
const checkPermission = (route)=>{
  const userInfoStore = useUserInfoStore();
  if(route.requireAdmin&&userInfoStore.userInfo.role===2) return false;
  return true;
}
const configRouter = ()=>{
  if(!router.hasRoute("mainbox")){
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox,
    });
  }
  routesConfig.forEach(route => {
    checkPermission(route)&&router.addRoute('mainbox',route);
  });
}

router.beforeEach((to,from,next)=>{
    if(to.name==='login'){
      next();
    }else{
      const userInfoStore = useUserInfoStore();
      if(!userInfoStore.token){
        next({
          path:'/login'
        })
      }else{
        const stateStore = useStateStore();
        if(!stateStore.isGetterRouter){
          router.removeRoute("mainbox");
          stateStore.changeRouter(true);
          configRouter();
          next({
            path:to.fullPath
          });

        }
        else{
          next();
        }
      }
    }
});
export default router
