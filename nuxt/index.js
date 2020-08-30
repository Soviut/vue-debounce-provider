const { resolve } = require('path')

export default function nuxtVueDebounceProvider(moduleOptions = {}) {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-debounce-provider.js',
    options: {
      ...moduleOptions,
    },
  })
}

module.exports.meta = require('../package.json')
