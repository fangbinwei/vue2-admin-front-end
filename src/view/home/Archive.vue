<template>
  <div>
    <div class="container">
      <div class="row justify-content-md-between mx-0">
        <div class="col-sm-3 col-0">
        </div>
        <div class="col-8 archives-list px-0">
          <div class="archives-sum">
            <div>目前共计<span>{{articleTotal}}</span>篇博客!</div>
          </div>
          <div v-for="(yearItem,yearIndex) in articleData" :key="yearIndex">
            <div class="archives-title">
              <span class="title">{{yearItem._id.year}}</span>
            </div>
            <div class="archives-article" v-for="(item,index) in yearItem.articleList" :key="index">
              <div>
                <span class="created-time">{{item.createTime | moment}}</span>
                <router-link
                  class="archives-category"
                  :to="{name: 'categoryDetail', params: {category: item.category}}">{{item.category}}</router-link>
              </div>
              <div>
                <router-link class="post-title"
                             :to="{name: 'articleDetail', query: {id: item._id}}">
                  <span>{{item.title}}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getArticleListByDateAPI} from '@/api/article'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        articleData: []
      }
    },
    computed: {
      ...mapState({
        articleTotal: state => state.article.articleTotal
      })
    },
    methods: {
      updateArticleList () {
        getArticleListByDateAPI()
          .then((res) => {
            let queryResult = res.data
            this.articleData = queryResult.result
          })
          .catch(() => {
          })
      }
    },
    created () {
      this.updateArticleList()
    }
  }
</script>

<style scoped>
  .archives-list {
    border-left: 4px solid #eee;
  }
  .archives-sum {
    position: relative;
    margin-bottom: 3rem;
  }
  .archives-sum div {
    margin-left: 2rem;
  }
  .archives-sum div:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-left: -7px;
    margin-top: -4px;
    width: 10px;
    height: 10px;
    background: #bbb;
    border-radius: 50%;
  }
  .archives-title {
    position: relative;
    margin: 3rem 0;
  }
  .archives-title .title {
    margin-left: 2rem;
    font-size: 1.8rem;
  }
  .archives-title .title:before{
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
  .archives-article {
    position: relative;
    margin: 2rem 0;
    border-bottom: 1px dashed #ccc;
  }
  .archives-article>div {
    margin-bottom: 1rem;
  }
  .archives-article:hover {
    border-bottom-color: #666;
  }
  .archives-article .created-time {
    margin-left: 2rem;
    color: #666;
    font-weight: 600;
  }
  .archives-article .post-title {
    margin-left: 2rem;
    text-decoration: none;
    color: #42b983;
    font-size: 1.1rem;
    font-weight: bold;
    display: block;
  }
  .archives-article .post-title:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 12px;
    width: 7px;
    height: 7px;
    margin-left: -5px;
    background: #bbb;
    border-radius: 50%;
    border: 1px solid #fff;
  }
  .archives-article:hover a:before{
    background: #222;
  }
  .archives-category {
    position: relative;
    background: #df2d4f;
    padding: 0.3rem 0.6rem;
    margin: 0 1em;
    color: #fff;
    font-size: 0.8rem;
    text-decoration: none;
  }
  .archives-category:hover{
    color: #000;
    text-decoration: none;
  }

</style>
