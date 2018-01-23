<template>
  <div class="layout">
    <div class="header-box">
      <header :class="showNav">
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
    <div class="header-image-mobile container-fluid px-0">
      <img  :src="image.header" alt="header-image-mobile">
    </div>
    <div class="header-image container-fluid px-0" 
         v-show="$route.name === 'home'" 
         :class="headerImageClass">
         <div class="header-image-wait" 
              :class="headerImageWaitClass"></div>
    </div>
    <main :class="{'main-sidebar': showSidebar}">
      <transition name="slide-left" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </main>
    <footer>
      <!-- <div class="footer-information" :style="{backgroundImage: 'url(' + image.footer + ')'}"> -->
      <div class="footer-information">
        <p>Posted by: Fang Binwei</p>
        <p>Contact information: fangbinweiATqq.com</p>
        <a href="http://www.miitbeian.gov.cn" style="text-decoration: none; color: black">浙ICP备17037713号-1</a>
      </div>

    </footer>
    <back-to-top :showBackToTop="showBackToTop"></back-to-top>
    <my-sidebar @sidebarStatus="sidebarHandle" 
                :articleTotal="articleTotal" 
                :categoryTotal="categoryTotal"></my-sidebar>
  </div>
</template>
<script>
/* global $:true */
import MySidebar from '@/components/sidebar'
import BackToTop from '@/components/backToTop'
import {mapState} from 'vuex'

export default {
  components: {
    MySidebar,
    BackToTop
  },
  data () {
    return {
      showBackToTop: false,
      showNav: {
        'head-nav-hide': false,
        'head-nav-show': false
      },
      showSidebar: false,
      // scroll threshold
      threshold: 50,
      beforeScroll: window.pageYOffset,
      scrollUp: false,
      image: {
        header: require('@/../static/img/blogheader.jpg'),
        footer: require('@/../static/img/blogfooter.jpg')
      },
      headerImageClass: {
        'header-image-animation': false
      },
      headerImageWaitClass: {
        'header-image-wait-animation': false
      }
    }
  },
  computed: {
    ...mapState({
      articleTotal: state => state.article.articleTotal,
      categoryTotal: state => state.article.categoryTotal
    })
  },
  methods: {
    scrollHandle (e) {
      // scroll up or down
      let afterScroll = window.pageYOffset
      let delta = afterScroll - this.beforeScroll
      delta < 0 ? (this.scrollUp = true) : (this.scrollUp = false)
      this.beforeScroll = afterScroll

      // button of backing to top and head nav
      this.scrollToDo(e)
    },
    scrollToDo (e) {
      switch (window.pageYOffset > this.threshold) {
        case true:
        // back-to-top button
          this.showBackToTop = true
          // nav
          this.showNav['head-nav-hide'] = true
          this.scrollUp
            ? (this.showNav['head-nav-show'] = true)
            : (this.showNav['head-nav-show'] = false)
          break
        case false:
        // back-to-top button
          this.showBackToTop = false
          // nav
          this.showNav['head-nav-hide'] = false
          this.showNav['head-nav-show'] = false
      }
    },
    backToHome () {
      this.$router.push({ name: 'home' })
    },
    sidebarHandle (sidebarStatus) {
      this.showSidebar = sidebarStatus
    },
    updateSidebarData () {
      this.$store.dispatch('getTotal')
        .then()
        .catch((err) => {
          console.log(err)
        })
    },
    imageLazyLoad (media, url, callback) {
      if (window.matchMedia(media).matches) {
        let headerImage = new Image()
        headerImage.src = url
        headerImage.onload = () => {
          callback.apply(this)
        }
      }
    }
  },
  created () {
    this.updateSidebarData()
    this.imageLazyLoad('(min-width: 768px)', '/static/img/seasons.jpg', function () {
      this.headerImageWaitClass['header-image-wait-animation'] = true
      this.headerImageClass['header-image-animation'] = true
    })
  },
  mounted () {
    $(window)
      .off('scroll')
      .on('scroll', this.scrollHandle)
  }
}
</script>
<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease;
}
.slide-left-enter {
  opacity: 0;
  transform: translate(-150px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(150px, 0);
}
/* global */
html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 15px;
}
@media (min-width: 576px) {
  html {
    font-size: 16px;
  }
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
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
/* layout */
/* .layout {
    background-color: rgb(226,226,226);
    background-image: url('/static/img/preloadbase.gif')
  } */

/* header */
#header-title {
  cursor: pointer;
}
.nav-link {
  -webkit-transition: background-color 0.3s;
  -moz-transition: background-color 0.3s;
  -o-transition: background-color 0.3s;
  transition: background-color 0.3s;
}
.nav-link:hover {
  background-color: rgba(221, 221, 221, 0.2);
}
.header-box {
  position: relative;
}
.header-box header {
  background-color: rgba(210, 239, 247, 0.7);
  box-shadow: 0px 4px 8px 2px rgba(17, 17, 17, .06);
  display: block;
}
.header-image-mobile > img {
  width: 100%;
  height: auto;
}
.header-image-mobile {
  margin-bottom: 1rem;
  overflow: hidden;
}
@media (min-width: 768px) {
  .header-image-mobile {
    display: none;
  }
  .header-box {
    z-index: 200;
    height: 54px;
    position: relative;
    animation: headerBox 0.6s ease;
  }
  @keyframes headerBox {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  .header-box header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* background-color: rgba(0,0,0,0.1); */
    transition: all 0.3s ease;
    background-color: rgba(226, 226, 226, 0.5);
    background-image: url('/static/img/preloadbase.gif');
  }
  .head-nav-hide {
    transform: translateY(-100px);
    background-color: rgba(226, 226, 226);
    /* background-image: url('/static/img/preloadbase.gif'); */
  }
  .head-nav-show {
    transform: translateX(0px);
    background-color: rgba(226, 226, 226);
    /* background-image: url('/static/img/preloadbase.gif'); */
  }
  /* header-image */
  .header-image {
    /* margin-top: calc(-15vh - 54px); */
    margin-top: -54px;
    margin-bottom: 3rem;
    overflow: hidden;
    /* min-height: 100vh; */
    height: 100vh;
  }
  .header-image-animation {
    background-image: url('/static/img/seasons.jpg');
    background-position-x: right;
    background-position-y: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    animation: headerImage 1s ease;
  }
  .header-image-wait {
    background-image: url('/static/img/heart.gif');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    opacity: 1;
    width: 100%;
    height: 100%;
  }
  .header-image-wait-animation {
    opacity: 0;
    transition: all 0.5s ease;
  }
  @keyframes headerImage {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}

main {
  min-height: 100vh;
  margin-top: 10vh;
}
.articles > article {
  overflow: hidden;
  background-color: #fff;
  padding: 1rem 1rem 0 2rem;
  margin-bottom: 1rem;
  box-shadow: 1px 1px 1px #ddd;
  border: 1px solid #eee;
}
.article-category {
  background-color: #df2d4f;
  padding: 0.3rem 0.6rem;
  margin: 0 1em;
  color: #fff;
  font-size: 0.8rem;
  text-decoration: none;
}
.article-category:hover {
  color: #000;
  text-decoration: none;
}
.article-title > a {
  text-decoration: none;
  color: #41684d;
  /*color: #42b983;*/
}
.article-title > a:hover {
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
  /* text-indent: 2em; */
}

/* -------footer----- */
.footer-information {
  text-align: center;
  padding-top: 60px;
  padding-bottom: 40px;
  font-size: 85%;
  margin-top: 4rem;
  background-image: url('/static/img/preloadbase.gif');
  /*background-repeat: no-repeat;*/
  /*background-position: center;*/
}
/* sidebar */
main {
  transition: padding-right 0.3s ease;
}
@media (max-width: 991px) {
  main {
    padding-right: 0px !important;
  }
}
main.main-sidebar {
  padding-right: 320px;
}
</style>
