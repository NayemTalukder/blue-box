import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mutationobserver-shim'
import './plugins'
import './registerServiceWorker'

Vue.config.productionTip = false

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
