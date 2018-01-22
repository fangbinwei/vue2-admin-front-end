<template>
  <div>
    <div class="sidebar-toggle d-none d-lg-block" 
         :class="tbStatus"
         @mouseenter="sideToggleEnter" 
         @mouseleave="sideToggleLeave" 
         @click="sideToggleClick">
			<div class="sidebar-toggle-line-wrap">
			  <span class="sidebar-toggle-line sidebar-toggle-line-first" ></span>
			  <span class="sidebar-toggle-line sidebar-toggle-line-middle" ></span>
			  <span class="sidebar-toggle-line sidebar-toggle-line-last"></span>
			</div>
  	</div>
    <aside id="my-sidebar" 
           class="my-sidebar d-none d-lg-block" :class="{'my-sidebar-show': showSidebar}">
        <div class="container sidebar-content">
				<div class="row">
					<div class="col">
							<div class="sidebar-image">
								<img src="/static/img/profile.jpg" alt="profile-image" />
							</div>
							<span>方宾伟</span>
					</div>
				</div>
				<div class="row justify-content-center sidebar-nav">
					<div class="col-3 sidebar-nav-post">
						<router-link :to="{name: 'archive'}">
							<span class="item-count">{{articleTotal}}</span>
							<span>文章</span>
						</router-link>
					</div>
					<div class="col-3 sidebar-nav-category">
						<router-link :to="{name: 'category'}">
							<span class="item-count">{{categoryTotal}}</span>
							<span>分类</span>
						</router-link>
					</div>
					<div class="col-3 sidebar-nav-photo">
						<a href="#">
							<span class="item-count">0</span>
							<span>标签</span>
						</a>
					</div>
				</div>
        <router-link :to="{name: 'login'}">Login</router-link>
			</div>
		</aside>
  </div>

</template>
  <script>
  export default {
    props: {
      articleTotal: {
        type: Number,
        default: 0
      },
      categoryTotal: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        // toggle button arrow/close
        tbStatus: {
          'toggle-arrow': false,
          'toggle-close': false
        },
        showSidebar: false
      }
    },
    methods: {
      // sidebar toggle button
      sideToggleClick () {
        this.tbStatus['toggle-close'] = !this.tbStatus['toggle-close']
        this.showSidebar = !this.showSidebar
        this.$emit('sidebarStatus', this.showSidebar)
      },
      sideToggleEnter () {
        this.tbStatus['toggle-arrow'] = true
      },
      sideToggleLeave () {
        this.tbStatus['toggle-arrow'] = false
      }
    }
  }
</script>
<style scoped>
  /* button */
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
  .sidebar-toggle-line {
    width: 100%;
    background: #fff;
    height: 2px;
    display: inline-block;
    vertical-align: top;
    margin-top: 3px;
    position: relative;
    transition: all 0.4s ease;
  }
  .sidebar-toggle-line:first-child {
    margin-top: 0;
  }
  .toggle-arrow span:nth-child(1) {
    width: 50%;
    transform: rotate(-45deg);
    top: 2px;
  }
  .toggle-arrow span:nth-child(2) {
    width: 90%;
  }
  .toggle-arrow span:nth-child(3) {
    width: 50%;
    transform: rotate(45deg);
    top: -2px;
  }
  .toggle-close span:nth-child(1) {
    width: 100%;
    transform: rotate(-45deg);
    top: 5px;
  }
  .toggle-close span:nth-child(2) {
    width: 0%;
  }
  .toggle-close span:nth-child(3) {
    width: 100%;
    transform: rotate(45deg);
    top: -5px;
  }
  .my-sidebar {
    width: 320px;
    transform: translateX(320px);
    position: fixed;
    background: rgba(34, 34, 34, 0.8);
    top: 0;
    bottom: 0;
    right: 0;
    /* z-index: 201; */
    transition: all 0.4s cubic-bezier(0.16, 0.22, 0.22, 1.4);
    /* transition: all 0.3s ease; */
  }
  .my-sidebar.my-sidebar-show {
    transform: translateX(0px);
  }
  .sidebar-content {
    text-align: center;
    margin-top: 3.5rem;
  }
  .sidebar-image {
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
  .sidebar-image img:hover {
    filter: grayscale(100%);
  }
  .sidebar-nav {
    text-align: center;
    margin-top: 1rem;
  }
  .sidebar-nav span {
    margin-top: 0.5rem;
    font-weight: normal;
    display: block;
  }
  .sidebar-nav a {
    text-decoration: none;
    color: #999;
  }
  .sidebar-nav a:hover {
    color: #eee;
  }
  .sidebar-nav-post {
    border-right: 1px solid #333;
  }
  .sidebar-nav-category {
    border-right: 1px solid #333;
  }
  .my-sidebar .item-count {
    display: block;
    font-weight: 600;
  }
</style>
