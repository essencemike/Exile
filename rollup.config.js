const path = require('path');
const buble = require('rollup-plugin-buble');
const alias = require('rollup-plugin-alias');
const cjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const node = require('rollup-plugin-node-resolve');
const version = process.env.VERSION || require('./package.json').version;

const banner =
  '/*!\n' +
  ' * Exile.js v' + version + '\n' +
  ' * (c) 2018-' + new Date().getFullYear() + ' IMike\n' +
  ' * Released under the MIT License.\n' +
  ' */';

module.exports = {
  input: 'src/main.js',
  external: [],
  plugins: [
    replace({
      __VERSION__: version,
    }),
    buble(),
  ],
  output: {
    file: 'dist/Exile.min.js',
    format: 'umd',
    banner,
    name: 'Exile',
  }
};
