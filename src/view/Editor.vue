<template>
  <div>
    <el-col :span="20" :offset="4" class="editor-wrap">
      <div class="editor-header">
        <div class="article-title">
          <el-input v-model.trim="formItem.title" placeholder="文章标题"></el-input>
        </div>
        <div class="date">
          <el-date-picker
            v-model="formItem.createTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="abstract">
          <el-input v-model="formItem.abstract" placeholder="摘要"></el-input>
        </div>
        <div class="article-category">
          <el-select
            v-model.trim="formItem.category"
            filterable
            allow-create
            placeholder="请选择文章类别">
            <el-option
              v-for="(item,index) in categoryOptions"
              :key="index"
              :label="item._id"
              :value="item._id">
            </el-option>
          </el-select>
        </div>
        <el-button type="success" class="commit" @click="submit" :loading="submitLoading">发表文章</el-button>
      </div>
      <div id="editor">
        <mavon-editor @save="save" @change="change" ></mavon-editor>
      </div>
    </el-col>
  </div>
</template>
<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import {saveArticleAPI, getArticleCategoryAPI} from '@/api/article'
  export default {
    components: {
      mavonEditor
    },
    data () {
      return {
        submitLoading: false,
        formItem: {
          id: '',
          title: '',
          createTime: new Date(),
          abstract: '',
          content: '',
          rawContent: '',
          draft: '',
          category: ''
        },
        categoryOptions: []
      }
    },
    methods: {
      save (value, render) {
//        console.log('value', value)
//        console.log('render', render)
      },
      change (value, render) {
        this.formItem.rawContent = value
        this.formItem.content = render
//        console.log('content', this.formItem.content)
      },
      updateDate () {
        this.formItem.createTime = new Date()
      },
      updateCategoryList () {
        getArticleCategoryAPI()
          .then((res) => {
            this.categoryOptions = res.data.result
          })
          .catch(() => {
          })
      },
      submit () {
        if (!this.formItem.title) {
          this.$message('文章标题不能为空!')
          return
        } else if (!this.formItem.createTime) {
          this.$message('发布日期不能为空!')
          return
        } else if (!this.formItem.category) {
          this.$message('文章类别不能为空!')
          return
        } else if (!this.formItem.content) {
          this.$message('文章内容不能为空!')
          return
        }
        // 禁用提交按钮
        this.submitLoading = true
        if (!this.formItem.abstract) {
          let reg = /<[^>]+>/g
          let abstract = this.formItem.content.replace(reg, '').replace(/(\s)/g, '').replace(/[\\'"/\b\f\n\r\t]/g, '')
          this.formItem.abstract = abstract.substr(0, 200) + '...'
        }
        saveArticleAPI(this.formItem)
          .then((res) => {
            this.$message({
              message: '文章发表成功!',
              type: 'success'
            })
            this.submitLoading = false
            this.$router.push({name: 'article-manage'})
          })
          // error统一在fetch中处理
          .catch(() => {
            this.submitLoading = false
          })
      }
    },
    mounted () {
      this.updateCategoryList()
      this.updateDate()
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.updateCategoryList()
        vm.updateDate()
      })
    },
    beforeRouteLeave (to, from, next) {
      console.log('to', to)
      console.log('from', from)
      console.log('content', this.formItem.rawContent)
      next()
    }
  }
</script>
<style scoped>
 #editor {
   margin-top: 10px;
 }
 .editor-wrap {
   overflow: hidden;
 }
  .markdown-body {
    height: 400px;
  }
  .editor-header {
    height: 42px;
  }
  .article-title {
    width: 250px;
    display: inline-block;
  }
  .commit {
    float: right;
  }
  .abstract,.article-category,.date {
    display: inline-block;
  }
  .abstract {
    width: 300px;
  }
</style>
