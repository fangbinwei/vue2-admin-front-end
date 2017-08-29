<template>
  <div>
    <el-col :span="24" class="editor-wrap">
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
        <el-button type="success"
                   class="commit"
                   @click="submit(false)"
                   :loading="submitLoading">{{ buttonText }}</el-button>
        <el-button type="danger"
                   class="commit"
                   @click="submit(true)"
                   :loading="submitDraftLoading">保存草稿</el-button>
      </div>
      <div id="editor">
        <mavon-editor @save="save" @change="change" :value="articleInitValue"></mavon-editor>
      </div>
    </el-col>
  </div>
</template>
<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import {saveArticleAPI, getArticleCategoryAPI, queryArticleAPI} from '@/api/article'
  export default {
    components: {
      mavonEditor
    },
    data () {
      return {
        id: '',
        buttonText: '发表文章',
        articleInitValue: '',
        submitLoading: false,
        submitDraftLoading: false,
        formItem: {
          title: '',
          createTime: Date.now(),
          abstract: '',
          content: '',
          rawContent: '',
          draft: false,
          category: ''
        },
        categoryOptions: [],
        submitted: false
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
      saveArticle (formItem) {
        saveArticleAPI(formItem)
          .then((res) => {
            this.submitLoading = false
            // 设置submitted 让routerleave 知道文章已经提交,不需要保存草稿
            this.submitted = true
            this.$message({
              message: '文章发表成功!',
              type: 'success'
            })
            this.$router.push({name: 'article-manage'})
          })
          // error统一在fetch中处理
          .catch(() => {
            this.submitLoading = false
          })
      },
      saveDraft (formItem) {
        saveArticleAPI(formItem)
          .then((res) => {
            this.submitDraftLoading = false
            // 设置submitted 让routerleave 知道草稿已经提交,不需要保存草稿
            this.submitted = true
            this.$message({
              message: '草稿保存成功!',
              type: 'success'
            })
            this.$router.push({name: 'draft-manage'})
          })
          // error统一在fetch中处理
          .catch(() => {
            this.submitDraftLoading = false
          })
      },
      submit (draftFlag) {
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
        if (!this.formItem.abstract) {
          let reg = /<[^>]+>/g
          let abstract = this.formItem.content.replace(reg, '').replace(/(\s)/g, '').replace(/[\\'"/\b\f\n\r\t]/g, '')
          this.formItem.abstract = abstract.substr(0, 200) + '...'
        }
        // 若id存在,说明是修改文章
        if (this.id) {
          Object.assign(this.formItem, {id: this.id})
        }
        if (draftFlag) {
          // 保存草稿
          this.formItem.draft = true
          this.submitDraftLoading = true
          this.saveDraft(this.formItem)
        } else {
          // 发表文章
          this.formItem.draft = false
          this.submitLoading = true
          this.saveArticle(this.formItem)
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vue) => {
        // TODO 数据获取期间显示进度条
        vue.updateCategoryList()
        vue.updateDate()
//        vue.submitted = false  如果router-view被keep-alive包括 则需要这句
        // 判断是否是编辑文章
        let id = vue.$route.query.id
        if (id) {
          vue.id = id
          queryArticleAPI({id: id})
            .then((res) => {
              vue.formItem = res.data.result
              vue.articleInitValue = vue.formItem.rawContent
            })
            .catch(() => {
            })
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      // TODO 离开前保存草稿 自动保存草稿
      // 已经提交,不用保存草稿
      if (this.submitted) {
        next()
      } else {
        switch (!!this.formItem.content) {
          case true:
            this.$confirm('离开前是否需要保存草稿?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              closeOnClickModal: false,
              closeOnPressEscape: false,
              type: 'warning'
            })
              .then(() => {
                next(false)
                this.formItem.draft = true
                this.submit(true)
              })
              .catch(() => {
                next()
              })
            break
          case false:
            next()
        }
      }
    }
//    mounted () {
//      this.updateCategoryList()
//      this.updateDate()
//    }
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
  }
  .article-title {
    width: 250px;
    display: inline-block;
  }
  .commit {
    float: right;
    margin-left: 20px;
  }
  .abstract,.article-category,.date {
    display: inline-block;
  }
  .article-category {
    width: 150px;
  }
  .abstract {
    width: 250px;
  }
</style>
