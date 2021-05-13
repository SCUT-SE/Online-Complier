// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// // 导入全局样式
// import './assets/css/global.css'
// // element-ui样式
// import './plugins/element.js'


// import axios from 'axios'
// // axios.defaults.baseURL='http://127.0.0.1:8080/public/mock/'
// Vue.prototype.$http=axios

// Vue.config.productionTip = false
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')// 或者 el:"#app"
import Vue from 'vue'
import router from './router'
import './plugins/element.js'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')