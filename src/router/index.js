import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import Center from '@/views/center/Center.vue'
import Home from '@/views/home/Home.vue'
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NotFound from '@/views/notfound/NotFound.vue'
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
import useUserInfoStore from '@/stores/useUserInfoStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox,
      children: [
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
        {
          path:'/news-manage/newsadd',
          name:'newsadd',
          component: NewsAdd
      },
      {
          path:'/news-manage/newslist',
          name:'newslist',
          component: NewsList
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
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],
});


router.beforeEach((to,from,next)=>{
    const userInfoStore = useUserInfoStore();
    if(userInfoStore.token.length===0&&to.path!='/login'){
      next({
        path:'/login'
      })
    }else{
      next();
    }
});
export default router
