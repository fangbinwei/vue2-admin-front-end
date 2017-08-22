<template>
 <div>
   <div class="filter">
     <el-select v-model="selectCategory" placeholder="类别" size="mini">
       <el-option
         v-for="item in categoryData"
         :key="item.value"
         :label="item.label"
         :value="item.value"
         :disabled="item.disabled">
       </el-option>
     </el-select>
   </div>
   <div class="article-list">
     <el-table
       :data="articleData"
       border
       height="250"
       style="width: 90%">
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
             @click="handleEdit(scope.$index, scope.row)">置顶</el-button>
           <el-button
             size="small"
             @click="handleEdit(scope.$index, scope.row)">分类</el-button>
           <el-button
             size="small"
             type="danger"
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
import axios from 'axios'
export default {
  data () {
    return {
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
    },
    handleDelete (index, row) {
      console.log(index, row)
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
      let reqParams = {
        page: this.currentPage,
        pageSize: this.pageSize
      }
      axios.get('/api/getArticleList', {params: reqParams})
        .then((res) => {
          let queryResult = res.data.result
          this.articleData = queryResult.list
          this.totalArticle = queryResult.total
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  },
  mounted () {
    this.updateArticleList()
  },
  watch: {
    '$route': 'updateArticleList'
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
