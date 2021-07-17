import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from "./store"

import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading: require('./assets/img/loading.svg'),
  error: require('./assets/img/loading.svg')
})
/**
 * 事件总线使用方法，相当于new了一个vue实例
 * @type {Vue | CombinedVueInstance<Vue, object, object, object, Record<never, any>>}
 */
// Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
