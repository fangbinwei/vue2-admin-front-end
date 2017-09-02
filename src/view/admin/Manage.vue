<template>
  <div>
    <div class="manage-wrap">
      <el-col :span="24">
        <el-tabs  @tab-click="tabClick" :value="defaultActive">
          <el-tab-pane label="文章管理" name="article-manage">
          </el-tab-pane>
          <el-tab-pane label="类别管理" name="category-manage">
          </el-tab-pane>
          <el-tab-pane label="评论管理" name="comment-manage">
          </el-tab-pane>
          <el-tab-pane label="博客配置" name="blog-manage">
          </el-tab-pane>
          <el-tab-pane label="草稿箱" name="draft-manage">
          </el-tab-pane>
          <!--<el-tab-pane label="回收站" name="recycle-manage">-->
          <!--</el-tab-pane>-->
        </el-tabs>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </div>

    </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      tabClick (tabPanInstance) {
        this.$router.push({name: tabPanInstance.name})
      }
    },
    computed: {
      defaultActive () {
        return this.$route.path.split('/').reverse()[0]
      }
    }
  }

</script>
<style scoped>
  .manage-wrap {
    overflow: hidden;
  }
</style>
