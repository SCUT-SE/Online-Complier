// // 挂载deamon
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 从哪个路径来
//   // next()放行 next('')强制跳转
//   if (to.path == '/login') return next();
//   // 获取token
//   const token = window.sessionStorage.getItem('username');
//   if (!token) return next('/login');
//   return next();
// })

// export default router
import Vue from 'vue'
import VueRouter from 'vue-router'

//组件懒加载
const Problem = () => import('views/problem/Problem')
const ProblemSolve = () => import('views/problem/ProblemSolve')
const Interview = () => import('views/interview/Interview')
const InterviewProblem = () => import('views/interview/InterviewProblem')
const InterviewProblemSolve = () => import('views/interview/InterviewProblemSolve')
const User = () => import('views/user/User')
const Interviewer = () => import('views/interviewer/Interviewer')
const InterviewerProblem = () => import('views/interviewer/InterviewerProblem')
const InterviewerProblemChoose = () => import('views/interviewer/InterviewerProblemChoose')
const InterviewerProblemEdit = () => import('views/interviewer/InterviewerProblemEdit')
const InterviewerProblemCreate = () => import('views/interviewer/InterviewerProblemCreate')

//安装插件
Vue.use(VueRouter)
//清除路由重复报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
//创建路由对象
const routes = [{
    path: '/',
    redirect: '/problem'
  },

  {
    path: '/problem',
    name: 'Problem',
    component: Problem,
  },
  {
    path: '/problem/:pid',
    name: 'ProblemSolve',
    component: ProblemSolve,
  },
  {
    path: '/interview',
    name: 'Interview',
    component: Interview,
  },
  {
    path: '/interview/problem',
    name: 'InterviewProblem',
    component: InterviewProblem,
  },
  {

    path: '/interview/problem/:pid',
    name: 'InterviewProblemSolve',
    component: InterviewProblemSolve,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    children: []
  },
  {
    path: '/user/:uid',
    name: 'User',
    component: User,
  },
  {
    path: '/interviewer',
    name: 'Interviewer',
    component: Interviewer,
  },
  {
    path: "/interviewer/:uid",
    name: 'Interviewer2',
    component: Interviewer,
  },
  {
    path: '/interviewer/:uid/problem',
    name: 'InterviewerProblem',
    component: InterviewerProblem,
  },
  {
    path: '/interviewer/:uid/problem/:pid',
    name: 'InterviewerProblemEdit',
    component: InterviewerProblemEdit
  },
  {

    path: '/interviewer/:uid/problem/choose',
    name: 'InterviewerProblemChoose',
    component: InterviewerProblemChoose
  },
  {
    path: '/interviewer/:uid/problem/create',
    name: 'InterviewerProblemCreate',
    component: InterviewerProblemCreate
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
//导出router
export default router