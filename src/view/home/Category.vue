<template>
  <div>
    <div class="container">
      <div class="row justify-content-md-start justify-content-center mx-0">
        <h3>Tag</h3>
      </div>
      <div class="row justify-content-center">
        <h4>目前共计<span>{{categoryList.length}}</span>个分类</h4>
      </div>
      <div class="row justify-content-between mx-0">
        <div class="col-md-3 col-12 category">
          <ul class="nav flex-column">
            <li class="nav-item"
                v-for="(item,index) in categoryList"
                :key="index">
              <router-link
                class="nav-link"
                :to="{name: 'categoryDetail', params: {category: item._id}}">{{item._id}} ({{item.count}})</router-link>
            </li>
          </ul>
        </div>
        <div class="col-8 category-list px-0">
                <!--router-view + :key 会出现问题 是因为created 根据key创建了新的组件, 
                beforeRouteUpdate在create之前调用, 向后台请求的数据还是保存在了前面旧的组件中
                在created中异步请求后台数据不会出现问题-->
          <!-- <transition name="fade" mode="out-in">
              <router-view></router-view>
          </transition> -->

          <!-- keep-alive 能复用不同key创建的组件 -->
          <!-- TODO 把categoryDetail 做为组件插入category, 而不是通过router-view -->
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view :key="key"></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getArticleCategoryAPI} from '@/api/article'
  export default {
    name: 'CATEGORY',
    data () {
      return {
        categoryList: []
      }
    },
    computed: {
      key () {
        return this.$route.path.replace(/\//g, '_')
        // console.log('route.path', this.$route.path.startsWith('/category/'))
        // console.log('route', this.$route.path.replace(/\//g, '_'))
        // 如果点击category列表中的按钮,则创建key
        // if (this.$route.path.startsWith('/category/')) {
        //   return this.$route.path.replace(/\//g, '_')
        // } else {
        //   console.log('not start with')
        //   return
        // }
      }
    },
    methods: {
      updateCategoryList () {
        getArticleCategoryAPI()
          .then((res) => {
            this.categoryList = res.data.result
          })
          .catch(() => {
          })
      }
    },
    created () {
      this.updateCategoryList()
    }
  }

</script>

<style scoped>
  .category {
    padding-right: 0;
    padding-left: 0;
  }
  .category>ul {
    border: 2px solid rgba(0,0,0,.4);
    border-radius: 4px;
  }
  .category a {
    color: #42b983;
    /*font-weight: bold;*/
  }
  .router-link-active {
    font-weight: bold;
  }
  .category-list {
    border-left: 4px solid #eee;
  }

</style>
