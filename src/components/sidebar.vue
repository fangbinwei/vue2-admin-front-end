<template>
  <div>
    <div class="sidebar-toggle d-none d-lg-block">
      <div class="sidebar-toggle-line-wrap">
        <span class="sidebar-toggle-line sidebar-toggle-line-first" ></span>
        <span class="sidebar-toggle-line sidebar-toggle-line-middle" ></span>
        <span class="sidebar-toggle-line sidebar-toggle-line-last"></span>
      </div>
    </div>
    <aside id="sidebar" class="sidebar d-lg-block d-none">
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
          <!--<div class="col-3 sidebar-nav-post">-->
            <!--<a href="#">-->
              <!--<span class="item-count">64</span>-->
              <!--<span>文章</span>-->
            <!--</a>-->
          <!--</div>-->
          <!--<div class="col-3 sidebar-nav-category">-->
            <!--<a href="#">-->
              <!--<span class="item-count">64</span>-->
              <!--<span>分类</span>-->
            <!--</a>-->
          <!--</div>-->
          <!--<div class="col-3 sidebar-nav-photo">-->
            <!--<a href="#">-->
              <!--<span class="item-count">63</span>-->
              <!--<span>相册</span>-->
            <!--</a>-->
          <!--</div>-->
        </div>
        <router-link :to="{name: 'admin'}">参观后台</router-link>
      </div>
    </aside>
  </div>

</template>
<script>
  /* global $:true */
  export default {
//    props: {
//      articleTotal: {
//        type: Number,
//        default: 0
//      },
//      category: {
//        type: Number,
//        default: 0
//      }
//    },
    mounted () {
      function extend () {
        let target = arguments[0] || {}
        let length = arguments.length
        let copy, options
        let name

        for (let i = 1; i < length; i++) {
          if ((options = arguments[i]) != null) {
            for (name in options) {
//          src = target[name]
              copy = options[name]

              if (copy !== undefined) {
                target[name] = copy
              }
            }
          }
        }
        return target
      }

      function SidebarToggleLine (settings) {
        this.el = document.getElementsByClassName(settings.el)[0]
        this.rotateNow = 0
        this.status = extend({}, {
          init: {
            width: '100%',
            transform: 'rotateZ(0deg)',
            top: 0
          }
        }, settings.status)
      }

      SidebarToggleLine.prototype.init = function () {
        this.transform('init', this.rotateNow)
      }
      SidebarToggleLine.prototype.arrow = function () {
        this.transform('arrow', this.rotateNow)
      }
      SidebarToggleLine.prototype.close = function () {
        this.transform('close', this.rotateNow)
      }
      SidebarToggleLine.prototype.transform = function (status, rotateNow) {
        let styleObj = this.status[status]
        let style = {}
        let styleRotate = {}
        let self = this
        let name
        for (name in styleObj) {
          if (name === 'transform') {
            styleRotate[name] = styleObj[name]
          } else {
            style[name] = styleObj[name]
          }
        }

        let updateRotate = function (self, rotateNow) {
          self.rotateNow = rotateNow
        }

        $(this.el).stop().animate(style, {
          step: function (now, fx) {
            if (fx.prop === 'width') {
              if (styleRotate['transform']) {
                // 根据rotateZ的当前值和目标值进行动画
                let rotateTarget = parseInt(/(-)?(\d+)/.exec(styleRotate['transform'])[0])
                let rotateVar = rotateNow + fx.pos * (rotateTarget - rotateNow)
                // var rotateVar = rotateNow + (Math.abs(now-fx.start)/Math.abs(fx.end-fx.start)) * (rotateTarget - rotateNow);
                $(this).css('transform', 'rotateZ(' + rotateVar + 'deg)')

                // update the value of rotateNow
                updateRotate(self, rotateVar)
              }
            }
          },
          duration: 'normal'
        })
      }

      let sidebarToggleLine1st = new SidebarToggleLine({
        el: 'sidebar-toggle-line-first',
        status: {
          arrow: {width: '50%', transform: 'rotateZ(-45deg)', top: '2px'},
          close: {width: '100%', transform: 'rotateZ(-45deg)', top: '5px'}
        }
      })

      let sidebarToggleLine2nd = new SidebarToggleLine({
        el: 'sidebar-toggle-line-middle',
        status: {
          arrow: {width: '90%'},
          close: {width: '0%'}
        }
      })

      let sidebarToggleLine3rd = new SidebarToggleLine({
        el: 'sidebar-toggle-line-last',
        status: {
          arrow: {width: '50%', transform: 'rotateZ(45deg)', top: '-2px'},
          close: {width: '100%', transform: 'rotateZ(45deg)', top: '-5px'}
        }
      })

      let sidebarToggleLines = {
        lines: [],
        push: function (line) {
          this.lines.push(line)
        },
        init: function () {
          this.lines.forEach(function (line) {
            line.init()
          })
        },
        arrow: function () {
          this.lines.forEach(function (line) {
            line.arrow()
          })
        },
        close: function () {
          this.lines.forEach(function (line) {
            line.close()
          })
        }
      }

      sidebarToggleLines.push(sidebarToggleLine1st)
      sidebarToggleLines.push(sidebarToggleLine2nd)
      sidebarToggleLines.push(sidebarToggleLine3rd)

// ---
      let SIDEBAR_WIDTH = '320px'
      let sidebarToggleMotion = {
        sidebar_el: document.getElementById('sidebar'),
        toggle_el: document.getElementsByClassName('sidebar-toggle')[0],
        body: document.getElementsByTagName('body')[0],
        sidebar_content_el: document.getElementsByClassName('sidebar-content')[0],
        isSidebarVisible: false,

        init: function () {
          $(this.toggle_el).on('mouseenter', this.mouseEnterHandler.bind(this))
          $(this.toggle_el).on('mouseleave', this.mouseLeavehander.bind(this))
          $(this.toggle_el).on('click', this.clickHandler.bind(this))
        },
        mouseLeavehander: function () {
          if (this.isSidebarVisible) {
            return
          }
          sidebarToggleLines.init()
        },
        mouseEnterHandler: function () {
          if (this.isSidebarVisible) {
            return
          }
          sidebarToggleLines.arrow()
        },
        clickHandler: function () {
          this.isSidebarVisible ? this.hideSidebar() : this.showSidebar()
          this.isSidebarVisible = !this.isSidebarVisible
        },
        showSidebar: function () {
          let self = this
          $(this.sidebar_el).stop().animate({width: SIDEBAR_WIDTH},
            {
              duration: 'fast',
              done: function () {
                $(self.sidebar_content_el).fadeIn()
              }
            })
          $(this.body).stop().animate({paddingRight: SIDEBAR_WIDTH}, 'fast')
          sidebarToggleLines.close()
        },
        hideSidebar: function () {
          let self = this
          $(this.sidebar_el).stop().animate({width: 0},
            {
              duration: 'fast',
              start: function () {
                self.sidebar_content_el.style.display = 'none'
              }
            })
          $(this.body).stop().animate({paddingRight: 0}, 'fast')
          sidebarToggleLines.init()
        }
      }
      $(document).ready(sidebarToggleMotion.init())
    }
  }
</script>
<style scoped>
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

</style>
