<template>
  <div class="goodsinfo-container">
    <!--顶部导航栏-->
    <van-nav-bar title="商品列表" left-text="返回" left-arrow @click-left="onClickLeft">
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <div class="content">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="item in goodsInfo.bannerList" @click="preview">
          <img :src="item.img_url" alt="">
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">
          {{ current + 1 }}/4
        </div>
      </van-swipe>
      <div class="buy-info">
        <h1 class="goodstitle">{{ goodsInfo.title }}</h1>
        <p class="price">
          销售价：<span class="now-price">￥{{ goodsInfo.price }}</span>
        </p>
        <p class="options">
          <span>购买数量:</span>
          <van-stepper v-model="value" min="1" max="8" @change="getCount"/>
        </p>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :info="$store.getters.getAllCount"
        @click="onClickCart"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addShopCar"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
      />
    </van-goods-action>
  </div>
</template>
<script>
import { NavBar,Swipe, SwipeItem,ImagePreview,GoodsAction,
  GoodsActionIcon, GoodsActionButton, Stepper} from 'vant';
import axios from "../../assets/js/axios";
export default {
    data(){
      return {
        goodsId: parseInt(this.$route.params.id),
        goodsInfo: {},
        ballflag: false,
        current: 0,
        imgList: [],
        value: 1,
        count: 1 //加入购物车的数量
      }
    },
    created(){
      this.getGoodsInfo();
    },
    methods: {
      addShopCar(){
        //拼接出商品对象
        let goodsinfo = {
          id: this.goodsId,
          count: this.count,
          price: this.goodsInfo.price,
          selected: true //该商品是否被选中，默认为选中状态
        };
        //调用this.$store.commit('addToCar')方法，并传递参数
        this.$store.commit('addToCar', goodsinfo);
      },
      onChange(index) {
        this.current = index;
      },
      onClickLeft(){
        this.$router.go(-1);
      },
      onClickCart(){
        this.$router.push('/shoppingcar');
      },
      async getGoodsInfo(){
        this.goodsInfo = (await axios.sendRequest('/12xyh1'))[this.goodsId];
        this.goodsInfo.bannerList.forEach( item => {
          this.imgList.push(item['img_url']);
        })
      },
      preview(){
        ImagePreview(this.imgList);
      },
      getCount(count){
        this.count = count;
      } //获取当前选择的商品数量
    },
    components:{
      [NavBar.name]:NavBar,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [GoodsAction.name]: GoodsAction,
      [GoodsActionIcon.name]: GoodsActionIcon,
      [GoodsActionButton.name]: GoodsActionButton,
      [ImagePreview.name]: ImagePreview,
      [Stepper.name]: Stepper
    }
  }
</script>
<style lang="less" scoped>
  .goodsinfo-container{
    .van-swipe-item{
      width: 90%;
      img{
        width: 100%;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      color: #fff;
      font-size: 12px;
      background: rgba(241, 24, 39, 0.5);
    }
    .content{
      padding: 0 5%;
      margin-bottom: .5rem;
      background-color: #fff;
      font-size: .12rem;
      .buy-info{
        padding: 20px 10px;
        margin: 1px 0;
        background-color: #fff;
        .goodstitle{
          margin-top: 0;
          margin-bottom: 10px;
          padding-top: .2rem;
          font-size: 16px;
          line-height: 30px;
          border-top: 1px solid #f6f6f6;
        }
        .price{
          span{
            margin-right: 20px;
            &.now-price{
              color: red;
              font-size: 18px;
            }
          }
        }
        .options{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
</style>
