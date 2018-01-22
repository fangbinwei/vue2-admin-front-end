<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="articles" id="articles">
            <article>
              <div class="article-header">
                <h2 class="article-title">
                  {{articleData.title}}
                </h2>
              </div>
              <div class="row">
                <div class="col-md-auto">
                  <span class="pub-time">{{articleData.createTime | momentWithYear}}</span>
                </div>
                <div class="col-md-4">
                  <!--<span class="views-count">阅读 0</span>-->
                  <!--<a class="article-category" href="">{{articleData.category}}</a>-->
                  <router-link class="article-category"
                               v-if="articleData.category"
                               :to="{name: 'categoryDetail', params: {category:articleData.category}}">{{articleData.category}}</router-link>
                </div>
              </div>
              <div class="article-content">
                <div v-html="articleData.content" class="markdown-content" v-highlight></div>
              </div>
            </article>
            <div class="comment" 
                 v-if="showComment">
              <comment :articleId="$route.query.id"></comment>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  import Comment from '@/components/comment'
  import {queryArticleAPI} from '@/api/article'
  export default {
    components: {
      Comment
    },
    data () {
      return {
        articleData: {},
        showComment: false
      }
    },
    methods: {
      updateArticleData () {
        queryArticleAPI({id: this.$route.query.id})
          .then((res) => {
            this.articleData = res.data.result
            this.showComment = true
          })
          .catch(() => {
          })
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.updateArticleData()
        // window.scrollTo(0, 0)
        // let rec = document.getElementById('articles').getBoundingClientRect()
        // let anchor = rec.top + window.pageYOffset
        // window.scrollTo(0, anchor - 20)
      })
    }
  }
</script>
<style  lang="stylus">
  @import "./stylus/_settings.styl"
  .article-content
    /*font-size: 15px*/
    margin-top 1rem
    padding-top 1.5rem
    border-top 1px solid rgba(202,202,202,.5)
  .markdown-content
    img
      max-width 100%
    span.light
      color $light
    span.info
      font-size .85em
      display inline-block
      vertical-align middle
      width 280px
      margin-left 20px
    h1
      margin .8em 0
      /*font-size 2em*/
    h2
      margin .8em 0
      padding-bottom 0
      /*font-size: 1.5em*/
      border-bottom none
      a
        color $dark
        &:hover
          border-bottom 2px solid $green
    h3
      margin 3em 0 1.2em
      /*font-size: 1.17em*/
      position relative
      &:before
        content "#"
        color $green
        position absolute
        left -0.7em
        top -2px
        font-size 1.2em
        font-weight bold
    h4
      color $light
      margin 1.2em 0
    .post-list, .post
      padding 1em 0 2em
      border-bottom 1px solid $border
    .post
      h2
        margin 2em 0 0.8em;
        padding-bottom 0.7em
        border-bottom 1px solid #ddd
    figure, p, ul, ol
      margin 1.2em 0
    p
      word-spacing 0.05em
    p, ul, ol
      line-height 1.6em
    ul, ol
      padding-left 1.5em
    a
      color $green
      font-weight 600
    blockquote
      margin 2em 0
      padding-left 20px
      border-left 4px solid $green
      p
        font-weight 600
        margin-left 0
        overflow auto
        // word-wrap break-word
    iframe
      margin 1em 0
    p.tip
      padding 12px 24px 12px 30px
      margin 2em 0
      border-left 4px solid $red
      background-color $codebg
      position relative
      border-bottom-right-radius $radius
      border-top-right-radius $radius
      &:before
        position absolute
        top 14px
        left -12px
        background-color $red
        color #fff
        content "!"
        width 20px
        height 20px
        border-radius 100%
        text-align center
        line-height 20px
        font-weight bold
        font-family $logo-font
        font-size 14px
    pre
      position relative
      background-color $codebg
      padding .8em .8em .4em
      line-height 1.1em
      border-radius $radius
      code
        overflow-x auto
        display block
        padding 1.2em 1.4em
        line-height 1.5em
        margin 0
        color #525252
        border-radius 0
        white-space pre
        &.lang-html, &.lang-js, &.lang-bash, &.lang-css, &.lang-java
          &:after
            position absolute
            top 0
            right 0
            color #ccc
            text-align right
            font-size .75em
            padding 5px 10px 0
            line-height 15px
            height 15px
            font-weight 600
        &.lang-html:after
          content 'HTML'
        &.lang-js:after
          content 'JS'
        &.lang-bash:after
          content 'Shell'
        &.lang-css:after
          content 'CSS'
        &.lang-java:after
          content 'Java'

  .copyright
    color $light
    font-size 1em
    text-align center
    padding 0 20px 30px
    margin-top 30px
</style>
