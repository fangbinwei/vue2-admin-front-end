<template>
  <div>
    <div class="comment-box">
      <div class="loader" v-show="loading">
        <span class="comment-spinner">
        </span>
      </div>

      <div class="comment-form">
        <textarea id="comment-content"
                  rows="3"
                  placeholder="请输入评论"
                  v-model.trim="comment.content"></textarea>
        <input type="text"
               id="comment-name"
               v-model.trim="comment.name"
               placeholder="请输入你的昵称"
               autocomplete="off"
               @keydown.enter="submit">
        <button :disabled="loading"
                type="button"
                @click="submit">Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Validator} from '@/utils/validator'
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        comment: {
          content: '',
          name: ''
        }
      }
    },
    methods: {
      submit () {
        let {content, name} = this.comment
        let comment = {
          content,
          name
        }
        // TODO 表单验证还需要完善
        let errorMsg = this.contentValidatorFunc() || this.nameValidatorFunc()
        if (errorMsg) {
          this.$message(errorMsg)
        } else {
          this.comment.content = ''
          this.$emit('commented', comment)
        }
      },
      contentValidatorFunc () {
        let validator = new Validator()
        let self = this
        validator.add(self.comment.content, 'isNoEmpty', '请输入评论内容!')
        validator.add(self.comment.content, 'maxLength:150', '评论太长了!')
        let errorMsg = validator.start()
        if (errorMsg) document.getElementById('comment-content').focus()

        return errorMsg
      },
      nameValidatorFunc () {
        let validator = new Validator()
        let self = this
        validator.add(self.comment.name, 'isNoEmpty', '请输入昵称!')
        validator.add(self.comment.name, 'maxLength:15', '昵称太长了!')
        let errorMsg = validator.start()
        if (errorMsg) document.getElementById('comment-name').focus()

        return errorMsg
      }
    }
  }
</script>

<style scoped>
  .comment-box {
    background-color: rgba(220,220,220,.5);
    width: 100%;
    position: relative;
    border-radius: 10px;
  }
  .comment-form {
    padding: 1rem;
  }
  .comment-box input, .comment-box textarea {
    width: 97.3%;
    padding: .6em;
    border: 1px solid #EEE;
    background-color: #f7f7f7;
    display: block;
    margin-bottom: 1em;
    transition: all ease 0.3s;
  }
  .comment-box input:focus, .comment-box textarea:focus {
    border-color: #47b784;
    outline: none;
    box-shadow: inset 0 0 3px #DDD;
  }
  #comment-content {
    height: 100px;
    resize: none;
  }
  button {
    margin-bottom: 0;
    background-color: #47b784;
    color: #FFF;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    padding: 0.2rem 0.8rem;
  }
  button:focus {
    background-color: #36495d;
  }
  button:disabled {
    opacity: 0.6;
  }

  .comment-box .spinner {
    margin-top: 5em;
    z-index: 999;
  }
  .comment-box .loader {
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
  /*@keyframes sk-rotateplane {*/
    /*0% {*/
      /*transform: perspective(120px) rotateX(0deg) rotateY(0deg);*/
      /*-webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);*/
      /*background-color: #47b784;*/
    /*} 50% {*/
        /*transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);*/
        /*-webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);*/
        /*background-color: #36495d;*/
      /*} 100% {*/
          /*transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);*/
          /*-webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);*/
          /*background-color: #47b784;*/
        /*}*/
  /*}*/

</style>
