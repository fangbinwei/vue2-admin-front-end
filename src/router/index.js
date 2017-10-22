import Vue from 'vue'
import NotFound from '@/view/404'
// 后台管理
// import AdminHome from '@/view/admin/AdminHome'
// import Manage from '@/view/admin/Manage'
// import Editor from '@/view/admin/Editor'
// import User from '@/view/admin/User'
// import ArticleManage from '@/view/admin/manage/ArticleManage'
// import CategoryManage from '@/view/admin/manage/CategoryManage'
// import CommentManage from '@/view/admin/manage/CommentManage'
// import BlogManage from '@/view/admin/manage/BlogManage'
// import DraftManage from '@/view/admin/manage/DraftManage'
// import RecycleManage from '@/view/admin/manage/RecycleManage'
// import Login from '@/view/admin/login'

// // blog页面
// import Layout from '@/view/home/Layout'
// import Home from '@/view/home/Home'
// import ArticleDetail from '@/view/home/ArticleDetail'
// import Archive from '@/view/home/Archive'
// import Category from '@/view/home/Category'
// import CategoryDetail from '@/view/home/CategoryDetail'
// import About from '@/view/home/About'
const AdminHome = () => import(/* webpackChunkName: "group-admin" */ '@/view/admin/AdminHome')
const Manage = () => import(/* webpackChunkName: "group-admin-manage" */ '@/view/admin/Manage')
const Editor = () => import(/* webpackChunkName: "group-admin" */ '@/view/admin/Editor')
const User = () => import(/* webpackChunkName: "group-admin" */ '@/view/admin/User')
const ArticleManage = () => import(/* webpackChunkName: "group-admin-manage" */ '@/view/admin/manage/ArticleManage')
const CategoryManage = () => import(/* webpackChunkName: "group-admin-manage" */ '@/view/admin/manage/CategoryManage')
const CommentManage = () => import(/* webpackChunkName: "group-admin-manage" */ '@/view/admin/manage/CommentManage')
const BlogManage = () => import(/* webpackChunkName: "group-admin-manage" */ '@/view/admin/manage/BlogManage')
const DraftManage = () => import(/* webpackChunkName: "group-admin-manage" */ '@/view/admin/manage/DraftManage')
const RecycleManage = () => import(/* webpackChunkName: "group-admin-manage" */ '@/view/admin/manage/RecycleManage')
const Login = () => import(/* webpackChunkName: "group-admin" */ '@/view/admin/login')

// blog页面
const Layout = () => import(/* webpackChunkName: "group-home" */ '@/view/home/Layout')
const Home = () => import(/* webpackChunkName: "group-home" */ '@/view/home/Home')
const ArticleDetail = () => import(/* webpackChunkName: "group-home-detail" */ '@/view/home/ArticleDetail')
const Archive = () => import(/* webpackChunkName: "group-home" */ '@/view/home/Archive')
const Category = () => import(/* webpackChunkName: "group-home" */ '@/view/home/Category')
const CategoryDetail = () => import(/* webpackChunkName: "group-home-detail" */ '@/view/home/CategoryDetail')
const About = () => import(/* webpackChunkName: "group-home" */ '@/view/home/About')
//
import Router from 'vue-router'
// import store from '../store'
// import {getToken} from '../utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const routes = [
  {
    name: 'layout',
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        name: 'home',
        path: 'home',
        component: Home
      },
      {
        name: 'articleDetail',
        path: 'articleDetail',
        component: ArticleDetail
      },
      {
        name: 'archive',
        path: 'archive',
        component: Archive
      },
      {
        name: 'category',
        path: 'category',
        component: Category,
        children: [
          {
            name: 'categoryDetail',
            path: ':category',
            component: CategoryDetail
          }
        ]
      },
      {
        name: 'about',
        path: 'about',
        component: About
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'admin',
    path: '/admin',
    component: AdminHome,
    meta: {
      needToken: true
    },
    children: [
      {
        name: 'manage',
        path: 'manage',
        component: Manage,
        meta: {
          needToken: true
        },
        children: [
          {
            name: 'article-manage',
            path: 'article-manage',
            meta: {
              needToken: true
            },
            component: ArticleManage
          },
          {
            name: 'draft-manage',
            path: 'draft-manage',
            meta: {
              needToken: true
            },
            component: DraftManage
          },
          {
            name: 'category-manage',
            path: 'category-manage',
            meta: {
              needToken: true
            },
            component: CategoryManage
          },
          {
            name: 'comment-manage',
            path: 'comment-manage',
            meta: {
              needToken: true
            },
            component: CommentManage
          },
          {
            name: 'blog-manage',
            path: 'blog-manage',
            meta: {
              needToken: true
            },
            component: BlogManage
          },
          {
            name: 'recycle-manage',
            path: 'recycle-manage',
            meta: {
              needToken: true
            },
            component: RecycleManage
          },
          {
            name: 'edit-article',
            path: 'edit-article',
            meta: {
              needToken: true
            },
            component: Editor
          }
        ]
      },
      {
        name: 'new-article',
        path: 'new-article',
        meta: {
          needToken: true
        },
        component: Editor
      },
      {
        name: 'user',
        path: 'user',
        meta: {
          needToken: true
        },
        component: User
      }
    ]
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    component: NotFound
  }

]

const router = new Router({
  mode: 'history',
  routes: routes
})

NProgress.inc()
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.needToken) {
    next() // 允许参观后台
    // if (store.getters.token) { // 判断state中的token是否存在
    //   next()
    // } else {
    //   // 在login页面尝试去后台 就停留在login,在其他页去后台就跳转到login
    //   if (from.name === 'login') {
    //     NProgress.done()
    //     next(false)
    //   } else {
    //     next({name: 'login'})
    //   }
    // }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  NProgress.done()
  // 路由切换后页面跳转到顶部
  // window.scrollTo(0, 0)
})

export default router
