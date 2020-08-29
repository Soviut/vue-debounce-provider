import Vue from 'vue'
import App from './App.vue'
import VueDebounceProvider from '../src'

Vue.config.productionTip = false

Vue.use(VueDebounceProvider)

new Vue({
  render: h => h(App),
}).$mount('#app')
