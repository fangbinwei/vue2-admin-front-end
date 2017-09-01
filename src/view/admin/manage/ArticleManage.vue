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
       :data="articleData"
       border
       height="300"
       style="width: 100%"
       :emptyText="emptyText"
       v-loading="tableLoading">
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
             @click="handleStick(scope.$index, scope.row)">置顶</el-button>
           <el-button
             size="small"
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
   <my-dialog :is-show="showCateDialog" @on-close="closeDialog">
     <el-input v-model.trim="cateInput"></el-input>
     <div class="buttons">
       <el-button @click="closeDialog">取消</el-button>
       <el-button v-loading="cateLoading" @click="updateCategory">确定</el-button>
     </div>
   </my-dialog>
 </div>
</template>
<script>
import MyDialog from '@/components/dialog'
import {delArticleAPI, getArticleListAPI, updateCategoryByIdAPI} from '@/api/article'
export default {
  data () {
    return {
      emptyText: '暂无数据',
      // 用于更改文章分类
      cateLoading: false,
      cateInput: '',
      showCateDialog: false,
      categoryBefore: '',
      // loading
      tableLoading: false,
      delLoading: false,
      currentPage: 1,
      pageSize: 5,
      articleData: [],
      categoryData: [],
      selectCategory: '',
      totalArticle: 0
    }
  },
  components: {
    MyDialog
  },
  methods: {
    handleEdit (index, row) {
      this.$confirm('要编辑这篇文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          this.$router.push({name: 'edit-article', query: {id: row._id, draft: 'no'}})
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '已取消'
          })
        })
    },
    // TODO closeDialog 和 updateCategory 改成handleDelete的形式 用promise .then(), 参考elementUI 中$prompt
    closeDialog () {
      this.showCateDialog = false
      this.$message({
        type: 'success',
        message: '已取消'
      })
    },
    handleCategory (index, row) {
      console.log('row', row)
      this.categoryBefore = row.category
      this.cateInput = row.category
      this.id = row._id
      this.showCateDialog = true
    },
    updateCategory () {
      if (this.categoryBefore !== this.cateInput) {
        this.cateLoading = true
        updateCategoryByIdAPI({id: this.id, categoryAfter: this.cateInput})
          .then((res) => {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.cateLoading = false
            this.showCateDialog = false
            this.updateArticleList()
          })
          .catch(() => {
            this.cateLoading = false
            this.showCateDialog = false
          })
      } else {
        this.$message({
          type: 'warning',
          message: '类别并未修改'
        })
      }
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
          message: '已取消'
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
      this.tableLoading = true
      let reqParams = {
        page: this.currentPage,
        pageSize: this.pageSize
      }
      getArticleListAPI(reqParams)
        .then((res) => {
          let queryResult = res.data.result
          this.articleData = queryResult.list
          this.totalArticle = queryResult.total
          this.tableLoading = false
        })
        .catch((err) => {
          this.tableLoading = false
          this.emptyText = err
        })
    }
  },
//  mounted () {
//    this.updateArticleList()
//  },
  beforeRouteEnter (to, from, next) {
//    console.log('articleManage routerEnter') //  this undefined
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
  .buttons {
    text-align: center;
    margin-top: 20px;
  }
</style>
