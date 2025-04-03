import Center from '@/views/center/Center.vue'
import Home from '@/views/home/Home.vue'
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
const routes = [
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
        component: UserAdd,
        requireAdmin:true
    },
    {
        path:'/user-manage/userlist',
        name:'userlist',
        component: UserList,
        requireAdmin:true
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

export default routes