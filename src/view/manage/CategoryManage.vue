<template>
  <div>
    <div class="category-list">
      <el-table
        :data="categoryData"
        border
        style="width: 90%">
        <el-table-column
          label="类别"
          width="550">
          <template scope="scope">
            <el-icon name="document"></el-icon>
            <span style="margin-left: 10px">{{ scope.row._id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文章"
          width="100">
          <template scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.count }}</el-tag>
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
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        categoryData: []
      }
    },
    methods: {
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      updateCategory () {
        axios.get('/api/getArticleCategory')
          .then((res) => {
            this.categoryData = res.data.result
          })
          .catch((err) => {
            console.log('err', err)
          })
      }
    },
    mounted () {
      this.updateCategory()
    },
    watch: {
      '$route': 'updateCategory'
    }

  }
</script>
<style scoped>
  .category-list {
    margin-top: 27px;
  }
</style>
