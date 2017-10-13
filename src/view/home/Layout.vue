<template>
  <div class="layout">
    <div class="header-box">
      <header>
        <div class="container-fluid">
          <nav class="navbar navbar-expand-sm navbar-light py-1">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <h2 id="header-title" 
                class="navbar-brand mb-0 " 
                @click="backToHome">Sleepwalker</h2>
            <div class="collapse navbar-collapse justify-content-sm-end" id="navbarSupportedContent">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link :to="{name: 'home'}"
                               class="nav-link"
                               active-class="active">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-zhuye"></use>
                    </svg>
                    首页
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{name: 'category'}"
                               class="nav-link"
                               active-class="active">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-fenlei"></use>
                    </svg>
                    分类
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{name: 'archive'}"
                               class="nav-link"
                               active-class="active">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-guidang"></use>
                    </svg>
                    归档
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{name: 'about'}"
                               class="nav-link"
                               active-class="active">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-guanyu"></use>
                    </svg>
                    关于
                  </router-link>
                </li>
                <li class="nav-item" >
                  <router-link :to="{name: 'admin'}"
                               class="nav-link"
                               active-class="active">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-guanli"></use>
                    </svg>
                    管理
                  </router-link>
                  <!--<a class="nav-link disabled" href="#">-->
                    <!--<svg class="icon" aria-hidden="true">-->
                      <!--<use xlink:href="#icon-tuxiangchulileiiconshuchu08"></use>-->
                    <!--</svg>-->
                    <!--相册</a>-->
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
    <div class="header-image container-fluid px-0">
      <img  :src="image.header" alt="header-image">
    </div>
    <main>
      <transition name="slide-left" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <footer>
      <div class="footer-information" :style="{backgroundImage: 'url(' + image.footer + ')'}">
        <p>Posted by: Fang Binwei</p>
        <p>Contact information: fangbinweiATqq.com</p>
        <a href="http://www.miitbeian.gov.cn" style="text-decoration: none; color: black">浙ICP备17037713号-1</a>
      </div>

    </footer>
    <!--<my-sidebar></my-sidebar>-->
    <!--TODO back-to-top封装成组件-->
    <div class="back-to-top d-none d-sm-block "
         :class="showBackToTop"
         @click="backToTop">
      <svg class="icon arrow-up" aria-hidden="true" >
        <use xlink:href="#icon-top-copy"></use>
      </svg>
    </div>
  </div>
</template>
<script>
/* global $:true */
  import MySidebar from '@/components/sidebar'
  export default {
    components: {
      MySidebar
    },
    data () {
      return {
        showBackToTop: {
          'back-to-top-on': false
        },
        threshold: 50,
        pageYOffset: window.pageYOffset,
        image: {
          header: require('@/../static/img/blogheader.jpg'),
          footer: require('@/../static/img/blogfooter.jpg')
        }
      }
    },
    methods: {
      handleShowBackToTop () {
        switch (window.pageYOffset > this.threshold) {
          case true:
            this.showBackToTop['back-to-top-on'] = true
            break
          case false:
            this.showBackToTop['back-to-top-on'] = false
        }
      },
      backToTop () {
        let $body = $('body, html')
        $body.stop().animate({
          scrollTop: 0
        }, 200)
      },
      backToHome () {
        this.$router.push({name: 'home'})
      }
    },
    mounted () {
      $(window).on('scroll', this.handleShowBackToTop)
    }
  }

</script>
<style>
  .slide-left-enter-active, .slide-left-leave-active {
    transition: all .2s ease;
  }
  .slide-left-enter {
    opacity: 0;
  }
  .slide-left-leave-to {
    opacity: 0;
    transform: translate(150px,0);
  }
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  h1 {
    font-size: 2rem !important;
  }
  h2 {
    font-size: 1.5rem !important;
  }
  h3 {
    font-size: 1.17rem !important;
  }
  #nprogress {
    position: relative;
    z-index: 9999999;
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  /* back to top */
  .arrow-up{
    color: #fff;
  }
  .back-to-top{
    background: #222;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    position: fixed;
    z-index: 1050;
    right: 30px;
    cursor: pointer;
    transition-property: bottom;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    bottom: -100px;
  }
  .back-to-top.back-to-top-on{
    bottom: 19px;
  }
  .layout {
    /*background-color: #eaf7fd;*/
  }

  #header-title {
    cursor: pointer;
  }
  @media (max-width: 991px) {
    body {
      padding-right: 0 !important;
    }
  }
  .nav-link {
    webkit-transition: background-color 0.3s;
    -moz-transition: background-color 0.3s;
    -o-transition: background-color 0.3s;
    transition: background-color 0.3s;
  }
  .nav-link:hover {
    background-color: rgba(221,221,221,.2);
  }
  header {
    background-color: rgba(210,239,247,.7);
    display: block;
  }
  .header-box {
    /*height: 48px;*/
    position: relative;
  }

  .header-image>img {
    width: 100%;
    height: auto;
  }
  .header-image {
    margin-bottom: 1rem;
    overflow: hidden;
  }
  @media (min-width: 576px) {
    .header-image {
      margin-top: -54px;
      margin-bottom: 1rem;
      overflow: hidden;
    }
    header {
      background-color: rgba(0,0,0,0.2);
      /*background-color: rgba(210,239,247,.7);*/
      display: block;
    }
  }
  main {
    min-height: 100vh;
  }
  .articles>article {
    overflow: hidden;
    background-color: #fff;
    padding: 1rem 1rem 0 2rem;
    margin-bottom: 1rem;
    box-shadow:1px 1px 1px #ddd;
    border: 1px solid #eee;

  }
  .article-category{
    background: #df2d4f;
    padding: 0.3rem 0.6rem;
    margin: 0 1em;
    color: #fff;
    font-size: 0.8rem;
    text-decoration: none;
  }
  .article-category:hover{
    color: #000;
    text-decoration: none;
  }
  .article-title>a {
    text-decoration: none;
    color: #41684d;
    /*color: #42b983;*/
  }
  .article-title>a:hover{
    color: #000;
    text-decoration: none;
  }

  .pub-time .views-count {
    color: #99ad9f;
    font-size: 1rem;
  }
  .pub-time {
    font-weight: 600;
  }
  .article-excerpt {
    margin-top: 1rem;
    padding-top: 1.5rem;
    text-indent: 2em;

  }

  /* -------footer----- */
  .footer-information {
    text-align: center;
    padding-top: 60px;
    padding-bottom: 40px;
    font-size: 85%;
    margin-top: 4rem;
    /*background-image: url(image/bloga.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-position: center;*/
  }

</style>
