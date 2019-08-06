<template>
  <van-swipe :autoplay="3000" indicator-color="#ed1d25">
    <van-swipe-item v-for="item in slidedata" :key="item.goodsId" @click="goToList">
      <img v-lazy="item.img_url" width="100%"/>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
export default {
  name: "slides",
  data(){
      return{}
  },
  methods: {
    goToList(){
      this.$router.push('/goodslist/1');
    }
  },
  components:{
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: ['slidedata']
}
</script>

<style lang="less">
  .van-swipe__indicators{
    bottom: 80px;
  }
  .van-swipe__indicator--active{
    width: 14px;
    border-radius: 4px;
  }
  .van-swipe__indicator{
    background-color: #fff;
  }
</style>
