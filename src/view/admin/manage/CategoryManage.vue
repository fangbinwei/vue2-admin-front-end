<template>
  <div>
    <div class="category-list">
      <el-table
        :data="categoryData"
        :emptyText="emptyText"
        border
        height="300"
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          label="类别"
          width="250">
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
              <el-tag type="primary">{{ scope.row.count }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <my-dialog :is-show="showDialog" @on-close="closeDialog">
      <el-input v-model.trim="input"></el-input>
      <div class="buttons">
        <el-button @click="closeDialog">取消</el-button>
        <el-button v-loading="updateLoading" @click="updateCategory">确定</el-button>
      </div>
    </my-dialog>
  </div>
</template>
<script>
  import MyDialog from '@/components/dialog'
  import {getAllArticleCategoryAPI, updateCategoryAPI} from '@/api/article'
  export default {
    components: {
      MyDialog
    },
    data () {
      return {
        emptyText: '暂无数据',
        autofocus: false,
        updateLoading: false,
        loading: false,
        categoryData: [],
        showDialog: false,
        input: '',
        categoryBefore: ''
      }
    },
    methods: {
      handleEdit (index, row) {
        // 后端数据库聚合使用category作为_id的值
        this.categoryBefore = row._id
        this.input = row._id
        this.showDialog = true
      },
      closeDialog () {
        this.showDialog = false
        this.$message({
          type: 'success',
          message: '已取消'
        })
      },
      updateCategoryList () {
        this.loading = true
        getAllArticleCategoryAPI()
          .then((res) => {
            this.categoryData = res.data.result
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
            this.emptyText = err
          })
      },
      updateCategory () {
        if (this.categoryBefore !== this.input) {
          this.updateLoading = true
          updateCategoryAPI({
            categoryBefore: this.categoryBefore,
            categoryUpdate: this.input
          })
            .then((res) => {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.updateCategoryList()
              this.updateLoading = false
              this.showDialog = false
            })
            .catch(() => {
              this.updateLoading = false
              this.showDialog = false
            })
        } else {
          this.$message({
            type: 'warning',
            message: '类别并未修改'
          })
        }
      }
    },
    mounted () {
      this.updateCategoryList()
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.updateCategoryList()
      })
    }

  }
</script>
<style scoped>
  .category-list {
    margin-top: 27px;
  }
  .buttons {
    text-align: center;
    margin-top: 20px;
  }
</style>
