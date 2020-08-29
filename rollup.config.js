import buble from '@rollup/plugin-buble'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const banner =
  `/**
 * Vue Debounce Provider ${pkg.version}
 * (c) 2020-${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'esm',
      file: pkg.module,
      exports: 'named',
      banner
    },
    {
      name: 'VueDebounceProvider',
      format: 'umd',
      exports: 'named',
      file: pkg.main,
      globals: {
        vue: 'Vue'
      },
      banner
    }
  ],
  plugins: [
    buble({
      objectAssign: true
    }),
    cleanup(),
    filesize()
  ],
  external: ['vue']
}
