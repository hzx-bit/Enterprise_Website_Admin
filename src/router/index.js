import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import useUserStore from '@/stores/useUserStore'
import Center from '@/views/center/Center.vue'
import Home from '@/views/home/Home.vue'
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NotFound from '@/views/notfound/NotFound.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox,
      children: [
        {
            path:'/user-manage/useradd',
            name:'useradd',
            component: UserAdd
        },
        {
            path:'/user-manage/userlist',
            name:'userlist',
            component: UserList
        },
        {
            path:'/product-manage/productadd',
            name:'productadd',
            component: ProductAdd
        },
        {
            path:'/product-manage/productlist',
            name:'productlist',
            component: ProductList
        },
      ]
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
      path:'/center',
      name:'center',
      component: Center
    },
    {
        path:'/index',
        name:'home',
        component: Home
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],
});


router.beforeEach((to,from,next)=>{
    if(!localStorage.getItem("token")&&to.path!='/login'){
      next({
        path:'/login'
      })
    }else{
      next();
    }
});
export default router
