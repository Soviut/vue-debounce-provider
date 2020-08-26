import Vue from 'vue'
import App from './App.vue'
import Debounce from '../lib'

Vue.config.productionTip = false

Vue.component('debounce', Debounce)

new Vue({
  render: h => h(App),
}).$mount('#app')
