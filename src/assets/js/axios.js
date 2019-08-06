//导入axios
import axios from 'axios'
//配置基础路径
axios.defaults.baseURL = 'https://api.myjson.com/bins';
//配置响应拦截器(返回的结果是data中的数据)
axios.interceptors.response.use(res => res.data);
let sendRequest = function sendRequest(url){
  return axios.get(url);
};
export default{
  sendRequest
};
