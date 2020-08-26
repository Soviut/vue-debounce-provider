import component from './component'
import plugin from './plugin'

export default plugin
export { component as DebounceProvider }

// auto-install when included directly in the browser
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
