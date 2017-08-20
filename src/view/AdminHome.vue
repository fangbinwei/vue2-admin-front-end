<template>
  <div class="container">
    <header>
      <el-row>
        <el-col :span="4">
          <h2 class="title">
            Sleep
          </h2>
        </el-col>
      </el-row>
    </header>
    <el-row class="wrap">
      <el-col :span="3" :offset="0" class="sidebar">
        <el-menu default-active="manage" @select="selectSidebar">
          <el-menu-item index="manage"><i class="el-icon-menu"></i>博客管理</el-menu-item>
          <el-menu-item index="editor"><i class="el-icon-edit"></i>写新文章</el-menu-item>
          <el-menu-item index="user"><i class="el-icon-information"></i>用户</el-menu-item>
          <el-menu-item index="logout"><i class="el-icon-close"></i>退出</el-menu-item>
        </el-menu>
      </el-col>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        default: 'manage'
      }
    },
    methods: {
      selectSidebar (index, indexPath) {
        if (index === 'manage') {
          this.$router.push({name: 'article-manage'})
        } else if (index !== 'logout') {
          this.$router.push({name: index})
        }
      }
    },
    mounted () {
      this.$router.push({name: 'article-manage'})
    }
  }
</script>

<style>
  * {
    /*background-color: rgba(0,0,0,0.1);*/
  }
  header {
    background-color: rgb(32, 160, 255);
    height: 80px;
  }
  .container {
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
  }
  .title {
    padding: 0 15px;
  }
  .wrap{
    margin-top: 20px;
  }
  .sidebar {
    position: fixed;
    bottom: 0;
    top: 100px;
  }
  .el-menu {
    height: 100%;
  }

</style>
