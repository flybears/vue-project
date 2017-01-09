import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import auth from './auth'
import path from 'path'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import Table from './components/nav1/Table.vue'
import Form from './components/nav1/Form.vue'
import Page3 from './components/nav1/Page3.vue'
import Page4 from './components/nav2/Page4.vue'
import Page5 from './components/nav2/Page5.vue'
import Page6 from './components/nav3/Page6.vue'
import echarts from './components/charts/echarts.vue'

Vue.use(VueRouter)   //路由

//第一个参数文件路径。第二个是否遍历子文件夹，第三个匹配正则
const requireContext = require.context('./components', true, /^(?!\.\/index).*\.vue$/)
const basename = path.basename
const components = requireContext.keys().reduce((pre, current) => Object.assign(pre, {
  [basename(current, '.vue')]: requireContext(current),
}), {})


const routes = [
  {
    path: '/login',
    component: Login,
    meta: { noRequiresAuth: true },
    hidden: true//不显示在导航中
  },
  {
    path: '/',
    component: Home,
    name: '导航一',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      { path: '/table', component: components.Table, name: 'Table' },
      { path: '/form', component: Form, name: 'Form' },
      { path: '/page3', component: Page3, name: '页面3' },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '导航二',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/page4', component: Page4, name: '页面4' },
      { path: '/page5', component: Page5, name: '页面5' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'fa fa-address-card',
    leaf: true,//只有一个节点
    children: [
      { path: '/page6', component: Page6, name: '导航三' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: 'Charts',
    iconCls: 'fa fa-bar-chart',
    children: [
      { path: '/echarts', component: echarts, name: 'echarts' }
    ]
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.noRequiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      NProgress.start()
      next()
    }
  }else{
    NProgress.start()
    next()
  }
})

router.afterEach(transition => {
  NProgress.done()
})

export default router
