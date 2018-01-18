<template>
  <div>
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
                <div class="read-more">
                  <router-link class="more-link"
                               :to="{name: 'articleDetail', query: {id: item._id}}">
                               Read More
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
 /* 分页 */
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
    margin-top: 4rem;
  }
  .read-more a {
    border: 1px solid #000;
    padding: 0 20px;
    height: 45px;
    line-height: 45px;
    position: relative;
    display: inline-block;
    margin: 0.5rem;
    letter-spacing: 1px;
    font-weight: 400;
    text-shadow: 0.1px 0.1px 0.4px rgba(0, 0, 0, 0.6);
    color: rgb(0,0,0);
    text-decoration: none;
    background-image: linear-gradient(90deg, #fff, #fff, #000, #000);
    background-size: 300% 300%;
    background-position: 0% 50%;
    transition: all 0.4s ease;
  }
  .read-more a:hover {
    color: #fff;
    background-position: 99% 50%;
  }

</style>
