<template>
  <el-col :span="20" :offset="4" class="main">
    <el-tabs value="article-manage" @tab-click="tabClick">
      <el-tab-pane label="文章管理" name="article-manage">
        <router-view name="articleManage"></router-view>
      </el-tab-pane>
      <el-tab-pane label="类别管理" name="category-manage">
        <router-view name="categoryManage"></router-view>
      </el-tab-pane>
      <el-tab-pane label="评论管理" name="comment-manage">
        <router-view name="commentManage"></router-view>
      </el-tab-pane>
      <el-tab-pane label="博客配置" name="blog-manage">
        <router-view name="blogManage"></router-view>
      </el-tab-pane>
      <el-tab-pane label="草稿箱" name="draft-manage">
        <router-view name="draftManage"></router-view>
      </el-tab-pane>
      <el-tab-pane label="回收站" name="recycle-manage">
        <router-view name="recycleManage"></router-view>
      </el-tab-pane>
    </el-tabs>
  </el-col>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      tabClick (tabPanInstance) {
        this.$router.push({name: 'manage-nav'})
      }
    }
  }

</script>
<style scoped>
</style>
