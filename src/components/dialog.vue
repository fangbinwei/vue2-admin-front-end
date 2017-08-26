<template>
  <div>
    <div class="dialog-wrap" @click="closeAbout" v-if="isShow">
    </div>
    <transition name="drop">
      <div class="dialog-cover" v-if="isShow">
        <div class="dialog-content" >
          <a class="dialog-close" @click="closeAbout">×</a>
          <slot>empty</slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeAbout () {
        this.$emit('on-close')
      }
    }
  }
</script>

<style scoped>
.dialog-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 1503;
}
.dialog-cover {
  width: 20%;
  position: fixed;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -10%;
  border: 2px solid #464068;
  padding: 2%;
  z-index: 1504;
  /*line-height: 1.6;*/
}
.dialog-content {

}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  font-size: 140%;
}
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}
</style>
