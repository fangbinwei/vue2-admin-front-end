<template>
  <div>
    <div class="editor-wrap">
      <div class="editor-header">
        <div class="article-title">
          <el-input v-model="formItem.title" placeholder="文章标题"></el-input>
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
            v-model="selectedCate"
            filterable
            allow-create
            placeholder="请选择文章标签">
            <el-option
              v-for="item in cateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button type="success" class="commit" @click="submit">发表博客</el-button>
      </div>
      <div id="editor">
        <mavon-editor @save="save" @change="change"></mavon-editor>
      </div>
    </div>
  </div>
</template>
<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import axios from 'axios'
  export default {
    data () {
      return {
        formItem: {
          title: '',
          createTime: new Date(),
          abstract: '',
          content: '',
          draft: ''
        },
        cateOptions: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        selectedCate: ''
      }
    },
    components: {
      mavonEditor
    },
    methods: {
      save (value, render) {
        console.log('value', value)
        console.log('render', render)
      },
      change (value, render) {
        this.formItem.content = render
        this.formItem.abstract = value
        console.log('content', this.formItem.content)
      },
      submit () {
        axios.post('/api/saveArticle', this.formItem)
          .then((res) => {
            console.log('response', res)
          })
          .catch((err) => {
            console.log('error', err)
          })
      }
    }
  }
</script>
<style scoped>
 #editor, .editor-header {
   width: 85%;
   float: right;
 }
 .editor-wrap {
   overflow: hidden;
 }
  .markdown-body {
    height: 400px;
  }
  .editor-header {
    margin-bottom: 5px;
  }
  .article-title {
    width: 300px;
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
