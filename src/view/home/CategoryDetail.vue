<template>
  <div>
    <transition name="fade" mode="out-in">
      <div>
        <div class="category-title" v-if="title">
        <!-- <div class="category-title" v-if="articleList.length >0"> -->
          <h5 class="title">{{title}}</h5>
        </div>
        <div class="category-article"
             v-for="(item,index) in articleList"
             :key="index">
          <div>
            <span class="created-time">{{item.createTime | momentWithYear}}</span>
          </div>
          <router-link class="post-title"
                       :to="{name: 'articleDetail', query: {id: item._id}}">
            <span>{{item.title}}</span>
          </router-link>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import {getArticleListByCateAPI} from '@/api/article'
  export default {
    data () {
      return {
        title: this.$route.params.category,
        articleList: []
      }
    },
    methods: {
      updateArticleList () {
        let reqParams = {category: this.$route.params.category}
        if (reqParams.category == null) return
        getArticleListByCateAPI(reqParams)
          .then((res) => {
            this.articleList = res.data.result.list
          })
          .catch(() => {
          })
      }
    },
    created () {
      this.updateArticleList()
    }
    // 只会在第一次进入页面的时候出发,因为/category/:categoryName其实只是一个路由 即时categoryName不同
    // beforeRouteEnter (to, from, next) {
    //   next((vm) => {
    //     console.log('before', vm)
    //     vm.updateArticleList()
    //   })
    // },
    // beforeRouteUpdate (to, from, next) {
    //   next()
    //   console.log('update', this)
    //   // 这句话必须在next下面,要不然params会获取旧的数据
    //   this.updateArticleList()
    // }
  }

</script>

<style scoped>
  .created-time {
    margin-left: 2rem;
    color: #666;
    font-weight: 600;
  }
  .post-title {
    margin-left: 2rem;
    text-decoration: none;
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
  }
  .category-title {
    position: relative;
    margin: 3rem 0;
  }
  .category-title .title {
    margin-left: 2rem;
  }
  .category-title .title:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-left: -6px;
    margin-top: -4px;
    width: 8px;
    height: 8px;
    background: #bbb;
    border-radius: 50%;
  }
  .category-article {
    position: relative;
    margin: 2rem 0;
    border-bottom: 1px dashed #ccc;
    border-bottom-width: 1px;
    border-bottom-style: dashed;
    border-bottom-color: rgb(204, 204, 204);
  }
  .category-article div span {
    margin-left: 2rem;
    color: #666;
  }
  .category-article>div {
    margin-bottom: 1rem;
  }
  .category-article:hover {
    border-bottom-color: #666;
  }
  .category-article:hover a:before{
    background: #222;
  }
  .category-article a {
    margin-left: 2rem;
    text-decoration: none;
    color: #42b983;
    display: block;
  }
  .category-article a:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 12px;
    width: 7px;
    height: 7px;
    margin-left: -5px;
    background: #bbb;
    border-radius: 50%;
    border: 1px solid #ccc;
  }

</style>
