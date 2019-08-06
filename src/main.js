import Vue from 'vue'
import App from './App'
import router from './router/index.js'
//导入第三方(Vant)组件库
import { Lazyload } from 'vant'
Vue.use(Lazyload);
//导入vant库
import {Icon,Loading} from 'vant'
Vue.use(Icon).use(Loading);

//从本地存储中读取数据
let car = JSON.parse(localStorage.getItem('car') || '[]');
//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex);
//配置vuex
let store = new Vuex.Store({
  state:{
    car: car
  },
  mutations: {
    addToCar(state, goods){
      //当car数组中已经存在了需要添加的商品对象，则只需改变count值即可
      let item = state.car.some( item => {
          if(item.id === goods.id ){
            item.count += goods.count;
            return item;
          }
      });
      //当car数组中不存在需要添加的对象时，直接添加进数组的末尾即可
      if(!item){
        state.car.push(goods);
      }
      //将本地存储中的数据进行更新
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsSelected(state, goodsInfo){
      state.car.some( item => {
        if(item.id === goodsInfo.id){
          item.selected = goodsInfo.selected;
          return true;
        }
      });
      //更新localStorage中的值
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsCount(state, goodsInfo){
      state.car.some( item => {
        if(item.id === goodsInfo.id){
          item.count = goodsInfo.count;
          return true;
        }
      });
      //更新localStorage中的值
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    removeGoods(state, id){
      state.car = state.car.filter(item => item.id !== id);
      //更新localStorage中的值
      localStorage.setItem('car', JSON.stringify(state.car));
    }
  },
  getters: {
    getAllCount(state){
      //相当于 Vm 实例中的计算属性，当state中的数据发生改变后，这些方法都会重新执行一遍
      let total = 0;
      state.car.forEach( item => {
        total += parseInt(item.count);
      });
      return total;
    },
    getGoodsCount(state){ //拿到每个商品的count 返回值为[id]: count形式
      let result = {};
      state.car.forEach( item => {
        result[item.id] = item.count;
      });
      return result;
    },
    getGoodsSelected(state){ //获取每个商品的选中状态
      let result = {};
      state.car.forEach( item => {
        result[item.id] = item.selected;
      });
      return result;
    },
    getGoodsCountAndAmount(state){
      //计算总价
      let total = 0;
      state.car.forEach( item => {
        if(item.selected){
          total += item.count * item.price;
        }
      });
      return total;
    },
    getAllSelected(state) {
      //数组的every方法：只要数组中的元素都符合某一个指定的条件，则返回true,只要有一个不符合，则返回false
      return state.car.every(item => item.selected);
    }
  }
});

//没有Vue.config.productionTip = false这句代码，它会显示你生产模式的消息
Vue.config.productionTip = false;

//做rem自适应
~function(){
  function computeFontSize(){
    let dew = 320,
      winW = document.documentElement.clientWidth;
    if(winW >= dew){
      document.documentElement.style.fontSize = '100px';
    }else{
      document.documentElement.style.fontSize = winW / dew * 100 + 'px';
    }
  }
  computeFontSize();
  //监听浏览器窗口是否发生改变，当发生改变的时候，就重新计算fontsize的大小
  window.addEventListener('resize', computeFontSize);
}();

new Vue({
  el: '#app',
  router,
  render: c => c(App),
  store
});
