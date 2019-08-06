<template>
  <div class="home-container">
    <!--header区域-->
    <div class="header">
      <!--顶部搜素框-->
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
      <!--轮播图-->
      <Slides :slidedata="slidList"></Slides>
      <!--header-menu-->
      <div class="header-menu">
        <div class="menu-item" v-for="item in menuList">
          <div class="item-box">
            <img :src="item.img_url" alt="">
            <span>{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>
    <!--content区域-->
    <div class="content">
      <div class="floor-item" v-for="(item, index) in floorList">
        <div class="floor-title" :class="['bgcolor' +　(index + 1)]" @click="goToList(item.cateId)">
          <span>{{ item.category_name }} / <i>Goods Classify</i></span>
        </div>
        <div class="floor-body">
          <img :src="item['list-item'][0].img_url" alt="">
          <img :src="item['list-item'][1].img_url" alt="">
        </div>
        <div class="floor-footer">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="goodsitem in item['list-item'].slice(3)">
              <div class="goodsItem" >
                <img :src="goodsitem.img_url" alt="">
                <span>{{ goodsitem.text }}</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <!--底部导航栏-->
    <Tabbar :active-id="0"></Tabbar>
  </div>
</template>

<script>
import { Search } from 'vant';
import Tabbar from '../BaseCom/Tabbar.vue'
import Slides from '../BaseCom/Slides.vue'
//导入自定义的axios.js
import axiosObj from '../../assets/js/axios.js'
//导入第三方的swiper组件
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
export default {
  name: "Home",
  data(){
    return{
      value: "",
      slidList: [],
      menuList: [],
      floorList: [],
      swiperOption: {slidesPerView: 4}
    }
  },
  created(){
    this.getBannerData();
  },
  methods:{
    onSearch(){

    },
    onCancel(){

    },
    async getBannerData(){
      //async await语法糖可以直接拿到请求接口返回的数据，这里拿到的是轮播图的数据
      let data = await axiosObj.sendRequest('/xsblp');
      this.slidList = data[0].banner;
      this.menuList = data[1].classification;
      this.floorList = data[2].floor;
    },
    goToList(cateId){
      this.$router.push('/goodslist/' + cateId);
    }
  },
  components: {
    Tabbar,
    Slides,
    [Search.name]: Search,
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less" scoped>
  .home-container{
    margin-bottom: .5rem;
    .header{
      position: relative;
      .van-search--show-action{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2;
      }
      .header-menu{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        position: absolute;
        left: 0;
        top: 1.85rem;
        margin: 0 4%;
        padding: .2rem .1rem;
        background-color: #fff;
        border-radius: 2%;
        .menu-item{
          width: 18%;
          .item-box{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            img{
              width: 80%;
            }
            span{
              margin-top: .1rem;
              font-size: .12rem;
            }
          }
        }
      }
    }
    .content{
      margin: .5rem 4% 0 4%;
      .floor-item{
        margin-bottom: .1rem;
        background-color: #fff;
        border-radius: .6%;
        overflow: hidden;
        .floor-title{
          padding: .15rem .1rem;
          margin-bottom: .02rem;
          font-size: .16rem;
          color: #fff;
          cursor: pointer;
          i{
            font-size: .12rem;
          }
        }
        .floor-body{
          display: flex;
          width: 50%;
          img{
            width: 100%;
            height: 40%;
          }
        }
        .floor-footer{
          padding: .1rem 0;
          .swiper-wrapper{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .swiper-slide{
            .goodsItem{
              display: flex;
              flex-direction:  column;
              justify-content: space-between;
              align-items: center;
              height: 1rem;
              font-size: .12rem;
              img{
                width: 100%;
              }
            }

          }
        }
      }
    }
  }
  .bgcolor1{
    background-image: linear-gradient(to right, #ff7af1 0%, #d34df9 100%);
  }
  .bgcolor2{
    background-image: linear-gradient(to right, #ffd800 0%, #fe7d00 100%);
  }
  .bgcolor3{
    background-image: linear-gradient(to right, #ffaaa7 0%, #ff5b6c 100%);
  }
  .bgcolor4{
    background-image: linear-gradient(to right, #00d9e2 0%, #00c4a3 100%);
  }
</style>
