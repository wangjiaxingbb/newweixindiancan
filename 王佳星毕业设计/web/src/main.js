// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/http/http.js';
import ElementUI from 'element-ui';
import '@/assets/css/reset.css'; // 引入初始化样式，覆盖默认浏览器样式
import '@/assets/css/common.css'; // 公共样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import tools from '@/tools.js'; // 引入公共方法
import bus from '@/bus.js'; // bus简单传值
import ico from '@/components/icon.vue'; // 引入公共图标组件
import * as filters from '@/filters.js'; // 引入全局过滤器

// 注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$tools = tools;
Vue.prototype.$bus = bus; // bus传值
Vue.component('ico', ico); //注册公共图标组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
