<template>
  <div>
      <div class="home-image container-fluid px-0">
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 ">
            <div class="articles">
              <article v-for="(item,index) in articleData"
                       :key="index">
                <div class="article-header">
                  <h2 class="article-title">
                    <router-link
                      :to="{name: 'articleDetail', query: {id: item._id}}">
                      {{item.title}}
                    </router-link>
                  </h2>
                </div>
                <div class="row">
                  <div class="col-md-auto">
                    <span class="pub-time">{{item.createTime | momentWithYear}}</span>
                  </div>
                  <div class="col-md-4">
                    <!--<span class="views-count">阅读 22</span>-->
                    <router-link
                      :to="{name: 'categoryDetail', params: {category: item.category}}"
                      class="article-category">{{item.category}}</router-link>
                  </div>
                </div>

                <div class="article-excerpt">
                  <p>
                    {{item.abstract}}
                  </p>
                </div>
                <div class="read-more cl-effect-14">
                  <router-link class="more-link"
                               :to="{name: 'articleDetail', query: {id: item._id}}">
                    继续阅读 <span class="meta-nav">→</span>
                  </router-link>
                </div>
              </article>
            </div>
          </div>
        </div>
        <el-pagination
          v-show="articleLoaded"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes"
          :total="totalArticle">
        </el-pagination>

        <!--<nav>-->
          <!--<pagination></pagination>-->
        <!--</nav>-->
      </div>
  </div>
</template>

<script>
  import {getArticleListAPI} from '@/api/article'
  import Pagination from '@/components/pagination'
  export default {
    components: {
      Pagination
    },
    data () {
      return {
        articleLoaded: false,
        currentPage: 1,
        pageSize: 5,
        totalArticle: 0,
        articleData: []
      }
    },
    methods: {
      // TODO 加入加载动画
      updateArticleList () {
        let reqParams = {
          page: this.currentPage,
          pageSize: this.pageSize
        }
        getArticleListAPI(reqParams)
          .then((res) => {
            this.articleLoaded = true
            let queryResult = res.data.result
            this.articleData = queryResult.list
            this.totalArticle = queryResult.total
          })
          .catch(() => {
//          this.tableLoading = false
          })
      },
      // 每页显示x条
      handleSizeChange (size) {
        this.pageSize = size
        this.currentPage = 1
        this.updateArticleList()
      },
      // 当前第x页
      handleCurrentChange (page) {
        this.currentPage = page
        this.updateArticleList()
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.updateArticleList()
        setTimeout(() => {
          vm.showHomeImage = true
        }, 0)
      })
    }
  }

</script>

<style scoped>
/* home image */
  @media (min-width: 768px) {
    .home-image {
      margin-top: calc(-15vh - 54px);
      margin-bottom: 3rem;
      overflow: hidden;

      min-height: 100vh;
      background-image: url('/static/img/seasons.jpg');
      background-position-x: right;
      background-position-y: bottom;
      background-repeat: no-repeat;
      background-size: cover;
      background-attachment: fixed;
      animation: homeImage 1s ease;
    }
    @keyframes homeImage {
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
  }
  .el-pagination {
    text-align: center;
    margin-top: 40px;
  }
  /* read more */
  .read-more {
    font-weight: 400;
    word-spacing: 1px;
    letter-spacing: 0.01em;
    text-align: center;
    margin-top: 20px;
  }
  .cl-effect-14 a {
    padding: 0 20px;
    height: 45px;
    line-height: 45px;
    position: relative;
    display: inline-block;
    margin: 0.5rem;
    letter-spacing: 1px;
    font-weight: 400;
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
    color: rgb(0,0,0);
    text-decoration: none;
  }

  .cl-effect-14 a::before,
  .cl-effect-14 a::after {
    position: absolute;
    width: 45px;
    height: 1px;
    background: #C3C3C3;
    content: '';
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    pointer-events: none;
  }

  .cl-effect-14 a::before {
    top: 0;
    left: 0;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    transform-origin: 0 0;
  }

  .cl-effect-14 a::after {
    right: 0;
    bottom: 0;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-transform-origin: 100% 0;
    -moz-transform-origin: 100% 0;
    transform-origin: 100% 0;
  }

  .cl-effect-14 a:hover::before,
  .cl-effect-14 a:hover::after,
  .cl-effect-14 a:focus::before,
  .cl-effect-14 a:focus::after {
    background: #000;
  }

  .cl-effect-14 a:hover::before,
  .cl-effect-14 a:focus::before {
    left: 50%;
    -webkit-transform: rotate(0deg) translateX(-50%);
    -moz-transform: rotate(0deg) translateX(-50%);
    transform: rotate(0deg) translateX(-50%);
  }

  .cl-effect-14 a:hover::after,
  .cl-effect-14 a:focus::after {
    right: 50%;
    -webkit-transform: rotate(0deg) translateX(50%);
    -moz-transform: rotate(0deg) translateX(50%);
    transform: rotate(0deg) translateX(50%);
  }
</style>
