const { resolve } = require('path')

module.exports = function nuxtVueDebounceProvider(options) {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-debounce-provider.js',
    options,
  })
}

module.exports.meta = require('../package.json')
