<template>
  <div class="comment-component">
    <comment-form @commented="commentedHandle"
                  :loading="formLoading"></comment-form>
    <div class="comment-list">
      <div class="loader" v-show="commentLoading">
        <span class="comment-spinner">
        </span>
      </div>
      <!--<span class="spinner" v-show="commentLoading"></span>-->
      <ul>
        <div class="comment-empty" v-if="!commentList.length">
          暂无评论
        </div>
        <div class="comment-count" v-if="commentList.length">
          共{{commentCount}}条评论
        </div>
        <comment-list v-for="(item, index) in commentList"
                      :key="index"
                      :comment="item"></comment-list>
      </ul>
    </div>
  </div>
</template>

<script>
  import CommentForm from '@/components/commentForm'
  import CommentList from '@/components/commentList'
  import {saveCommentAPI, getCommentAPI} from '@/api/article'
  export default {
    components: {
      CommentForm,
      CommentList
    },
    props: {
      articleId: ''
    },
    data () {
      return {
        formLoading: false,
        commentLoading: true,
        commentData: {},
        commentList: [],
        commentCount: 0
      }
    },
    methods: {
      commentedHandle (data) {
        this.formLoading = true
        this.commentData = {
          articleId: this.articleId,
          replyId: '',
          name: data.name,
          content: data.content
        }
        saveCommentAPI(this.commentData)
          .then((res) => {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.updateCommentList()
            this.formLoading = false
          })
          .catch(() => {
            this.formLoading = false
          })
      },
      updateCommentList () {
        this.commentLoading = true
        getCommentAPI({articleId: this.articleId})
          .then((res) => {
            console.log('updateCommentnList res', res)
            this.commentList = res.data.result.doc
            this.commentCount = res.data.result.total
            this.commentLoading = false
          })
          .catch(() => {
            this.commentLoading = false
          })
      }
    },
    mounted () {
      this.updateCommentList()
    }
  }
</script>

<style>
  .comment-component {
    /*background-color: rgba(200,200,200,.5);*/
    /*border-radius: 3px;*/
    /*background: #ffffff;*/
    /*background: -moz-radial-gradient(center, ellipse cover,  #ffffff 0%, #ededed 100%);*/
    /*background: -webkit-radial-gradient(center, ellipse cover,  #ffffff 0%,#ededed 100%);*/
    /*background: radial-gradient(ellipse at center,  #ffffff 0%,#ededed 100%);*/
    /*background-attachment: fixed;*/
  }
  .comment-list {
    padding: 1rem 0 0 0;
    position: relative;
  }
  .comment-list ul {
    list-style: none;
    padding: 1rem;

    background-color: rgba(220,220,220,.5);
    border-radius: 10px;
  }
  .comment-list .comment-spinner {
    margin-top: 5em;
    z-index: 999;
  }
  .comment-list .loader {
    text-align: center;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 2;
  }
  .comment-empty, .comment-count {
    color: #1f7199;
    font-weight: bold;
    margin-bottom: 2rem;
    padding-left: 0.4rem;
  }
  .comment-spinner {
    width: 20px;
    height: 20px;
    background-color: #47b784;
    display: inline-block;
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
  }
  @keyframes sk-rotateplane {
    0% { -webkit-transform: perspective(120px) }
    50% { -webkit-transform: perspective(120px) rotateY(180deg) }
    100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
  }

</style>
