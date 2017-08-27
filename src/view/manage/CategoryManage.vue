<template>
  <div>
    <div class="category-list">
      <el-table
        :data="categoryData"
        emptyText=" "
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
      <el-input v-model="input"></el-input>
      <div class="buttons">
        <el-button v-loading="updateLoading" @click="updateCategory">确定</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </div>
    </my-dialog>
  </div>
</template>
<script>
  import MyDialog from '@/components/dialog'
  import {getArticleCategoryAPI, updateCategoryAPI} from '@/api/article'
  export default {
    components: {
      MyDialog
    },
    data () {
      return {
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
        this.categoryBefore = row._id
        this.input = row._id
        this.showDialog = true
      },
      closeDialog () {
        this.showDialog = false
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      updateCategoryList () {
        this.loading = true
        getArticleCategoryAPI()
          .then((res) => {
            this.categoryData = res.data.result
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      },
      updateCategory () {
        console.log('before', this.categoryBefore)
        console.log('after', this.input)
        if (this.categoryBefore !== this.input) {
          this.updateLoading = true
          updateCategoryAPI({
            categoryBefore: this.categoryBefore,
            categoryUpdate: this.input
          })
            .then((res) => {
              this.updateCategoryList()
              this.updateLoading = false
              this.showDialog = false
            })
            .catch(() => {
              this.updateLoading = false
              this.showDialog = false
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
