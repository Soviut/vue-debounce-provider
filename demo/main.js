import Vue from 'vue'
import App from './App.vue'
import DebounceProvider from '../src'

Vue.config.productionTip = false

Vue.use(DebounceProvider)

new Vue({
  render: h => h(App),
}).$mount('#app')
