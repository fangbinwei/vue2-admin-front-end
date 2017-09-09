<template>
  <div>
    <div class="admin-container">
      <el-row class="wrap">
        <el-menu :default-active="defaultActive"
                 @select="selectSidebar"
                 theme="dark"
                 :collapse="sidebarCollapse"
                 class="sidebar-menu">
          <el-menu-item index="manage">
            <i class="el-icon-menu"></i>
            <span slot="title">博客管理</span>
          </el-menu-item>
          <el-menu-item index="new-article">
            <i class="el-icon-edit"></i>
            <span slot="title">新文章</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-information"></i>
            <span slot="title">用户</span>
          </el-menu-item>
          <el-menu-item index="logout" @click="logout">
            <i class="el-icon-close"></i>
            <span slot="title">退出</span>
          </el-menu-item>
        </el-menu>
        <div class="main">
          <header class="main-header">
            <div class="admin-sidebar-toggle" @click="toggleSidebar" :class="{'admin-sidebar-active': sidebarCollapse}">
              <i class="el-icon-caret-left"></i>
            </div>
            <el-breadcrumb separator="/" class="my-breadcrumb">
              <el-breadcrumb-item class="admin-breadcrumb-item"
                                  v-for="(item,index) in levelList"
                                  :key="index" :to="{path: item.path}">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <span class="admin-title">Sleepwalker</span>
          </header>
          <div class="main-container">
            <router-view></router-view>
            <div class="admin-content" v-if="adminContent">
              <img :src="adminPic" alt="首页展示图片" class="admin-pic">
            </div>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
//  import $ from 'jquery'
/* global $:true */
  export default {
    data () {
      return {
        sidebarCollapse: false,
        levelList: null,
        adminPic: require('@/..//static/img/bench_gif.gif') // static$ alias
      }
    },
    computed: {
      defaultActive () {
        return this.$route.path.split('/')[2]
      },
      adminContent () {
        return this.$route.name === 'admin'
      }
    },
    methods: {
//      showAdminContent () {
//        if (this.$route.name === 'admin') {
//          this.adminCotent = true
//        }
//      },
      toggleSidebar () {
        this.sidebarCollapse = !this.sidebarCollapse
        if (this.sidebarCollapse) {
          $('.main').stop().animate(
            {
              'margin-left': 64
            },
            {
              duration: '100',
              easing: 'swing'
            })
        } else {
          $('.main').stop().animate(
            {
              'margin-left': 150
            },
            {
              duration: 'fast',
              easing: 'swing'
            })
        }
      },
      selectSidebar (index, indexPath) {
        if (index !== 'logout') {
          this.$router.push({name: index})
        }
      },
      logout () {
        this.$store.dispatch('FedLogoutAction')
          .then(() => {
            this.$router.replace({name: 'home'})
            this.$message({
              type: 'success',
              message: '成功退出!'
            })
          })
      },
      getBreadCurmb () {
        let matched = this.$route.matched.filter((item) => {
          return item.name
          // TODO switch 将英文name转为中文?
        })
        this.levelList = matched
      }
    },
    watch: {
      $route () {
        this.getBreadCurmb()
      }
    },
    mounted () {
      this.getBreadCurmb()
    }
  }
</script>

<style>
  .wrap .sidebar-menu {
    position: fixed;
    bottom: 0;
    top: 0;
    z-index: 1501;
    overflow: hidden;
    border-radius: 5px;
  }
  .wrap .sidebar-menu:not(.el-menu--collapse) {
    width: 150px;
  }

  .main {
    margin-left: 150px;
  }
  .main-header {
    background-color: #435175;
    height: 50px;
    font-size: 1.5rem;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 5px;
  }
  .admin-sidebar-toggle {
    cursor: pointer;
    transition: all 1s;
  }
  .admin-sidebar-toggle i {
    color: #fff;
  }
  .admin-sidebar-active {
    transform: rotateY(-180deg);

  }
  .my-breadcrumb {
    padding: 0 10px;
  }
  .admin-breadcrumb-item {
    font-size: 1.1rem;
  }
  .admin-breadcrumb-item>span{
    color: #fff;
  }
  .admin-title {
    padding: 0 15px;
    position: absolute;
    right: 0;
    color: #fff;
  }
  .main-container {
    overflow: hidden;
    padding: 70px 50px 0;
    border-radius: 5px;
    /*border: 1px solid #435175;*/
    min-height: 100vh;
    margin-top: -50px;
  }
  .admin-content {
    padding-top: 300px;
    min-height: 100vh;
    background-color: #435175;
    margin: -72px -50px 0;
  }
  /*.main-container {*/
    /*overflow: hidden;*/
    /*padding: 50px 50px 0;*/
    /*border-radius: 5px;*/
    /*border: 1px solid #435175;*/
    /*min-height: 100vh;*/
  /*}*/
  /*.admin-content {*/
    /*margin: -50px -50px;*/
    /*padding-top: 150px;*/
    /*min-height: 100vh;*/
    /*background-color: #435175;*/
  /*}*/
  .admin-pic {
    display: block;
    width: 350px;
    margin: 0 auto;
  }

</style>
