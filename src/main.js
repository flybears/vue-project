import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import locale from './i18n/index'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import store from './store/index'
import * as filters from './filters'
import router from './router'

Vue.use(VueI18n)     //国际化
Vue.use(Element)
Vue.config.lang = 'zh-cn'

Vue.locale('zh-cn', locale.cn)
Vue.locale('en', locale.en)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config.withCredentials = true  // 需要跨域打开此配置
  // post提交 data存在 并且 data不是FormData对象时对数据进行json化处理
  // if(config.method==='post' && config.data && config.data.constructor !== FormData){
  //   config.data = qs.stringify(config.data)
  //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // }
  // 开启loading动画
  store.dispatch('showLoading')
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Do something with response data
  // 关闭loading动画
  store.dispatch('hideLoading')
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

// axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
Vue.prototype.$http = axios



new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
