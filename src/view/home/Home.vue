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
      console.log(1)
      next((vm) => {
        vm.updateArticleList()
      })
    }
  }

</script>

<style scoped>
  .el-pagination {
    text-align: center;
    margin-top: 40px;
  }
</style>
