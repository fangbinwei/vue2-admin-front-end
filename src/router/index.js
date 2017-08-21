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
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: AdminHome,
      children: [
        {
          name: 'manage',
          path: 'manage',
          component: Manage,
          children: [{
            name: 'manage-nav',
            path: 'manage-nav',
            components: {
              articleManage: ArticleManage,
              categoryManage: CategoryManage,
              commentManage: CommentManage,
              blogManage: BlogManage,
              draftManage: DraftManage,
              recycleManage: RecycleManage
            }
          }]
          // children: [
          //   {
          //     name: 'article-manage',
          //     path: 'article-manage',
          //     components: {
          //       ArticleManage,
          //       CategoryManage,
          //       CommentManage
          //     }
          //   },
          //   {
          //     name: 'category-manage',
          //     path: 'category-manage',
          //     component: CategoryManage
          //   },
          //   {
          //     name: 'comment-manage',
          //     path: 'comment-manage',
          //     component: CommentManage
          //   },
          //   {
          //     name: 'blog-manage',
          //     path: 'blog-manage',
          //     component: BlogManage
          //   },
          //   {
          //     name: 'draft-manage',
          //     path: 'draft-manage',
          //     component: DraftManage
          //   },
          //   {
          //     name: 'recycle-manage',
          //     path: 'recycle-manage',
          //     component: RecycleManage
          //   }
          // ]
        },
        {
          name: 'write',
          path: '/write',
          component: Editor
        },
        {
          name: 'user',
          path: '/user',
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
})
