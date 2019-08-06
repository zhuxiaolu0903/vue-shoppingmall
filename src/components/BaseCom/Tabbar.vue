<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/classify">分类</van-tabbar-item>
    <van-tabbar-item icon="cart-o" to="/shoppingcar" :info="$store.getters.getAllCount">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/my" dot>我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
  name: "Tabbar",
  data(){
    return {
      active: this.activeId
    }
  },
  created(){
    console.log(this.active);
  },
  props: ["activeId"],
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]:TabbarItem
  }
}
</script>

<style lang="less" scoped>
  .van-tabbar-item--active{
    color: #ed1d25;
  }
</style>
