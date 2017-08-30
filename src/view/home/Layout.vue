<template>
  <div class="layout">
    <div class="header-box">
      <header>
        <div class="container-fluid">
          <nav class="navbar  navbar-expand-sm navbar-light py-1">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <h1 class="navbar-brand mb-0 ">Sleepwalker</h1>
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
                  <a class="nav-link disabled" href="#">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-tuxiangchulileiiconshuchu08"></use>
                    </svg>
                    相册</a>
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
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footer>
      <div class="footer-information" :style="{backgroundImage: 'url(' + image.footer + ')'}">
        <p>Posted by: Fang Binwei</p>
        <p>Contact information: fangbinweiATqq.com</p>
      </div>

    </footer>

    <div class="sidebar-toggle d-none d-sm-block">
      <div class="sidebar-toggle-line-wrap">
        <span class="sidebar-toggle-line sidebar-toggle-line-first" ></span>
        <span class="sidebar-toggle-line sidebar-toggle-line-middle" ></span>
        <span class="sidebar-toggle-line sidebar-toggle-line-last"></span>
      </div>
    </div>
    <aside id="sidebar" class="sidebar d-md-none">
      <div class="container sidebar-content">
        <div class="row">
          <div class="col">
            <div class="sidebar-image">
              <img src="http://i1.piimg.com/567571/d5b3c0f3ca1250fd.jpg" alt="profile-image" />
            </div>
            <span>方宾伟</span>
          </div>
        </div>
        <div class="row justify-content-center sidebar-nav">
          <div class="col-3 sidebar-nav-post">
            <a href="#">
              <span class="item-count">64</span>
              <span>日志</span>
            </a>
          </div>
          <div class="col-3 sidebar-nav-category">
            <a href="#">
              <span class="item-count">64</span>
              <span>分类</span>
            </a>
          </div>
          <div class="col-3 sidebar-nav-photo">
            <a href="#">
              <span class="item-count">63</span>
              <span>相册</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
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
  export default {
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
        let $body = $('body')
        $body.stop().animate({
          scrollTop: 0
        }, 200)
      }
    },
    mounted () {
      $(window).on('scroll', this.handleShowBackToTop)
    }
  }

</script>
<style>
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
  /* sider-toggle */
  .sidebar-toggle {
    width: 24px;
    height: 24px;
    padding: 5px;
    background: #222;
    position: fixed;
    z-index: 1050;
    right: 30px;
    bottom: 45px;
    cursor: pointer;
    line-height: 0;

  }
  .sidebar-toggle-line{
    width: 100%;
    background: #fff;
    height: 2px;
    display: inline-block;
    vertical-align: top;
    margin-top: 3px;
    position: relative;
  }
  .sidebar-toggle-line:first-child {
    margin-top: 0;
  }
  /* sidebar */
  .sidebar {
    width: 0px;
    position: fixed;
    background: #222;
    top: 0;
    bottom: 0;
    right: 0;
  }
  .sidebar-content {
    text-align: center;
    margin-top: 3.5rem;
    display: none;
  }
  .sidebar-image{
    display: block;
    width: 7.5rem;
    height: 7.5rem;
    overflow: hidden;
    border-radius: 10%;
    margin: 0 auto;
    background: rgba(250, 214, 195, 1);
    border: 4px solid rgba(250, 214, 195, 1);
  }
  .sidebar-image + span {
    margin-top: 0.3rem;
    color: #eee;
    display: block;
  }
  .sidebar-image img {
    max-width: 100%;
    border-radius: 10%;
    filter: grayscale(0);
    -webkit-transition: filter 0.3s;
    -moz-transition: filter 0.3s;
    -o-transition: filter 0.3s;
    transition: filter 0.5s;

  }
  .sidebar-image img:hover{
    filter: grayscale(100%);
  }
  .sidebar-nav{
    text-align: center;
    margin-top: 1rem;
  }
  .sidebar-nav span{
    margin-top: 0.5rem;
    font-weight: normal;
    display: block;
  }
  .sidebar-nav a{
    text-decoration: none;
    color: #999;
  }
  .sidebar-nav a:hover{
    color: #eee;
  }
  .sidebar-nav-post {
    border-right: 1px solid #333;
  }
  .sidebar-nav-category {
    border-right: 1px solid #333;
  }
  .item-count {
    display: block;
  }
  .layout {
    /*background-color: #eaf7fd;*/
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
    /*background-color: rgba(234,247,253,0.8);*/
    background-color: rgba(0,0,0,0.2);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1050;
    display: block;
  }
  .header-box {
    height: 48px;
    position: relative;
  }
  @media (max-width: 767px) {
    header {
      position: relative !important;
    }
    .header-box {
      height: auto !important;
    }
  }

  .header-image>img {
    width: 100%;
    height: auto;
  }
  .header-image {
    margin-top: -48px;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  .articles>article {
    overflow: hidden;
    background-color: #fff;
    padding: 1rem 1rem 0 2rem;
    margin-bottom: 1rem;
    box-shadow:1px 1px 1px #aaa;

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
  }
  .article-title>a:hover{
    color: #000;
  }

  .pub-time .views-count {
    color: #99ad9f;
    font-size: 1rem;
  }
  .pub-time {
  }
  .article-content {
    margin-top: 1rem;
    padding-top: 1.5rem;
    text-indent: 2em;
    border-top: 1px solid black;
  }
  .article-excerpt {
    margin-top: 1rem;
    padding-top: 1.5rem;
    text-indent: 2em;

  }

  /* read more */
  .read-more {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
    word-spacing: 1px;
    letter-spacing: 0.01em;
    text-align: center;
    margin-top: 20px;
  }
  .cl-effect-14 a {
    padding: 0 20px;
    height: 45px;
    line-height: 45px;
    position: relative;
    display: inline-block;
    margin: 0.5rem;
    letter-spacing: 1px;
    font-weight: 400;
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
    color: rgb(0,0,0);
    text-decoration: none;
  }

  .cl-effect-14 a::before,
  .cl-effect-14 a::after {
    position: absolute;
    width: 45px;
    height: 1px;
    background: #C3C3C3;
    content: '';
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    pointer-events: none;
  }

  .cl-effect-14 a::before {
    top: 0;
    left: 0;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    transform-origin: 0 0;
  }

  .cl-effect-14 a::after {
    right: 0;
    bottom: 0;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-transform-origin: 100% 0;
    -moz-transform-origin: 100% 0;
    transform-origin: 100% 0;
  }

  .cl-effect-14 a:hover::before,
  .cl-effect-14 a:hover::after,
  .cl-effect-14 a:focus::before,
  .cl-effect-14 a:focus::after {
    background: #000;
  }

  .cl-effect-14 a:hover::before,
  .cl-effect-14 a:focus::before {
    left: 50%;
    -webkit-transform: rotate(0deg) translateX(-50%);
    -moz-transform: rotate(0deg) translateX(-50%);
    transform: rotate(0deg) translateX(-50%);
  }

  .cl-effect-14 a:hover::after,
  .cl-effect-14 a:focus::after {
    right: 50%;
    -webkit-transform: rotate(0deg) translateX(50%);
    -moz-transform: rotate(0deg) translateX(50%);
    transform: rotate(0deg) translateX(50%);
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
