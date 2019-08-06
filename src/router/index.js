import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

//导入组件
import Home from '../components/PageCom/Home.vue'
import Classify from '../components/PageCom/Classify.vue'
import My from '../components/PageCom/My.vue'
import GoodsList from '../components/PageCom/GoodsList.vue'
import GoodsInfo from '../components/PageCom/GoodsInfo.vue'
import ShoppingCar from '../components/PageCom/ShoppingCar.vue'


export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home, meta: {KeepAlive: true}},
    {path: '/classify', component: Classify},
    {path: '/my', component: My, meta: {KeepAlive: true}},
    {path: '/goodslist/:id', component: GoodsList},
    {path: '/goodsinfo/:id', component: GoodsInfo},
    {path: '/shoppingcar', component: ShoppingCar}
  ]
})
