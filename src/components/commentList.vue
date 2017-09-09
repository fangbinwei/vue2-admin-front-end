<template>
  <li>
    <div class="comment-profile"><img :src="avatar" alt="comment-profile"></div>
    <div class="comment-list-wrap">
      <div class="comment-list-body">
        <div class="comment-header">
          <p class="comment-name">
            {{comment.name}}
          </p>
          <span class="comment-date">{{comment.replyTime | momentWithYear}}</span>
        </div>
        <p class="comment-content">{{comment.content}}</p>
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    props: ['comment'],
    computed: {
      avatar: function () {
        return `https://api.adorable.io/avatars/48/${this.comment.name}@adorable.io.png`
      }
    }
  }

</script>

<style scoped>
  li {
    text-align: left;
    overflow: hidden;
    margin-bottom: 2rem;
    padding: .4rem;
    display: flex;
  }

  .comment-profile {
    width: 80px;
  }
  .comment-profile img {
    border-radius: 50%;
    border: 2px solid #FFF;
    width: 48px;
    height: 48px;
    box-shadow: 0 0 5px #DDD;
  }
  .comment-list-wrap {
    width: 86%;
    background-color: #fff;
    border-radius: 0 5px 5px 5px;
    position: relative;
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,.2);
  }
  .comment-list-body {
    padding: 1rem 2rem 1rem 1rem;
    color: #666;
  }
  .comment-list-body p:last-child {
    margin-bottom: 0;
  }
  .comment-list-body:before {
    content: ' ';
    position: absolute;
    left: -13px;
    top: 0;
    border: 14px solid;
    border-color: #fff transparent transparent transparent;
  }
  .comment-header {
    display: flex;
    justify-content: space-between;
  }
  .comment-name, .comment-date {
    color: #999;
    font-weight: bold;
    font-size: 80%;
  }

</style>
