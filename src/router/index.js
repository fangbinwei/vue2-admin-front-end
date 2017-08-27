import Vue from 'vue'
import NotFound from '@/view/404'
import AdminHome from '@/view/AdminHome'
import Manage from '@/view/Manage'
import Editor from '@/view/Editor'
import User from '@/view/User'
import ArticleManage from '@/view/manage/ArticleManage'
import CategoryManage from '@/view/manage/CategoryManage'
import CommentManage from '@/view/manage/CommentManage'
import DraftManage from '@/view/manage/DraftManage'
import BlogManage from '@/view/manage/BlogManage'
import RecycleManage from '@/view/manage/RecycleManage'
import Login from '@/view/login'
import Router from 'vue-router'
import store from '../store'
// import {getToken} from '../utils/auth'

Vue.use(Router)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
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
            name: 'draft-manage',
            path: 'draft-manage',
            meta: {
              needToken: true
            },
            component: DraftManage
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
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needToken) {
    if (store.getters.token) { // 判断state中的token是否存在
      // console.log('beforeEach getters.token')
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    next()
  }
})
export default router
