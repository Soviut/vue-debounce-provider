import Vue from 'vue'
import VueDebounceProvider from 'vue-debounce-provider'

Vue.use(VueDebounceProvider, <%= serialize(options) %>)
