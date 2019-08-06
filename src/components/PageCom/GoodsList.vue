<template>
    <div class="goodsList-container">
      <!--加载模块-->
      <div class="load" v-if="loadding"><van-loading color="#1989fa"/></div>
      <!--顶部导航栏-->
      <van-nav-bar title="商品列表" left-text="返回" left-arrow @click-left="onClickLeft">
        <van-icon name="search" slot="right" />
      </van-nav-bar>
      <!--标签栏-->
      <van-tabs v-model="active" animated swipeable>
        <van-tab v-for="(item, index) in cateList" :title="item">
          <!--内容区域-->
          <div class="goodsList">
            <div class="goodsItem" v-for="goods in goodsList[index]" @click="goToInfo(goods.goodsId)">
              <div class="left">
                <img :src="goods.img_url" alt="">
              </div>
              <div class="right">
                <div class="title">{{goods.title}}</div>
                <div class="footer">
                  <span class="price">￥{{goods.price}}</span>
                  <van-icon name="cart-o"></van-icon>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant';
import axios from "../../assets/js/axios";
export default {
  name: "GoodsList",
  data(){
    return{
      active: 0,
      id: parseInt(this.$route.params.id),
      cateList: [],
      goodsList: [],
      loadding: true //是否还在加载数据
    }
  },
  created(){
    //请求数据
    this.getCataData();
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1);
    },
    async getCataData(){
      let data = await axios.sendRequest('/14p5xp');
      if(data){
        this.loadding = false;
      }
      this.cateList = data[this.id]['classify'];
      this.goodsList = data[this.id]['goodsList'];
    },
    goToInfo(goodsid){
      this.$router.push('/goodsinfo/' + goodsid);
    }
  },
  components:{
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
}
</script>

<style lang="less">
  .goodsList-container{
    .load{
      position: absolute;
      top: 50%;
      left: 50%;
      bottom: 50%;
      right: 50%;
      margin: auto;
      width: .3rem;
      height: .3rem;
    }
    .van-tab {
      color: #bdbdbd;
      &.van-tab--active{
        color: #323233;
      }
    }
    .goodsList{
      .goodsItem{
        margin-bottom: .05rem;
        padding: .1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #fff;
        height: 1rem;
        .left{
          margin-right: .2rem;
          min-width: 30%;
          width: 30%;
          img{
            width: 100%;
          }
        }
        .right{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title{
            font-size: .14rem;
            isplay: -webkit-box;
            text-overflow: ellipsis;
            overflow : hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .footer{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            color: red;
            .price{
              font-size: .18rem;
            }
            .van-icon{
              font-size: .28rem;
            }
          }
        }
      }
    }
  }
</style>
