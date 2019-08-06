<template>
  <div id="app" ref="app">
    <!-- 可以通过配置路由元信息来判断页面是否走缓存 -->
    <keep-alive>
      <router-view v-if="$route.meta.KeepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.KeepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$refs.app.style.minHeight = (document.documentElement.clientHeight  || document.body.clientHeight)+ 'px';
  }
}
</script>

<style lang="less">
  html,body{
    font-size: 100px;
  }
  #app{
    background-color: #f6f6f6;
  }
</style>
