<template>
    <div class="back-to-top d-none d-sm-block "
         :class="{'back-to-top-on': showBackToTop}"
         @click="backToTop">
      <svg class="icon arrow-up" aria-hidden="true" >
        <use xlink:href="#icon-top-copy"></use>
      </svg>
    </div>
</template>
<script>
/* global $:true */
  export default {
    props: {
      showBackToTop: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backToTop () {
        let $body = $('body, html')
        $body.stop().animate(
          {
            scrollTop: 0
          },
          200
        )
      }
    }
  }
</script>
<style scoped>
  /* button back to top */
  .arrow-up {
    color: #fff;
  }
  .back-to-top {
    background-color: #222;
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
  .back-to-top.back-to-top-on {
    bottom: 19px;
  }

</style>

