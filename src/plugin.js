import component from './component'

const DEFAULT_OPTIONS = {}

export default {
  install(Vue, { componentName = component.name, globalOptions = {} } = {}) {
    Vue.component(componentName, component)
    Vue.prototype.$ci = {
      GLOBAL_OPTIONS: { ...DEFAULT_OPTIONS, ...globalOptions },
    }
  },
}
