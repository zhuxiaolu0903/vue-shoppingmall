<template>
    <div class="shoppingCar-container">
      <!--顶部导航栏-->
      <van-nav-bar title="购物车列表" left-text="返回" left-arrow @click-left="onClickLeft">
        <van-icon name="search" slot="right" />
      </van-nav-bar>
      <div class="goodsList">
        <div class="goodsItem" v-for="item in goodsList">
          <van-swipe-cell>
            <van-cell :border="false">
              <van-card
                :num="$store.getters.getGoodsCount[item.goodsId]"
                :price="item.price"
                :title="item.title"
                :thumb="item.img_url">
                <div slot="footer">
                  <div class="footer-content">
                    <van-switch
                      v-model="goodsChecked[item.goodsId]"
                      active-color="#f44"
                      size="20px"
                      @change="selectedChanged(item.goodsId, goodsChecked[item.goodsId])"
                    />
                    <div class="right-box">
                      <span>购买数量:</span>
                      <van-stepper v-model="$store.getters.getGoodsCount[item.goodsId]" min="1" @change="getCount(item.goodsId, $store.getters.getGoodsCount[item.goodsId])"/>
                    </div>
                  </div>
                </div>
              </van-card>
            </van-cell>
            <template slot="right">
              <van-button id="option" square type="danger" text="删除" @click="removeGoods(item.goodsId)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
      <van-submit-bar
        :price="($store.getters.getGoodsCountAndAmount)*100"
        button-text="提交订单"
        @submit="onSubmit">
        <van-checkbox v-model="checked" checked-color="#f44" @change="checkedChange(checked)">全选</van-checkbox>
      </van-submit-bar>
      <!--分割线-->
      <van-divider v-if="isShow">购物车空空如也</van-divider>
    </div>
</template>

<script>
import { NavBar, Stepper, Card, SubmitBar, checkbox, Switch, SwipeCell,Cell,Button, Divider  } from 'vant';
import axios from "../../assets/js/axios";
export default {
  name: "ShoppingCar",
  data(){
    return {
      goodsList: [],
      isShow: true,
      checked: this.$store.getters.getAllSelected
    }
  },
  created(){
    this.getGoodsInfo();
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1);
    },
    getCount(id, count){
      this.$store.commit('updateGoodsCount', {id, count});
    },
    onSubmit(){},
    async getGoodsInfo(){
      if(this.$store.state.car.length > 0){
        this.isShow = false;
        let result = await axios.sendRequest('/weigx');
        this.$store.state.car.forEach( item => {
          this.goodsList = this.goodsList.concat(
            result.filter( (goods, index) => {
            if(item.id === index){
              return goods;
            }
          }));
        });
      }
    },
    selectedChanged(id, val){
      //调用this.$store.commit('updataGoodsSelected')方法，修改商品的selected值
      this.$store.commit('updateGoodsSelected', {id: id, selected: val});
    },
    checkedChange(val){
      this.$store.state.car.forEach( item => {
        this.$store.commit('updateGoodsSelected', {
          id: item.id,
          selected: val
        });
      });
    },
    removeGoods(id){
      this.goodsList = this.goodsList.filter( item => item.goodsId !== id);
      this.$store.commit('removeGoods', id);
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Stepper.name]: Stepper,
    [Card.name]: Card,
    [SubmitBar.name]: SubmitBar,
    [checkbox.name]: checkbox,
    [Switch.name]: Switch,
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Divider.name]: Divider
  },
  computed:{
    goodsChecked:{
      get(){
        return this.$store.getters.getGoodsSelected;
      },
      set(){}
    }
  }
}
</script>

<style lang="less" scoped>
  .shoppingCar-container{
    margin-bottom: .5rem;
    background-color: #f6f6f6;
    .van-cell{
      padding: 0;
    }
    #option{
      position: relative;
      top: -.34rem;
      padding-top: .34rem;
      width: 100%;
      height: 130%;
      font-size: .16rem;
    }
    .van-card{
      background-color: #fff;
      .van-card__title{
        margin-bottom: .2rem;
        font-size: .14rem;
      }
      .van-card__bottom{
        font-size: .16rem;
      }
    }
    .goodsItem{
      margin: .05rem 3%;
      border-radius: 5%;
      .footer-content{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .right-box{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 60%;
        }
      }
    }
    .van-checkbox{
      margin-left: .15rem;
    }
  }
</style>
