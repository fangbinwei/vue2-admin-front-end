<template>
 <div>
   <div class="filter">
     <el-select v-model="selectCategory" placeholder="类别" size="mini">
       <el-option
         v-for="item in categoryData"
         :key="item.value"
         :label="item.label"
         :value="item.value">
       </el-option>
     </el-select>
   </div>
   <div class="article-list">
     <el-table
       emptyText=" "
       :data="articleData"
       border
       height="250"
       style="width: 100%"
       v-loading="loading">
       <el-table-column
         label="标题"
         width="250">
         <template scope="scope">
           <el-icon name="document"></el-icon>
           <span style="margin-left: 10px">{{ scope.row.title }}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="发表时间"
         width="200">
         <template scope="scope">
           <el-icon name="time"></el-icon>
           <span style="margin-left: 10px">{{ scope.row.showCreateTime }}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="类别"
         width="100">
         <template scope="scope">
           <div slot="reference" class="name-wrapper">
             <el-tag type="primary">{{ scope.row.category }}</el-tag>
           </div>
         </template>
       </el-table-column>
       <el-table-column
         label="阅读"
         width="100">
         <template scope="scope">
           <div slot="reference" class="name-wrapper">
             <el-tag type="success">{{ scope.row.visit }}</el-tag>
           </div>
         </template>
       </el-table-column>
       <el-table-column
         label="评论"
         width="100">
         <template scope="scope">
           <div slot="reference" class="name-wrapper">
             <el-tag type="danger"></el-tag>
           </div>
         </template>
       </el-table-column>
       <el-table-column label="操作">
         <template scope="scope">
           <el-button
             size="small"
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           <el-button
             size="small"
             @click="handleStick(scope.$index, scope.row)">置顶</el-button>
           <el-button
             size="small"
             @click="handleCategory(scope.$index, scope.row)">分类</el-button>
           <el-button
             size="small"
             type="danger"
             :loading="delLoading"
             @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
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
 </div>
</template>
<script>
import {delArticleAPI, getArticleListAPI} from '@/api/article'
export default {
  data () {
    return {
      loading: false,
      delLoading: false,
      currentPage: 1,
      pageSize: 5,
      articleData: [],
      categoryData: [],
      selectCategory: '',
      totalArticle: 0
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
      this.$confirm('要编辑这篇文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          this.$router.push({name: 'edit-article'})
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除'
          })
        })
    },
    handleDelete (index, row) {
      this.$confirm('是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delLoading = true
        let articleId = row._id
        delArticleAPI({id: articleId})
          .then((res) => {
            this.delLoading = false
            this.updateArticleList()
          })
          .catch(() => {
            this.delLoading = false
          })
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消删除'
        })
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
    },
    updateArticleList () {
      this.loading = true
      let reqParams = {
        page: this.currentPage,
        pageSize: this.pageSize
      }
      getArticleListAPI(reqParams)
        .then((res) => {
          let queryResult = res.data.result
          this.articleData = queryResult.list
          this.totalArticle = queryResult.total
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  mounted () {
    this.updateArticleList()
  },
  beforeRouteEnter (to, from, next) {
//    console.log('this', this) //  this undefined
    next((vm) => {
      vm.updateArticleList()
    })
  }
}
</script>
<style scoped>
  .article-list {
    margin-top: 5px;
  }
  .el-pagination {
    text-align: center;
    margin-top: 40px;
  }
</style>
