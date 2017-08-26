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
        <el-menu :default-active="defaultActive" @select="selectSidebar">
          <el-menu-item index="manage"><i class="el-icon-menu"></i>博客管理</el-menu-item>
          <el-menu-item index="write"><i class="el-icon-edit"></i>写新文章</el-menu-item>
          <el-menu-item index="user"><i class="el-icon-information"></i>用户</el-menu-item>
          <el-menu-item index="logout" @click="logout"><i class="el-icon-close"></i>退出</el-menu-item>
        </el-menu>
      </el-col>
      <router-view></router-view>
    </el-row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      defaultActive () {
        return this.$route.path.split('/')[1]
      }
    },
    methods: {
      selectSidebar (index, indexPath) {
        if (index !== 'logout') {
          if (index === 'manage') {
            this.$router.push({name: 'article-manage'})
          } else {
            this.$router.push({name: index})
          }
        }
      },
      logout () {
        this.$store.dispatch('FedLogoutAction')
          .then(() => {
            this.$router.replace({name: 'login'})
            this.$message({
              type: 'success',
              message: '成功退出!'
            })
          })
      }
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1501;
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
  .sidebar {
    position: fixed;
    bottom: 0;
    top: 100px;
    z-index: 1501;
  }
  .wrap {
    margin-top: 100px;
  }
  .el-menu {
    height: 100%;
  }

</style>
