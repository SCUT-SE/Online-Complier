import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ojdata from '../views/OJdata'
import Problem from '@/views/Problem'
import Question from '@/views/Question'
import Solved from "@/views/Solved"
import data from "@/views/test"
// import App from '../App'
Vue.use(VueRouter)

const routes = [
  {path:"/test",component:data,name:"test"},
  { path: "/login", component: Login },
  {path:"/",redirect:'/login'},
  {
    path:"/",
    name:'app',
    components:{
      default:Solved,
      problem:Problem,
      question:Question

    },
    // component:App,

  },

  {
    path:"/ojdata",
    name:"ojdata",
    component:ojdata,
    children:[
      {
        path:'Problem',//不能加斜杠！！
        name:'Problem',
        component:Problem,
      },
      {
        path:'Question',//不能加斜杠！！
        name:'Question',
        component:Question,
      },
    ]
  },
  {path:'/Home',
  component:Home,
  name:'Home',
  },
  {
    name:'Solved',
    path:'/Solved/:SolvedId',
    component:Solved,
    }

]

const router = new VueRouter({
  routes
})

// 挂载deamon
router.beforeEach((to,from,next)=>{
  // to 将要访问的路径
  // from 从哪个路径来
  // next()放行 next('')强制跳转
  if(to.path=='/login') return next();
  // 获取token
  const token = window.sessionStorage.getItem('username');
  if(!token) return next('/login');
  return next();
})

export default router
