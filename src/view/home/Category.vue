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
                <!--TODO router-view + :key 会出现问题?-->
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getArticleCategoryAPI} from '@/api/article'
  export default {
    data () {
      return {
        categoryList: []
      }
    },
    computed: {
      key () {
        console.log('route', this.$route.path.replace(/\//g, '_'))
        return this.$route.path.replace(/\//g, '_')
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
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.updateCategoryList()
      })
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
